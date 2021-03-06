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
import { IAppPage } from 'src/app/interfaces/app-page';
import { EntidadesFederativasService } from 'src/app/services/entidades-federativas.service';
import { EntidadFederativa } from 'src/app/models/entidadFederativa';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, IAppPage {

  public showFooter = true;
  public goTopEnabled = true;
  public goTop = function() { };

  //paginacion
  allItems: Vacante[] = [];
  pager: any = {};
  pagedItems: Vacante[];
  isLoading = true;

  cursor: boolean = false;
  ubicacionCorrecta: boolean = false;

  //getters
  entidadesFederativas: EntidadFederativa[] = [];
  areas: Area[] = [];
  infoVacante: Vacante = new Vacante();
  usuarioActual: Usuario;

  //otros
  noVacantesDisponibles: boolean = false;
  displayDialogEliminarVacante: boolean;
  
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
    private postulacionService: PostulacionService,
    private entidadFederativaService: EntidadesFederativasService) { }

  ngOnInit() {
    this.busquedaVacantes();
    this.getAreas();
    this.getEntidadesFederativas();
    this.usuarioActual = this.currentUserService.getUsuarioActual();
  }

  busquedaVacantes() {
    this.isLoading = true;
    // console.log("buscando...");

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
            // console.log(this.noVacantesDisponibles);
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
    this.goTop();
    if (page < 1) {
      this.router.navigate(['/menu'], { queryParams: { pagina: 1 } });
      return;
    } else if (page > this.pager.totalPages) {
      this.router.navigate(['/menu'], { queryParams: { pagina: this.pager.totalPages } });
      return;
    }

    // get pager object from service
    this.pager = this.PaginacionService.getPager(this.allItems.length, page, 20);

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

  getEntidadesFederativas() {
    this.entidadFederativaService.getEntidadesFederativas()
      .subscribe((response) => {
        if (response.success) {
          this.entidadesFederativas = response.data;
          // console.log(this.entidadesFederativas);
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

  ComprobarUbicacion() {
    for (let estado of this.entidadesFederativas) {
      if (estado['nombre'] == this.busqueda.InputUbicacion) {
        this.ubicacionCorrecta = true;
        return 0;
      } else {
        this.ubicacionCorrecta = false;
      }
      // console.log(estado['nombre']);
    }
  }

  buscar() {
    this.ComprobarUbicacion();
    if (this.busqueda.InputUbicacion == "") {
      this.busquedaVacantes();
    } else if (this.ubicacionCorrecta) {
      this.busquedaVacantes();
    } else {
      this.busqueda.InputUbicacion = "";
      Swal.fire({
        title: 'Elige una ubicación de la lista',
        type: 'error',
        confirmButtonText: 'Aceptar',
        });
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


  postularCandidato(id_vacante: number) {

    Swal.fire({
      title: '¿Estás seguro de postularte a esta vacante?',
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonColor: '#7A26D3',
      cancelButtonColor: 'white',
      cancelButtonText: 'No',
      confirmButtonText: 'Sí, postularme',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.postulacionService.addPostulacion(id_vacante)
          .subscribe((response) => {
            if (response.success) {
              Swal.fire({
                title: "Éxito", 
                text: response.message,
                type: "success",
                focusConfirm: true,
                confirmButtonText: "Aceptar",
                confirmButtonColor: '#7A26D3'
              });
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
  /* administración */

  darDeBajaVacante(vacante: Vacante) {
    alert('Aquí se va a dar de baja');
  }

  mostrarModalEliminar(){
    this.displayDialogEliminarVacante=true;
  }
}