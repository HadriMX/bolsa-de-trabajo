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
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.postulacionesService.deletePostulacion(id_vacante)
          .subscribe((response) => {
            if (response.success) {
              Swal.fire("Exito", response.message, "success");
              this.cerrarModales();
              this.getPostulacionesPendientes();
              this.getPostulacionesRechazadas();
              this.getPostulacionesAceptadas();
            }
            else {
              Swal.fire("Error", response.message, 'error');
            }
          });
      }
    })
  }

  cerrarModales() {
    (<any>$('#vermas .close')).click();
  }

}
