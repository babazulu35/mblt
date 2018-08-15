import { ConfirmationBoxComponent } from './../../components/confirmation-box/confirmation-box.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppControllerService } from './../../../../services/app-controller.service';
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('main') main: ElementRef;
  @ViewChild('header') header: ElementRef;
  @ViewChild('container') container: ElementRef;
  @ViewChild('containerContent') containerConent: ElementRef;
  @ViewChild('overlay') overlay: ElementRef;
  @ViewChild('footer') footer: ElementRef;

  isLoading: boolean;
  isAuthenticated: boolean;

  currentConfirmationBox: MatDialogRef<ConfirmationBoxComponent>;

  constructor(
    private appControllerService: AppControllerService,
    private authenticationService: AuthenticationService,
    private changeDetector: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.appControllerService.loadingService.activeLoadings$.subscribe( status => {
      this.isLoading = this.appControllerService.loadingService.getLoadingStatus(AppControllerService.LOADING_MAIN, AppControllerService.LOADING_API_REQUEST)
      this.changeDetector.detectChanges();
    });
    
    this.authenticationService.backstageAuthentication.authenticatedUser$.subscribe( user => {
      this.isAuthenticated = this.authenticationService.hasAuthenticationForUser(AuthenticationService.AUTH_USER_BACKSTAGE);
    });

    this.appControllerService.confirmationService.confirmations$.subscribe( confirmations => {
      if(confirmations && confirmations.length) {
        this.currentConfirmationBox = this.dialog.open(ConfirmationBoxComponent, {
          hasBackdrop: false,
          panelClass: ['cdk-overlay-pane--modal']
        });
        this.currentConfirmationBox.componentInstance.confirmation = confirmations[confirmations.length-1];
      }else{

      }
    });
  }
}