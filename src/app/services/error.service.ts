import { AppControllerService } from './app-controller.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';
import { ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {
  
  constructor(
    private notfication:NotificationService,
    private appControllerService: AppControllerService
  ) { }

  handleError(error:Error | HttpErrorResponse) {
    if(error instanceof HttpErrorResponse) {
      let title: string = this.appControllerService.i18nService.get('ERROR.TITLE');
      title += ` (${error.error ? error.error.ErrorCode : error.statusText})`;
      let message: string = error.error ? error.error.Message : error.message;
      this.appControllerService.confirmationService.confirm({
        title: title,
        description: message,
        confirmButton: {label: this.appControllerService.i18nService.get('ERROR.LABEL.OK')}
      })
      this.appControllerService.loadingService.hideLoading(AppControllerService.LOADING_API_REQUEST);
    }
    
    // if(error instanceof HttpErrorResponse) {
    //   console.log("The Navigator",navigator);
    //   // Server or connection error happend
    //   this.notfication.notify('Server Connection Error',3000);
      
    //   if(!navigator.onLine) {
    //     // Handle Offline Errors no Internet Connection
    //     this.notfication.notify('No Internet Connection',3000);
    //   }
    //   else {
    //     this.notfication.notify(error.message,3000);
    //     // Hadnle Http Error (error.status === 403,404)
    //   }
    // }
    // else {
    //   this.notfication.notify(error.message,3000);
    //   // Handle Client Error (Angular Error, Referance Error..)
    // }

    // // Log error anyway
    // console.error('It Happens',error);
  }
}
