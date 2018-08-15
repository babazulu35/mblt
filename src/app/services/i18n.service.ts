import { Injectable } from '@angular/core';
import { ConfigService } from '@ngx-config/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Locale {
  code: string;
  name: string;
  culture: string;
}

@Injectable({
  providedIn: 'root'
})

export class I18nService {

  defaultLocale: Locale;
  availabelLocales: Locale[];
  currentLocale: Locale;
  currentLocale$: BehaviorSubject<Locale> = new BehaviorSubject(this.defaultLocale);

  constructor(
    public configService: ConfigService,
    public translateService: TranslateService
  ) { 
    
  }

  init() {
    this.defaultLocale = this.configService.getSettings('i18n.defaultLanguage');
    this.availabelLocales = this.configService.getSettings('i18n.availableLanguages');
    this.translateService.onLangChange.subscribe(event => {
      let locale:Locale = this.availabelLocales.find( locale => locale.code == event.lang);
      this.setLocale(locale);
    });
    
    let langs: string[] = [];
    this.availabelLocales.forEach( locale => langs.push(locale.code));
    this.translateService.addLangs(langs);
    this.translateService.setDefaultLang(this.defaultLocale.code);
    let browserLang: string = this.translateService.getBrowserLang();
    this.setLocaleByCode(browserLang);
  }

  private setLocale(locale: Locale) {
    this.currentLocale = locale || this.defaultLocale;
    this.currentLocale$.next(this.currentLocale);
  }

  setLocaleByCode(code: string) {
    this.translateService.use(code);
  }

  getAsync(key: string | string[], interpolateParams?:Object):Observable<any> {
    return this.translateService.get(key);
  }

  getStream(key: string|Array<string>, interpolateParams?: Object): Observable<string|Object> {
    return this.translateService.stream(key, interpolateParams);
  }

  get(key: string | string[], interpolateParams?:Object) {
    return this.translateService.instant(key, interpolateParams);
  }
}
