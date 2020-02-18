import { Component, OnInit } from "@angular/core";
import { Solicitudes } from "../../models/solicitudes";
import { SolicitudService } from "../../services/solicitud.service";
import { CandidatoService } from "src/app/services/candidato.service";

import Swal from "sweetalert2";

@Component({
  selector: "app-solicitudes",
  templateUrl: "./solicitudes.component.html",
  styleUrls: ["./solicitudes.component.css"]
})
export class SolicitudesComponent implements OnInit {
  columnasSolicitud: any[];
  datos_solicitud: any[];
  loading:boolean;

  infoSolicitud: Solicitudes = {
    id_usuario: 0,
    email: "",
    escolaridad: "",
    telefono: "",
    rutaCV: "",
    candidato: "",
    edad: 0,
    genero: ""
  };
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
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {},
    buttonsStyling: true,
    confirmButtonColor: "#7A26D3",
    cancelButtonColor: "white"
  });

  constructor(
    private solicitudService: SolicitudService,
    private candidatoService: CandidatoService
  ) {}

  ngOnInit() {
    this.columnasSolicitud = [
      { field: "candidato", header: "Candidato" },
      { field: "edad", header: "Edad" },
      { field: "genero", header: "Genero" }
    ];

    this.getSolicitudes();
  }

  getSolicitudes() {
    this.solicitudService.get_solicitudes().subscribe(response => {
      if (response.success) {
        this.datos_solicitud = response.data;
      } else {
        Swal.fire("Error", response.message, "error");
      }
    });
  }
  detalleSolicitud(Solicitudes) {
    this.infoSolicitud = Solicitudes;
  }

  rechazarCandidato(id_candidato) {
    this.swalWithBootstrapButtons
      .fire({
        title: "¿Deseas rechazar al candidato?",
        type: "question",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No"
      })
      .then(result => {
        if (result.value) {
          this.candidatoService
            .update_estatusCandidato("R", id_candidato)
            .subscribe(response => {
              if (response.success) {
                this.swalWithBootstrapButtonsCorrecto.fire({
                  text: response.message
                });
                this.getSolicitudes();
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

  aceptarCandidato(id_candidato) {
    this.swalWithBootstrapButtons
      .fire({
        title: "¿Deseas activar al candidato?",
        text: "La cuenta tendra acceso al sistema",
        type: "question",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No"
      })
      .then(result => {
        if (result.value) {
          this.candidatoService
            .update_estatusCandidato("I", id_candidato)
            .subscribe(response => {
              if (response.success) {
                this.swalWithBootstrapButtonsCorrecto.fire({
                  text: response.message
                });
                this.getSolicitudes();
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
  verArchivo(ruta:string){
    window.open("http://192.168.1.200/uploads/"+ruta);
  }
}
