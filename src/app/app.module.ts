import localeTr from '@angular/common/locales/tr';
import { NotificationService } from 'src/app/services/notification.service';
import { HeaderComponent } from './modules/main/components/header/header.component';
import { I18nService } from './services/i18n.service';
import { AppControllerService } from './services/app-controller.service';
import { MainModule } from './modules/main/main.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfigModule, ConfigLoader, ConfigStaticLoader } from '@ngx-config/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LOCALE_ID,NgModule } from '@angular/core';
import { HttpClientModule,HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LocationStrategy, registerLocaleData } from '@angular/common';
import { HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { config } from './config.local';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from './modules/material/material.module';
import { LoadingService } from './services/loading.service';
import { WebStorageModule } from 'ngx-store';
import { ConfirmationService } from './services/confirmation.service';

registerLocaleData(localeTr);

export function configFactory(): ConfigLoader {
  return new ConfigStaticLoader(config);
}

export function HttpLoaderFactory(http: HttpClient) {
  // return new TranslateHttpLoader(http);
  return new TranslateHttpLoader(http, './assets/i18n/', '.js');
}

const routes: Routes = [
  {
    path: "", component: AppComponent
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MainModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    ConfigModule.forRoot({
      provide: ConfigLoader,
      useFactory: (configFactory)
    }),
    WebStorageModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AppControllerService, I18nService, LoadingService, NotificationService, ConfirmationService,
    {
       provide:LOCALE_ID, useValue: 'tr'
    },
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: ResponseInterceptorService,
    //     multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
