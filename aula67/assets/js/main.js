const inputTarefa = document.querySelector('.input-tarefa') 
const btnTarefa = document.querySelector('.btn-tarefa') 
const tarefas = document.querySelector('.tarefas') 

// capturando evento do mouse
btnTarefa.addEventListener('click', function() {
  if(!inputTarefa.value) return; //nao captura os valores nulos

  criaTarefa(inputTarefa.value);
});


function criaBotaoApagar(li){
  li.innerText += '  '
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar'
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apgar tarefa'); //tooltip

  li.appendChild(botaoApagar);
};
function criaTarefa(textoInput){
  const li = criaLi();
  li.innerText = textoInput;
  // add o li na ul que sao as tarefas
  tarefas.appendChild(li);

  //add o botao de apagar depois que criamos uma tarefa nova
  criaBotaoApagar(li);

  //savalndo as tarefas
  salvarTarefas();

  //limpando o input
  limpaInput();
};

function criaLi(){
  const li = document.createElement('li');
  return li;
};

// para quando apertar o enter no teclado 
inputTarefa.addEventListener('keypress', function(e){
  if(e.keyCode === 13){
     if(!inputTarefa.value) return;
     criaTarefa(inputTarefa.value);
  }
});;

function limpaInput(){
  inputTarefa.value = '';
  inputTarefa.focus();
};

document.addEventListener('click', function(e){

  const el = e.target;

  if(el.classList.contains('apagar')){
    el.parentElement.remove();
    salvarTarefas();
  }
});

function salvarTarefas(){
  
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas){
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();//pois vinha o botao de apagar junto. 
    listaDeTarefas.push(tarefaTexto);
  }

  //criando JSON
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  for(let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();
