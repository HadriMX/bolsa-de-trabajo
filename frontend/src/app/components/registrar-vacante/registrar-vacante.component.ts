import { Component, OnInit } from '@angular/core';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import viewToPlainText from '@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';
import Swal from 'sweetalert2';
import { Vacante } from 'src/app/models/vacantes';
import { AreaService } from 'src/app/services/area.service';
import { Area } from 'src/app/models/area';
import { VacantesService } from 'src/app/services/vacantes.service';

@Component({
  selector: 'app-registrar-vacante',
  templateUrl: './registrar-vacante.component.html',
  styleUrls: ['./registrar-vacante.component.css']
})
export class RegistrarVacanteComponent implements OnInit {

  areas: Area[] = [];
  nuevaVacante = new Vacante();
  editor: any;

  public ClassicEditor = ClassicEditor;
  public EditorConfig = {
    language: 'es',
    removePlugins: ['Link', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload'],
    toolbar: ['heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo'],
    placeholder: 'Descripción de la empresa, detalles acerca del puesto, requisitos, beneficios, información adicional...'
  }

  constructor(private areaService: AreaService,
    private vacantesService: VacantesService) { }

  ngOnInit() {
    this.getAreas();
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

  registrarVacante() {
    this.nuevaVacante.descripcion_puesto_plain_text = viewToPlainText(this.editor.editing.view.document.getRoot());

    this.vacantesService.addVacante(this.nuevaVacante)
      .subscribe(response => {
        if (response.success) {
          console.log("Simón");
        }
      })
  }

  cancelar() {
    
  }

}
