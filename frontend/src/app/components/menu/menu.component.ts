import { Component, OnInit, Input, HostListener } from '@angular/core';
import Swal from 'sweetalert2';
import { Vacante} from 'src/app/models/vacantes';
import { VacantesService } from '../../services/vacantes.service';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, ControlContainer } from '@angular/forms';
import { Area } from 'src/app/models/admin';
import { Busqueda } from 'src/app/models/busqueda';
import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  cursor: boolean = false;

  //getters
  vacantes: Vacante[];
  infovacante: Vacante;
  dato: number = 0;
  areas: Area[];
  
  //ngModels de la busqueda
  // SelectedSalario: string = "0";
  // SelectedFecha: string = "0";
  // SelectedArea: string = "0";
  // InputTitulo: string = "";
  // InputUbicacion: string = "";

  @Input() busqueda: Busqueda = {
    SelectedSalario: "0",
    SelectedFecha: "0",
    SelectedArea: "0",
    InputTitulo: "",
    InputUbicacion: ""
  }
  

  constructor(private vacantesService : VacantesService, private AdminService : AdminService) {}

  ngOnInit() {
   this.getVacantes();
   this.getAreas();
  }

  getVacantes(){
    this.vacantesService.getVacantes(this.busqueda)
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

  getAreas(){
    this.AdminService.get_areas()
    .subscribe((response) => {
      if (response.success)
      {
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
    this.getVacantes();

  }
  mostrarinfo(vacante) {
    this.infovacante = vacante;
  }

  limpiarFiltros(){
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
    if ($(window).scrollTop() > 200 ) {
          $('.ir-arriba').slideDown(300); 
    } else { 
        this.dato = 0;
        $('.ir-arriba').slideUp(300);
    }
  } 
}