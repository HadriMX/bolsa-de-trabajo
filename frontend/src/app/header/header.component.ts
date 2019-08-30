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
    this.loginService.login(this.loginInfo.email, this.loginInfo.pwd).subscribe((result) => alert(result));
  }

}
