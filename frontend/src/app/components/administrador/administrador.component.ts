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
  isLoading = false;
  datoscategoria = [];
  datosarea = [];
  datosCandidato = [];
  datosEmpresa = [];
  datos_solicitud = [];
  datos = [1, 2, 3, 4, 5, 6];
  estado = 0;
  estadoimagen = false;
  displayDialog:boolean;
  activo:boolean=true;
  inactivo:boolean=false;
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

  cols: any[];
  clonedTodos: { [s: string]: Cat_empresa; } = {};


  estatus123: any[];

 

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
  ColumnasCandidatos: string[] = ['candidato', 'email', 'genero', 'telefono', 'estatus', 'acciones'];
  ColumnasEmpresas: string[] = ['empresa', 'email', 'telefono', 'personaContacto', 'estatus', 'acciones']
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

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });




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
    else if (this.opc === 5) {
      this.dataSource_Empresas.paginator = this.paginator;
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
    this.getCandidatos('Alta');
    this.getEmpresas('Alta');

    this.cols = [
      { field: 'nombre_empresa', header: 'Nombre' },
      {field: 'estatus', header: 'Estatus' }
  ];

    this.estatus123=[
      {label: 'Alta', value:'A'},
      {label:'Baja',value:'B'}
    ]

  
  }
  //METODOS CRUD (C)
  add_areaEstudio() {
    const nombre = $('#area').val();
    if (nombre === '') {
      Swal.fire("No ingreso ningun valor");
    } else {
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
          $('#area').val('');
        });
    }
  }

  add_CategoriaEmpresa() {
    const nombre = $('#categoria23').val();
    if (nombre === '') {
      Swal.fire("No ingreso ningun valor");
    } else {
      this.categoriaService.add_categoria(this.nuevaCategoria)
        .subscribe((response) => {
          if (response.success) {
            Swal.fire("Correcto", response.message, 'success')
            this.datoscategoria.push(nombre);
            this.getCategorias();
            this.inputeffec();
            this.displayDialog=false;
            $('#categoria23').val('');
          }
          else {
            Swal.fire("Error", response.message, 'error');
          }
          
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

  showDialogToAdd() {
   
    this.displayDialog = true;
}

   getCategorias() {
    this.categoriaService.get_categoriasAdmin()
      .subscribe((response) => {
        if (response.success) {
          this.datoscategoria = response.data;
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

  getCandidatos(estatus: string) {
    this.candidatoService.get_candidatos(estatus)
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

  getEmpresas(estatus: string) {
    this.empresaService.get_empresas(estatus)
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
  update_area(nombre: string) {
    this.infoArea.nombre = nombre;
    this.areaService.update_area(this.infoArea)
      .subscribe((response) => {
        if (response.success) {
          Swal.fire("Correcto", response.message, 'success')
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

  updateEstatusArea(estatus: string) {
    this.isLoading = true;
    this.infoArea.estatus = estatus;
    this.areaService.update_area(this.infoArea)
      .subscribe((response) => {
        if (response.success) {
          Swal.fire("Correcto", response.message, 'success');
        } else {
          Swal.fire("Error", response.message, 'error');
        }
      this.isLoading=false
      });
  }

  updateCategoria() {
  
      
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
  updateEstatusCategoria(estatus:string,){
    this.isLoading=true;
  
    this.infoCategoria.estatus = estatus;
    this.categoriaService.update_categoria(this.infoCategoria)
      .subscribe((response) => {
        if (response.success) {
          Swal.fire("Correcto", response.message, 'success');
        } else {
          Swal.fire("Error", response.message, 'error');
        }
        this.isLoading=false;
      });
  }



  reactivarCandidato(id) {
    this.swalWithBootstrapButtons.fire({
      title: '¿Deseas reactivar el usuario?',
      text: "La cuenta tendra acceso al sistema",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.candidatoService.reactivar_candidato(id)
          .subscribe((response) => {
            if (response.success) {
              Swal.fire("Correcto", response.message, 'success');
              this.getCandidatos('Baja');
            }
            else {
              Swal.fire("Error", response.message, 'error');
            }
          });
      } else {
      }
    });
  }

  reactivarEmpresa(id) {
    this.swalWithBootstrapButtons.fire({
      title: '¿Deseas reactivar el usuario?',
      text: "La cuenta tendra acceso al sistema",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.empresaService.reactivarEmpresa(id)
          .subscribe((response) => {
            if (response.success) {
              Swal.fire("Correcto", response.message, 'success')
              this.getEmpresas('Baja');
            }
            else {
              Swal.fire("Error", response.message, 'error');
            }
          });
      } else {
      }
    });
  }


  //METODOS CRUD (D)
  deleteCandidato(id) {
    this.swalWithBootstrapButtons.fire({
      title: '¿Deseas eliminar el usuario?',
      text: "La cuenta del usuario quedará inhabilitada",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.candidatoService.delete_candidato(id)
          .subscribe((response) => {
            if (response.success) {
              Swal.fire("Correcto", response.message, 'success');
              this.getCandidatos('Alta');
            }
            else {
              Swal.fire("Error", response.message, 'error');
            }
          });
      } else {
      }
    });
  }

  deleteEmpresa(id) {
    this.swalWithBootstrapButtons.fire({
      title: '¿Deseas eliminar el usuario?',
      text: "La cuenta del usuario quedará inhabilitada",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.empresaService.delete_empresa(id)
          .subscribe((response) => {
            if (response.success) {
              Swal.fire("Correcto", response.message, 'success')
              this.getEmpresas('Alta');
            }
            else {
              Swal.fire("Error", response.message, 'error');
            }
          });
      } else {
      }
    });
  }

  //UTILIDADES

  onRowEditInit(todo:Cat_empresa) {
  this.clonedTodos[todo.id_tipo_empresa]={...todo};
  }
  onRowEditCancel(todo: Cat_empresa, index: number) {
    this.datoscategoria[index] = this.clonedTodos[todo.id_tipo_empresa];
    delete this.clonedTodos[todo.id_tipo_empresa];
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

  //UTILIDADES PARA EL ENCARGADO DE DISEÑO
 
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
      //Se selecciona el apartado de usuarios candidatos registrados 
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
    } else if (numero === 5) {
      if (this.estado === 5) {
        this.estado = 0;
        $("#empresasActivas").css("border-bottom", "transparent");
      } else {
        $("#usuarios,#areas,#categoriaboton,#Auxiliares,#vacantesadmin").css("border-bottom", "transparent");
        $("#empresasActivas").css("border-bottom", "1px solid white");
        this.opc = numero;
        this.estadoimagen = false;
        this.estado = 5;

      }
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
