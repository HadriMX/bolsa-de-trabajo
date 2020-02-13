import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VacantesService } from 'src/app/services/vacantes.service';
import Swal from 'sweetalert2';
import { Vacante } from 'src/app/models/vacantes';

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
  accesoDenegado: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private vacantesService: VacantesService,
    private router: Router) { }

  ngOnInit() {
    this.cerrarModales();
    this.id_vacante = this.route.snapshot.params.id;

    this.vacantesService.comprobarVacanteEmpresa(this.id_vacante).
    subscribe((response) =>{
        if(response.success){
          this.infoVacante = response.data;
          console.log(this.infoVacante);
        }else{
          Swal.fire("Error", response.message, 'error');
          this.accesoDenegado = true;
        }

        this.isLoading = false;

      });
  }

  cerrarModales(){
    (<any>$('#datosvacantes .close')).click();
  }

}
