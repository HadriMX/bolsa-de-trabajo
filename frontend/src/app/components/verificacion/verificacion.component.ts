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
  loaning: boolean;

  constructor(private route: ActivatedRoute,
    private verificacionEmailService: VerificacionEmailService) { }

  ngOnInit() {
    this.loaning = true;
    var codigoConfirmacion = this.route.snapshot.params.codigo;

    this.verificacionEmailService.verificar(codigoConfirmacion).then(response => {
      if (response.success) {
        this.resultado = 1;
        this.loaning = false;
      } else if (response.code == 4000) {
        this.resultado = 2;
        this.loaning = false;
      } else if (response.code == 404) {
        this.resultado = 3;
        this.loaning = false;
      }
    });
  }

}
