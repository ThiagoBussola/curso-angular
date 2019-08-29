import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TemplateFormComponent } from './template-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],

    declarations: [
        TemplateFormComponent
    ],
})
export class TemplateFormModule { }
