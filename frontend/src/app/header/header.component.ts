import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login.service';
import { LoginInfo } from 'src/api/models/login_info';
import { Router } from '@angular/router';
import { CurrentUserService } from '../current-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Input()
  loginInfo: LoginInfo = {
      email: '',
      pwd: ''
  }

  btnIngresarClicked: boolean;
    
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
        else {
          Swal.fire("Error", response.message, 'error');
        }

        this.btnIngresarClicked = false;
      });
  }

}
