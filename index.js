const mensagem = document.querySelector('#mensagem')
const botaoLimpar = document.querySelector('#botaoLimpar')
let tarefas = []

function adicionarTarefa() {
    const inputTarefa = document.querySelector('#inputTarefa')
    let tarefa = inputTarefa.value.trim()

    if (tarefa == '') {
        mudarMensagemErro();
        setTimeout(() => {mensagem.style.opacity = '0'},  2500)
    } else {
        mudarMensagemSucesso()
        setTimeout(() => {mensagem.style.opacity = '0'},  2500)
        tarefas.push(tarefa)
        renderizarTarefas()
        mostrarBotao()
        console.log(tarefa)
    }

    inputTarefa.value = ''
}

function renderizarTarefas() {
    const listaTarefas = document.querySelector('#listaTarefas')
    listaTarefas.innerHTML = '' // esvazia a lista para quando ela for reescrita, não repetir as mesmas tarefas

    for (let i = 0; i < tarefas.length; i++) {
        let novaTarefa = document.createElement('li')
        novaTarefa.className = 'nova-tarefa'
        novaTarefa.textContent = tarefas[i]

        const botaoRemover = document.createElement('button')
        botaoRemover.className = 'botao-remover'
        botaoRemover.onclick = () => removerTarefa(i) // (2/2) aqui, o "i" é uma variável também, mas já tem um valor, ou seja, é um argumento.

        // os parênteses de uma função são usados para entregar um valor de uma função para outra
        // nesse caso, foi usado o parênteses no removerTarefa() para levar o índice (i) de qual tarefa será excluída
        // tem que colocar o tal valor na declaração da função, e quando for chamá-la para trabalhar
        // quando colocamos o (i) na chamada e definição da função, nós levamos uma variável que era pra ser local
        // da função pai (que é o for) para virar local da função filho "removerTarefa()"
        // pense assim: “quando alguém clicar, eu vou usar este i aqui.”
        // quando ele é clicado, o valor de i é lido, copiado e entregue como parâmetro para o removerTarefa()

        const iconeRemover = document.createElement('i')
        iconeRemover.className = 'fa-solid fa-trash-can'

        const botaoEditar = document.createElement('button')
        botaoEditar.className = 'botao-editar'
        botaoEditar.onclick = () => editarTarefa(i) // arrow function (=>) é usado para melhor visualização de uma função
        // nesse caso para que o .onclick funcione corretamente, é necessário uma outra função para chamar o editarTarefa(i). 
        const iconeEditar = document.createElement('i')
        iconeEditar.className = 'fa-solid fa-pencil'

        const botoes = document.createElement('div')
        botoes.className = 'botoes'

        botoes.appendChild(botaoRemover)
        botoes.appendChild(botaoEditar)
        botaoRemover.appendChild(iconeRemover)
        botaoEditar.appendChild(iconeEditar)
        novaTarefa.appendChild(botoes)
        listaTarefas.appendChild(novaTarefa)
    }
}

function removerTarefa(i) { // (1/2) aqui, o "i" é um parâmetro, não tem valor, é só uma variável que será usada dentro da função e que receberá um valor. (volte para o for loop)
    tarefas.splice(i, 1) // o (*, 1) é quantidade de tarefas (índices) que serão excluídas
    // o (i, *) é o índice que o removerTarefa() trouxe para saber qual tarefa será excluída (sair do array pelo splice)
    mostrarBotao() // chama a função para atualizar o estado do botão quando apagar uma tarefa
    renderizarTarefas()
    // por último, se renderiza a lista de tarefas novamente para mostrar a versão atualizada (sem a tarefa excluída).
}

function editarTarefa(i) {
    let tarefaEditada = prompt("Escolha um novo nome para sua tarefa:")
    if (tarefaEditada.trim !== "") {
        tarefas[i] = tarefaEditada
        renderizarTarefas()
    }
}

function limparLista() {
    tarefas.length = 0
    mudarMensagemLimpar()
    setTimeout(() => {mensagem.style.opacity = '0'},  2500)
    mostrarBotao() // chama a função para atualizar o estado do botão quando apagar todas as tarefas
    renderizarTarefas()
}

function mostrarBotao() {
    if (tarefas.length > 0) {
        botaoLimpar.style.display = 'flex'
    } else {
        botaoLimpar.style.display = 'none'
    }
}

// inicializa estado do botão ao carregar o script
mostrarBotao()

// Parâmetro é uma variável nova que recebe um valor no momento da execução da função.
// É na definição da função, durante a execução.

// Argumento é o valor que você passa para uma função quando a chama.
// É na chamada da função, antes da execução.

function mudarMensagemErro() {
    mensagem.textContent = 'Digite algo para adicionar uma tarefa.'
    mensagem.style.backgroundColor = '#d12727'
    mensagem.style.color = '#fff'
    mensagem.style.opacity = '1'
}

function mudarMensagemSucesso() {
    mensagem.textContent = 'Tarefa adicionada com sucesso!'
    mensagem.style.backgroundColor = '#26a01b'
    mensagem.style.color = '#fff'
    mensagem.style.opacity = '1'
}

function mudarMensagemLimpar() {
    mensagem.textContent = 'Lista de tarefas limpa com sucesso!'
    mensagem.style.backgroundColor = '#169957'
    mensagem.style.color = '#fff'
    mensagem.style.opacity = '1'
}