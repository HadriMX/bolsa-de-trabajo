import { Component, HostListener } from '@angular/core';
import { IAppPage } from './interfaces/app-page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bolsa de trabajo';
  showFooter = true;
  goTopEnabled = true;
  showGoTopArrow = false;
  topPosToStartShowing = 300;
  
  onActivate(component: IAppPage) {
    this.showFooter = component.showFooter;
    this.goTopEnabled = component.goTopEnabled;
    component.goTop = this.goTop;
  }

  // Scrollup funciones
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showGoTopArrow = scrollPosition >= this.topPosToStartShowing;
  }

  goTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
