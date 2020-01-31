import { Component, OnInit, HostListener } from '@angular/core';
import { VacantesService } from 'src/app/services/vacantes.service';
import { Postulacion } from 'src/app/models/postulacion';
import { PostulacionService } from 'src/app/services/postulacion.service';
import Swal from 'sweetalert2';
import { Vacante } from 'src/app/models/vacantes';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {

  public showFooter = true;
  public goTopEnabled = true;
  public goTop = function() { };
  
  postulacionesPendientes: Postulacion[] = [];
  postulacionesAceptadas: Postulacion[] = [];
  postulacionesRechazadas: Postulacion[] = [];
  infoVacante: Postulacion = new Postulacion();
  botonCancelar: number = 0;
  isLoading = true;

  varios = [1, 2, 3, 4, 5];
  constructor(private postulacionesService: PostulacionService) { }

  ngOnInit() {
    this.getPostulacionesPendientes();
    this.getPostulacionesRechazadas();
    this.getPostulacionesAceptadas();
  }

  getPostulacionesPendientes() {
    this.postulacionesService.getPostulaciones('P')
      .subscribe((response) => {
        if (response.success) {
          this.postulacionesPendientes = response.data;
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }

        this.isLoading = false;
      });
  }

  getPostulacionesRechazadas() {
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

  getPostulacionesAceptadas() {
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

  mostrarDetalleVacante(item, aux: number) {
    this.infoVacante = item;
    this.botonCancelar = aux;
  }

  cancelarPostulacion(vacante) {
    let id_vacante = vacante;

    Swal.fire({
      title: '¿Estás seguro de cancelar tu postulación?',
      showCancelButton: true,
      confirmButtonColor: '#7A26D3',
      cancelButtonColor: 'white',
      cancelButtonText: 'No',
      confirmButtonText: 'Sí, cancelar postulación',
      reverseButtons: true
      
    }).then((result) => {
      if (result.value) {
        this.postulacionesService.deletePostulacion(id_vacante)
          .subscribe((response) => {
            if (response.success) {
              this.getPostulacionesPendientes();
              this.getPostulacionesRechazadas();
              this.getPostulacionesAceptadas();
              Swal.fire({
                title: "Éxito", 
                text: response.message,
                type: "success",
                focusConfirm: true,
                confirmButtonText: "Aceptar",
                confirmButtonColor: '#7A26D3'
              });
              this.cerrarModales();
            }
            else {
              Swal.fire("Error", response.message, 'error');
            }
          });
      }
    })
  }

  cerrarModales() {
    (<any>$('#datosPostulacion .close')).click();
  }

}
