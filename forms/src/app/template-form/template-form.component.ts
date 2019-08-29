import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NgForm } from '@angular/forms';
import { dadosBusca } from './form-teste.interface';

@Component({
    selector: 'app-template-form',
    templateUrl: './template-form.component.html',
    styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

    usuario: any = {
        nome: null,
        email: null
    }


    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    onSubmit(form) {
        console.log(form);

        this.http.post('enderecoServer/formUsuario', JSON.stringify(form.value))
            .subscribe((dados) => console.log(dados));
    }

    verificaValidTouched(campo) {
        return !campo.valid && campo.touched;
    }

    aplicaCssErro(campo) {
        return {
            'has-error': this.verificaValidTouched(campo),
            'has-feedback': this.verificaValidTouched(campo)
        }
    }

    consultaCEP(cep, form: NgForm) {
        //Nova variável "cep" somente com dígitos
        cep = cep.replace(/\D/g, '');

        //Verifica se o campo cep possui valor informado
        if (cep != "") {

            //Expressão regular para validar o CEP
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP
            if (validacep.test(cep)) {
                this.resetaDadosForm(form);

                this.http.get(`//viacep.com.br/ws/${cep}/json`).subscribe((dados: dadosBusca) => {
                    form.control.patchValue({
                        endereco: {
                            rua: dados.logradouro,
                            complemento: dados.complemento,
                            bairro: dados.bairro,
                            cidade: dados.localidade,
                            estado: dados.uf
                        }
                    })
                })
            }
        }
    }

    resetaDadosForm(formulario) {
        formulario.form.patchValue ({
            endereco: {
                rua: null,
                complemento: null,
                bairro: null,
                cidade: null,
                estado: null
            }
        })
    }
}
