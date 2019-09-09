import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login.service';
import { LoginInfo } from '../../api/models/login_info';
import { CurrentUserService } from '../current-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() loginInfo: LoginInfo = {
      email: '',
      pwd: ''
    }

  btnIngresarClicked = false;
    
  constructor(private loginService: LoginService, private currentUserService: CurrentUserService) { }

  ngOnInit() {
  }

  login() {
    this.btnIngresarClicked = true;

    this.loginService.login(this.loginInfo)
      .subscribe((response) => {
        if (response.success)
        {
          // login bien
          this.currentUserService.usuario = response.data;
          alert(this.currentUserService.usuario.id_tipo_usuario);
        }
        else {
          alert(response.message);
        }

        this.btnIngresarClicked = false;
      });
  }

}
