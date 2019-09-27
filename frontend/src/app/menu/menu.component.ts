import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  cursor: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  busquedaavanzada() {
    if ($('#busquedaavanzada').is(':visible')) {
      $('#texto').text('Busqueda Avanzada');
    } else {
      $('#texto').text('Cancelar Busqueda');
    }

    $('#busquedaavanzada').toggle(); //muestro mediante id
  }

  buscar() {
    Swal.fire("Busqueda con exito!", "Se encontraron resultados de su busqueda!", "success");
  }
}
