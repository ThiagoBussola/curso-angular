import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanLoad, Route} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../login/auth.service';
import { promise } from 'protractor';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad{    
    
    constructor(
        private _authService: AuthService,
        private _router: Router

    ) { }

    canActivate(
            route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot
        ) : Observable<boolean> | boolean {
            


        return this.verificaAcesso();
    }
        
    private verificaAcesso() {
            
        this._router.navigate(['/login']);

        if(this._authService.usuarioEstaAutenticado()) {    
            return true;
        } 

        return false;
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        console.log('canLoad: verificando se usuário pode carregar o cod do módulo');

        return this.verificaAcesso();
    }

}
