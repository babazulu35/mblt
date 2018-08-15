import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppControllerService } from './../../../services/app-controller.service';
import { ConfirmationService, Confirmation } from './../../../services/confirmation.service';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthenticationLostGuardService implements CanDeactivate<any> {

    constructor(
      private appControllerService: AppControllerService,
      private confirmationService: ConfirmationService,
      private authenticationService: AuthenticationService
    ) {
    }

    canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) {
      if(!this.authenticationService.crmAuthentication.authenticatedUser) return true;
      if(nextState.url.split('/')[1] == "ticket") return true;
      let confirmation: Promise<boolean> = this.confirmationService.confirm(<Confirmation>{
        theme: "warning",
        title: this.appControllerService.i18nService.get('UNSAVED_CHANGES_GUARD.TITLE'),
        description: this.appControllerService.i18nService.get('UNSAVED_CHANGES_GUARD.DESCRIPTION'),
        confirmButton: {label: this.appControllerService.i18nService.get('UNSAVED_CHANGES_GUARD.CONFIRM_BUTTON.LABEL')},
        dismissButton: {label: this.appControllerService.i18nService.get('UNSAVED_CHANGES_GUARD.DISMISS_BUTTON.LABEL')}
      });
      confirmation.then( result => this.authenticationService.crmAuthentication.logout());
      return confirmation;
  }
}
