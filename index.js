const mensagem = document.querySelector('#mensagem')
const botaoLimpar = document.querySelector('#botaoLimpar')
const inputTarefa = document.querySelector('#inputTarefa')
let tarefas = []

const listaSalva = localStorage.getItem('tarefas');
if (listaSalva !== null) {
    tarefas = JSON.parse(listaSalva)
}

if (tarefas.length > 0) {
        console.log('as tarefas foram recarregadas com o refresh do site.')
    }

inputTarefa.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});

renderizarTarefas()
atualizarListaStorage()

function adicionarTarefa() {
    let tarefa = inputTarefa.value.trim()
    if (tarefa == '') {
        mudarMensagemErro();
    } else {
        mudarMensagemSucesso()
        tarefas.push({
            texto: tarefa,
            prazo: '',
            status: false
        })
        renderizarTarefas()
        mostrarBotao()
        console.log(tarefa)
        atualizarListaStorage()
    }
    inputTarefa.value = ''
}

function renderizarTarefas() {
    const listaTarefas = document.querySelector('#listaTarefas')
    listaTarefas.innerHTML = '' // esvazia a lista para quando ela for reescrita, não repetir as mesmas tarefas

    for (let i = 0; i < tarefas.length; i++) {
        const novaTarefa = document.createElement('li')
        novaTarefa.className = 'nova-tarefa'

        let textoTarefa = document.createElement('p')
        textoTarefa.textContent = tarefas[i].texto

        let novoPrazo = document.createElement('input')
        novoPrazo.type = 'date'
        novoPrazo.className = 'novo-prazo'
        novoPrazo.value = tarefas[i].prazo

        novoPrazo.addEventListener('change', () => {
            tarefas[i].prazo = novoPrazo.value
            atualizarListaStorage()
        })

        let novoStatus = document.createElement('input')
        novoStatus.type = 'checkbox'
        novoStatus.className = 'novo-status'
        novoStatus.checked = tarefas[i].status
        
        novoStatus.addEventListener('change', () => {
            tarefas[i].status = novoStatus.checked
            novaTarefa.classList.toggle('concluida', novoStatus.checked)
            atualizarListaStorage()
        })
        

        const botaoRemover = document.createElement('button')
        botaoRemover.className = 'botao-remover'
        botaoRemover.onclick = () => removerTarefa(i) // (2/2) aqui, o "i" é uma variável também, mas já tem um valor, ou seja, é um argumento.

        // os parênteses de uma função são usados para entregar um valor de uma função para outra
        // nesse caso, foi usado o parênteses no removerTarefa() para levar o índice (i) de qual tarefa será excluída
        // tem que colocar o tal valor na declaração da função, e quando for chamá-la para rodar
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
        const divisao = document.createElement('div')
        divisao.className = 'divisao'

        novaTarefa.appendChild(textoTarefa)
        botoes.appendChild(novoStatus)
        botoes.appendChild(botaoRemover)
        botoes.appendChild(botaoEditar)
        botaoRemover.appendChild(iconeRemover)
        botaoEditar.appendChild(iconeEditar)
        divisao.appendChild(botoes)
        divisao.appendChild(novoPrazo)
        novaTarefa.appendChild(divisao)
        listaTarefas.appendChild(novaTarefa)
    }
}

function removerTarefa(i) { // (1/2) aqui, o "i" é um parâmetro, não tem valor, é só uma variável que será usada dentro da função e que receberá um valor. (volte para o for loop)
    tarefas.splice(i, 1) // o (*, 1) é quantidade de tarefas (índices) que serão excluídas
    // o (i, *) é o índice que o removerTarefa() trouxe para saber qual tarefa será excluída (sair do array pelo splice)
    mostrarBotao() // chama a função para atualizar o estado do botão quando apagar uma tarefa
    renderizarTarefas()
    // se renderiza a lista de tarefas novamente para mostrar a versão atualizada (sem a tarefa excluída).
    atualizarListaStorage()
}

function editarTarefa(i) {
    let tarefaEditada = prompt("Escolha um novo nome para sua tarefa:")
    if (tarefaEditada.trim !== "") {
        tarefas[i].texto = tarefaEditada
        renderizarTarefas()
        atualizarListaStorage()
    }
}

function limparLista() {
    tarefas.length = 0
    mudarMensagemLimpar()
    mostrarBotao() // chama a função para atualizar o estado do botão quando apagar todas as tarefas
    renderizarTarefas()
    atualizarListaStorage()
}

function atualizarListaStorage() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
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

function mudarMensagemErro() {
    mensagem.textContent = 'Digite algo para adicionar uma tarefa.'
    mensagem.classList.remove('sucesso', 'limpar')
    mensagem.classList.add('erro')
    mensagem.style.opacity = '1'
    setTimeout(() => { mensagem.style.opacity = '0' }, 2500)
}

function mudarMensagemSucesso() {
    mensagem.textContent = 'Tarefa adicionada com sucesso!'
    mensagem.classList.remove('limpar', 'erro')
    mensagem.classList.add('sucesso')
    mensagem.style.opacity = '1'
    setTimeout(() => { mensagem.style.opacity = '0' }, 2500)
}

function mudarMensagemLimpar() {
    mensagem.textContent = 'Lista de tarefas limpa com sucesso!'
    mensagem.classList.remove('sucesso', 'erro')
    mensagem.classList.add('limpar')
    mensagem.style.opacity = '1'
    setTimeout(() => { mensagem.style.opacity = '0' }, 2500)
}

// Parâmetro é uma variável nova que recebe um valor no momento da execução da função.
// É na definição da função, durante a execução.

// Argumento é o valor que você passa para uma função quando a chama.
// É na chamada da função, antes da execução.