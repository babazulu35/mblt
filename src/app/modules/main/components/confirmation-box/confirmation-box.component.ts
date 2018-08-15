import { AppControllerService } from './../../../../services/app-controller.service';
import { Confirmation } from './../../../../services/confirmation.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss']
})
export class ConfirmationBoxComponent implements OnInit {
  @HostBinding('class.c-confirmation-box') readonly cClass:boolean = true;

  confirmation: Confirmation;

  constructor(
    private appControllerService: AppControllerService,
    private dialogRef: MatDialogRef<ConfirmationBoxComponent>
  ) { }

  ngOnInit() {
    if(this.confirmation){
      this.confirmation.id = this.dialogRef.id;
      if(!this.confirmation.confirmButton) this.confirmation.confirmButton = {label: this.appControllerService.i18nService.get('CONFIRMATION_BOX.LABEL.ACCEPT')};
    }
  }

  accept() {
    this.confirmation.resolve(true);
    this.dialogRef.close(true);
  }

  reject() {
    this.confirmation.reject(false);
    this.dialogRef.close(false);
  }

}
