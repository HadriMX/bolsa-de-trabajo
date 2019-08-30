import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  numero = [];

  constructor() { }

  ngOnInit() {

  }
  agregar() {
    // const nombre = $('#categoria').val();
    // this.numero.push(nombre);
    // $('#categoria').val('');

  }
  eliminar(i) {
    this.numero.splice(i, 1);
  }
}
