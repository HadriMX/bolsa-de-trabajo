import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { LoginInfo } from 'src/app/models/login_info';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../services/current-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  loginInfo: LoginInfo = {
      email: '',
      pwd: ''
  }

  btnIngresarClicked = false;
    
  constructor(private loginService: LoginService, private router: Router,
    private currentUserService: CurrentUserService) {
   }

  ngOnInit() {
  }
  
  login() {
    this.btnIngresarClicked = true;

    this.loginService.login(this.loginInfo)
      .subscribe((response) => {
        if (response.success)
        {
          this.currentUserService.setUsuarioActual(response.data);
          this.router.navigateByUrl("/menu");
        }
        else if (response.code == 4011) {
          Swal.fire({
            title: 'No autorizado',
            text: 'Termina tu registro para continuar.',
            type: 'question',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
          });
        }
        else {
          Swal.fire("Error", response.message, 'error');
        }

        this.btnIngresarClicked = false;
      });
  }

}
