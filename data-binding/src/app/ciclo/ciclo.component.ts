import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-ciclo',
    templateUrl: './ciclo.component.html',
    styleUrls: ['./ciclo.component.scss']
})
export class CicloComponent implements OnInit {

    constructor() {
        this.log('constructor');
    }

    ngOnChanges() {
        this.log('ngOnChanges');
    }
    
    ngOnInit() {
        this.log('ngOnInit');
    }

    ngDoCheck() {
        this.log('ngDoCheck');
    }

    ngAfterContendChecked() {
        this.log('ngAfterContendChecked');
    }

    ngAfterViewInit(){
        this.log('ngAfterViewInit');
        
    }

    ngAfterViewChecked() {
        this.log('ngAfterViewChecked');
        
    }

    ngOnDestroy(){
        this.log('ngOnDestroy');
        
    }

    private log(hook: string) {
        console.log(hook);
    }
    
}
