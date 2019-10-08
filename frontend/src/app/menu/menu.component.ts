import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
/* import { Vacante } from 'src/api/models/vacantes';
import { VacantesService } from '../vacantes.service';
 */
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  cursor: boolean = false;
  datos = [1,2,3,4,5]

/*   
private vacantesService : VacantesService
vacantes: Vacante[];
 */
  constructor() {
    
  }

  ngOnInit() {
    /* this.vacantesService.getVacantes()
      .subscribe((response) => {
        if (response.success)
        {
          this.vacantes = response.data;
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }

      }); */
  }

  buscar() {
    Swal.fire("Busqueda con exito!", "Se encontraron resultados de su busqueda!", "success");
  }
}