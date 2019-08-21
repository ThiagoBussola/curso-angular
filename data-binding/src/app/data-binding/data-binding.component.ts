import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-data-binding',
    templateUrl: './data-binding.component.html',
    styleUrls: ['./data-binding.component.scss']
})

export class DataBindingComponent implements OnInit {
    
    url: string = 'http://loiane.com';
    cursoAngular:boolean = true;  
    urlImagem = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sultan_the_Barbary_Lion.jpg/440px-Sultan_the_Barbary_Lion.jpg';
    
    valorAtual: string = '';
    valorSalvo: string = '';

    isMouseOver: boolean = false;

    nome: string = 'abc';

    constructor() { }
    
    ngOnInit() {
    }   

    
    getValor() {
        return 1;
    }
    
    getCurtirCurso() {
        return true;
    }
    
    botaoClicado() {
        alert('Botão clicado!');
    }
    
    onKeyUp(evento: KeyboardEvent) {
        this.valorAtual = (<HTMLInputElement>evento.target).value;
    }
    
    salvarValor(valor) {
        this.valorSalvo = valor;
    }

    onMouseOverOut() {
        this.isMouseOver = !this.isMouseOver;
    }


    
}
