import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-base-form',
    template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {
    
    formulario: FormGroup;
    
    constructor() { }
    
    ngOnInit() {
    }

    abstract submit();
    
    onSubmit() {
        if(this.formulario.valid) {
            this.submit();
        } else {
            console.log('formulario inválido');
            this.verificaValidacoesForm(this.formulario);
        }
    }

    verificaValidacoesForm(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(campo => {
            console.log(campo);
            const controle = formGroup.get(campo);
            controle.markAsTouched();

            if(controle instanceof FormGroup) {
                this.verificaValidacoesForm(controle);
            }
        });
    }

    resetar() {
        this.formulario.reset();
    }

    verificaValidTouched(campo: string) {

        return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;

    }

    verificaEmailInvalido() {
        let campoEmail = this.formulario.get('email');
        if(campoEmail.errors) {
            return campoEmail.errors['email'] && campoEmail.touched;
        } 
    }    

    aplicaCssErro(campo: string) {

        return {
            'has-error': this.verificaValidTouched(campo),
            'has-feedback': this.verificaValidTouched(campo)
        }
    }

    getCampo(campo: string) {
        return this.formulario.get(campo);
    }

}
