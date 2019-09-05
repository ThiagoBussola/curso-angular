import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadoBr } from '../models/estado-br.model';
import { Cidade } from '../models/cidade';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DropdownService {
    
    constructor(private http: HttpClient) { }
    
    getEstadosBr(): Observable<EstadoBr[]> {

        return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');

        // Para buscar o JSON direto da API é a mesma coisa, basta passar o endereço
        //return this.http.get('https://raw.githubusercontent.com/felipefdl/cidades-estados-brasil-json/master/Estados.json');
    }

    getCidadesBr(idEstado: number) {
        return this.http.get<Cidade[]>('assets/dados/cidadesbr.json')
            .pipe(
                map((cidades: Cidade[]) => cidades.filter(cidade => cidade.estado == idEstado))
            );
    }

    getCargos() {
        return [
            { nome: 'Dev', nivel:'Junior',desc: 'Dev Jr' },
            { nome: 'Dev', nivel:'Pleno',desc: 'Dev Pl' },
            { nome: 'Dev', nivel:'Senior',desc: 'Dev Sr' }
        ];
    }
    getTecnologias() {
        return [
            { nome: 'java', desc: 'Java' },
            { nome: 'javascript', desc: 'JavaScript' },
            { nome: 'php', desc: 'PHP' },
            { nome: 'ruby', desc: 'Ruby' }
        ];
    }

    getNewsletter() {
        return [
            { valor: 's', desc: 'Sim' },
            { valor: 'n', desc: 'Não' }
        ]
    }
    
}
