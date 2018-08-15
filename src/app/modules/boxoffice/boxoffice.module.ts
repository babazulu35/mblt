import { QuantityCounterComponent } from './components/quantity-counter/quantity-counter.component';
import { NgModule } from '@angular/core';
import { BoxofficeBasketComponent } from './routes/boxoffice-basket/boxoffice-basket.component';
import { BoxofficeSelectSeatsComponent } from './routes/boxoffice-select-seats/boxoffice-select-seats.component';
import { BoxofficePurchaseComponent } from './routes/boxoffice-purchase/boxoffice-purchase.component';
import { BoxofficeComponent } from './routes/boxoffice/boxoffice.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BoxofficeProductItemComponent } from './components/boxoffice-product-item/boxoffice-product-item.component';
import { BoxofficeFooterComponent } from './components/boxoffice-footer/boxoffice-footer.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { CollectDataComponent } from './components/collect-data/collect-data.component';

const routes: Routes = [
  { path: '',  component: BoxofficeComponent, children: [
    { path: 'basket/:id', component: BoxofficeBasketComponent },
    { path: 'select-seats', component: BoxofficeSelectSeatsComponent },
    { path: 'purchase', component: BoxofficePurchaseComponent},
    { path: '', redirectTo: 'basket', pathMatch: 'full'}
  ] }
];

@NgModule({
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ],
  declarations: [
    BoxofficeBasketComponent,
    BoxofficeSelectSeatsComponent,
    BoxofficePurchaseComponent,
    BoxofficeComponent,

    QuantityCounterComponent,

    BoxofficeProductItemComponent,

    BoxofficeFooterComponent,

    InfoBoxComponent,

    CollectDataComponent
  ],
  exports: [
    QuantityCounterComponent
  ],
  entryComponents:[InfoBoxComponent,CollectDataComponent]
})
export class BoxofficeModule { }
