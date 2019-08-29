import { CursosGuard } from './guards/cursos.guard';
import { AuthGuard } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthService } from './login/auth.service';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { AlunosGuard } from './guards/alunos.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
//import { AlunosModule } from './alunos/alunos.module';
//import { CursosModule } from './cursos/cursos.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        CabecalhoComponent,
        PaginaNaoEncontradaComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterializeModule,
        FormsModule,
        //CursosModule,
        //AlunosModule
        //routing
    ],
    providers: [
        AuthService, 
        AuthGuard,
        CursosGuard,
        AlunosGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
