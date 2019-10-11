import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule,MatPaginatorModule} from '@angular/material';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort'


import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSortModule,
    MatInputModule,
    MatRippleModule,
  ],
  exports:[
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSortModule,
    MatInputModule,
    MatRippleModule,
  ]
})
export class MaterialModule { }
