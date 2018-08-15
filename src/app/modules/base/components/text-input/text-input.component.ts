import { Component, OnInit, ViewChild, ElementRef, HostBinding, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormControl, ValidatorFn, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  
  @HostBinding('class.c-text-input') private cClass: boolean = true;
  @HostBinding('class.c-text-input--error')
  get hasError():boolean {
    if(this.form && !this.required) return false;
    if(this.formControl && !this.formControl.pristine && !this.isDirty && this.required) return true;
    if(this.formControl && !this.formControl.touched && !this.formControl.dirty) return false;
    return this.formControl ? !this.isValid || (!this.formControl.valid && this.isDirty) : !this.isValid;
  }

  @HostBinding('class.c-text-input--disabled')
  @Input() isDisabled: boolean;

  @HostBinding('class.c-text-input--focused')
  isFocused: boolean;

  @HostBinding('class.c-text-input--dirty')
  get isDirty():boolean {
    return (this.value != null && this.value.toString().length > 0 && this.value.toString() != "NaN");
  }

  @Input() form:FormGroup;
  @Input() name: string;
  @Input() value: string;
  @Input() placeholder: string = "";
  @Input() label: string;
  @Input() error: string;
  @Input() maxlength: number;
  @Input() required: boolean;
  @Input() min: number;
  @Input() max: number;
  @Input() autocomplete: string = "off";
  @Input() typeDebounceTime: number = 200;
  @Input() dismissOnFocusOut: boolean = false;
  @Input() dismissOnEscape: boolean = true;
  @Input() autoFocusWhenEnabled: boolean = false;
  @Input() emitWhenInit: boolean = false;

  @Input() set type(value: string) {
    this.inputType = value || "text";
    this.rawType = value;
    let self = this;
    switch(this.rawType) {
      case 'alpha':
        this.pattern = /^[A-Za-z\sçÇşŞöÖğĞıİüÜ]+$/;
        this.keydownPattern = this.inputPattern;
      break;
      case 'numeric':
        this.inputType = "text";
        this.pattern = /^[0-9]+$/;
        this.keydownPattern = this.inputPattern;
      break;
      case 'email':
        this.pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      break;
      case 'url':
        this.pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
      break;
      case 'tel':
      this.typeDebounceTime = 300;
      this.maxlength = 12;
      this.pattern = /(([\+]90?)|([0]?))([ ]?)((\([0-9]{3}\))|([0-9]{3}))([ ]?)([0-9]{3})(\s*[\-]?)([0-9]{2})(\s*[\-]?)([0-9]{2})/;
      this.keydownPattern = /[0-9]/;
      break;
      case 'password':
        this.autocomplete = "new-password"; //only works with chrome
      break;
    }
  }

  @Input() set pattern(value: RegExp) {
    this.inputPattern = value;
  }

  @Input() set patternString(value:string) {
    this.pattern = new RegExp(value,"g");
  }

  @Input() set disabled(value: boolean) {
    this.isDisabled = value;
  }
  
  get formattedValue():any {
    let fValue: any;
    switch(this.inputType) {
      case "number":
        let number = parseFloat(this.value);
        if(!isNaN(this.min) && number < this.min) this.setValue(this.min.toString());
        if(!isNaN(this.max) != null && number > this.max) this.setValue(this.max.toString());
        fValue = parseFloat(this.value);
      break;
      case "tel":
        fValue = this.value;
      break;
      default:
        fValue = this.value;
      break;
    }
    return fValue;
  }

  get isValid():boolean {
    let valid: boolean = true;
    if(this.value == null || this.formattedValue == null) return true;
    switch(this.rawType) {
      case "number":
      case "numeric":
        if(this.min != undefined && this.max != undefined) {
          valid = parseFloat(this.value) >= this.min && parseFloat(this.value) <= this.max;
        }else if(this.min != undefined && this.max == undefined) {
          valid = parseFloat(this.value) >= this.min;
        }else if(this.min == undefined && this.max != undefined) {
          valid = parseFloat(this.value) <= this.max;
        }
      break;
      case "tel":
        valid = this.formattedValue.length == 12 && this.formattedValue.substr(0, 2) == "90";
      break;
    }
    return valid;
  }

  formControl: FormControl = new FormControl({value: this.value, disabled: this.isDisabled}, this.patternValidator());
  inputType: string = 'text';
  rawType: string;
  inputPattern: RegExp;
  keydownPattern: RegExp;
  typeSubscription: Subscription;
  pristineValue: string;
  isTriggeredBefore: boolean = false;
  stateUserTyping: boolean = false;
  

  @Output() changeEvent:EventEmitter<any> = new EventEmitter();
  @Output() typeEvent:EventEmitter<any> = new EventEmitter();
  @Output() dismissEvent:EventEmitter<any> = new EventEmitter();
  @Output() focusEvent: EventEmitter<any> = new EventEmitter();
  @Output() blurEvent: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    if(this.form && this.name) {
      this.form.addControl(this.name, this.formControl);
      this.changeDetector.detectChanges();
      this.formControl.statusChanges.subscribe( status => {
        this.isDisabled = status == "DISABLED";
      });
    }

    this.formControl.valueChanges.pipe( 
      map(value => {
        if(!this.stateUserTyping && value) this.stateUserTyping = true;
        return this.formatValue(value);
      })
    ).pipe(
      debounceTime(this.typeDebounceTime)
    ).pipe(
      distinctUntilChanged()
    ).subscribe( value => {
      this.stateUserTyping = false;
      this.setValue(value);
      if(!this.changeDetector["destroyed"]){
        this.changeDetector.detectChanges();
        this.typeEvent.emit(this.formattedValue);
      }
    });
  }

  ngAfterViewInit() {
    if(this.value && this.emitWhenInit) this.emitChangeEvent();
  }

  ngOnChanges(changes:any) {
    if(changes.isDisabled && this.formControl) {
      changes.isDisabled.currentValue ? this.formControl.disable() : this.formControl.enable();
      if(this.autoFocusWhenEnabled && !this.formControl.disabled) this.focus();
    }
    if(changes.value) this.setValue(changes.value.currentValue);
  }

  focus(event?:any) {
    let self = this;
    setTimeout(function() {
      self.input.nativeElement.focus();
    }, 10);
  }

  onFocusHandler(event:any) {
    this.isFocused = true;
    this.pristineValue = this.value;
    this.focusEvent.emit({action: "on", name: this.name});
  }

  onBlurHandler(event:any){
    this.isFocused = false;
    if(this.isTriggeredBefore) return;
    this.dismissOnFocusOut ? this.dismissChanges() :  this.emitChangeEvent();
    this.focusEvent.emit({action: "out", name: this.name});
  }

  save(event?:any) {
    this.emitChangeEvent();
    this.isTriggeredBefore = true;
    this.input.nativeElement.blur();
    this.isTriggeredBefore = false;
  }

  dismissChanges(event?:any) {
    if(event && !this.dismissOnEscape) return;
    this.setValue(this.pristineValue);
    this.isTriggeredBefore = true;
    this.input.nativeElement.blur();
    this.isTriggeredBefore = false;
    this.dismissEvent.emit(this.value);
  }

  setValue(value: string, forceUpdate?:boolean) {
    this.value = this.formatValue(value, forceUpdate);
    this.formControl.setValue(this.value);
    this.changeDetector.detectChanges();
  }

  formatValue(value:any, atLast?: boolean): string{
    if(value === null) return "";
    let cleanValue:string = value;
    switch(this.rawType) {
      case "tel":
        if(atLast){
          if(cleanValue.substr(0, 2) == "05" && cleanValue.length == 11) cleanValue = "9"+cleanValue;
          if(cleanValue.substr(0, 2) != "90" && cleanValue.length == 10) cleanValue = "90"+cleanValue;
        }
      break;
    }
    return cleanValue;
  }

  emitChangeEvent() {
    if(this.value !== null) this.setValue(this.value, true);
    this.changeDetector.detectChanges();
    this.changeEvent.emit(this.formattedValue);
  }

  patternValidator(): ValidatorFn {
    return (): {[key: string]: any} => {
      if(!this.inputPattern) return null;
      if(!this.value || !this.inputType) return null;
      const name = this.value;
      const test = this.inputPattern.test(name);
      return !test ? {'patternValidator': {name}} : null;
    };
  }
}
