import { Component, OnInit } from '@angular/core';
import { Solicitudes } from "../../models/solicitudes";
import { SolicitudService } from "../../services/solicitud.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {
  columnasSolicitud: any[];
  datos_solicitud : any[];
  
  infoSolicitud: Solicitudes = {
    id_usuario: 0,
    email: '',
    escolaridad:'',
    telefono:'',
    rutaCV:'',
    candidato: '',
    edad:0,
    genero:''
  };
  swalWithBootstrapButtons = Swal.mixin({
    customClass: {},
    buttonsStyling: true,
    confirmButtonColor: "#7A26D3",
        cancelButtonColor: "white"
  });

  constructor(    private solicitudService: SolicitudService) { }
 

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

  

}
