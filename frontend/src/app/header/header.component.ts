import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login.service';
import { LoginInfo } from 'src/api/models/login_info';

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
    
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.loginInfo)
      .subscribe((response) => {
        if (response.success)
        {
          var usuario = response.data;
          alert(usuario.id_tipo_usuario);
          
          // login bien
        }
        else {
          alert(response.message);
        }
      });
  }

}
