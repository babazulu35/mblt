import { Locale } from './../../../../services/i18n.service';
import { AppControllerService } from './../../../../services/app-controller.service';
import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @HostBinding('class.c-header') readonly cClass: boolean = true;
  
  currentLocale: Locale;
  otherLocaleLabel: string;

  constructor(
    public appControllerService: AppControllerService
  ) { }

  ngOnInit() {
    this.appControllerService.i18nService.currentLocale$.subscribe( currentLocale => {
      this.currentLocale = currentLocale;
      this.otherLocaleLabel = this.currentLocale.code == "en" ? "TR" : "EN";
    } );
  }

  toggleLang(event:any) {
    if(this.currentLocale.code == "en") {
      this.appControllerService.i18nService.setLocaleByCode('tr');
    }else{
      this.appControllerService.i18nService.setLocaleByCode('en');
    }
  }

}
