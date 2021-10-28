import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public languages: string[] = ['en', 'es'];
  current
  constructor(
    public translate: TranslateService
  ) {
    let browserLang;
    this.translate.addLangs(this.languages);
    browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
    //translate.use('en')
    this.current = translate.currentLang
   }

   public setLanguage(lang) {
    this.translate.use(lang);
   }
}
