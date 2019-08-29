import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';

@Component({
    selector: 'app-cabecalho',
    templateUrl: './cabecalho.component.html',
    styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent implements OnInit {
    
    mostrarMenu: boolean = false; 
    
    constructor(private _authService: AuthService) { }
    
    ngOnInit() {
        
        this._authService.mostrarMenuEmmiter.subscribe(
            mostrar => this.mostrarMenu = mostrar
        );
    }
        
}
    