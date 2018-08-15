import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { SharedModule } from 'src/app/shared/shared.module';

const appRoute:Routes = [ 
  {
    path:'index',component:AppComponent,children:[{
      path:'',redirectTo:'index',pathMatch:'full'
    }]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoute),
    SharedModule
  ],
  declarations: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }
