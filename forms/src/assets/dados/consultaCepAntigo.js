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