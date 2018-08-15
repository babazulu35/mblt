import { ConfirmationService } from './confirmation.service';
import { LoadingService } from './loading.service';
import { I18nService } from './i18n.service';
import { Injectable } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { NotificationService } from './notification.service';
import { EcrDeviceService } from './ecr-device.service';


@Injectable({
  providedIn: 'root'
})

export class AppControllerService {
  static readonly LOADING_MAIN: string = LoadingService.LOADING_MAIN;
  static readonly LOADING_API_REQUEST: string = LoadingService.LOADING_API_REQUEST;

  constructor(
    public i18nService: I18nService,
    public configService: ConfigService,
    public loadingService: LoadingService,
    public notificationService: NotificationService,
    public confirmationService: ConfirmationService,
    public ecrDeviceService: EcrDeviceService
  ) { 

  }

  init() {
    this.i18nService.init();
  }
}
