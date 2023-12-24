function meuEscopo(){
    const form = document.querySelector('.form'); //form ta dentro do body do documento
    const resultado = document.querySelector('.resultado');

    const pessoas = [];

    function recebeEventoForm(evento){ //cada vez que o formulario for enviado, precisamos pegar os valores do campo
        evento.preventDefault();
        const nome = form.querySelector('.nome');
        const sobrenome = form.querySelector('.sobrenome');
        const peso = form.querySelector('.peso');
        const altura = form.querySelector('.altura');


        //quando form é enviado, jogamos os dados nesse objeto
        pessoas.push({
            nome: nome.value,
            sobrenome: sobrenome.value,
            peso: peso.value,
            altura: altura.value
        });

        resultado.innerHTML += `<p> ${nome.value} ${sobrenome.value}`  +
        ` ${peso.value} ${altura.value}</p>`;
        console.log(pessoas);

    }

    form.addEventListener('submit', recebeEventoForm);   //on submit recebe a funcao recebeEventoForm
}

meuEscopo();
