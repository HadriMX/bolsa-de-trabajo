import { Component, OnInit } from '@angular/core';
import { EntidadFederativa } from 'src/app/models/entidadFederativa';
import { Municipio } from 'src/app/models/municipio';
import { Usuario } from 'src/app/models/usuario';
import { TipoEmpresa } from 'src/app/models/tipoEmpresa';
import { Empresa } from 'src/app/models/empresa';
import Swal from 'sweetalert2';
import { EntidadesFederativasService } from 'src/app/services/entidades-federativas.service';
import { MunicipioService } from 'src/app/services/municipio.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { CatEmpresaService } from 'src/app/services/cat-empresa.service';

@Component({
  selector: 'app-editarempresa',
  templateUrl: './editarempresa.component.html',
  styleUrls: ['./editarempresa.component.css']
})
export class EditarempresaComponent implements OnInit {

  showFooter = true;
  goTopEnabled = true;
  goTop?: Function;
  isLoading = true;

  // getters
  entidadesFederativas: EntidadFederativa[] = [];
  municipios: Municipio[] = [];
  usuarioActual: Usuario;
  tiposEmpresa: TipoEmpresa[] = [];

  infoEmpresa = new Empresa();
  
  constructor(
    private entidadFederativaService: EntidadesFederativasService,
    private municipioService: MunicipioService,
    private empresaService: EmpresaService,
    private categoriaEmpresaService: CatEmpresaService,
    private currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.usuarioActual = this.currentUserService.getUsuarioActual();

    this.getEntidadesFederativas();
    this.getTipoEmpresas();
    this.getInfoEmpresa();
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

  getMunicipios() {
    //  if(this.infoEmpresa.id_municipio == null){
    //      this.infoEmpresa.id_municipio = 0;
    //  }
    this.municipioService.getMunicipios(this.infoEmpresa.id_entidad_federativa)
      .subscribe((response) => {
        if (response.success) {
          this.municipios = response.data;
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

  getTipoEmpresas(){
    this.categoriaEmpresaService.get_categoriasEmpresa()
    .subscribe((response) => {
      if (response.success) {
        this.tiposEmpresa = response.data;
        // console.log(this.tiposEmpresa);
      }
      else {
        Swal.fire("Error", response.message, 'error');
      }
    });
  }

  getInfoEmpresa() {
    this.isLoading = true;
    this.empresaService.get_empresaInfoCompleta()
      .subscribe((response) => {
        if (response.success) {
          this.infoEmpresa = response.data;
          // console.log(this.infoEmpresa);
          this.getMunicipios();
          // console.log(this.infoEmpresa);
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
        this.isLoading = false;
      });
  }

  guardarInfoEmpresa(){
    console.log(this.infoEmpresa);
    this.empresaService.guardarInfoEmpresa(this.infoEmpresa)
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
          this.getInfoEmpresa();
        } else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }


}
