import { Component, OnInit, Input, ViewChild,ViewChildren, QueryList } from '@angular/core';
import { Area, Cat_empresa } from 'src/app/models/admin';
import Swal from 'sweetalert2';
import { AdminService } from '../../services/admin.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'; 


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
  datos_solicitud=[];
  datos = [1,2,3,4,5,6]; 
  estado = false;
  estado2 = false;
  estado3 = false; 
  estado4 = false; 
  estadoimagen = true;
  btnAgregarArea  : boolean;
  btnAgregarCategoria : boolean;

  ColumnasCategorias: string[]=['id_tipo_empresa','nombre_empresa','estatus'];
  ColumnasAreas: string[] = ['id_area_estudio', 'nombre', 'estatus'];
  dataSource_AreasEstudio = new MatTableDataSource<any>();
  dataSource_Categorias= new MatTableDataSource<any>();
 

  applyFilterAreas(filterValue: string) {
    this.dataSource_AreasEstudio.filter = filterValue.trim().toLowerCase();
  }
  applyFilterCategorias(filterValue: string) {
    this.dataSource_Categorias.filter = filterValue.trim().toLowerCase();
  }

  private paginator: MatPaginator;
  private sort: MatSort;
  private paginator1: MatPaginator;
  private sort1: MatSort;

  
  @ViewChild(MatSort,{static:false}) set matSort(ms: MatSort) {
    this.sort = ms;

    this.setDataSourceAreasAttributes();
  }

  @ViewChild(MatPaginator,{static:false}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;

    this.setDataSourceAreasAttributes();
  }

  setDataSourceAreasAttributes() {
    
    this.dataSource_AreasEstudio.paginator = this.paginator;
    this.dataSource_AreasEstudio.sort = this.sort;
  }
  @ViewChild(MatPaginator,{static:false}) set matPaginator2 (mp2:MatPaginator){
    this.paginator1=mp2;
    this.setDataSourceCategoriasAttributes();
  }
  @ViewChild(MatSort,{static:false}) set matSort2 (ms2:MatSort){
    this.sort1=ms2;
    this.setDataSourceCategoriasAttributes();
  }
  setDataSourceCategoriasAttributes(){
    this.dataSource_Categorias.paginator=this.paginator1;
    this.dataSource_Categorias.sort=this.sort1;
  }

  ngAfterViewInit(): void {
    this.dataSource_AreasEstudio.paginator=this.paginator;
    this.dataSource_AreasEstudio.sort=this.sort;
    this.dataSource_Categorias.paginator=this.paginator1;
    this.dataSource_Categorias.sort=this.sort1;
  }

  
  constructor(private adminservice:AdminService) { }
  MostrarSolicitudes(){
    this.adminservice.get_solicitudes()
    .subscribe((response) => {
      if (response.success)
      {
        this.datos_solicitud = response.data;
      }
      else {
        Swal.fire("Error", response.message, 'error');
      }
    });
  }

  MostrarAreas(){
    this.adminservice.get_areas()
    .subscribe((response) => {
      if (response.success)
      {
        this.datosarea = response.data;
        this.dataSource_AreasEstudio.data=this.datosarea;

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
        this.dataSource_Categorias.data=this.datoscategoria;


      }
      else {
        Swal.fire("Error", response.message, 'error');
      }
    });
  }

  ngOnInit() {    
    this.MostrarAreas();
    this.MostrarCategorias();
    this.MostrarSolicitudes();
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
