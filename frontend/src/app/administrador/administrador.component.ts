import { Component, OnInit, Input } from '@angular/core';
import { Area} from 'src/api/models/area';
import Swal from 'sweetalert2';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  @Input() nuevaArea : Area={
    id:0,
    nombre_area:'',
    estatus:''
  }
  datoscategoria = [];
  datosarea = [];
  datossubarea = [];
  estado = false;
  estado2 = false;
  estado3 = false; 
  estadoimagen = true;

  

  
  
  // Esto es para agregar algo a la lista y se puede usar para agregar cosas a la base de datos
  agregar3() {
    const nombre = $('#categoria').val();
    if (nombre === '') {
      Swal.fire("No ingreso ningun valor");
      } else {
      this.datoscategoria.push(nombre);
      
      $('#categoria').val('');

    }
    
    
  }
  
  btnagregarCliked: boolean;
  constructor(private adminservice:AdminService) { }
  ngOnInit() {}
  
  // Se usar para eliminar cosas de la lista, se puede usar para eliminar cosas de la base de datos
  eliminar(i) {
    this.datoscategoria.splice(i, 1);
  }
  agregar(){
    this.btnagregarCliked=true;
    this.adminservice.add_area(this.nuevaArea)
    .subscribe((response) => {
      if (response.success)
      {
        Swal.fire("correcto", response.message, 'success');
        $("#categoria").val('');
      }
      else {
        Swal.fire("Error", response.message, 'error');
      }

      this.btnagregarCliked = false;
    });
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
