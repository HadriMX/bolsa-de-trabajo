import { Component, OnInit, Input } from '@angular/core';
import { Area, Cat_empresa } from 'src/api/models/admin';
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
  @Input() nuevaCategoria : Cat_empresa={
    id:0,
    nombre_categoria:'',
    estatus:''
  }
  datoscategoria = [];
  datosarea = [];
  datossubarea = [];
  datos = [1,2,3,4,5,6];
  estado = false;
  estado2 = false;
  estado3 = false; 
  estado4 = false; 
  estadoimagen = true;

  
 
  
  
  // Esto es para agregar algo a la lista y se puede usar para agregar cosas a la base de datos
  
  
  btnAgregarArea  : boolean;
  btnAgregarCategoria : boolean;
  constructor(private adminservice:AdminService) { }
  update(){
    this.adminservice.get_areas()
    .subscribe((response) => {
      if (response.success)
      {
        this.datosarea = response.data;
        // this .datosarea= this.areas;
      }
      else {
        Swal.fire("Error", response.message, 'error');
      }
    });

    this.adminservice.get_categorias()
    .subscribe((response) => {
      if (response.success)
      {
        this.datoscategoria = response.data;
        // this .datosarea= this.areas;
      }
      else {
        Swal.fire("Error", response.message, 'error');
      }
    });
  }
  ngOnInit() {
    this.update();
  }
  
  add_areaEstudio() {
    const nombre = $('#area').val();
    if (nombre ==='') {
      Swal.fire("No ingreso ningun valor");
      } else {
        this.btnAgregarArea=true;
        this.adminservice.add_area(this.nuevaArea)
        .subscribe((response) => {
          if (response.success)
          {
            Swal.fire("correcto", response.message, 'success');
            this.datosarea.push(nombre);
            this.update();
          }
          else {
            Swal.fire("Error", response.message, 'error');
          }
    
          this.btnAgregarArea = false;
          
         $('#area').val('');
        });
        
   }

  }
  add_CategoriaEmpresa(){
    const nombre=$('#categoria').val();
    if (nombre===''){
      Swal.fire("No ingreso ningun valor");
    }else{
      this.btnAgregarCategoria=true;
      this.adminservice.add_categoria(this.nuevaCategoria)
      .subscribe((response) =>{
        if (response.success)
        {
          Swal.fire("Correcto", response.message, 'success')
          this.datoscategoria.push(nombre);
          this.update();
        }
        else{
          Swal.fire("Error", response.message, 'error');
        }

        this.btnAgregarCategoria=false;
        
        $('#categoria').val('');
      });
    }
    

  }
  eliminar(i) {
    this.datoscategoria.splice(i, 1);
  }
  // agregar(){
  //   this.btnagregarCliked=true;
  //   this.adminservice.add_area(this.nuevaArea)
  //   .subscribe((response) => {
  //     if (response.success)
  //     {
  //       Swal.fire("correcto", response.message, 'success');
  //       $("#categoria").val('');
  //     }
  //     else {
  //       Swal.fire("Error", response.message, 'error');
  //     }

  //     this.btnagregarCliked = false;
  //   });
  //  }


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
              this.estado4 = false;
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
              this.estado4 = false;
              this.estadoimagen = false;
              this.funcioncolores2();
            }
      // Este es para el tercer boton 
        } else if(numero === 3) {
            if (this.estado3 === true) {
              this.estado3 = false;
              this.estadoimagen = true; 
              $('#subareas').css('background', 'rgb(60, 143, 60)');

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
            $('#usuarios').css('background', 'rgb(75, 60, 143)');

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
      $('#categoriaboton').css('background', 'red');
      $('#areas').css('background', 'rgb(60, 143, 60)');
      $('#subareas').css('background', 'rgb(60, 143, 60)');
      $('#usuarios').css('background', 'rgb(75, 60, 143)');

    })
  }
  funcioncolores2() {
    $(function(){
      $('#areas').css('background', 'red');
      $('#categoriaboton').css('background', 'rgb(60, 143, 60)');
      $('#subareas').css('background', 'rgb(60, 143, 60)');
      $('#usuarios').css('background', 'rgb(75, 60, 143)');

    })
  }
  funcioncolores3() {
    $(function(){
      $('#subareas').css('background', 'red');
      $('#areas').css('background', 'rgb(60, 143, 60)');
      $('#categoriaboton').css('background', 'rgb(60, 143, 60)');
      $('#usuarios').css('background', 'rgb(75, 60, 143)');

    })
  }
  funcioncolores4() {
    $(function(){
      $('#subareas').css('background', 'rgb(60, 143, 60)');
      $('#areas').css('background', 'rgb(60, 143, 60)');
      $('#categoriaboton').css('background', 'rgb(60, 143, 60)');
      $('#usuarios').css('background', 'red');

    })
  }
  //------------------------------------------------------------------------------------
}
