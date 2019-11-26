import { Component, OnInit, Input, HostListener } from '@angular/core';
import Swal from 'sweetalert2';
import { Vacante } from 'src/app/models/vacantes';
import { VacantesService } from '../../services/vacantes.service';
import { AreaService } from '../../services/area.service';
import { Area } from 'src/app/models/area';
// import * as $ from 'jquery';
import { Busqueda } from 'src/app/models/busqueda';
import { PaginacionService } from 'src/app/services/paginacion.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Postulacion } from 'src/app/models/postulacion';
import { CandidatoService } from 'src/app/services/candidato.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { Usuario } from 'src/app/models/usuario';
import { PostulacionService } from 'src/app/services/postulacion.service';

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
  isLoading = true;

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
  usuarioActual: Usuario;

  //otros
  noVacantesDisponibles: boolean = false;
  
  busqueda: Busqueda = {
    SelectedSalario: "0",
    SelectedFecha: "0",
    SelectedArea: "0",
    InputTitulo: "",
    InputUbicacion: "",
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private vacantesService: VacantesService,
    private areaService: AreaService,
    private PaginacionService: PaginacionService,
    private candidatoService: CandidatoService,
    private currentUserService: CurrentUserService,
    private postulacionService: PostulacionService) { }

  ngOnInit() {
    this.busquedaVacantes();
    this.getAreas();
    this.usuarioActual = this.currentUserService.getUsuarioActual();
  }

  ComprobarUbicacion() {
    for (let estado of this.estados) {
      if (estado == this.busqueda.InputUbicacion) {
        this.ubicacionCorrecta = true;
        return 0;
      } else {
        this.ubicacionCorrecta = false;
      }
    }
  }

  busquedaVacantes() {
    this.isLoading = true;
    console.log("buscando...");

    this.vacantesService.busquedaVacantes(this.busqueda)
      .subscribe((response) => {
        if (response.success) {
          if (response.data.length >= 1) {
            this.noVacantesDisponibles = false;
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
            this.noVacantesDisponibles = true;
            console.log(this.noVacantesDisponibles);
            // Swal.fire("Error", 'No hay elementos que conincidan con tu busqueda: \n"' + this.busqueda.InputTitulo + '" \n', 'error');
            // this.busqueda.InputTitulo = ""
          }
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }

        this.isLoading = false;
      });
  }

  setUrl(page: number) {
    this.router.navigate(['/menu'], { queryParams: { pagina: page } });
  }

  setPage(page: number) {
    // this.arriba();
    this.gotoTop();
    if (page < 1) {
      this.router.navigate(['/menu'], { queryParams: { pagina: 1 } });
      return;
    } else if (page > this.pager.totalPages) {
      this.router.navigate(['/menu'], { queryParams: { pagina: this.pager.totalPages } });
      return;
    }

    // get pager object from service
    this.pager = this.PaginacionService.getPager(this.allItems.length, page, 10);

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
      this.busquedaVacantes();
    } else if (this.ubicacionCorrecta) {
      this.busquedaVacantes();
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
    this.busquedaVacantes();
  }

  // arriba() {
  //   // $('#body, html').animate({
  //   //   scrollTop: '0px'
  //   // }, 300);
  // }

  postularCandidato(id_vacante: number) {

    Swal.fire({
      title: '¿Estás seguro de postularte a esta vacante?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, postularme!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.postulacionService.addPostulacion(id_vacante)
          .subscribe((response) => {
            if (response.success) {
              Swal.fire("Exito", response.message, "success");
              this.busquedaVacantes();
              this.cerrarModales();
            }
            else {
              Swal.fire("Error", response.message, 'error');
            }
          });
      }
    })
  }

  cerrarModales(){
    (<any>$('#datosvacantes .close')).click();
  }

  // @HostListener('window:scroll', ['$event']) // for window scroll events
  // onScroll(event) {

  //   if ($(window).scrollTop() > 200) {
  //     $('.ir-arriba').slideDown(300);
  //   } else {
  //     $('.ir-arriba').slideUp(300);
  //   }
  // }

  isShow: boolean;
  topPosToStartShowing = 100;

  // Scrollup funciones
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  /* administración */

  darDeBajaVacante(vacante: Vacante) {
    alert('Aquí se va a dar de baja');
  }

  /**************** */
  // Scrollup funciones
  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}