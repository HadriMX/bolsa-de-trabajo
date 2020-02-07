import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { RouterModule, Routes } from '@angular/router';
import { PostulacionesComponent } from './components/postulaciones/postulaciones.component';
import { HeadertittleComponent } from './components/headertittle/headertittle.component';
import { VacantesComponent } from './components/vacantes/vacantes.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { EditarusuarioComponent } from './components/editarusuario/editarusuario.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuardService as AuthGuard } from './guards/auth.guard';
import { LoginGuardService as LoginGuard } from './guards/login.guard';
import { AdminGuardService as AdminGuard } from './guards/admin.guard';
import { EmpresaGuardService as EmpresaGuard } from './guards/empresa.guard';
import { CandidatoGuardService as CandidatoGuard } from './guards/candidato.guard';
import localeEsMx from '@angular/common/locales/es-MX';
import { registerLocaleData } from '@angular/common';
import { AuthInterceptorService as AuthInterceptor } from './services/auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { PaginacionService } from 'src/app/services/paginacion.service';
import * as $ from 'jquery';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {
  MatButtonModule, MatTabsModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule, MatSlideToggleModule, MatSlideToggle
} from "@angular/material";

import { TableModule } from 'primeng/table'
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { TabViewModule } from 'primeng/tabview';
import { VerificacionComponent } from './components/verificacion/verificacion.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RegistrarVacanteComponent } from './components/registrar-vacante/registrar-vacante.component';
import { RegistroComponent } from './components/registro/registro.component';
import { OnlyNumber } from './directivas/only-number.directive';
import { EditarempresaComponent } from './components/editarempresa/editarempresa.component';

registerLocaleData(localeEsMx);

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [CandidatoGuard] },
  { path: 'postulaciones', component: PostulacionesComponent, canActivate: [CandidatoGuard] },
  { path: 'editarusuario', component: EditarusuarioComponent, canActivate: [AuthGuard] },
  { path: 'editarempresa', component: EditarempresaComponent, canActivate: [EmpresaGuard] },
  { path: 'administracion', component: AdministradorComponent, canActivate: [AdminGuard] },
  { path: 'vacantes', component: VacantesComponent, canActivate: [EmpresaGuard] },
  { path: 'vacantes/registrar', component: RegistrarVacanteComponent, canActivate: [EmpresaGuard] },
  { path: 'verificacion/:codigo', component: VerificacionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '**', redirectTo: '/login' }
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
    EditarusuarioComponent,
    VerificacionComponent,
    JwPaginationComponent,
    LoadingComponent,
    RegistrarVacanteComponent,
    RegistroComponent,
    OnlyNumber,
    EditarempresaComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatButtonModule,
    MatTabsModule,
    CKEditorModule,
    AutoCompleteModule,
    MatSlideToggleModule,
    TableModule,
    DialogModule,
    ButtonModule,
    PanelModule,
    ToastModule,
    PasswordModule,
    InputTextModule,
    MessageModule,
    TabViewModule,
    DropdownModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-Mx'
    },
    CookieService,
    PaginacionService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
