import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollContainerComponent } from './components/scroll-container/scroll-container.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { CamelCasePipe } from './pipes/camel-case.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { SafeStylePipe } from './pipes/safe-style.pipe';
import { ButtonComponent } from './components/button/button.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImagePipe } from './pipes/image.pipe';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MaterialModule
  ],
  declarations: [
    ScrollContainerComponent,
    SanitizeHtmlPipe,
    CamelCasePipe,
    SafeUrlPipe,
    SafeStylePipe,
    ImagePipe,

    ButtonComponent,
    TextInputComponent,
    DialogBoxComponent
  ],
  exports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MaterialModule,

    ScrollContainerComponent,
    SanitizeHtmlPipe,
    CamelCasePipe,
    SafeUrlPipe,
    SafeStylePipe,
    ImagePipe,

    ButtonComponent,
    TextInputComponent,
    DialogBoxComponent
  ]
})
export class BaseModule { }
