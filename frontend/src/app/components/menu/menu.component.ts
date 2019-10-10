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
  SelectedSalario: string = "0";
  SelectedFecha: string = "0";
  SelectedArea: string = "0";
  InputTitulo: string = "";
  InputUbicacion: string = "";

  @Input() busqueda: Busqueda = {
    SelectedSalario: this.SelectedArea,
    SelectedFecha: this.SelectedFecha,
    SelectedArea: this.SelectedArea,
    InputTitulo: this.InputTitulo,
    InputUbicacion: this.InputUbicacion
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
  
    if (this.InputTitulo.trim() == "") {
      this.InputTitulo = "0";
    }
    if (this.InputUbicacion.trim() == "") {
      this.InputUbicacion = "0";
    }

    //llamar funcion de busqueda
    // alert(this.InputTitulo + " " + this.InputUbicacion + " " + this.SelectedSalario + " " + this.SelectedFecha + " " + this.SelectedArea)
    
    this.getVacantes();
    
    if (this.InputTitulo == "0") {
      this.InputTitulo = "";
    }
    if (this.InputUbicacion == "0") {
      this.InputUbicacion = "";
    }

  }

  limpiarFiltros(){
    this.SelectedSalario = "0";
    this.SelectedFecha = "0";
    this.SelectedArea = "0";
    this.buscar();
  }
}