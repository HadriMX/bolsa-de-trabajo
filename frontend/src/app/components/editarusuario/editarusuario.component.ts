import { Component, OnInit, HostListener } from '@angular/core';
import { IAppPage } from 'src/app/interfaces/app-page';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit, IAppPage {
  
  showFooter = false;
  goTopEnabled = false;
  goTop?: Function;

  constructor() { }

  ngOnInit() {
  }
  
}1
