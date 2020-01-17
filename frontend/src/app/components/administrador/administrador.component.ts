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
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
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
  auxNombreCategoira;
  isLoading = false;
  datosCategoria = [];
  datosArea = [];
  datosCandidato = [];
  datosEmpresa = [];
  datos_solicitud = [];
  datos = [1, 2, 3, 4, 5, 6];
  estado = 0;
  estadoimagen = false;
  displayDialogCategoria: boolean;
  displayDialogArea: boolean;
  activo: boolean = true;
  inactivo: boolean = false;
  btncerrar_area: boolean;
  opc: any;
  // variables del dashboard
  canvas: any;
  ctx;
  chartColor;
  chartEmail;
  chartHours;

  columnasCategoria: any[];
  columnasArea: any[];
  columnasCandidato: any[];
  columnasEmpresa: any[];
  clonCategoria: { [s: string]: Cat_empresa; } = {};
  clonArea: { [s: string]: Area } = {};


  estatus: any[];

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

  ColumnasEmpresas: string[] = ['empresa', 'email', 'telefono', 'personaContacto', 'estatus', 'acciones']



  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

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

    this.columnasCategoria = [
      { field: 'nombre_empresa', header: 'Nombre' },
      { field: 'estatus', header: 'Estatus' }
    ];

    this.columnasArea = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'estatus', header: 'Estatus' }
    ]

    this.columnasCandidato = [
      { field: 'candidato', header: 'Candidato' },
      { field: 'email', header: 'Email' },
      { field: 'genero', header: 'Genero' },
      { field: 'telefono', header: 'Teléfono' },
      { field: 'estatus', header: 'Estatus' }
    ]

    this.columnasEmpresa = [
      { field: 'nombre_empresa', header: 'Empresa' },
      { field: 'email', header: 'Email' },
      { field: 'telefono', header: 'Teléfono' },
      { field: 'nombre_persona_contacto', header: 'Persona contacto' },
      { field: 'status', header: 'Estatus' }
    ]

    this.estatus = [
      { label: 'Alta', value: 'A' },
      { label: 'Baja', value: 'B' }
    ]


  }
  //METODOS CRUD (C)
  add_areaEstudio() {
    const nombre = $('#nomArea').val();
    if (nombre === '') {
      Swal.fire('Error', "No ingreso ningun valor", 'error');
    } else {
      this.areaService.add_area(this.nuevaArea)
        .subscribe((response) => {
          if (response.success) {
            Swal.fire("correcto", "response.message", 'success');
            this.datosArea.push(nombre);
            this.getAreas();
            this.displayDialogArea = false;
            $('#nomArea').val('');
          }
          else {
            Swal.fire("Error", response.message, 'error');
          }

        });
    }
  }

  add_CategoriaEmpresa() {
    const nombre = $('#nomCategoria').val();
    if (nombre === '') {
      Swal.fire('Error', "No ingreso ningun valor", 'error');
    } else {
      this.categoriaService.add_categoria(this.nuevaCategoria)
        .subscribe((response) => {
          if (response.success) {
            Swal.fire("Correcto", response.message, 'success')
            this.datosCategoria.push(nombre);
            this.getCategorias();
            this.displayDialogCategoria = false;
            $('#nomCategoria').val('');
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
          this.datosArea = response.data;
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
      });
  }

  getCategorias() {
    this.categoriaService.get_categoriasAdmin()
      .subscribe((response) => {
        this.isLoading = true;
        if (response.success) {
          this.datosCategoria = response.data;
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }
        this.isLoading = false;
      });

  }

  getCandidatos(estatus: string) {
    this.candidatoService.get_candidatos(estatus)
      .subscribe((response) => {
        if (response.success) {
          this.datosCandidato = response.data;
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
  }

  detalleCategoria(Cat_empresa) {
    this.infoCategoria = Cat_empresa;
  }

  //METODOS CRUD (U)
  updateArea(idArea) {
    var index = this.datosArea.map(function (datos) { return datos.id_area_estudio; }).indexOf(idArea);
    const nombre = $('#modArea').val();
    if (nombre === '') {
      Swal.fire('Error', "No ingreso ningun valor", 'error');
    } else {
      this.areaService.update_area(this.datosArea[index])
        .subscribe((response) => {
          if (response.success) {
            Swal.fire("Correcto", response.message, 'success')
          }
          else {
            Swal.fire("Error", response.message, 'error');
          }
        });
    }
  }

  updateCategoria(idCategoria) {
    var index = this.datosCategoria.map(function (datos) { return datos.id_tipo_empresa; }).indexOf(idCategoria);
    const nombre = $('#modCategoria').val();
    if (nombre === '') {
      Swal.fire('Error', "No ingreso ningun valor", 'error');
    } else {
      this.categoriaService.update_categoria(this.datosCategoria[index])
        .subscribe((response) => {
          if (response.success) {
            Swal.fire("Correcto", response.message, 'success')
          }
          else {
            Swal.fire("Error", response.message, 'error');
          }
        });
    }
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

  onRowEditCategoria(datosCat: Cat_empresa) {
    this.clonCategoria[datosCat.id_tipo_empresa] = { ...datosCat };
  }

  onRowEditCancelCategoria(datos: Cat_empresa, index: number) {
    this.datosCategoria[index] = this.clonCategoria[datos.id_tipo_empresa];
    delete this.clonCategoria[datos.id_tipo_empresa];
  }

  onRowEditCancelArea(datos: Area, index: number) {
    this.datosArea[index] = this.clonArea[datos.id_area_estudio];
    delete this.clonArea[datos.id_area_estudio];
  }

  onRowEditArea(datosArea: Area) {
    this.clonArea[datosArea.id_area_estudio] = { ...datosArea };

  }
 



  dialogAddCategoria() {
    this.displayDialogCategoria = true;
  }

  dialogAddArea() {
    this.displayDialogArea;
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
