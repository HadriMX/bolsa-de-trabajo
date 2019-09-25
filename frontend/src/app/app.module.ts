import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { HeadertittleComponent } from './headertittle/headertittle.component';
import { VacantesComponent } from './vacantes/vacantes.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { EditarusuarioComponent } from './editarusuario/editarusuario.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard }  from './auth/auth.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path: 'menu', component: MenuComponent, canActivate: [AuthGuard]},
  {path: 'postulaciones', component: PostulacionesComponent,canActivate: [AuthGuard]},
  {path: 'editarusuario', component: EditarusuarioComponent,canActivate: [AuthGuard]},
  {path: 'administracion', component: AdministradorComponent,canActivate: [AuthGuard]},
  {path: 'vacantes', component: VacantesComponent,canActivate: [AuthGuard]},

  {path: '**', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    MenuComponent,
    PostulacionesComponent,
    HeadertittleComponent,
    VacantesComponent,
    AdministradorComponent,
    EditarusuarioComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
