import { MatDialog, MatDialogRef } from '@angular/material';
import { AppControllerService } from './../../../../services/app-controller.service';
import { StateEvent } from './../../interface/state-event';
import { BoxofficeService } from './../../services/boxoffice.service';
import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { SetProductCount } from '../../interface/set-product-count';
import { CollectDataComponent } from '../collect-data/collect-data.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boxoffice-product-item',
  templateUrl: './boxoffice-product-item.component.html',
  styleUrls: ['./boxoffice-product-item.component.scss'],
})
export class BoxofficeProductItemComponent implements OnInit {

  productItemList:StateEvent;
  countData:SetProductCount[];
  countValue = [];
  maxAllowedProductCount:number;

  isDisabled = [];
  collect:MatDialogRef<CollectDataComponent>

  constructor(
    private boxofficeService:BoxofficeService,
    private appControllerService:AppControllerService,
    private dialog:MatDialog,
    private router:Router
  ) { }

  ngOnInit() {
    this.boxofficeService.currentStateSubject.subscribe(stateResult => {
      if(stateResult) {
        this.boxofficeService.stateNavigator(stateResult.CurrentState).then(result => {
          if(result.Current === 1) {
            this.productItemList = stateResult.State.Event;
            stateResult.State.Event.PaymentSubTotal != null ? this.boxofficeService.subTotalService(stateResult.State.Event.PaymentSubTotal.Amount) : null;
            let stateMapToEvent = stateResult.State.Event;
            this.boxofficeService.eventInfo({Name:stateMapToEvent.Name,Venue:stateMapToEvent.Venue,DateTime:stateMapToEvent.DateTime,EventInfo:stateMapToEvent.EventInfo});
            for(let performances of stateResult.State.Event.Performances) {
              for(let product of performances.Products)
              {
                for(let variant of product.Variants) {
                  this.countValue[variant.Id] = variant.CountOfProductsSelected;
                  this.isDisabled[variant.Id] = variant.IsAvailable;
                }
              }
            }
          }
          else {
            switch(result.Action) {
              case 'redirect':
                this.router.navigate(['boxoffice/',result.Route]);
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
    })

  }
  changeEventHandler(event,args) {
    this.countData = [];
    this.countData.push({VariantId:args,Count:event.count});
    this.boxofficeService.setProductToCount(this.countData).then(result => {
      if(result) {
        this.productItemList = result.State.Event;
        this.boxofficeService.subTotalService(result.State.Event.PaymentSubTotal.Amount);
        for(let performances of result.State.Event.Performances) {
          for(let product of performances.Products)
          {
            for(let variant of product.Variants) {
              this.isDisabled[variant.Id] = variant.IsAvailable;
              this.countValue[variant.Id] = variant.CountOfProductsSelected
            }
          }
        }
      }
    }).catch(error => {
      this.appControllerService.confirmationService.confirm({
        theme: "error",
        title: this.appControllerService.i18nService.get('BOXOFFICE_MAX_ALLOWED_ERROR.TITLE'),
        description: this.appControllerService.i18nService.get('BOXOFFICE_MAX_ALLOWED_ERROR.MESSAGE'),
        confirmButton: {label: this.appControllerService.i18nService.get('BOXOFFICE_MAX_ALLOWED_ERROR.OK')}
      }).then(result => {
        if(result) {
          console.log("Result",result);
        }
      })
    })
  }

}
