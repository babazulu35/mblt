import { NgModule } from '@angular/core';
import { BaseModule } from '../base/base.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    BaseModule, TranslateModule
  ],
  declarations: [],
  exports: [
    BaseModule,
    TranslateModule
  ]
})
export class SharedModule { }
