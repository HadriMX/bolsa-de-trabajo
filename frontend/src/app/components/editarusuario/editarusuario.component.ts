import { Component, OnInit, HostListener } from '@angular/core';
import { IAppPage } from 'src/app/interfaces/app-page';
import { EntidadesFederativasService } from 'src/app/services/entidades-federativas.service';
import { EntidadFederativa } from 'src/app/models/entidadFederativa';
import Swal from 'sweetalert2';
import { MunicipioService } from 'src/app/services/municipio.service';
import { Municipio } from 'src/app/models/municipio';
import { CiudadService } from 'src/app/services/ciudad.service';
import { Ciudad } from 'src/app/models/ciudad';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';
import { GradoEstudio } from 'src/app/models/gradoEstudio';
import { GradoEstudioService } from 'src/app/services/grado-estudio.service';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit, IAppPage {
  
  showFooter = true;
  goTopEnabled = true;
  goTop?: Function;

  // getters
  entidadesFederativas: EntidadFederativa[] = [];
  municipios: Municipio[] = [];
  ciudades: Ciudad[] = [];
  areas: Area[] = [];
  gradosEstudio: GradoEstudio[] = [];
  
  //variables
  EntidadFederativa = 0;
  Municipio = 0;
  Ciudad = 0;
  Colonia = 0;
  Area = 0;
  Grado = 0;

  constructor(
    private entidadFederativaService: EntidadesFederativasService,
    private municipioService: MunicipioService,
    private ciudadService: CiudadService,
    private areaService: AreaService,
    private gradoEstudioService: GradoEstudioService ) {
  }

  ngOnInit() {
    this.getEntidadesFederativas();
    this.getAreas();
    this.getGradosEstudio();
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

  getMunicipios(){
    this.municipios = [];
    this.Municipio = 0;
    this.Ciudad = 0;
    this.Colonia = 0;
    this.municipioService.getMunicipios(this.EntidadFederativa)
      .subscribe((response) => {
        if (response.success) {
          this.municipios = response.data;
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

  getCiudades(){
    this.ciudades = [];
    this.Ciudad = 0;
    this.Colonia = 0;
    this.ciudadService.getCiudades(this.EntidadFederativa,this.Municipio)
      .subscribe((response) => {
        if (response.success) {
          this.ciudades = response.data;
          // console.log(this.ciudades);
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
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

  getGradosEstudio() {
    this.gradoEstudioService.getGradosEstudio()
      .subscribe((response) => {
        if (response.success) {
          this.gradosEstudio = response.data;
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

}
