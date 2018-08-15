import { CrmUser } from './../../../services/crm-authentication.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppControllerService } from './../../../services/app-controller.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  private authenticatedUser: CrmUser;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { 
    this.authenticationService.crmAuthentication.authenticatedUser$.subscribe( authenticatedUser => {
      this.authenticatedUser = authenticatedUser;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url, route.data);
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
  checkLogin(url: string, routeData: {}): boolean {
    if (this.authenticatedUser) {
    	return true;
    }else{
    	url = '/ticket/wallet/login';
    }
    this.router.navigate([url]);
    return false;

  }
}
