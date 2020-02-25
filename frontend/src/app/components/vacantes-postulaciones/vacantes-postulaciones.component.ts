import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VacantesService } from 'src/app/services/vacantes.service';
import Swal from 'sweetalert2';
import { Vacante } from 'src/app/models/vacantes';
import { PostulacionService } from 'src/app/services/postulacion.service';
import { Postulacion } from 'src/app/models/postulacion';
import { PostulacionVacante } from 'src/app/models/postulacion_vacante';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vacantes-postulaciones',
  templateUrl: './vacantes-postulaciones.component.html',
  styleUrls: ['./vacantes-postulaciones.component.css']
})
export class VacantesPostulacionesComponent implements OnInit {

  public showFooter = true;
  public goTopEnabled = true;
  public goTop = function () { };

  isLoading = true;

  id_vacante: number = 0;
  infoVacante: Vacante = new Vacante();
  postulaciones = [];
  infoCandidato: PostulacionVacante = new PostulacionVacante();

  accesoDenegado: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private vacantesService: VacantesService,
    private postulacionesService: PostulacionService) { }

  ngOnInit() {
    this.cerrarModales();
    this.id_vacante = this.route.snapshot.params.id;

    this.vacantesService.comprobarPertenenciaVacante(this.id_vacante).
      subscribe((response) => {
        if (response.success) {
          this.infoVacante = response.data;
          this.get_postulacionesPorVacante(this.id_vacante);
        } else {
          Swal.fire({
            title: "Error",
            text: response.message,
            type: "error",
            focusConfirm: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: '#7A26D3'
          });
          this.isLoading = false;
          this.accesoDenegado = true;
        }
      });
  }

  get_postulacionesPorVacante(id_vacante) {

    this.postulacionesService.get_postulacionesPorVacante(id_vacante).
      subscribe((response) => {
        if (response.success) {
          this.postulaciones = response.data;
          // console.log(this.postulaciones);
        } else {
          Swal.fire({
            title: "Error",
            text: response.message,
            type: "error",
            focusConfirm: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: '#7A26D3'
          });
        }
        this.isLoading = false;

      });
  }

  verInfoCandidato(info) {
    this.infoCandidato = info;
    //falta validar si no tiene cierto archivo
    this.infoCandidato.ruta_curp = environment.uploadsUrl + this.infoCandidato.ruta_curp;
    this.infoCandidato.ruta_cv = environment.uploadsUrl + this.infoCandidato.ruta_cv;
    this.infoCandidato.ruta_id = environment.uploadsUrl + this.infoCandidato.ruta_id;
    // console.log(this.infoCandidato);
  }

  aceptarCandidato(id_candidato, nombre, id_vacante) {
    Swal.fire({
      title: '¿Estás seguro de aceptar al candidato ' + nombre + '?',
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonColor: '#7A26D3',
      cancelButtonColor: 'white',
      cancelButtonText: 'No',
      confirmButtonText: 'Sí, aceptar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.postulacionesService.actualizarEstatusPostulaciones(id_candidato,id_vacante,"A").
          subscribe((response) => {
            if (response.success) {
              Swal.fire({
                title: "Éxito",
                text: response.message,
                type: "success",
                focusConfirm: true,
                confirmButtonText: "Aceptar",
                confirmButtonColor: '#7A26D3'
              });
              this.get_postulacionesPorVacante(this.id_vacante);
              this.cerrarModales();
            } else {
              Swal.fire({
                title: "Error",
                text: response.message,
                type: "error",
                focusConfirm: true,
                confirmButtonText: "Aceptar",
                confirmButtonColor: '#7A26D3'
              });
            }
          });
      }
    })
  }

  rechazarCandidato(id_candidato, nombre, id_vacante) {
    Swal.fire({
      title: '¿Estás seguro de rechazar al candidato ' + nombre + '?',
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonColor: '#7A26D3',
      cancelButtonColor: 'white',
      cancelButtonText: 'No',
      confirmButtonText: 'Sí, rechazar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.postulacionesService.actualizarEstatusPostulaciones(id_candidato,id_vacante,"R").
          subscribe((response) => {
            if (response.success) {
              Swal.fire({
                title: "Éxito",
                text: response.message,
                type: "success",
                focusConfirm: true,
                confirmButtonText: "Aceptar",
                confirmButtonColor: '#7A26D3'
              });
              this.get_postulacionesPorVacante(this.id_vacante);
              this.cerrarModales();
            } else {
              Swal.fire({
                title: "Error",
                text: response.message,
                type: "error",
                focusConfirm: true,
                confirmButtonText: "Aceptar",
                confirmButtonColor: '#7A26D3'
              });
            }
          });
      }
    })
  }

  cerrarModales() {
    (<any>$('#datosvacantes .close')).click();
    (<any>$('#datospostulacion .close')).click();
  }
  
}
