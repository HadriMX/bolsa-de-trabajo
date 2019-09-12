import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login.service';
import { LoginInfo } from '../../api/models/login_info';
import { CurrentUserService } from '../current-user.service';
import { Router } from '@angular/router';

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
    
  constructor(private loginService: LoginService,
      private currentUserService: CurrentUserService,
      private router: Router) { }

  ngOnInit() {
    this.currentUserService.getUserLoggedIn().subscribe((response) => {
      if (response.data != null){
        this.router.navigateByUrl("/menu");
      }
    });
  }

  login() {
    this.btnIngresarClicked = true;

    this.loginService.login(this.loginInfo)
      .subscribe((response) => {
        if (response.success)
        {
          this.currentUserService.setCurrentUser(response.data);
          this.router.navigateByUrl("/menu");
        }
        else {
          alert(response.message);
        }

        this.btnIngresarClicked = false;
      });
  }

}
