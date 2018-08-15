import { enableProdMode ,TRANSLATIONS, TRANSLATIONS_FORMAT,MissingTranslationStrategy } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

declare const require;
const translation = require(`raw-loader!./locale/messages.tr.xlf`);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
