import { Component, OnInit, Input, HostListener } from '@angular/core';
import Swal from 'sweetalert2';
import { Vacante } from 'src/app/models/vacantes';
import { VacantesService } from '../../services/vacantes.service';
import { AreaService } from '../../services/area.service';
import { FormBuilder, FormGroup, ControlContainer } from '@angular/forms';
import { Area } from 'src/app/models/area';
import { Busqueda } from 'src/app/models/busqueda';
import * as $ from 'jquery';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Postulacion } from 'src/app/models/postulacion';
import { CandidatoService } from 'src/app/services/candidato.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //paginacion
  allItems: Vacante[] = [];
  pager: any = {};
  pagedItems: any[];

  cursor: boolean = false;
  ubicacionCorrecta: boolean = false;
  estados: string[] = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Ciudad de México",
    "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México", "Michoacán", "Morelos",
    "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora",
    "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"];

  //getters
  areas: Area[] = [];
  infoVacante: Vacante = new Vacante();
  

  @Input() busqueda: Busqueda = {
    SelectedSalario: "0",
    SelectedFecha: "0",
    SelectedArea: "0",
    InputTitulo: "",
    InputUbicacion: "",
  }

  @Input() postulacion: Postulacion = {
    id_vacante: 0,
    id_candidato: 0,
    estatus: 'A'
  }

  constructor(private route: ActivatedRoute, private router: Router, private vacantesService: VacantesService, 
    private areaService: AreaService, private currentUserService: CurrentUserService, 
    private PaginacionService: PaginacionService, private candidatoService: CandidatoService) { }

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
          if (response.data.length >= 1) {
            this.allItems = response.data;
            //setear pagina leyendo url
            this.route.queryParams.subscribe(params => { //toma variable del url
              if (params['pagina'] != null || params['pagina'] >= 0) {
                this.setPage(params['pagina']);
              } else {
                this.setPage(1);
              }
            });
          } else {
            Swal.fire("Error", 'No hay elementos que conincidan con tu busqueda: \n"' + this.busqueda.InputTitulo + '" \n', 'error');
            this.busqueda.InputTitulo = ""
          }
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

  setUrl(page: number) {
    this.router.navigate(['/menu'], { queryParams: { pagina: page } });
  }

  setPage(page: number) {
    if (page < 1) {
      this.router.navigate(['/menu'], { queryParams: { pagina: 1 } });
      return;
    } else if (page > this.pager.totalPages) {
      this.router.navigate(['/menu'], { queryParams: { pagina: this.pager.totalPages } });
      return;
    }

    // get pager object from service
    this.pager = this.PaginacionService.getPager(this.allItems.length, page, 1);

    // setear pagina actual en el url
    if (this.pager.currentPage >= this.pager.totalPages + 1) { //si se sale del limite
      this.router.navigate(['/menu'], { queryParams: { pagina: this.pager.totalPages } });
    } else if (this.pager.currentPage >= 1 || this.pager.currentPage <= this.pager.totalPages) {//si se encuentra en el limite
      this.router.navigate(['/menu'], { queryParams: { pagina: this.pager.currentPage } });
    } else {
      this.router.navigate(['/menu'], { queryParams: { pagina: 1 } });
    }
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.pager.currentPage = this.pager.currentPage;
  }

  getAreas() {
    this.areaService.get_areasMenu()
      .subscribe((response) => {
        if (response.success) {
          this.areas = response.data;
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

  postularCandidato(id_vacante: number ){
    this.postulacion.id_vacante = id_vacante;
    this.candidatoService.addPostulacion(this.postulacion.id_vacante)
      .subscribe((response) => {
        if (response.success) {
          Swal.fire("Exito",response.message,"success");
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
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