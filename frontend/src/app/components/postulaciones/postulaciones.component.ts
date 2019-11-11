import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {
  varios = [1,2,3,4,5];
  constructor() { }

  ngOnInit() {
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
