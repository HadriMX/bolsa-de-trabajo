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
    id_grado_estudio: 0,
    id_area_estudio: 0,
    escuela: "",
    pathCURP: "",
    pathIDENTIFICACION: "",
    pathCURRICULUM: "",
    id_tipo_usuario: 1
  }

  constructor(
    private entidadFederativaService: EntidadesFederativasService,
    private municipioService: MunicipioService,
    private areaService: AreaService,
    private gradoEstudioService: GradoEstudioService,
    private formBuilder: FormBuilder,
    private fileUpload: FileUploadService,
    private candidatoService: CandidatoService,
    private currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
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
    this.infoCandidato.id_municipio = 0;
    this.municipioService.getMunicipios(id_entidad)
      .subscribe((response) => {
        if (response.success) {
          this.municipios = response.data;
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

  getInfoUsuario() {
    this.isLoading = true;
    this.candidatoService.get_candidatosInfoCompleta()
      .subscribe((response) => {
        if (response.success) {
          this.infoCandidato = response.data;
          this.getMunicipios(this.infoCandidato.id_entidad_federativa);
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
        this.isLoading = false;
      });
  }

  guardarCambios() {
    this.candidatoService.guardarInfoCandidato(this.infoCandidato)
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

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
      this.labelCurriculum = file.name;
    }
  }

  onSubmit() {
    const formData = new FormData();
    let fileCurriculum = this.uploadForm.get('profile').value;
    formData.append('archivo', fileCurriculum);

    let filename = "curriculum." + this.getFileExtension(fileCurriculum.name);
    this.fileUpload.uploadFile(filename, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  getFileExtension(filename: string) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

}
