import { AppControllerService } from './services/app-controller.service';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'KIOSK APP';
  notificationText;

  constructor(
    private appControllerService: AppControllerService,
    private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit() {
    this.appControllerService.init();
    this.authenticationService.backstageAuthentication.login();
    this.authenticationService.crmAuthentication.login(null, null);
    this.authenticationService.backstageAuthentication.authenticatedUser$.subscribe( user => {
      console.log(user);
    });
    
    // this.notfication.notification$.subscribe(result => {
    //   console.log("Notification Result on",result);
    //   this.notificationText = result;
    // });
  }


}
