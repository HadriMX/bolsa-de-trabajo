import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login.service';
import { LoginInfo } from 'src/api/models/login_info';
import { Router } from '@angular/router';
import { CurrentUserService } from '../current-user.service';

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
    // this.currentUserService.getUserLoggedIn().subscribe((response) => {
    //   if (response.data != null){
    //     this.router.navigateByUrl("/menu");
    //   }
    // });
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
          alert(response.message);
        }

        this.btnIngresarClicked = false;
      });
  }

}
