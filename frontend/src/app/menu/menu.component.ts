import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  cursor: boolean = false;
  datos = [1,2,3,4,5]
  constructor() { }

  ngOnInit() {
    //$("#datoscompletos").modal("show");

  }
  buscar() {
    swal("Busqueda con exito!", "Se encontraron resultados de su busqueda!", "success");
  }
}
