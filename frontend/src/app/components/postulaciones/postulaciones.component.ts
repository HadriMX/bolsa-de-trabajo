import { Component, OnInit, HostListener } from '@angular/core';
import * as $ from 'jquery';
import { VacantesService } from 'src/app/services/vacantes.service';
import { Postulacion } from 'src/app/models/postulacion';
import { PostulacionService } from 'src/app/services/postulacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {

  postulacionesPendientes: Postulacion[] = [];
  postulacionesAceptadas: Postulacion[] = [];
  postulacionesRechazadas: Postulacion[] = [];

  varios = [1,2,3,4,5];
  constructor(private postulacionesService: PostulacionService) { }

  ngOnInit() {
    this.getPostulacionesPendientes();
    this.getPostulacionesRechazadas();
    this.getPostulacionesAceptadas();
  }

  getPostulacionesPendientes(){
    this.postulacionesService.getPostulaciones('P')
      .subscribe((response) => {
        if (response.success) {
          this.postulacionesPendientes = response.data;
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

  getPostulacionesRechazadas(){
    this.postulacionesService.getPostulaciones('R')
    .subscribe((response) => {
      if (response.success) {
        this.postulacionesRechazadas = response.data;
      }
      else {
        Swal.fire("Error", response.message, 'error');
      }
    });
  }

  getPostulacionesAceptadas(){
    this.postulacionesService.getPostulaciones('A')
    .subscribe((response) => {
      if (response.success) {
        this.postulacionesAceptadas = response.data;
      }
      else {
        Swal.fire("Error", response.message, 'error');
      }
    });
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
