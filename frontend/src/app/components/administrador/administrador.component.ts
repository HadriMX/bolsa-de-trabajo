import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Area } from "src/app/models/area";
import { Cat_empresa } from "src/app/models/categoria";
import { Usuario } from "src/app/models/usuario";
import { RegistroService } from "src/app/services/registro.service";
import Swal from "sweetalert2";
import { AreaService } from "../../services/area.service";
import { CatEmpresaService } from "../../services/cat-empresa.service";
import { AuxiliarService } from "../../services/auxiliar.service";
import { CandidatoService } from "src/app/services/candidato.service";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";
import { Vacante } from "src/app/models/vacantes";
import { VacantesService } from "../../services/vacantes.service";
import { Busqueda } from "src/app/models/busqueda";
import { EmpresaService } from "src/app/services/empresa.service";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { CurrentUserService } from "src/app/services/current-user.service";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Candidato } from "src/app/models/candidato";

@Component({
  selector: "app-administrador",
  templateUrl: "./administrador.component.html",
  styleUrls: ["./administrador.component.css"],
  animations: [
    trigger("rowExpansionTrigger", [
      state(
        "void",
        style({
          transform: "translateX(-10%)",
          opacity: 0
        })
      ),
      state(
        "active",
        style({
          transform: "translateX(0)",
          opacity: 1
        })
      ),
      transition("* <=> *", animate("400ms cubic-bezier(0.86, 0, 0.07, 1)"))
    ])
  ]
})
export class AdministradorComponent implements OnInit {
  @Input() numero;
  @Input() estado = 0;
  @Input() nuevaArea: Area = {
    id_area_estudio: 0,
    nombre: "",
    estatus: ""
  };

  @Input() nuevaCategoria: Cat_empresa = {
    id_tipo_empresa: 0,
    nombre_categoria: "",
    nombre_empresa: "",
    estatus: ""
  };

  auxiliarAdministrativo: Usuario = {
    id_usuario: 0,
    email: "",
    password: "",
    id_tipo_usuario: 100,
    estatus: "",
    phpsessid: ""
  };

  accion;
  loading = false;
  datosCategoria = [];
  datosArea = [];
  datosAuxiliares = [];
  datosCandidato = [];
  datosEmpresa = [];
  reporte_categoria: any[];
  reporte_area: any[];
  datos = [1, 2, 3, 4, 5, 6];

  activos: boolean;

  estadoimagen = false;
  titulo: string;
  mensaje: string;
  displayDialogCategoria: boolean;
  displayDialogArea: boolean;
  auxiliarActivo: boolean = true;
  candidatoActivo: boolean = true;
  empresaActiva: boolean = true;
  inactivo: boolean = false;
  usuario: boolean;
  btncerrar_area: boolean;
  opc: any;
  // variables del dashboard

  Confirmar:string ="";
  columnasCategoria: any[];
  columnasArea: any[];
  columnasCandidato: any[];
  columnasEmpresa: any[];
  exportColumns: any[];
  columnaReporteCategoria: any[];
  columnaReporteAreas: any[];
  columnasReporteCandidatos: any[];
  columnasAuxiliaresAdmin: any[];
  clonCategoria: { [s: string]: Cat_empresa } = {};
  clonArea: { [s: string]: Area } = {};

  estatus: any[];

  infoCategoria: Cat_empresa = {
    id_tipo_empresa: 0,
    nombre_categoria: "",
    nombre_empresa: "",
    estatus: ""
  };

  infoArea: Area = {
    id_area_estudio: 0,
    nombre: "",
    estatus: ""
  };

