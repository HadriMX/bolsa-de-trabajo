import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, HostListener } from '@angular/core';
import { IAppPage } from 'src/app/interfaces/app-page';
import { EntidadesFederativasService } from 'src/app/services/entidades-federativas.service';
import { EntidadFederativa } from 'src/app/models/entidadFederativa';
import Swal from 'sweetalert2';
import { MunicipioService } from 'src/app/services/municipio.service';
import { Municipio } from 'src/app/models/municipio';
import { Area } from 'src/app/models/area';
import { AreaService } from 'src/app/services/area.service';
import { GradoEstudio } from 'src/app/models/gradoEstudio';
import { GradoEstudioService } from 'src/app/services/grado-estudio.service';
import { Candidato } from 'src/app/models/candidato';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { CandidatoService } from 'src/app/services/candidato.service';
import { Usuario } from 'src/app/models/usuario';
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit, IAppPage {

  showFooter = true;
  goTopEnabled = true;
  goTop?: Function;
  isLoading = true;

  // getters
  entidadesFederativas: EntidadFederativa[] = [];
  municipios: Municipio[] = [];
  usuarioActual: Usuario;
  areas: Area[] = [];
  gradosEstudio: GradoEstudio[] = [];

  uploadForm: FormGroup;
  labelCurriculum = "Selecciona un archivo";
  labelIdentificacion = "Selecciona un archivo";
  labelCurp = "Selecciona un archivo";

  infoCandidato: Candidato = {
    nombre: "",
    apellido1: "",
    apellido2: "",
    fecha_nacimiento: "",
    genero: "0",
    telefono: "",
    id_entidad_federativa: 0,
    id_municipio: 0,
    ciudad: "",
    colonia: "",
    cp: "",
    calle: "",
    num_ext: "",
    id_grado_estudios: 0,
    id_area_estudios: 0,
    escuela: "",
    ruta_curp: "",
    ruta_id: "",
    ruta_cv: "",
    id_tipo_usuario: 1
  }

  constructor(
    private entidadFederativaService: EntidadesFederativasService,
    private municipioService: MunicipioService,
    private areaService: AreaService,
    private gradoEstudioService: GradoEstudioService,
    private formBuilder: FormBuilder,
    private candidatoService: CandidatoService,
    private currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      archivoCurriculum: [''],
      archivoIdentificacion: [''],
      archivoCurp: ['']
    });
    
    this.usuarioActual = this.currentUserService.getUsuarioActual();
    this.getEntidadesFederativas();
    this.getAreas();
    this.getGradosEstudio();
    this.getInfoUsuario();
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

  getMunicipios(id_entidad) {
    if(this.infoCandidato.id_municipio == null)
        this.infoCandidato.id_municipio = 0;
    
    this.municipioService.getMunicipios(id_entidad)
      .subscribe((response) => {
        if (response.success) {
          this.municipios = response.data;
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }

        this.isLoading = false;
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

  getInfoUsuario() {
    this.isLoading = true;
    this.candidatoService.get_candidatosInfoCompleta()
      .subscribe((response) => {
        if (response.success) {
          this.infoCandidato = response.data;
          this.getMunicipios(this.infoCandidato.id_entidad_federativa);

          this.labelCurriculum = this.infoCandidato.ruta_cv || this.labelCurriculum;
          this.labelIdentificacion = this.infoCandidato.ruta_id || this.labelIdentificacion;
          this.labelCurp = this.infoCandidato.ruta_curp || this.labelCurp;
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

  onFileSelectIdentificacion(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('archivoIdentificacion').setValue(file);
      this.labelIdentificacion = file.name;
    }
  }

  onFileSelectCurp(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('archivoCurp').setValue(file);
      this.labelCurp = file.name;
    }
  }

  onSubmit() {
    const formData = new FormData();
    let fileCurriculum = this.uploadForm.get('archivoCurriculum').value;
    formData.append('curriculum', fileCurriculum);
    let fileIdentificacion = this.uploadForm.get('archivoIdentificacion').value;
    formData.append('identificacion', fileIdentificacion);
    let fileCurp = this.uploadForm.get('archivoCurp').value;
    formData.append('curp', fileCurp);
    formData.append('infoCandidato', JSON.stringify(this.infoCandidato));

    this.candidatoService.guardarInfoCandidato(formData)
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
          this.getInfoUsuario();
        } else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

}
