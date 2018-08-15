import { MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '../../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    FormsModule, ReactiveFormsModule
  ],
  exports: [
    MatDialogModule
  ]
})
export class MaterialModule { }
