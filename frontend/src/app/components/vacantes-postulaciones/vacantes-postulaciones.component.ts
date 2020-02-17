import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VacantesService } from 'src/app/services/vacantes.service';
import Swal from 'sweetalert2';
import { Vacante } from 'src/app/models/vacantes';
import { PostulacionService } from 'src/app/services/postulacion.service';
import { Postulacion } from 'src/app/models/postulacion';

@Component({
  selector: 'app-vacantes-postulaciones',
  templateUrl: './vacantes-postulaciones.component.html',
  styleUrls: ['./vacantes-postulaciones.component.css']
})
export class VacantesPostulacionesComponent implements OnInit {

  public showFooter = true;
  public goTopEnabled = true;
  public goTop = function() { };
  
  isLoading = true;

  id_vacante: number = 0;
  infoVacante: Vacante = new Vacante();
  postulaciones = [];

  accesoDenegado: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private vacantesService: VacantesService,
    private postulacionesService: PostulacionService) { }

  ngOnInit() {
    this.cerrarModales();
    this.id_vacante = this.route.snapshot.params.id;

    this.vacantesService.comprobarPertenenciaVacante(this.id_vacante).
    subscribe((response) =>{
        if(response.success){
          this.infoVacante = response.data;
          this.get_postulacionesPorVacante(this.id_vacante);
        }else{
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

  get_postulacionesPorVacante(id_vacante){

    this.postulacionesService.get_postulacionesPorVacante(id_vacante).
    subscribe((response) =>{
        if(response.success){
          this.postulaciones = response.data;
          console.log(this.postulaciones);
        }else{
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

  cerrarModales(){
    (<any>$('#datosvacantes .close')).click();
  }



}
