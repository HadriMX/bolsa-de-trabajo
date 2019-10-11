import { Component, OnInit, Input, HostListener  } from '@angular/core';
import Swal from 'sweetalert2';
import { Vacante } from 'src/api/models/vacantes';
import { VacantesService } from '../vacantes.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 
  cursor: boolean = false;

  vacantes: Vacante[];


  constructor(private vacantesService : VacantesService) {
   
  }

  ngOnInit() {
    this.vacantesService.getVacantes()
      .subscribe((response) => {
        if (response.success)
        {
          this.vacantes = response.data;
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }

      });
  }

  buscar() {
    Swal.fire("Busqueda con exito!", "Se encontraron resultados de su busqueda!", "success");
  }
 arriba() {
    $('#body, html').animate({
      scrollTop:'0px'
    }, 300);
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