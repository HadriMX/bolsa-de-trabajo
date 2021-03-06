import { Component, OnInit } from '@angular/core';
import { IAppPage } from 'src/app/interfaces/app-page';
import { Candidato } from 'src/app/models/candidato';
import { GradoEstudio } from 'src/app/models/gradoEstudio';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GradoEstudioService } from 'src/app/services/grado-estudio.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadFederativa } from 'src/app/models/entidadFederativa';
import { CandidatoService } from 'src/app/services/candidato.service';
import { EntidadesFederativasService } from 'src/app/services/entidades-federativas.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { Usuario } from 'src/app/models/usuario';
import { VerificacionEmailService } from 'src/app/services/verificacion-email.service';
import { TipoEmpresa } from 'src/app/models/tipoEmpresa';
import { Empresa } from 'src/app/models/empresa';
import { CatEmpresaService } from 'src/app/services/cat-empresa.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Municipio } from 'src/app/models/municipio';
import { MunicipioService } from 'src/app/services/municipio.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, IAppPage {

  showFooter = false;
  goTopEnabled = false;
  goTop?: Function;
  isLoading = true;
  labelCurriculum = "Selecciona un archivo";

  codigoConfirmacion: string;
  infoCandidato = new Candidato();
  infoEmpresa = new Empresa();
  tiposEmpresa: TipoEmpresa[] = [];
  gradosEstudio: GradoEstudio[] = [];
  entidadesFederativas: EntidadFederativa[] = [];
  municipios: Municipio[] = [];
  uploadForm: FormGroup;
  user: Usuario;

  constructor(private entidadFederativaService: EntidadesFederativasService,
    private gradoEstudioService: GradoEstudioService,
    private candidatoService: CandidatoService,
    private userService: CurrentUserService,
    private verificacionEmailService: VerificacionEmailService,
    private empresaService: EmpresaService,
    private categoriaEmpresaService: CatEmpresaService,
    private municipioService: MunicipioService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.codigoConfirmacion = this.route.snapshot.params.codigo;

    this.uploadForm = this.formBuilder.group({
      archivoCurriculum: ['']
    });

    this.getEntidadesFederativas();
    this.getGradosEstudio();
    this.getTipoEmpresas();

    this.verificacionEmailService.verificar(this.codigoConfirmacion).then(response => {
      if (response.success) {
        // nada
      }
    });

    this.userService.getUsuarioFromVerification(this.codigoConfirmacion)
      .subscribe(response => {
        if (response.success) {
          this.user = response.data;
          console.log(this.user);

          this.isLoading = false;
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

  getTipoEmpresas() {
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

  getMunicipios() {
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

  onFileSelectCurriculum(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('archivoCurriculum').setValue(file);
      this.labelCurriculum = file.name;
    }
  }

  onSubmit() {
    const formData = new FormData();
    let fileCurriculum = this.uploadForm.get('archivoCurriculum').value;
    formData.append('curriculum', fileCurriculum);
    formData.append('infoCandidato', JSON.stringify(this.infoCandidato));
    formData.append('codigoConfirmacion', this.codigoConfirmacion);

    this.candidatoService.registrar_candidato(formData)
      .subscribe((response) => {
        if (response.success) {
          Swal.fire({
            title: "Registro completado",
            text: response.message,
            type: "success",
            focusConfirm: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: '#7A26D3'
          });

          this.router.navigateByUrl("/login");
        } else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

  onSubmitEmpresa() {
    this.infoEmpresa.id_usuario = this.user.id_usuario;

    this.empresaService.registrarEmpresa(this.infoEmpresa)
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

          this.router.navigateByUrl("/login");
        } else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

}
