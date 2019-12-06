import { Component, OnInit } from '@angular/core';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { Vacante } from 'src/app/models/vacantes';
import { AreaService } from 'src/app/services/area.service';
import { Area } from 'src/app/models/area';

@Component({
  selector: 'app-registrar-vacante',
  templateUrl: './registrar-vacante.component.html',
  styleUrls: ['./registrar-vacante.component.css']
})
export class RegistrarVacanteComponent implements OnInit {

  areas: Area[] = [];
  nuevaVacante = new Vacante();

  public Editor = ClassicEditor;
  public EditorConfig = {
    language: 'es',
    removePlugins: ['Link', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload'],
    toolbar: ['heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo'],
    placeholder: 'Descripción de la empresa, detalles acerca del puesto, requisitos, beneficios, información adicional...'
  }

  constructor(private areaService: AreaService) { }

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

}
