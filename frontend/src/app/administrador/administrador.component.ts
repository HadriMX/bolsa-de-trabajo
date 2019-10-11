import { Component, OnInit, Input, HostListener } from '@angular/core';
import * as $ from 'jquery';
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
  MostrarAreas(){
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
  }
  MostrarCategorias(){
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
    this.MostrarAreas();
    this.MostrarCategorias();
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
            this.MostrarAreas();
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
          this.MostrarCategorias();
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
/*   arriba() {
    $('body, html').animate({
      scrollTop:'0px'
    }, 500);
  }

@HostListener('body:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    alert('hola');
    if ($(window).scrollTop() > 200) {
      $('.ir-arriba').slideDown(300);
    } else {
      $('.ir-arriba').slideUp(300);
    }
  }   */
}
