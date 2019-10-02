import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../current-user.service';
import { Usuario } from '../../api/models/usuario'
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headertittle',
  templateUrl: './headertittle.component.html',
  styleUrls: ['./headertittle.component.css']
})
export class HeadertittleComponent implements OnInit {

  public currentUser : Usuario;
  public emailUsuario : string;

  constructor(private currentUserService: CurrentUserService, private router: Router,
    private cookies: CookieService) { }

  ngOnInit() {
    this.emailUsuario = this.currentUserService.getEmailUsuarioActual();

    this.currentUserService.getUsuarioActual().subscribe((response) => {
      if (response.success) {
        this.currentUser = response.data;
      } else {
        Swal.fire('Error del servidor', response.message, 'error');
      }
    });
  }

  logout() {
    this.currentUserService.deleteUsuarioActual().subscribe((response) => {
      if (response.success) {
        this.cookies.delete('PHPSESSID');
        this.cookies.delete('email_current_user');
        this.router.navigateByUrl("/login");
      } else {
        Swal.fire('Error del servidor', response.message, 'error');
      }
    });
  }

}
