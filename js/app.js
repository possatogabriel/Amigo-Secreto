// ARRAY PARA ARMAZENAR OS NOMES DOS AMIGOS
let arrayNomes = [];

// FUNÇÃO AO CLICAR NO BOTÃO DE ADICIONAR
function clicarAdicionar() {
    let nome = document.getElementById('nome-amigo').value.toUpperCase();
    
    // ESTRUTURA DE CONDIÇÃO SE NENHUM VALOR FOR INSERIDO NO NOME
    if (nome == '') {
        alert("Insira um NOME válido!");
        return;
    }

    // ESTRUTURA DE CONDIÇÃO SE O NOME JÁ TIVER SIDO ADICIONADO
    if (arrayNomes.includes(nome)) {
        alert("O nome JÁ FOI inserido! Tente outro!");
        document.getElementById('nome-amigo').value = '';
        return;
    }

    arrayNomes.push(nome);

    let listaNomes = document.getElementById('lista-amigos'); 

    // ESTRUTURA DE CONDIÇÃO PARA VERIFICAR SE É O PRIMEIRO NOME INSERIDO OU NÃO
    if (listaNomes.textContent == '') {
        listaNomes.textContent = nome;
    }

    else {
        listaNomes.textContent = `${listaNomes.textContent}, ${nome}`;
    }

    atualizarLista();
    atualizarSorteio();
}

// FUNÇÃO AO CLICAR NO BOTÃO DE SORTEAR
function clicarSortear() {
    embaralharNomes(arrayNomes);

    let sorteio = document.getElementById('lista-sorteio');
    let condicaoArray;

    // ESTRUTURA DE REPETIÇÃO QUE EXIBE OS NOMES DE ACORDO COM OS ÍNDICES DO ARRAY (índices em ordem crescente, mas nomes bagunçados pela função "embaralharNomes")
    for (let i = 0; i < arrayNomes.length; i++) {

        // ESTRUTURA DE CONDIÇÃO PARA VERIFICAR SE TODOS NOMES JÁ FORAM EXIBIDOS 
        if (i == arrayNomes.length - 1) {
            condicaoArray = arrayNomes[0];
        } 
    
        else {
            condicaoArray = arrayNomes[i + 1];
        }

        // CÓDIGO QUE EXIBE OS NOMES SORTEADOS NA TELA
        sorteio.innerHTML = sorteio.innerHTML + `${arrayNomes[i]} --> ${condicaoArray} <br/>`;
    }
}

// FUNÇÃO AO CLICAR NO BOTÃO DE REINICIAR
function clicarReiniciar() {
    arrayNomes = [];

    document.getElementById('lista-sorteio').innerHTML = '';
    document.getElementById('nome-amigo').value = '';
    document.getElementById('lista-amigos').textContent = '';
}

// FUNÇÃO QUE EMBARALHA OS NOMES 
function embaralharNomes(lista) {
    let indice = lista.length
    
    while (indice) {
        const indiceAleatorio = Math.floor(Math.random() * indice--);

        [lista[indice], lista[indiceAleatorio]] = 
            [lista[indiceAleatorio], lista[indice]];
    }
}

// FUNÇÃO QUE EXCLUI O NOME CLICADO DA LISTA 
function excluirAmigo(index) {
    arrayNomes.splice(index, 1);
    atualizarLista();
    atualizarSorteio();
    clicarSortear();
}

// FUNÇÃO QUE ATUALIZA A LISTA AO REMOVER UM NOME
function atualizarLista() {
    let lista = document.getElementById('lista-amigos')
    lista.innerHTML = '';

    for (let i = 0; i < arrayNomes.length; i++) {
        // ADICIONA NOVO PARÁGRAFO PARA SEPARAÇÃO DOS NOMES INSERIDOS
        let novoParagrafo = document.createElement('p');
        novoParagrafo.textContent = arrayNomes[i];

        // ADICIONA CLASSE QUE DEIXA TEXTO VERMELHO E CURSOR DIFERENTE *AO PASSAR O MOUSE POR CIMA*
        novoParagrafo.setAttribute('class', 'paragrafo-novo')
       
        // ADICIONA EVENTO DE "CLICAR" EM UM NOME E O EXCLUIR
        novoParagrafo.addEventListener('click', function() {
            excluirAmigo(i);
        });

        // COLOCA PARÁGRAFO NA LISTA 
        lista.appendChild(novoParagrafo);
    }
}

// FUNÇÃO QUE ATUALIZA O SORTEIO AO REMOVER UM NOME
function atualizarSorteio() {
    document.getElementById('lista-sorteio').innerHTML = '';
}
