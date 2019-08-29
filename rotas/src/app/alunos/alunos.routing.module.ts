import { AlunosDeactivateGuard } from './../guards/alunos.deactivate.guard';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, CanDeactivate, Resolve } from '@angular/router';

import { AlunosGuard } from './../guards/alunos.guard';
import { Aluno } from './Aluno';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosComponent } from './alunos.component';
import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';

const alunosRoutes = [
    {path: '', component: AlunosComponent, CanActivateChild: [AlunosGuard],
        children: [
            {
                path: 'novo', 
                component: AlunoFormComponent
            },

            {
                path: ':id', 
                component: AlunoDetalheComponent,
                resolve: {
                    aluno: AlunoDetalheResolver
                }
            },
            
            {
                path: ':id/editar', 
                component: AlunoFormComponent,
                canDeactivate: [
                    AlunosDeactivateGuard
                ]
            }
        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(alunosRoutes)],
    exports: [RouterModule]
})

export class AlunosRoutingModule {}