import { Component, OnInit,HostListener } from '@angular/core';
import * as $ from 'jquery';
import { Vacante } from 'src/app/models/vacantes';
import { VacantesService } from 'src/app/services/vacantes.service';
import { IAppPage } from 'src/app/interfaces/app-page';

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.css']
})
export class VacantesComponent implements OnInit, IAppPage {
  
  showFooter = true;
  goTopEnabled = true;
  goTop?: Function;

  vacantes: Vacante[] = [];
  isLoading = true;

  constructor(private vacantesService: VacantesService) { }

  ngOnInit() {
    this.vacantesService.getMisVacantes().subscribe(response => {
      if (response.success) {
        this.vacantes = response.data;
      }

      this.isLoading = false;
    });
   // $("#editarinfoempresa").modal("show");
  }

  arriba() {
    $('#body, html').animate({
      scrollTop:'0px'
    }, 500);
  }

@HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {

    if ($(window).scrollTop() > 200) {
      $('.ir-arriba').slideDown(300);
    } else {
      $('.ir-arriba').slideUp(300);
    }
  }  
}
