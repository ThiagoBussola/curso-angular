import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AlunosService } from '../alunos.service';

@Component({
    selector: 'app-aluno-detalhe',
    templateUrl: './aluno-detalhe.component.html',
    styleUrls: ['./aluno-detalhe.component.scss']
})
export class AlunoDetalheComponent implements OnInit {
    
    aluno: any;
    inscricao: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private alunosService: AlunosService

    ) { }
    
    ngOnInit() {
        this.inscricao = this._route.params.subscribe(
            (params:any) => {
                let id = params['id'];

                this.aluno = this.alunosService.getAluno(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.inscricao.unsubscribe();
        
    }   
}
