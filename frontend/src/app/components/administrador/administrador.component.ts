import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { Area } from 'src/app/models/area';
import { Cat_empresa } from 'src/app/models/categoria'
import Swal from 'sweetalert2';
import { AreaService } from '../../services/area.service';
import { CatEmpresaService} from '../../services/cat-empresa.service'
import { SolicitudService } from '../../services/solicitud.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';




@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  @Input() nuevaArea : Area={
    id_area_estudio:0,
    nombre:'',
    estatus:''
  }

  
  @Input() nuevaCategoria: Cat_empresa = {
    id_tipo_empresa: 0,
    nombre_categoria: '',
    estatus: ''
  }
  datoscategoria = [];
  datosarea = [];
  datossubarea = [];
  datos_solicitud = [];
  datos = [1, 2, 3, 4, 5, 6];
  estado = false;
  estado2 = false;
  estado3 = false;
  estado4 = false;
  estadoimagen = true;
  btnAgregarArea: boolean;
  btnAgregarCategoria: boolean;
  btnModificarCategoria: boolean;
  opc: any;
  infoCategoria: Cat_empresa={
    id_tipo_empresa:0,
    nombre_categoria:'',
    estatus:''
  }

  infoArea: Area={
    id_area_estudio:0,
    nombre:'',
    estatus:''
  }
  private paginator: MatPaginator;
  private sort: MatSort;
  public dialog: MatDialog;


  ColumnasCategorias: string[] = ['nombre_empresa', 'estatus','acciones'];
  ColumnasAreas: string[] = ['nombre', 'estatus','acciones'];
  dataSource_AreasEstudio = new MatTableDataSource<any>();
  dataSource_Categorias = new MatTableDataSource<any>();

  //Filtro para los catalagos de areas de estudio y categorias de empresas
  applyFilterAreas(filterValue: string) {
    this.dataSource_AreasEstudio.filter = filterValue.trim().toLowerCase();
  }
  applyFilterCategorias(filterValue: string) {
    this.dataSource_Categorias.filter = filterValue.trim().toLowerCase();
  }

  //Ordenamiento de los datos de las tablas
  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;

    this.dataSource_AreasEstudio.sort = this.sort;
    this.dataSource_Categorias.sort = this.sort;
  }

  //Paginación de las tablas
  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource_AreasEstudio.paginator = this.paginator;
    if (this.opc === 1) {
      this.dataSource_Categorias.paginator = this.paginator
    }
    else {
      this.dataSource_AreasEstudio.paginator = this.paginator;
    }
  }

  constructor(private areaService: AreaService, private categoriaService:CatEmpresaService, private solicitudService:SolicitudService) { }
  MostrarSolicitudes() {
    this.solicitudService.get_solicitudes()
      .subscribe((response) => {
        if (response.success) {
          this.datos_solicitud = response.data;
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

  detalleCategoria(Cat_empresa){
    this.infoCategoria = Cat_empresa;
  }

  detalleArea(Area){
    this.infoArea= Area;
  }


  MostrarAreas() {
    this.areaService.get_areasAdmin()
      .subscribe((response) => {
        if (response.success) {
          this.datosarea = response.data;
          this.dataSource_AreasEstudio.data = this.datosarea;
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }


  MostrarCategorias() {
    this.categoriaService.get_categoriasAdmin()
      .subscribe((response) => {
        if (response.success) {
          this.datoscategoria = response.data;
          this.dataSource_Categorias.data = this.datoscategoria;
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
    if (nombre === '') {
      Swal.fire("No ingreso ningun valor");
    } else {
      this.btnAgregarArea = true;
      this.areaService.add_area(this.nuevaArea)
        .subscribe((response) => {
          if (response.success) {
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

  add_CategoriaEmpresa() {
    const nombre = $('#categoria').val();
    if (nombre === '') {
      Swal.fire("No ingreso ningun valor");
    } else {
      this.btnAgregarCategoria = true;
      this.categoriaService.add_categoria(this.nuevaCategoria)
        .subscribe((response) => {
          if (response.success) {
            Swal.fire("Correcto", response.message, 'success')
            this.datoscategoria.push(nombre);
            this.MostrarCategorias();
          }
          else {
            Swal.fire("Error", response.message, 'error');
          }
          this.btnAgregarCategoria = false;
          $('#categoria').val('');
        });
    }
  }

  update_categoria(){
    const nombre = $('#CategoriaMod').val();
    if (nombre === '') {
      Swal.fire("No ingreso ningun valor");
    } else {
      this.btnModificarCategoria = true;
      this.categoriaService.update_categoria(this.nuevaCategoria)
        .subscribe((response) => {
          if (response.success) {
            Swal.fire("Correcto", response.message, 'success')
            this.datoscategoria.push(nombre);
            this.MostrarCategorias();
          }
          else {
            Swal.fire("Error", response.message, 'error');
          }
          this.btnAgregarCategoria = false;
          $('#categoria').val('');
        });
    }
  }

  eliminar(i) {
    this.datoscategoria.splice(i, 1);
  }

  categorias(numero) {
    // Se selecciona Categorias de las empresas 
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
        this.opc = numero;
      }
      // Se selecciona Aareas de estudio
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
        this.opc = numero;
      }
      //Se selecciona las solicitudes de los usuarios    
    } else if (numero == 3) {
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
    $(function () {
      $('#subareas').css('border-width', '1px');
      $('#areas').css('border-width', '1px');
      $('#categoriaboton').css('border', 'inset');
      $('#usuarios').css('border-width', '1px');
    })
  }
  funcioncolores2() {
    $(function () {
      $('#subareas').css('border-width', '1px');
      $('#areas').css('border', 'inset');
      $('#categoriaboton').css('border-width', '1px');
      $('#usuarios').css('border-width', '1px');
    })
  }
  funcioncolores3() {
    $(function () {
      $('#subareas').css('border', 'inset');
      $('#areas').css('border-width', '1px');
      $('#categoriaboton').css('border-width', '1px');
      $('#usuarios').css('border-width', '1px');
    })
  }
  funcioncolores4() {
    $(function () {
      $('#subareas').css('border-width', '1px');
      $('#areas').css('border-width', '1px');
      $('#categoriaboton').css('border-width', '1px');
      $('#usuarios').css('border', 'inset');
    })
  }
  //------------------------------------------------------------------------------------
}