  inputbooleano: boolean = false;

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {},
    buttonsStyling: true,
    confirmButtonColor: "#7A26D3",
    cancelButtonColor: "white"
  });
  swalWithBootstrapButtonsCorrecto = Swal.mixin({
    customClass: {},
    buttonsStyling: true,
    confirmButtonColor: "#7A26D3",
    cancelButtonColor: "white",
    showCancelButton: false,
    confirmButtonText: "Entendido",
    title: "Correcto",
    type: "success"
  });
  swalWithBootstrapButtonsError = Swal.mixin({
    customClass: {},
    buttonsStyling: true,
    confirmButtonColor: "#7A26D3",
    cancelButtonColor: "white",
    showCancelButton: false,
    confirmButtonText: "Entendido",
    title: "Error",
    type: "error"
  });

  // variales para las vacantes
  infoVacante: Vacante = new Vacante();
  busqueda: Busqueda = {
    SelectedSalario: "0",
    SelectedFecha: "0",
    SelectedArea: "0",
    InputTitulo: "",
    InputUbicacion: ""
  };
  allItems: Vacante[] = [];
  public usuarioActual: Usuario;

  constructor(
    private areaService: AreaService,
    private categoriaService: CatEmpresaService,
    private candidatoService: CandidatoService,
    private loginService: LoginService,
    private empresaService: EmpresaService,
    private auxiliaresService: AuxiliarService,
    private vacantesService: VacantesService,
    private registroService: RegistroService,
    private router: Router,
    private currentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    this.usuarioActual = this.currentUserService.getUsuarioActual();
    this.getCategoriasReporte();
    this.get_areaReporte();
    this.dashboard();
    this.getAreas();
    this.getCategorias();
    this.getCandidatos("Alta");
    this.getAuxiliares("A");
    this.getEmpresas("Alta");

    this.columnasCategoria = [
      { field: "nombre_empresa", header: "Nombre" },
      { field: "estatus", header: "Estatus" }
    ];

    this.columnasArea = [
      { field: "nombre", header: "Nombre" },
      { field: "estatus", header: "Estatus" }
    ];

    this.columnasCandidato = [
      { field: "candidato", header: "Candidato" },
      { field: "email", header: "Email" },
      { field: "genero", header: "Genero" },
      { field: "telefono", header: "Teléfono" },
      { field: "estatus", header: "Estatus" }
    ];

    this.columnasEmpresa = [
      { field: "nombre_empresa", header: "Empresa" },
      { field: "email", header: "Email" },
      { field: "telefono", header: "Teléfono" },
      { field: "nombre_persona_contacto", header: "Persona contacto" },
      { field: "status", header: "Estatus" }
    ];

    this.columnasAuxiliaresAdmin = [
      { field: "email", header: "Email" },
      { field: "estatus", header: "Estatus" }
    ];

    this.estatus = [
      { label: "Alta", value: "A" },
      { label: "Baja", value: "B" }
    ];

    this.columnaReporteCategoria = [
      { field: "Categoria", header: "Categoria" },
      { field: "Estatus", header: "Estatus" }
    ];

    this.columnaReporteAreas = [
      { field: "Area de estudio", header: "Area de estudio" },
      { field: "Estatus", header: "Estatus" }
    ];
  }
  //METODOS CRUD (C)
  add_areaEstudio() {
    const nombre = $("#nomArea").val();
    if (nombre === "") {
      this.swalWithBootstrapButtonsError.fire({
        text: "No ingreso ningun valor."
      });
    } else {
      this.areaService.add_area(this.nuevaArea).subscribe(response => {
        if (response.success) {
          this.swalWithBootstrapButtonsCorrecto.fire({
            text: response.message
          });
          this.datosArea.push(nombre);
          this.getAreas();
          this.displayDialogArea = false;
          $("#nomArea").val("");
        } else {
          this.swalWithBootstrapButtonsError.fire({
            text: response.message
          });
        }
      });
    }
  }

  add_CategoriaEmpresa() {
    const nombre = $("#nomCategoria").val();
    if (nombre === "") {
      this.swalWithBootstrapButtonsError.fire({
        text: "No ingreso ningun valor."
      });
    } else {
      this.categoriaService
        .add_categoria(this.nuevaCategoria)
        .subscribe(response => {
          if (response.success) {
            this.swalWithBootstrapButtonsCorrecto.fire({
              text: response.message
            });
            this.datosCategoria.push(nombre);
            this.getCategorias();
            this.displayDialogCategoria = false;
            $("#nomCategoria").val("");
          } else {
            this.swalWithBootstrapButtonsError.fire({
              text: response.message
            });
          }
        });
    }
  }

  add_auxiliarAdministrativo() {
    this.registroService
      .registrar(this.auxiliarAdministrativo)
      .subscribe(response => {
        if (response.success) {
          this.swalWithBootstrapButtonsCorrecto.fire({
            title: "Correcto",
            text: "Cuenta auxiliar creada con exito"
          });
          this.auxiliarAdministrativo.email = "";
          this.auxiliarAdministrativo.password = "";
        } else {
          this.swalWithBootstrapButtonsError.fire({
            text: response.message
          });
        }
      });
  }

  //METODOS CRUD (R)
  getAreas() {
    this.areaService.get_areasAdmin().subscribe(response => {
      if (response.success) {
        this.datosArea = response.data;
      } else {
        this.swalWithBootstrapButtonsError.fire({
          text: response.message
        });
      }
    });
  }

  get_areaReporte() {
    this.areaService.get_areasReporte().subscribe(response => {
      if (response.success) {
        this.reporte_area = response.data;
      } else {
        this.swalWithBootstrapButtonsError.fire({
          text: response.message
        });
      }
    });
  }

  getAuxiliares(estatus: string) {
    this.datosAuxiliares = null;
    if (estatus === "A") {
      this.auxiliarActivo = true;
    } else {
      this.auxiliarActivo = false;
    }
    this.loading = true;
    this.auxiliaresService.get_auxiliares(estatus).subscribe(response => {
      if (response.success) {
        this.datosAuxiliares = response.data;
      } else {
        this.swalWithBootstrapButtonsError.fire({
          text: response.message
        });
      }
      this.loading = false;
    });
  }

  getCategorias() {
    this.categoriaService.get_categoriasAdmin().subscribe(response => {
      if (response.success) {
        this.datosCategoria = response.data;
      } else {
        this.swalWithBootstrapButtonsError.fire({
          text: response.message
        });
      }
    });
  }

  async getCategoriasReporte() {
    this.categoriaService.get_categoriasReporte().subscribe(response => {
      if (response.success) {
        this.reporte_categoria = response.data;
      } else {
        this.swalWithBootstrapButtonsError.fire({
          text: response.message
        });
      }
    });
  }

  getCandidatos(estatus: string) {
    this.datosCandidato = null;
    if (estatus === "Alta") {
      this.candidatoActivo = true;
    } else {
      this.candidatoActivo = false;
    }
    this.loading = true;
    this.candidatoService.get_candidatos(estatus).subscribe(response => {
      if (response.success) {
        this.datosCandidato = response.data;
      } else {
        this.swalWithBootstrapButtonsError.fire({
          text: response.message
        });
      }
      this.loading = false;
    });
  }

  getEmpresas(estatus: string) {
    this.datosEmpresa = null;
    if (estatus === "Alta") {
      this.empresaActiva = true;
    } else {
      this.empresaActiva = false;
    }
    this.loading = true;
    this.empresaService.get_empresas(estatus).subscribe(response => {
      if (response.success) {
        this.datosEmpresa = response.data;
      } else {
        this.swalWithBootstrapButtonsError.fire({
          text: response.message
        });
      }
      this.loading = false;
    });
  }

  detalleArea(Area) {
    this.infoArea = Area;
  }

  detalleCategoria(Cat_empresa) {
    this.infoCategoria = Cat_empresa;
  }

  verArchivo(ruta: string) {
    window.open("http://192.168.1.200/uploads/" + ruta);
  }

  //METODOS CRUD (U)
  updateArea(idArea) {
    var index = this.datosArea
      .map(function(datos) {
        return datos.id_area_estudio;
      })
      .indexOf(idArea);
    const nombre = $("#modArea").val();
    if (nombre === "") {
      this.swalWithBootstrapButtonsError.fire({
        text: "No ingreso ningun valor."
      });
    } else {
      this.areaService
        .update_area(this.datosArea[index])
        .subscribe(response => {
          if (response.success) {
            this.swalWithBootstrapButtonsCorrecto.fire({
              text: response.message
            });
          } else {
            this.swalWithBootstrapButtonsError.fire({
              text: response.message
            });
          }
        });
    }
  }

  updateCategoria(idCategoria) {
    const nombre = $("#modCategoria").val();
    var index = this.datosCategoria
      .map(function(datos) {
        return datos.id_tipo_empresa;
      })
      .indexOf(idCategoria);
    if (nombre === "") {
      this.swalWithBootstrapButtonsError.fire({
        text: "No ingreso ningun valor."
      });
    } else {
      this.categoriaService
        .update_categoria(this.datosCategoria[index])
        .subscribe(response => {
          if (response.success) {
            this.swalWithBootstrapButtonsCorrecto.fire({
              text: response.message
            });
          } else {
            this.swalWithBootstrapButtonsError.fire({
              text: response.message
            });
          }
        });
    }
  }

  updateEstatusEmpresa(id: number, estatus: string) {
    var status;
    if (estatus == "A") {
      this.titulo = "¿Deseas reactivar la cuenta de la empresa?";
      this.mensaje = "¿La cuenta tendra acceso al sistema?";
      status = "Baja";
    } else if (estatus == "B") {
      this.titulo = "¿Deseas desactivar la cuenta de la empresa?";
      this.mensaje = "La cuenta no tendra acceso al sistema";
      status = "Alta";
    }
    this.swalWithBootstrapButtons
      .fire({
        title: this.titulo,
        text: this.mensaje,
        type: "question",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No"
      })
      .then(result => {
        if (result.value) {
          this.empresaService
            .update_estatusEmpresa(estatus, id)
            .subscribe(response => {
              if (response.success) {
                this.swalWithBootstrapButtonsCorrecto.fire({
                  text: response.message
                });
                this.getEmpresas(status);
              } else {
                this.swalWithBootstrapButtonsError.fire({
                  text: response.message
                });
              }
            });
        } else {
        }
      });
  }

  updateEstatusCandidato(id: number, estatus: string) {
    var status;
    if (estatus == "A") {
      this.titulo = "¿Deseas reactivar la cuenta del candidato?";
      this.mensaje = "¿La cuenta tendra acceso al sistema?";
      status = "Baja";
    } else if (estatus == "B") {
      this.titulo = "¿Deseas desactivar la cuenta del candidato?";
      this.mensaje = "La cuenta no tendra acceso al sistema";
      status = "Alta";
    }
    this.swalWithBootstrapButtons
      .fire({
        title: this.titulo,
        text: this.mensaje,
        type: "question",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No"
      })
      .then(result => {
        if (result.value) {
          this.candidatoService
            .update_estatusCandidato(estatus, id)
            .subscribe(response => {
              if (response.success) {
                this.swalWithBootstrapButtonsCorrecto.fire({
                  text: response.message
                });
                this.getCandidatos(status);
              } else {
                this.swalWithBootstrapButtonsError.fire({
                  text: response.message
                });
              }
            });
        } else {
        }
      });
  }

  updateEstatusAuxiliar(id: number, estatus: string) {
    var status;
    if (estatus == "A") {
      this.titulo = "¿Deseas reactivar la cuenta del usuario?";
      this.mensaje = "La cuenta tendra acceso al sistema";
      status = "B";
    } else if (estatus == "B") {
      this.titulo = "¿Deseas desactivar la cuenta del usuario?";
      this.mensaje = "La cuenta no tendra acceso al sistema";
      status = "A";
    }
    this.swalWithBootstrapButtons
      .fire({
        title: this.titulo,
        text: this.mensaje,
        type: "question",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No"
      })
      .then(result => {
        if (result.value) {
          this.auxiliaresService
            .update_estatus_auxiliarAdmin(estatus, id)
            .subscribe(response => {
              if (response.success) {
                this.swalWithBootstrapButtonsCorrecto.fire({
                  text: response.message
                });
                this.getAuxiliares(status);
              } else {
                this.swalWithBootstrapButtonsError.fire({
                  text: response.message
                });
              }
            });
        } else {
        }
      });
  }

  //METODOS CRUD (D)

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
    this.displayDialogArea = true;
  }

  estatus_areas(status: string) {
    if (status === "A") return "Alta";
    else return "Baja";
  }

  estatus_categorias(status: string) {
    if (status === "A") return "Alta";
    else return "Baja";
  }

  exportPdf(tipo: number, estatus: string) {
    var doc = new jsPDF("p", "pt", "a4");
    var img = new Image();
    img.src = "assets/descargar.png";
    doc.addImage(img, "png", 25, 20, 150, 80);
    if (tipo == 1) {
      //REPORTE PARA AREAS DE ESTUDIO
      doc.add;
      this.exportColumns = this.columnaReporteAreas.map(col => ({
        title: col.header,
        dataKey: col.field
      }));
      doc.autoTable(this.exportColumns, this.reporte_area, {
        startY: 100
      });
      doc.save("Reporte de areas de estudio.pdf");
    } else if (tipo == 2) {
      //REPORTE PARA LAS CATEGORIAS DE LAS EMPRESAS
      this.exportColumns = this.columnaReporteCategoria.map(col => ({
        title: col.header,
        dataKey: col.field
      }));
      doc.autoTable(this.exportColumns, this.reporte_categoria, {
        startY: 100
      });
      doc.save("Reporte de categorias de empresas.pdf");
    } else if (tipo == 3) {
      this.exportColumns = this.columnasCandidato.map(col => ({
        title: col.header,
        dataKey: col.field
      }));

      doc.text("Reporte de candidatos activos", 300, 70, "center");
      // doc.autoTable(this.exportColumns, this.datosCandidato);

      doc.autoTable(this.exportColumns, this.datosCandidato, {
        startY: 100
      });
      doc.save("Reporte de candidatos activos.pdf");
    } else if (tipo == 4) {
      this.exportColumns = this.columnasCandidato.map(col => ({
        title: col.header,
        dataKey: col.field
      }));
      doc.text("Reporte de candidatos inactivos", 300, 70, "center");
      doc.autoTable(this.exportColumns, this.datosCandidato, {
        startY: 100
      });
      doc.save("Reporte de candidatos inactivos.pdf");
    } else if (tipo == 5) {
      this.exportColumns = this.columnasEmpresa.map(col => ({
        title: col.header,
        dataKey: col.field
      }));
      doc.text("Reporte de empresas activas", 300, 70, "center");
      doc.autoTable(this.exportColumns, this.datosEmpresa, {
        startY: 100
      });
      doc.save("Reporte de empresas activas.pdf");
    } else if (tipo == 6) {
      this.exportColumns = this.columnasEmpresa.map(col => ({
        title: col.header,
        dataKey: col.field
      }));
      doc.text("Reporte de empresas inactivas", 300, 70, "center");
      doc.autoTable(this.exportColumns, this.datosEmpresa, {
        startY: 100
      });
      doc.save("Reporte de empresas inactivas.pdf");
    }
  }

  //UTILIDADES PARA EL ENCARGADO DE DISEÑO

  admin() {
    Swal.fire("Pendiente", "Hay que ver como controlar la info del usuario");
  }
  CerrarModales() {
    (<any>$("#ModalModificarAreas")).modal("hide");
    (<any>$("#ModalModificarCat")).modal("hide");
  }

  categorias(numero: number) {
    //numero= this.navBarComponentAdmin.numero;
    this.inputbooleano = false;
    // Se selecciona Categorias de las empresas
    if (numero === 1) {
      if (this.estado === 1) {
        this.estado = 0;
        $("#categoriaboton").css("border-bottom", "transparent");
      } else {
        $("#categoriaboton").css("border-bottom", "1px solid white");
        $("#areas,#usuarios,#usuariosactivos,#Auxiliares,#vacantesadmin").css(
          "border-bottom",
          "transparent"
        );
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
        $(
          "#usuarios,#categoriaboton,#usuariosactivos,#Auxiliares,#vacantesadmin"
        ).css("border-bottom", "transparent");
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
        $(
          "#areas,#categoriaboton,#usuariosactivos,#Auxiliares,#vacantesadmin"
        ).css("border-bottom", "transparent");
        this.estado = 3;
        this.estadoimagen = false;
      }
      //Se selecciona el apartado de usuarios candidatos registrados
    } else if (numero === 4) {
      if (this.estado === 4) {
        this.estado = 0;
        $("#usuariosactivos").css("border-bottom", "transparent");
      } else {
        $("#usuarios,#areas,#categoriaboton,#Auxiliares,#vacantesadmin").css(
          "border-bottom",
          "transparent"
        );
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
        $(
          "#empresasActivas,#areas,#categoriaboton,#Auxiliares,#vacantesadmin"
        ).css("border-bottom", "transparent");
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
        $("#usuarios,#areas,#categoriaboton,#Auxiliares,#usuariosactivos").css(
          "border-bottom",
          "transparent"
        );
        $("#vacantesadmin").css("border-bottom", "1px solid white");
        this.estadoimagen = false;
        this.estado = 6;
      }
    } else if (numero == 7) {
      if (this.estado === 7) {
        this.estado = 0;
        $("#Auxiliares").css("border-bottom", "transparent");
      } else {
        $(
          "#usuarios,#areas,#categoriaboton,#usuariosactivos,#vacantesadmin"
        ).css("border-bottom", "transparent");
        $("#Auxiliares").css("border-bottom", "1px solid white");
        this.estadoimagen = false;
        this.estado = 7;
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
        color: "white",
        display: "inline-block"
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
          Swal.fire("Error en el servidor", response.message, "error");
        }
      },
      reason => console.log(reason)
    );
  }
  // aqui comienza el codigo de las vacantes que se muestran en el menu

  // aqui comienza el codigo para el dashboard
  dashboard() {
    // aqui va el codigo para el dashboard
  }
}
