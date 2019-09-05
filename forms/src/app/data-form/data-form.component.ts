import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

import { VerificaEmailService } from './services/verifica-email.service';
import { FormValidations } from './../shared/form-validations';
import { HttpClient } from '@angular/common/http';
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br.model';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable, empty } from 'rxjs';
import { map, distinctUntilChanged, tap, switchMap } from 'rxjs/operators'
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { Cidade } from '../shared/models/cidade';

export class CheckboxValidator {
    static checked(control:FormControl) {
        if(control.value) {
            return null;
        }else {
            return { "checked": control.value };
        }
    }
}

@Component({
    selector: 'app-data-form',
    templateUrl: './data-form.component.html',
    styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {
    
    //formulario: FormGroup;
    estados: EstadoBr[];
    cidades: Cidade[];
    //estados: Observable<EstadoBr[]>;
    cargos: any[];
    tecnologias: any[];
    newsletterOp: any[];
    frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private dropDownService: DropdownService,
        private cepService: ConsultaCepService,
        private verificaEmailService: VerificaEmailService

    ) { 
        super();
    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        console.log(this.formulario);
    }
    
    ngOnInit() {

        //this.verificaEmailService.verificarEmail('email@email.com').subscribe();

        //this.estados = this.dropDownService.getEstadosBr();
        this.dropDownService.getEstadosBr()
            .subscribe(dados => this.estados = dados);
        this.cargos = this.dropDownService.getCargos();
        this.tecnologias = this.dropDownService.getTecnologias();
        this.newsletterOp = this.dropDownService.getNewsletter();

        // this.dropDownService.getEstadosBr().subscribe((dados: any) => {
        //     this.estados = dados;
        //     console.log(dados);
        // })

        // Validações customizadas Validators.minLength(3), Validators.maxLength(20)

        this.formulario = this.formBuilder.group({
            nome: [null, [Validators.required, Validators.minLength(3),Validators.maxLength(30)]],
            email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
            confirmarEmail: [null, [FormValidations.equalsTo('email')]],
            endereco: this.formBuilder.group({
                cep: [null, [Validators.required, FormValidations.cepValidator]],
                numero: [null, Validators.required],
                complemento: [null],
                rua: [null, Validators.required],
                bairro: [null, Validators.required],
                cidade: [null, Validators.required],
                estado: [null, Validators.required]
            }),
            cargo: [null],
            tecnologias: [null],
            newsletter:[null],
            termos:[null, CheckboxValidator.checked],
            frameworks: this.buildFrameworks()
        });

        this.formulario.get('endereco.cep').statusChanges
        .pipe(
            distinctUntilChanged(),
            tap(value => console.log('valor CEP:', value)),
            switchMap(status => status === 'VALID' ?
                this.cepService.consultaCEP(this.formulario.get('endereco.cep').value)
                : empty()
            ) 
        )
        .subscribe(dados => dados ? this.populaDadosForm(dados) : {});

        this.formulario.get('endereco.estado').valueChanges
            .pipe(
                tap(estado => console.log('Novo estado: ', estado)),
                map(estado => this.estados.filter(e => e.sigla === estado)),
                map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
                switchMap((estadoId: number) => this.dropDownService.getCidadesBr(estadoId)),
                tap(console.log)
            )
            .subscribe(cidades => this.cidades = cidades)
        
        //this.dropDownService.getCidadesBr(8).subscribe(console.log);
    }

    buildFrameworks() {
        // para cada valor em frameworks nós vamos ter um array novo que será exatamente o valor do return
        const values = this.frameworks.map(v => new FormControl(false));
    
        return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));

    /*  Isso é o que o map está fazendo utilizando o return acima
        this.formBuilder.array() [
            new FormControl(false), angular
            new FormControl(false), react 
            new FormControl(false), vue
            new FormControl(false) sencha
        ]; */
    }

    submit() {
        console.log(this.formulario);

        let valueSubmit = Object.assign({}, this.formulario.value);

        valueSubmit = Object.assign(valueSubmit, {
            frameworks: valueSubmit.frameworks
                .map((v, i) => v ? this.frameworks[i] : null)
                .filter(v => v !== null)
        });

        console.log(valueSubmit);

        this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
            .subscribe((dados) => {
                console.log(dados)

                this.resetar();
            },
            (error:any) => alert('erro')
        );
    }

    consultaCEP() {

        let cep = this.formulario.get('endereco.cep').value;

        if (cep != null && cep !== "") {
            this.cepService.consultaCEP(cep).subscribe((dados: any) => {
                this.populaDadosForm(dados);

            })
        }
    }

    populaDadosForm(dados) {
        this.formulario.patchValue({
            endereco: {
                rua: dados.logradouro,
                complemento: dados.complemento,
                bairro: dados.bairro,
                cidade: dados.localidade,
                estado: dados.uf
            }
        })
    }

    resetaDadosForm() {
        this.formulario.patchValue({
            endereco: {
                rua: null,
                complemento: null,
                bairro: null,
                cidade: null,
                estado: null
            }
        })
    }

    setarCargo() {
        const cargo = { nome:'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
        this.formulario.get('cargo').setValue(cargo);
    }

    compararDados(obj1, obj2) {
        return obj1 && obj2 ? 
            (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 && obj2;
    }

    setarTecnologias() {
        this.formulario.get('tecnologias').setValue(['java', 'javascript', 'php'])
    }

    validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
        .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
    }
}
