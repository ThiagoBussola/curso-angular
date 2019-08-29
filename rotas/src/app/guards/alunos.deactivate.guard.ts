import { Injectable } from '@angular/core';
import { RouterStateSnapshot, CanDeactivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IFormCanDeactivate } from './iform.candeactivate';


@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<IFormCanDeactivate> {

    canDeactivate(
        component: IFormCanDeactivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {

        console.log('Guarda de desativação');

        return component.podeDesativar();
    }
}