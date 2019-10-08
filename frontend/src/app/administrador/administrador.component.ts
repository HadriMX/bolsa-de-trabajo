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
  datos = [1,2,3,4,5,6];
  estado = false;
  estado2 = false;
  estado3 = false; 
  estado4 = false; 
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
              $('#categoriaboton').css('border-width', '1px');

            } else {
              this.estadoimagen = false;
              this.estado = true;
              this.estado2 = false;
              this.estado3 = false;
              this.estado4 = false;
              this.funcioncolores1();
            }
      // Este es para el segundo boton 
        } else if (numero === 2) {
            if (this.estado2 === true) {
              this.estado2 = false;
              this.estadoimagen = true;
              $('#areas').css('border-width', '1px');

            } else {
              this.estado2 = true;
              this.estado = false;
              this.estado3 = false;
              this.estado4 = false;
              this.estadoimagen = false;
              this.funcioncolores2();
            }
      // Este es para el tercer boton 
        } else if(numero === 3) {
            if (this.estado3 === true) {
              this.estado3 = false;
              this.estadoimagen = true; 
              $('#subareas').css('border-width', '1px');

            } else {
              this.estado3 = true;
              this.estadoimagen = false;
              this.estado = false;
              this.estado2 = false;
              this.estado4 = false
              this.funcioncolores3(); 
            }
        } else {
          if (this.estado4 === true) {
            this.estado4 = false;
            this.estadoimagen = true;
            $('#usuarios').css('border-width', '1px');

          } else {
            this.estado4 = true;
            this.estadoimagen = false;
            this.estado = false;
            this.estado2 = false;
            this.estado3 = false;
            this.funcioncolores4();
          }
        }
  }

  // En esta parte se manejan los colores de los botones al momento de presionarlos
  //------------------------------------------------------------------------------------
  funcioncolores1() {
    $(function(){
      $('#subareas').css('border-width', '1px');
      $('#areas').css('border-width', '1px');
      $('#categoriaboton').css('border', 'inset');
      $('#usuarios').css('border-width', '1px'); 
    })
  }
  funcioncolores2() {
    $(function(){
      $('#subareas').css('border-width', '1px');
      $('#areas').css('border', 'inset');
      $('#categoriaboton').css('border-width', '1px');
      $('#usuarios').css('border-width', '1px');

    })
  }
  funcioncolores3() {
    $(function(){
      $('#subareas').css('border', 'inset');
      $('#areas').css('border-width', '1px');
      $('#categoriaboton').css('border-width', '1px');
      $('#usuarios').css('border-width', '1px');

    })
  }
  funcioncolores4() {
    $(function(){
       $('#subareas').css('border-width', '1px');
      $('#areas').css('border-width', '1px');
      $('#categoriaboton').css('border-width', '1px');
      $('#usuarios').css('border', 'inset'); 

    })
  }
  //------------------------------------------------------------------------------------
}
