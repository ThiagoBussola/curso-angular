import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';
import { IFormCanDeactivate } from 'src/app/guards/iform.candeactivate';

@Component({
    selector: 'app-aluno-form',
    templateUrl: './aluno-form.component.html',
    styleUrls: ['./aluno-form.component.scss']
})
export class AlunoFormComponent implements OnInit, IFormCanDeactivate {
    
    aluno: any;
    inscricao: Subscription;
    private formMudou: boolean = false;

    constructor(
        private _route: ActivatedRoute,
        private alunosService: AlunosService

    ) { }
    
    ngOnInit() {
        this.inscricao = this._route.params.subscribe(
            (params:any) => {
                let id = params['id'];

                this.aluno = this.alunosService.getAluno(id);

                if(this.aluno === null) {
                    this.aluno = {};
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.inscricao.unsubscribe();
        
    }

    onInput() {
        this.formMudou = true;
        console.log("mudou");
        
    }

    podeMudarRota() {
        
        let resposta;
        if(this.formMudou) {
            resposta = confirm("Tem certeza que deseja sair dessa página?");
        }
        
        if(resposta == true) {
            return true;

        } else {
            return false;
        }
    }

    podeDesativar() {
        return this.podeMudarRota();
    }
}
