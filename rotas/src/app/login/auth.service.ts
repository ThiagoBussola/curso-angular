import { Injectable, EventEmitter } from '@angular/core';

import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private usuarioAutenticado: boolean = false;

	mostrarMenuEmmiter = new EventEmitter<boolean>();
	
	constructor(
		private _router: Router

	) { }
	
	fazerLogin(usuario: Usuario) {

		if(usuario.nome === 'usuario@email.com' && usuario.senha === '123') {
			
			this.usuarioAutenticado = true;
			
			this.mostrarMenuEmmiter.emit(true);

			this._router.navigate(['/']);

		} else {

			this.usuarioAutenticado = false;

			this.mostrarMenuEmmiter.emit(false);
		}
	}	
	
	usuarioEstaAutenticado() {
		return this.usuarioAutenticado;
	}
	
}
