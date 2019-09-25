import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  datoscategoria = [];
  datosarea = [];
  datossubarea = [];
  estado = false;
  estado2 = false;
  estado3 = false; 
  estadoimagen = true;
  constructor() { }
  ngOnInit() {}
  // Esto es para agregar algo a la lista y se puede usar para agregar cosas a la base de datos
  agregar() {
    const nombre = $('#categoria').val();
    if (nombre === '') {
      swal("No ingreso ningun valor");
      } else {
      this.datoscategoria.push(nombre);
      $('#categoria').val('');

    }
  }
  // Se usar para eliminar cosas de la lista, se puede usar para eliminar cosas de la base de datos
  eliminar(i) {
    this.datoscategoria.splice(i, 1);
  }

  categorias(numero) {
        // Este es para el primer boton 
        if (numero === 1) {
            if (this.estado === true) {
              this.estadoimagen = true;
              this.estado = false;
              $('#categoriaboton').css('background', 'rgb(60, 143, 60)');

            } else {
              this.estadoimagen = false;
              this.estado = true;
              this.estado2 = false;
              this.estado3 = false;
              this.funcioncolores1();
            }
      // Este es para el segundo boton 
        } else if (numero === 2) {
            if (this.estado2 === true) {
              this.estado2 = false;
              this.estadoimagen = true;
              $('#areas').css('background', 'rgb(60, 143, 60)');

            } else {
              this.estado2 = true;
              this.estado = false;
              this.estado3 = false;
              this.estadoimagen = false;
              this.funcioncolores2();
            }
      // Este es para el tercer boton 
        } else {
            if (this.estado3 === true) {
              this.estado3 = false;
              this.estadoimagen = true; 
              $('#subareas').css('background', 'rgb(60, 143, 60)');

            } else {
              this.estado3 = true;
              this.estadoimagen = false;
              this.estado = false;
              this.estado2 = false;
              this.funcioncolores3(); 
            }
        }    
  }

  // En esta parte se manejan los colores de los botones al momento de presionarlos
  //------------------------------------------------------------------------------------
  funcioncolores1() {
    $(function(){
      $('#categoriaboton').css('background', 'red');
      $('#areas').css('background', 'rgb(60, 143, 60)');
      $('#subareas').css('background', 'rgb(60, 143, 60)');
    })
  }
  funcioncolores2() {
    $(function(){
      $('#areas').css('background', 'red');
      $('#categoriaboton').css('background', 'rgb(60, 143, 60)');
      $('#subareas').css('background', 'rgb(60, 143, 60)');
    })
  }
  funcioncolores3() {
    $(function(){
      $('#subareas').css('background', 'red');
      $('#areas').css('background', 'rgb(60, 143, 60)');
      $('#categoriaboton').css('background', 'rgb(60, 143, 60)');
    })
  }
  //------------------------------------------------------------------------------------
}
