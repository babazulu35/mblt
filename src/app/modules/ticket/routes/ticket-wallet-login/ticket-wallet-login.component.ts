import { AuthenticationService } from './../../../../services/authentication.service';
import { AppControllerService } from './../../../../services/app-controller.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'app-ticket-wallet-login',
  templateUrl: './ticket-wallet-login.component.html',
  styleUrls: ['./ticket-wallet-login.component.scss'],
  providers: [WalletService]
})
export class TicketWalletLoginComponent implements OnInit {

  @HostBinding('class.r-ticket-wallet-login') readonly cClass: boolean = true;
  
  loginForm: FormGroup = new FormGroup({});

  constructor(
    private appControllerService: AppControllerService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.data.subscribe( data => {
      switch(data.status){
        case "logout":
          this.router.navigate(['/ticket', 'wallet', 'login']);
        break;
      }
    });
  }

  ngOnInit() {
    this.authenticationService.crmAuthentication.logout();
    this.authenticationService.crmAuthentication.authenticatedUser$.subscribe( crmUser => {
      if(crmUser) {
        this.router.navigate(['/ticket', 'wallet']);
      }
    })
  }

  submit(){
    if(this.loginForm.valid) {
      let formData: {
        UserName: string,
        Password: string
      } = this.loginForm.value;
      this.authenticationService.crmAuthentication.login(formData.UserName, formData.Password);
    }
  }

  close() {
    this.router.navigate(['/']);
  }
}
