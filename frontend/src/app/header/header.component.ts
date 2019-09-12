import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login.service';
import { LoginInfo } from 'src/api/models/login_info';
import { Router } from '@angular/router';
import swal from 'sweetalert';

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
    
  constructor(private loginService: LoginService, private router: Router) {

   }

  ngOnInit() {
  }

  login() {
    if (this.loginInfo.email === '123' && this.loginInfo.pwd === '123') {
      this.router.navigateByUrl('/menu');
    }  else 
    swal("Datos incorrectos");
    this.loginService.login(this.loginInfo.email, this.loginInfo.pwd).subscribe((result) => alert(result));
  }

}
