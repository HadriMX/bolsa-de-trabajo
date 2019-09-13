import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../current-user.service';
import { Usuario } from '../../api/models/usuario'

@Component({
  selector: 'app-headertittle',
  templateUrl: './headertittle.component.html',
  styleUrls: ['./headertittle.component.css']
})
export class HeadertittleComponent implements OnInit {

  public currentUser : Usuario;

  constructor(private currentUserService: CurrentUserService) { }

  ngOnInit() {
    this.currentUser = this.currentUserService.getUserLoggedIn();
  }

}
