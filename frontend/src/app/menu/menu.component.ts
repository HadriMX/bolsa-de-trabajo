import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../current-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  cursor: boolean = false;
  constructor(private currentUserService: CurrentUserService,
    private router: Router) { }

  ngOnInit() {
    this.cursor = true;

    if (this.currentUserService.getUserLoggedIn() == null) {
      this.router.navigateByUrl("/");
    }
  }

}
