import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Area } from 'src/app/models/area';
import { Cat_empresa } from 'src/app/models/categoria'
import Swal from 'sweetalert2';
import { AreaService } from '../../services/area.service';
import { CatEmpresaService } from '../../services/cat-empresa.service'
import { SolicitudService } from '../../services/solicitud.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginService } from 'src/app/services/login.service';
import { CurrentUserService } from 'src/app/services/current-user.service';
import { CandidatoService } from 'src/app/services/candidato.service';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  @Input() NuevaArea: Area = {
    id_area_estudio: 0,
    nombre: '', 
    estatus: ''
  }

  @Input() NuevaCategoria: Cat_empresa = {
    id_tipo_empresa: 0,
    nombre_categoria: '',
    nombre_empresa:'',
    estatus: ''
  }
  datoscategoria = [];
  datosarea = [];
  datosCandidato=[];
  datos_solicitud = [];
  datos = [1, 2, 3, 4, 5, 6];
  estado = 0;
  estadoimagen = true;
  btnAgregarArea: boolean;
  btnAgregarCategoria: boolean;
  btnModificarCategoria: boolean;
  btnModificarArea: boolean;
  btncerrar_area: boolean;
  opc: any;
  AuxArea: string;
  AuxCategoria: string;
  AuxStatusCategoria: string;
  AuxStatusArea:string;

  infoCategoria: Cat_empresa = {
    id_tipo_empresa: 0,
    nombre_categoria: '',
    nombre_empresa:'',
    estatus: ''
  }

  infoArea: Area = {
    id_area_estudio: 0,
    nombre: '',
    estatus: ''
  }
  private paginator: MatPaginator;
  private sort: MatSort;
  public dialog: MatDialog;


  ColumnasCategorias: string[] = ['nombre_empresa', 'estatus', 'acciones'];
  ColumnasAreas: string[] = ['nombre', 'estatus', 'acciones']; 
  ColumnasCandidatos: string[]=['email','candidato','estatus'];
  dataSource_AreasEstudio = new MatTableDataSource<any>();
  dataSource_Categorias = new MatTableDataSource<any>();
  dataSource_Candidatos = new MatTableDataSource<any>();

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

  constructor(private areaService: AreaService, private categoriaService: CatEmpresaService,
    private solicitudService: SolicitudService, private currentUserService: CurrentUserService,
    private loginService: LoginService, private candidatoService:CandidatoService) { }
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

  detalleCategoria(Cat_empresa) {
    this.infoCategoria = Cat_empresa;
    this.AuxCategoria=this.infoCategoria.nombre_empresa;
    this.AuxStatusCategoria=this.infoCategoria.estatus;
  }

  detalleArea(Area) {
    this.infoArea = Area;
    this.AuxArea = this.infoArea.nombre; 
    this.AuxStatusArea=this.infoArea.estatus;
  }

  estatus_areas(status: string) {
    if (status === 'A')
      return "Alta";
    else
      return "Baja";
  }
  estatus_categorias(status: string) {
    if (status === 'A')
      return "Alta";
    else
      return "Baja";
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
    // this.usuarioActual = this.currentUserService.getUsuarioActual();

    this.MostrarAreas();
    this.MostrarCategorias();
    this.MostrarSolicitudes();
    this.get_candidatos();
  }

  add_areaEstudio() {
    const nombre = $('#area').val();
    if (nombre === '') {
      Swal.fire("No ingreso ningun valor");
    } else {
      this.btnAgregarArea = true;
      this.areaService.add_area(this.NuevaArea)
        .subscribe((response) => {
          if (response.success) {
            Swal.fire("correcto", "response.message", 'success');
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

  preguntarArea() {
    if ( (this.AuxArea!==this.infoArea.nombre)||(this.AuxStatusArea!==this.infoArea.estatus)) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: '¿Salir sin guardar?',
        text: "Hay cambios pendientes",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
      
          this.infoArea.nombre = this.AuxArea;
          this.infoArea.estatus= this.AuxStatusArea;
          this.CerrarModales();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      })
    }else{
      this.CerrarModales();
    }
  }

  preguntarCategoria() {
    if ( (this.AuxCategoria!==this.infoCategoria.nombre_empresa)||(this.AuxStatusCategoria!==this.infoCategoria.estatus)) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      swalWithBootstrapButtons.fire({
        title: '¿Salir sin guardar?',
        text: "Hay cambios pendientes",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
      
          this.infoCategoria.nombre_empresa = this.AuxCategoria;
          this.infoCategoria.estatus= this.AuxStatusCategoria;
          this.CerrarModales();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      })
    }else{
      this.CerrarModales();
    }
  }


  add_CategoriaEmpresa() {
    const nombre = $('#categoria').val();
    if (nombre === '') {
      Swal.fire("No ingreso ningun valor");
    } else {
      this.btnAgregarCategoria = true;
      this.categoriaService.add_categoria(this.NuevaCategoria)
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

  update_categoria() {
    const nombre = $('#NomCategoria').val();
    if (nombre === '') {
      Swal.fire("No ingreso ningun valor");
    } else {
      this.btnModificarCategoria = true;
      this.categoriaService.update_categoria(this.infoCategoria)
        .subscribe((response) => {
          if (response.success) {
            Swal.fire("Correcto", "Cambios guardados", 'success')
            this.CerrarModales();
          }
          else {
            Swal.fire("Error", "Error al modificar", 'error');
          }
        });
    }
  }

  get_candidatos(){
    this.candidatoService.get_candidatos()
    .subscribe((response) => {
      if (response.success) {
        this.datosCandidato = response.data;
        this.dataSource_Candidatos.data = this.datosCandidato;
      }
      else {
        Swal.fire("Error", response.message, 'error');
      }
    });
  }

  update_area() {
    const nombre = $('#NomArea').val();
    if (nombre === '') {
      Swal.fire("No ingreso ningun valor");
    } else {
      this.btnModificarArea = true;
      this.areaService.update_area(this.infoArea)
        .subscribe((response) => {
          if (response.success) {
            Swal.fire("Correcto", "Cambios guardados", 'success')
            this.CerrarModales();
          }
          else {
            Swal.fire("Error", "Error al modificar", 'error');
          }
        });
    }
  }
  admin() {
    Swal.fire("Pendiente", 'Hay que ver como controlar la info del usuario');
  }

  CerrarModales() {
    $('#ModalModificarAreas').modal('hide');
    $('#ModalModificarCat').modal('hide');
  }

  eliminar(i) {
    this.datoscategoria.splice(i, 1);
  }

  categorias(numero) {
    // Se selecciona Categorias de las empresas 
    if (numero === 1) {
      if (this.estado === 1) {
        this.estadoimagen = true;
        this.estado = 0;
        $("#categoriaboton").css("border-bottom", "transparent");
      } else {
        $("#categoriaboton").css("border-bottom", "1px solid white");
        $("#areas").css("border-bottom", "transparent");
        $("#usuarios").css("border-bottom", "transparent");
        $("#usuariosactivos").css("border-bottom", "transparent");
        this.estadoimagen = false;
        this.estado = 1;
        this.opc = numero;
      }
      // Se selecciona Aareas de estudio
    } else if (numero === 2) {
      if (this.estado === 2) {
        this.estado = 0;
        this.estadoimagen = true;
        $("#areas").css("border-bottom", "transparent");

      } else {
        $("#areas").css("border-bottom", "1px solid white");
        $("#usuarios").css("border-bottom", "transparent");
        $("#categoriaboton").css("border-bottom", "transparent");
        $("#usuariosactivos").css("border-bottom", "transparent");
        this.estado = 2;
        this.estadoimagen = false;
        this.opc = numero;
      }
      //Se selecciona las solicitudes de los usuarios    
    } else if (numero == 3) {
      if (this.estado === 3) {
        this.estado = 0;
        this.estadoimagen = true;
        $("#usuarios").css("border-bottom", "transparent");

      } else {
        $("#usuarios").css("border-bottom", "1px solid white");
        $("#areas").css("border-bottom", "transparent");
        $("#categoriaboton").css("border-bottom", "transparent");
        $("#usuariosactivos").css("border-bottom", "transparent");
        this.estado = 3;
        this.estadoimagen = false;

      }
    } else if (numero === 4) {
      if (this.estado === 4) {
        this.estado = 0;
        this.estadoimagen = true;
        $("#usuariosactivos").css("border-bottom", "transparent");
      } else {
        $("#usuario").css("border-bottom", "transparent");
        $("#usuariosactivos").css("border-bottom", "1px solid white");
        $("#areas").css("border-bottom", "transparent");
        $("#categoriaboton").css("border-bottom", "transparent");
        this.estado = 4;
        this.estadoimagen = false;
      }
    }
  }
}
