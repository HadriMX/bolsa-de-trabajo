import { Component, OnInit,HostListener } from '@angular/core';
import * as $ from 'jquery';
import { Vacante } from 'src/app/models/vacantes';
import { VacantesService } from 'src/app/services/vacantes.service';
import { IAppPage } from 'src/app/interfaces/app-page';
import { Empresa } from 'src/app/models/empresa';
import { EmpresaService } from 'src/app/services/empresa.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-vacantes',
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.css']
})
export class VacantesComponent implements OnInit, IAppPage {
  
  showFooter = true;
  goTopEnabled = true;
  goTop?: Function;

  vacantesPublicadas: Vacante[] = [];
  vacantesCerradas: Vacante[] = [];
  infoVacante: Vacante = new Vacante();
  isLoading = true;
  mostrarBoton = true;

  infoEmpresa: Empresa = {
    nombre_empresa: "",
    rfc: "",
    calle: "",
    colonia: "",
    cp: "",
    ciudad: "",
    id_municipio: 0,
    id_entidad_federativa: 0,
    id_tipo_empresa: 0,
    telefono: "",
    descripcion: "",
    pagina_web: "",
    logo: "",
    nombre_persona_contacto: "",
    telefono_contacto: "",
    email_contacto: "",
    id_tipo_usuario: 2,
    fecha_ultima_modificacion: ""
  }
  

  constructor(private vacantesService: VacantesService,
    private empresaService: EmpresaService) { }

  ngOnInit() {
    this.getInfoEmpresa();
    this.getVacantesMisVacantesPublicadas();
    this.getVacantesMisVacantesCerradas();
  }

  getInfoEmpresa() {
    this.empresaService.get_empresaInfoCompleta()
      .subscribe((response) => {
        if (response.success) {
          this.infoEmpresa = response.data;
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

  getVacantesMisVacantesPublicadas(){
    this.vacantesService.getMisVacantes('A').subscribe(response => {
      if (response.success) {
        this.vacantesPublicadas = response.data;
      }
      this.isLoading = false;
    });
  }

  getVacantesMisVacantesCerradas(){
    this.vacantesService.getMisVacantes('B').subscribe(response => {
      if (response.success) {
        this.vacantesCerradas = response.data;
      }
      this.isLoading = false;
    });
  }

  CerrarVacante(id_vacante:number){
    console.log(id_vacante);
  }
  
  AbrirVacante(id_vacante:number){
    console.log(id_vacante);
  }


  mostrarDetalleVacante(item, aux:boolean) {
    this.infoVacante = item;
    this.mostrarBoton = aux;
  }

  arriba() {
    $('#body, html').animate({
      scrollTop:'0px'
    }, 500);
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
