import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ticket-print-options',
  templateUrl: './ticket-print-options.component.html',
  styleUrls: ['./ticket-print-options.component.scss']
})
export class TicketPrintOptionsComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
  }

  gotoTicketWallet() {
    this.router.navigate(['/ticket', 'wallet']);
  }

  gotoTicketPrintQr() {
    this.router.navigate(['/ticket', 'print', 'qr']);
  }

  close(){
    this.router.navigate(['/']);
    // if(window.history.length > 1){
    //   this.location.back();
    // }else{
    //   this.router.navigate(['/']);
    // }
  }

}
