import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Vacante } from 'src/app/models/vacantes';

@Component({
  selector: 'app-registrar-vacante',
  templateUrl: './registrar-vacante.component.html',
  styleUrls: ['./registrar-vacante.component.css']
})
export class RegistrarVacanteComponent implements OnInit {

  nuevaVacante = new Vacante();

  public Editor = ClassicEditor;
  public EditorConfig = {
    removePlugins: ['Link', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload'],
    toolbar: ['heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo'],
    placeholder: 'Descripción de la empresa, detalles acerca del puesto, requisitos, beneficios, información adicional...'
  }

  constructor() { }

  ngOnInit() {
  }

  test() {
    console.log(this.nuevaVacante.descripcion_puesto);
  }

}
