import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerificacionEmailService } from 'src/app/services/verificacion-email.service';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styleUrls: ['./verificacion.component.css']
})
export class VerificacionComponent implements OnInit {

  resultado: number = 0;

  constructor(private route: ActivatedRoute,
    private verificacionEmailService: VerificacionEmailService) { }

  ngOnInit() {
    var codigoConfirmacion = this.route.snapshot.params.codigo;

    this.verificacionEmailService.verificar(codigoConfirmacion).then(response => {
      if (response.success) {
        this.resultado = 1;
      } else if (response.code == 4000) {
        this.resultado = 2;
      } else if (response.code == 404) {
        this.resultado = 3;
      }
    });
  }

}
