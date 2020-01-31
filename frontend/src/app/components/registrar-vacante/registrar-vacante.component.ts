import { Component, OnInit } from '@angular/core';
import '@ckeditor/ckeditor5-build-classic/build/translations/es';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import viewToPlainText from '@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext';
import Swal from 'sweetalert2';
import { Vacante } from 'src/app/models/vacantes';
import { AreaService } from 'src/app/services/area.service';
import { Area } from 'src/app/models/area';
import { VacantesService } from 'src/app/services/vacantes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-vacante',
  templateUrl: './registrar-vacante.component.html',
  styleUrls: ['./registrar-vacante.component.css']
})
export class RegistrarVacanteComponent implements OnInit {

  areas: Area[] = [];
  nuevaVacante = new Vacante();
  editor: any;
  areasFiltradas: any[];
  areaEstudioSeleccionada: Area;

  entidadesFederativas = [
    { "id": 1, "nombre": "Aguascalientes" },
    { "id": 2, "nombre": "Baja California" },
    { "id": 3, "nombre": "Baja California Sur" },
    { "id": 4, "nombre": "Campeche" },
    { "id": 5, "nombre": "Chiapas" },
    { "id": 6, "nombre": "Chihuahua" },
    { "id": 7, "nombre": "CDMX" },
    { "id": 8, "nombre": "Coahuila" },
    { "id": 9, "nombre": "Colima" },
    { "id": 10, "nombre": "Durango" },
    { "id": 11, "nombre": "Guanajuato" },
    { "id": 12, "nombre": "Guerrero" },
    { "id": 13, "nombre": "Hidalgo" },
    { "id": 14, "nombre": "Jalisco" },
    { "id": 15, "nombre": "México" },
    { "id": 16, "nombre": "Michoacán" },
    { "id": 17, "nombre": "Morelos" },
    { "id": 18, "nombre": "Nayarit" },
    { "id": 19, "nombre": "Nuevo León" },
    { "id": 20, "nombre": "Oaxaca" },
    { "id": 21, "nombre": "Puebla" },
    { "id": 22, "nombre": "Querétaro" },
    { "id": 23, "nombre": "Quintana Roo" },
    { "id": 24, "nombre": "San Luis Potosí" },
    { "id": 25, "nombre": "Sinaloa" },
    { "id": 26, "nombre": "Sonora" },
    { "id": 27, "nombre": "Tabasco" },
    { "id": 28, "nombre": "Tamaulipas" },
    { "id": 29, "nombre": "Tlaxcala" },
    { "id": 30, "nombre": "Veracruz" },
    { "id": 31, "nombre": "Yucatán" },
    { "id": 32, "nombre": "Zacatecas" }
  ];

  public ClassicEditor = ClassicEditor;
  public EditorConfig = {
    language: 'es',
    removePlugins: ['Link', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload'],
    toolbar: ['heading', '|', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', '|', 'undo', 'redo'],
    placeholder: 'Descripción de la empresa, detalles acerca del puesto, requisitos, beneficios, información adicional...'
  }

  constructor(private areaService: AreaService,
    private vacantesService: VacantesService,
    private router: Router) { }

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

  filtrarAreas(event: any) {
    let query = event.query;
    this.areasFiltradas = [];

    for (let i = 0; i < this.areas.length; i++) {
      let area = this.areas[i];
      if (area.nombre.toLowerCase().indexOf(query.toLowerCase()) != -1) {
        this.areasFiltradas.push(area);
      }
    }
  }

  registrarVacante() {
    this.nuevaVacante.id_area_estudio = this.areaEstudioSeleccionada.id_area_estudios;
    this.nuevaVacante.descripcion_puesto_plain_text = viewToPlainText(this.editor.editing.view.document.getRoot());

    console.log(this.nuevaVacante);

    this.vacantesService.addVacante(this.nuevaVacante)
      .subscribe(response => {
        if (response.success) {
          this.router.navigateByUrl("/vacantes");
        }
      });
  }

  cancelar() {

  }

}
