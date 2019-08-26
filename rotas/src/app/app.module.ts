import { AlunosModule } from './alunos/alunos.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { MaterializeModule } from 'angular2-materialize';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CursosModule } from './cursos/cursos.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent      
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterializeModule,
        FormsModule,
        CursosModule,
        AlunosModule
        //routing
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
