const inputTarefa = document.querySelector('.input-tarefa') 
const btnTarefa = document.querySelector('.btn-tarefa') 
const btnDelete = document.querySelector('.btn-delete') 
const tarefas = document.querySelector('.tarefas') 
const alert = document.querySelector('.alert') 
const alertSucess = document.querySelector('.alert-sucess') 

alert.textContent = '';
alert.classList.remove('alert');
alertSucess.textContent = '';
alertSucess.classList.remove('alert-sucess');
// capturando evento do mouse
btnTarefa.addEventListener('click', function() {
  // if(!inputTarefa.value) return; //nao captura os valores nulos

  if(!inputTarefa.value){
    
    alert.textContent = 'Insira uma tarefa para adicionar';
    alert.classList.add('alert')

    setTimeout(function() {
      alert.textContent = '';
      alert.classList.remove('alert');
    }, 2000);
    return
  }
  else{
    alertSucess.textContent = 'Tarefa inserida com sucesso';
    alertSucess.classList.add('alert-sucess')

    setTimeout(function() {
      alertSucess.textContent = '';
      alertSucess.classList.remove('alert-sucess');
    }, 2000);

  }
  criaTarefa(inputTarefa.value);
});

// capturando evento do mouse de deletar
btnDelete.addEventListener('click', function() {
  
  // selecionando a lsita de tarefas ul
  const listaTarefas = document.querySelector('.tarefas');
  
  if(!listaTarefas.firstChild){

    alert.textContent = 'Lista de tarefas vazia';
    alert.classList.add('alert')

    setTimeout(function() {
      alert.textContent = '';
      alert.classList.remove('alert');
    }, 2000);
  }
 
  /* verifica se ainda há um primeiro filho dentro da lista 
  "listaTarefas.firstChild" retorna o primeiro elemento filho 
  (no caso, o primeiro <li> dentro do <ul>). */
  while (listaTarefas.firstChild) {
    listaTarefas.removeChild(listaTarefas.firstChild);
  }
  salvarTarefas();
  
});


function criaBotaoApagar(li){
  li.innerText += '  '
  const botaoApagar = document.createElement('button');
  botaoApagar.innerHTML = '<i class="fas fa-trash"></i>';
  botaoApagar.setAttribute('class', 'apagar');
  botaoApagar.setAttribute('title', 'Apagar tarefa'); //tooltip
  
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
    if(!inputTarefa.value){
    
      alert.textContent = 'Insira uma tarefa para adicionar';
      alert.classList.add('alert')
  
      setTimeout(function() {
        alert.textContent = '';
        alert.classList.remove('alert');
      }, 2000);
      return
    }
    else{
      alertSucess.textContent = 'Tarefa inserida com sucesso';
      alertSucess.classList.add('alert-sucess')
  
      setTimeout(function() {
        alertSucess.textContent = '';
        alertSucess.classList.remove('alert-sucess');
      }, 2000);
  
    }
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
