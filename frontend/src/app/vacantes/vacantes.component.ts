import { Component, OnInit,HostListener } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.css']
})
export class VacantesComponent implements OnInit {
  varios = [1,2,3,4,5,6,7];

  constructor() { }

  ngOnInit() {
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
