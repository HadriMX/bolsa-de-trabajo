import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { Vacante} from 'src/app/models/vacantes';
import { VacantesService } from '../../services/vacantes.service';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, ControlContainer } from '@angular/forms';
import { Area } from 'src/app/models/admin';
import { Busqueda } from 'src/app/models/busqueda';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  cursor: boolean = false;

  //getters
  vacantes: Vacante[];
  areas: Area[];
  
  //ngModels de la busqueda
  // SelectedSalario: string = "0";
  // SelectedFecha: string = "0";
  // SelectedArea: string = "0";
  // InputTitulo: string = "";
  // InputUbicacion: string = "";

  @Input() busqueda: Busqueda = {
    SelectedSalario: "0",
    SelectedFecha: "0",
    SelectedArea: "0",
    InputTitulo: "",
    InputUbicacion: ""
  }
  

  constructor(private vacantesService : VacantesService, private AdminService : AdminService) {}

  ngOnInit() {
   this.getVacantes();
   this.getAreas();
  }

  getVacantes(){
    this.vacantesService.getVacantes(this.busqueda)
    .subscribe((response) => {
      if (response.success)
      {
        this.vacantes = response.data;
      }
      else {
        Swal.fire("Error", response.message, 'error');
      }
    });
  }

  getAreas(){
    this.AdminService.get_areas()
    .subscribe((response) => {
      if (response.success)
      {
        this.areas = response.data;
        console.log(this.areas);
      }
      else {
        Swal.fire("Error", response.message, 'error');
      }
    });
  }

  buscar() {
    // Swal.fire("Busqueda con exito!", "Se encontraron resultados de su busqueda!", "success");

    alert(this.busqueda.InputTitulo + " " + this.busqueda.InputUbicacion + " " + this.busqueda.SelectedSalario + " " + this.busqueda.SelectedFecha + " " + this.busqueda.SelectedArea)
    this.getVacantes();

  }

  limpiarFiltros(){
    this.busqueda.SelectedSalario = "0";
    this.busqueda.SelectedFecha = "0";
    this.busqueda.SelectedArea = "0";
    
  }
}