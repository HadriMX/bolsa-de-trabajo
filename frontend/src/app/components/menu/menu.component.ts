import { Component, OnInit, Input, HostListener } from '@angular/core';
import Swal from 'sweetalert2';
import { Vacante } from 'src/app/models/vacantes';
import { VacantesService } from '../../services/vacantes.service';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, ControlContainer } from '@angular/forms';
import { Area } from 'src/app/models/admin';
import { Busqueda } from 'src/app/models/busqueda';
import * as $ from 'jquery';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { Usuario } from 'src/app/models/usuario';
import { PaginacionService } from 'src/app/services/paginacion.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //paginacion

  // array of all items to be paged
  allItems: Vacante[] = [];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];


  cursor: boolean = false;
  ubicacionCorrecta: boolean = false;
  estados: string[] = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Ciudad de México",
    "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México", "Michoacán", "Morelos",
    "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora",
    "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"];

  //getters
  vacantes: Vacante[] = [];
  areas: Area[] = [];
  infoVacante: Vacante = new Vacante();

  @Input() busqueda: Busqueda = {
    SelectedSalario: "0",
    SelectedFecha: "0",
    SelectedArea: "0",
    InputTitulo: "",
    InputUbicacion: "",
  }

  constructor(private vacantesService: VacantesService, private AdminService: AdminService, private currentUserService: CurrentUserService, private PaginacionService: PaginacionService) { }

  ngOnInit() {
    this.getVacantes();
    this.getAreas();
  }

  ComprobarUbicacion() {
    for (let i of this.estados) {
      if (i == this.busqueda.InputUbicacion) {
        this.ubicacionCorrecta = true;
        return 0;
      } else {
        this.ubicacionCorrecta = false;
      }
    }
  }

  getVacantes() {
    this.vacantesService.getVacantes(this.busqueda)
      .subscribe((response) => {
        if (response.success) {
          this.vacantes = response.data;
          this.allItems = response.data;
          this.setPage(1);
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.PaginacionService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  getAreas() {
    this.AdminService.get_areas()
      .subscribe((response) => {
        if (response.success) {
          this.areas = response.data;
          console.log(this.areas);
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

  buscar() {
    // Swal.fire("Busqueda con exito!", "Se encontraron resultados de su busqueda!", "success");

    this.ComprobarUbicacion();
    if (this.busqueda.InputUbicacion == "") {
      this.getVacantes();
    } else if (this.ubicacionCorrecta) {
      this.getVacantes();
    } else {
      this.busqueda.InputUbicacion = "";
      Swal.fire("AJALEEEEEE", "AJALEEEEx2 Elige una ubicacion de la lista", "error");
    }

  }

  mostrarDetalleVacante(item) {
    this.infoVacante = item;
  }

  limpiarFiltros() {
    this.busqueda.SelectedSalario = "0";
    this.busqueda.SelectedFecha = "0";
    this.busqueda.SelectedArea = "0";
  }

  arriba() {
    $('#body, html').animate({
      scrollTop: '0px'
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