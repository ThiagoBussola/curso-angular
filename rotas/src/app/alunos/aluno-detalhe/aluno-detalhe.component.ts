import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { Aluno } from '../Aluno';

@Component({
    selector: 'app-aluno-detalhe',
    templateUrl: './aluno-detalhe.component.html',
    styleUrls: ['./aluno-detalhe.component.scss']
})
export class AlunoDetalheComponent implements OnInit {
    
    aluno: Aluno;
    inscricao: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private alunosService: AlunosService,
        private _router: Router

    ) { }
    
    ngOnInit() {

        /*    this.inscricao = this._route.params.subscribe(
            (params:any) => {
                let id = params['id'];
                
                this.aluno = this.alunosService.getAluno(id);
            }
            ); */
            
            console.log('ngOnInit: AlunoDetalheComponent');

            this.inscricao = this._route.data.subscribe(
            (info: {aluno: Aluno}) => {
                console.log("recebendo o obj Aluno do resolver");
                this.aluno = info.aluno;
            }
        );
    }

    editarContato() {
        this._router.navigate(['/alunos', this.aluno.id, 'editar']);
    }

    ngOnDestroy(): void {
        this.inscricao.unsubscribe();
        
    }   
}
