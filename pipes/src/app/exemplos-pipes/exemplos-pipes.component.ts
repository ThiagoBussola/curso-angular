import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
    selector: 'app-exemplos-pipes',
    templateUrl: './exemplos-pipes.component.html',
    styleUrls: ['./exemplos-pipes.component.scss']
})
export class ExemplosPipesComponent implements OnInit {
    
    livro: any = {
        titulo: 'Aprendendo Estruturas de dados com Javascript',
        rating: 4.54321,
        numeroPaginas: 314,
        preco: 44.99,
        dataLancamento: new Date(2016, 5, 23),
        url:'http://a.co/glqjpRP'
    };

    livros: string [] = ['Angular 2', 'Javascrpt'];

    filtro: string;
    
    constructor() { }
    
    ngOnInit() {
    }

    addCurso(valor) {
        this.livros.push(valor);
        console.log(this.livros);
        
    }

    obterCursos() {
        if(this.livros.length === 0 || this.filtro === undefined 
            || this.filtro.trim() === '') {
			return this.livros;
        }

        // ['teste', 'cachorro', 'gato preto'].filter(item => {
        //     if (item.toLowerCase().indexOf("GATO".toLowerCase()) >= 0) {
        //         return item;
        //     }
        // })
        
		return this.livros.filter((v) => {
			if(v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
                return true;
            }
            return false;
        });
    }

    valorAsync = new Promise((resolve, reject) => {
        setTimeout(() => resolve('Valor assíncrono'), 2000)
    });

    valorAsync2 =  interval(2000).pipe(map(valor => 'Valor Assíncrono 2'));
}
