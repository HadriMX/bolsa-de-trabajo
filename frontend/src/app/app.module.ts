import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { PostulacionesComponent } from './components/postulaciones/postulaciones.component';
import { HeadertittleComponent } from './components/headertittle/headertittle.component';
import { VacantesComponent } from './components/vacantes/vacantes.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { EditarusuarioComponent } from './components/editarusuario/editarusuario.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuardService as AuthGuard } from './auth/auth.guard';
import { LoginGuardService as LoginGuard } from './auth/login.guard';
import { AuthInterceptorService as AuthInterceptor } from './services/auth-interceptor.service';
import * as $ from 'jquery';


const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'postulaciones', component: PostulacionesComponent, canActivate: [AuthGuard] },
  { path: 'editarusuario', component: EditarusuarioComponent, canActivate: [AuthGuard] },
  { path: 'administracion', component: AdministradorComponent, canActivate: [AuthGuard] },
  { path: 'vacantes', component: VacantesComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent, canActivate: [LoginGuard] }
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    CookieService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
