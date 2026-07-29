import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, RouterLink, TranslatePipe]
})
export class InicioPage implements OnInit {

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
  }

  cambiarIdioma(idioma: 'es' | 'en') {
    this.translateService.use(idioma);
    localStorage.setItem('app_lang', idioma);
  }

}
