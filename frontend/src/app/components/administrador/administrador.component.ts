import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Area } from 'src/app/models/area';
import { Cat_empresa } from 'src/app/models/categoria'
import Swal from 'sweetalert2';
import { AreaService } from '../../services/area.service';
import { CatEmpresaService } from '../../services/cat-empresa.service'
import { SolicitudService } from '../../services/solicitud.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material';
import { CandidatoService } from 'src/app/services/candidato.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Vacante } from 'src/app/models/vacantes';
import { VacantesService } from '../../services/vacantes.service';
import { Busqueda } from 'src/app/models/busqueda';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  @Input() nuevaArea: Area = {
    id_area_estudio: 0,
    nombre: '',
    estatus: ''
  }

  @Input() nuevaCategoria: Cat_empresa = {
    id_tipo_empresa: 0,
    nombre_categoria: '',
    nombre_empresa: '',
    estatus: ''
  }

  datoscategoria = [];
  datosarea = [];
  datosCandidato = [];
  datosEmpresa = [];
  datos_solicitud = [];
  datos = [1, 2, 3, 4, 5, 6];
  estado = 0;
  estadoimagen = false;
  btnAgregarArea: boolean;
  btnAgregarCategoria: boolean;
  btnModificarCategoria: boolean;
  btnModificarArea: boolean;
  btncerrar_area: boolean;
  opc: any;
  AuxArea: string;
  AuxCategoria: string;
  AuxStatusCategoria: string;
  AuxStatusArea: string;
  // variables del dashboard
  canvas: any;
  ctx;
  chartColor;
  chartEmail;
  chartHours;

  infoCategoria: Cat_empresa = {
    id_tipo_empresa: 0,
    nombre_categoria: '',
    nombre_empresa: '',
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
  inputbooleano: boolean = false;

  ColumnasCategorias: string[] = ['nombre_empresa', 'estatus', 'acciones'];
  ColumnasAreas: string[] = ['nombre', 'estatus', 'acciones'];
  ColumnasCandidatos: string[] = ['email', 'candidato', 'estatus', 'acciones'];
  ColumnasEmpresas: string[] = ['email', 'empresa', 'telefono', 'estatus', 'acciones']
  dataSource_AreasEstudio = new MatTableDataSource<any>();
  dataSource_Categorias = new MatTableDataSource<any>();
  dataSource_Candidatos = new MatTableDataSource<any>();
  dataSource_Empresas = new MatTableDataSource<any>();

  //Filtro para los catalagos de areas de estudio, categorias y usuarios
  applyFilterAreas(filterValue: string) {
    this.dataSource_AreasEstudio.filter = filterValue.trim().toLowerCase();
  }
  applyFilterCategorias(filterValue: string) {
    this.dataSource_Categorias.filter = filterValue.trim().toLowerCase();
  }
  applyFilterCandidatos(filterValue: string) {
    this.dataSource_Candidatos.filter = filterValue.trim().toLowerCase();
  }
  applyFilterEmpresas(filterValue: string) {
    this.dataSource_Empresas.filter = filterValue.trim().toLowerCase();
  }

  //Ordenamiento de los datos de las tablas
  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.dataSource_AreasEstudio.sort = this.sort;
    this.dataSource_Categorias.sort = this.sort;
    this.dataSource_Candidatos.sort = this.sort;
    this.dataSource_Empresas.sort = this.sort;
  }

  //Paginación de las tablas
  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    if (this.opc === 1) {
      this.dataSource_Categorias.paginator = this.paginator
    }
    else if (this.opc === 2) {
      this.dataSource_AreasEstudio.paginator = this.paginator;
    }
    else if (this.opc === 4) {
      this.dataSource_Candidatos.paginator = this.paginator;
    }
  }
  // variales para las vacantes  
  infoVacante: Vacante = new Vacante();
  busqueda: Busqueda = {
    SelectedSalario: "0",
    SelectedFecha: "0",
    SelectedArea: "0",
    InputTitulo: "",
    InputUbicacion: "",
  }
  allItems: Vacante[] = [];

  constructor(private areaService: AreaService,
    private categoriaService: CatEmpresaService,
    private solicitudService: SolicitudService,
    private candidatoService: CandidatoService,
    private loginService: LoginService,
    private empresaService: EmpresaService,
    private vacantesService: VacantesService,
    private router: Router) { }


  ngOnInit() {
    // this.usuarioActual = this.currentUserService.getUsuarioActual();
    this.dashboard();
    this.getAreas();
    this.getCategorias();
    this.getSolicitudes();
    this.getCandidatos();
    this.getEmpresas();
  }
  //METODOS CRUD (C)
  add_areaEstudio() {
    const nombre = $('#area').val();
    if (nombre === '') {
      Swal.fire("No ingreso ningun valor");
    } else {
      this.btnAgregarArea = true;
      this.areaService.add_area(this.nuevaArea)
        .subscribe((response) => {
          if (response.success) {
            Swal.fire("correcto", "response.message", 'success');
            this.datosarea.push(nombre);
            this.getAreas();
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
            this.getCategorias();
            this.inputeffec();
          }
          else {
            Swal.fire("Error", response.message, 'error');
          }
          this.btnAgregarCategoria = false;
          $('#categoria').val('');
        });
    }
  }

  //METODOS CRUD (R)
  getAreas() {
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

  getCategorias() {
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

  getCandidatos() {
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

  getEmpresas() {
    this.empresaService.get_empresas()
      .subscribe((response) => {
        if (response.success) {
          this.datosEmpresa = response.data;
          this.dataSource_Empresas.data = this.datosEmpresa;
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

  getSolicitudes() {
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

  detalleArea(Area) {
    this.infoArea = Area;
    this.AuxArea = this.infoArea.nombre;
    this.AuxStatusArea = this.infoArea.estatus;
  }

  detalleCategoria(Cat_empresa) {
    this.infoCategoria = Cat_empresa;
    this.AuxCategoria = this.infoCategoria.nombre_empresa;
    this.AuxStatusCategoria = this.infoCategoria.estatus;
  }

  //METODOS CRUD (U)
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

  reactivarCandidato(id) {
    this.candidatoService.reactivar_candidato(id)
      .subscribe((response) => {
        if (response.success) {
          Swal.fire("Correcto", response.message, 'success');
          this.getCandidatos();
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      })
  }

  reactivarEmpresa(id) {
    this.empresaService.reactivarEmpresa(id)
      .subscribe((response) => {
        if (response.success) {
          Swal.fire("Correcto", response.message, 'success')
          this.getEmpresas();
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }


  //METODOS CRUD (D)
  deleteCandidato(id) {
    this.candidatoService.delete_candidato(id)
      .subscribe((response) => {
        if (response.success) {
          Swal.fire("Correcto", response.message, 'success');
          this.getCandidatos();
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      })
  }

  deleteEmpresa(id) {
    this.empresaService.delete_empresa(id)
      .subscribe((response) => {
        if (response.success) {
          Swal.fire("Correcto", response.message, 'success')
          this.getEmpresas();
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

  //UTILIDADES
  preguntarArea() {//Avisar si hay cambios sin guardar al modificar un area de estudio
    if ((this.AuxArea !== this.infoArea.nombre) || (this.AuxStatusArea !== this.infoArea.estatus)) {
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
          this.infoArea.estatus = this.AuxStatusArea;
          this.CerrarModales();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      })
    } else {
      this.CerrarModales();
    }
  }

  preguntarCategoria() {//Avisar si hay cambios sin guardar al modificar una categoria
    if ((this.AuxCategoria !== this.infoCategoria.nombre_empresa) || (this.AuxStatusCategoria !== this.infoCategoria.estatus)) {
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
          this.infoCategoria.estatus = this.AuxStatusCategoria;
          this.CerrarModales();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      })
    } else {
      this.CerrarModales();
    }
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

  radioChange( estatus:string) {
    this.applyFilterEmpresas(estatus);
}


  //UTILIDADES PARA EL ENCARGADO DE DISEÑO
  eliminar(i) {
    this.datoscategoria.splice(i, 1);
  }
  admin() {
    Swal.fire("Pendiente", 'Hay que ver como controlar la info del usuario');
  }
  CerrarModales() {
    (<any>$('#ModalModificarAreas')).modal('hide');
    (<any>$('#ModalModificarCat')).modal('hide');
  }

  categorias(numero) {
    this.inputbooleano = false;
    // Se selecciona Categorias de las empresas 
    if (numero === 1) {
      if (this.estado === 1) {
        this.estado = 0;
        $("#categoriaboton").css("border-bottom", "transparent");
      } else {
        $("#categoriaboton").css("border-bottom", "1px solid white");
        $("#areas,#usuarios,#usuariosactivos,#Auxiliares,#vacantesadmin").css("border-bottom", "transparent");
        this.estado = 1;
        this.opc = numero;
        this.estadoimagen = false;
      }
      // Se selecciona Aareas de estudio
    } else if (numero === 2) {
      if (this.estado === 2) {
        this.estado = 0;
        $("#areas").css("border-bottom", "transparent");
      } else {
        $("#areas").css("border-bottom", "1px solid white");
        $("#usuarios,#categoriaboton,#usuariosactivos,#Auxiliares,#vacantesadmin").css("border-bottom", "transparent");
        this.estadoimagen = false;
        this.estado = 2;
        this.opc = numero;
      }
      //Se selecciona las solicitudes de los usuarios    
    } else if (numero == 3) {
      if (this.estado === 3) {
        this.estado = 0;
        $("#usuarios").css("border-bottom", "transparent");
      } else {
        $("#usuarios").css("border-bottom", "1px solid white");
        $("#areas,#categoriaboton,#usuariosactivos,#Auxiliares,#vacantesadmin").css("border-bottom", "transparent");
        this.estado = 3;
        this.estadoimagen = false;
      }
      //Se selecciona el apartado de usuarios registrados 
    } else if (numero === 4) {
      if (this.estado === 4) {
        this.estado = 0;
        $("#usuariosactivos").css("border-bottom", "transparent");
      } else {
        $("#usuarios,#areas,#categoriaboton,#Auxiliares,#vacantesadmin").css("border-bottom", "transparent");
        $("#usuariosactivos").css("border-bottom", "1px solid white");
        this.opc = numero;
        this.estadoimagen = false;
        this.estado = 4;

      }
    } else if (numero === 4.1) {
      this.opc = numero;
    } else if (numero == 6) {
      if (this.estado === 6) {
        this.estado = 0;
        $("#vacantesadmin").css("border-bottom", "transparent");
      } else {
        $("#usuarios,#areas,#categoriaboton,#Auxiliares,#usuariosactivos").css("border-bottom", "transparent");
        $("#vacantesadmin").css("border-bottom", "1px solid white");
        this.estadoimagen = false;
        this.estado = 6;
      }
    } else {
      if (this.estadoimagen === true) {
        this.estadoimagen = false;
        $("#Auxiliares").css("border-bottom", "transparent");
      } else {
        $("#usuarios,#usuariosactivos,#areas,#categoriaboton,#vacantesadmin").css("border-bottom", "transparent");
        $("#Auxiliares").css("border-bottom", "1px solid white");
        this.estadoimagen = true;
        this.estado = 0;
      }
    }

  }
  inputeffec() {
    if (this.inputbooleano === false) {
      $(".searchBox:hover > .searchInput").css("width", "330px");
      $(".btnregistrar").css({
        "margin-block-start": "10%",
        "border-radius": "18px",
        "background-color": "#660551",
        "color": "white",
        "display": "inline-block",
      });
      this.inputbooleano = true;
    } else if (this.inputbooleano === true) {
      $(".searchBox:hover > .searchInput").css("width", "0px");
      this.inputbooleano = false;
      $(".btnregistrar").css("display", "none");
    }
  }

  logout() {
    this.loginService.logout().then(
      response => {
        if (response.success) {
          this.router.navigateByUrl("/login");
        } else {
          Swal.fire('Error en el servidor', response.message, 'error');
        }
      },
      reason => console.log(reason));
  }
  // aqui comienza el codigo de las vacantes que se muestran en el menu



  // aqui comienza el codigo para el dashboard 
  dashboard() {
    // aqui va el codigo para el dashboard

  }

}
