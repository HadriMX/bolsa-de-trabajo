import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  cursor: boolean = false;
  constructor() { }

  ngOnInit() {
    $("#datoscompletos").modal("show");

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
    swal("Busqueda con exito!", "Se encontraron resultados de su busqueda!", "success");
  }
}
