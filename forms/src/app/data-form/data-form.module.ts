import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataFormComponent } from './data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        HttpClientModule
    ],
    declarations: [
        DataFormComponent
    ],
    exports: [
        DataFormComponent
    ]

})
export class DataFormModule { }
