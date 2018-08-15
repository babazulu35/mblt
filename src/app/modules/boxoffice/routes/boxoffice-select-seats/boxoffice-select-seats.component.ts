import { MatDialog, MatDialogRef } from '@angular/material';
import { BoxofficeService } from './../../services/boxoffice.service';
import { Component, OnInit } from '@angular/core';
import { CollectDataComponent } from '../../components/collect-data/collect-data.component';
import { Router } from '@angular/router';

export interface SelectSeatRow {
  RowId:any,
  SeatId:any,
}

export interface SelectSeatBlock {
  BlockId:any
}

@Component({
  selector: 'app-boxoffice-select-seats',
  templateUrl: './boxoffice-select-seats.component.html',
  styleUrls: ['./boxoffice-select-seats.component.scss']
})
export class BoxofficeSelectSeatsComponent implements OnInit {
  collect:MatDialogRef<CollectDataComponent>;
  currentEventId:number;
  productSelectionType;
  constructor(
    private boxofficeService:BoxofficeService,
    private dialog:MatDialog,
    private router:Router
  ) { }

  ngOnInit() {
     
    this.boxofficeService.currentStateSubject.subscribe(stateResult => {
      if(stateResult) {
        this.boxofficeService.stateNavigator(stateResult.CurrentState).then(result => {
          if(result.Current === 2) {
            this.currentEventId = stateResult.State.CurrentEventId;
            this.productSelectionType = stateResult.State.ProductSelectionType;
            console.log("Product Selection Type",this.productSelectionType);
          }
          else {
            switch(result.Action) {
              case 'redirect':
                if(result.Current == 1)
                {
                  this.router.navigate(['boxoffice/',result.Route,this.currentEventId]);
                }
                else
                {
                 this.router.navigate(['boxoffice/',result.Route]);
                }
              break;
              case 'collect-data':
              this.collect = this.dialog.open(CollectDataComponent,{
                hasBackdrop: false,
                panelClass: ['cdk-overlay-pane--modal']
              });
              this.collect.componentInstance.collectData = stateResult.State;
              this.collect.afterClosed().subscribe(afterClose => {
                if(afterClose) {
                     switch(afterClose.action) {
                        case 'goBack':
                          this.boxofficeService.goBackState();
                        break;
                     }
                }
              })
              break;
            }            
          }
        })
      }
    });



  }

  goBack() {
    this.boxofficeService.goBackState();
  }
  
  // Koltuk Seçimi alanı JSB EVentten dönen
  selectEventHandler(seatsData:any) {
    // State den gelen PRODUCT SELECTION TYPE 2 ise 
    // SelectSeatRow Modelini kullan
    // son olarak modeli aşağıdaki subcriber a pushla
    console.log("Product Selection Type",this.productSelectionType);
    let seats:SelectSeatRow[] = [];
    seats.push({RowId:1,SeatId:2});
    this.boxofficeService.selectedSeatSubject$.next(seats);
  }

}
