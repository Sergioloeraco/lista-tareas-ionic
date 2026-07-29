import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateService, type TranslationObject } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [NgIf, IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  ready = false;

  constructor(
    private http: HttpClient,
    private translateService: TranslateService
  ) {
    this.translateService.addLangs(['es', 'en']);
  }

  async ngOnInit() {
    const [esTranslations, enTranslations] = await Promise.all([
      firstValueFrom(this.http.get<TranslationObject>('assets/i18n/es.json')),
      firstValueFrom(this.http.get<TranslationObject>('assets/i18n/en.json')),
    ]);

    this.translateService.setTranslation('es', esTranslations, true);
    this.translateService.setTranslation('en', enTranslations, true);

    const savedLang = localStorage.getItem('app_lang');
    const browserLang = this.translateService.getBrowserLang();
    const activeLang = savedLang ?? (browserLang === 'en' ? 'en' : 'es');

    this.translateService.setFallbackLang('es');
    await firstValueFrom(this.translateService.use(activeLang));
    this.ready = true;
  }
}
