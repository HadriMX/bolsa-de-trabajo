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

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit, IAppPage {

  showFooter = false;
  goTopEnabled = false;
  goTop?: Function;
  isLoading = false;
  labelCurriculum = "Selecciona un archivo";

  codigoConfirmacion: string;
  infoCandidato = new Candidato();
  gradosEstudio: GradoEstudio[] = [];
  entidadesFederativas: EntidadFederativa[] = [];
  uploadForm: FormGroup;

  constructor(private entidadFederativaService: EntidadesFederativasService,
    private gradoEstudioService: GradoEstudioService,
    private candidatoService: CandidatoService,
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

          // this.getInfoUsuario();
        } else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

}
