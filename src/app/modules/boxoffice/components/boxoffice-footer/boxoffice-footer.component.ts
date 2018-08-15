import { CollectDataComponent } from './../collect-data/collect-data.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BoxofficeService } from './../../services/boxoffice.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boxoffice-footer',
  templateUrl: './boxoffice-footer.component.html',
  styleUrls: ['./boxoffice-footer.component.scss']
})
export class BoxofficeFooterComponent implements OnInit {
  content:boolean = true;
  @Input() subTotal:any;
  collect: MatDialogRef<CollectDataComponent>;
  constructor(
    private boxofficeService:BoxofficeService,
    private router:Router,
    private dialog:MatDialog
  ) { }

  ngOnInit() {
    this.boxofficeService.subtotalSubject$.subscribe(subtotal => {
      if(subtotal != null)
      {
        this.subTotal = subtotal;
      }
      else {
        this.subTotal = 0
      }
      
    })


  }

  destroyShoppingCart() {
    this.boxofficeService.destroyStateSession().then(result => {
      if(result) {
        this.router.navigate(['/']);
      }
    });
  }

  goToBasket() {
    this.boxofficeService.getCurrentState().then(currentState => {
      switch(currentState.CurrentState) {
        case 1:
         this.boxofficeService.goToBasket();
        break;
        case 2:
        
        this.boxofficeService.selectedSeatSubject$.subscribe(seats => {
          console.log("Subscribers",seats);
          if(seats) {
            // Select Seat ts den üstde ki subscribera bilgi geçmeniz gerekli 
            // 
            this.boxofficeService.selectSeat(seats);
          }
        })
        break;
      }
    })
  }
}
