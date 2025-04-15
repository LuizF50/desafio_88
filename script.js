// Função principal para ordenar as pontuações dos jogadores
function ordenarPontuacoes(jogadores) {
    // Cria uma cópia do array original para não modificar o input
    const jogadoresOrdenados = [...jogadores];

    // Ordena os jogadores usando uma função de comparação personalizada
    jogadoresOrdenados.sort((a, b) => {
        // Compara as pontuações em ordem decrescente
        return b.pontuacao - a.pontuacao;
    });

    // Retorna o array ordenado
    return jogadoresOrdenados;
}

// Função para coletar os dados dos inputs da tabela
function coletarDadosJogadores() {
    const nomes = document.querySelectorAll('.player-name');
    const pontuacoes = document.querySelectorAll('.player-score');
    const jogadores = [];

    // Percorre todos os inputs e cria objetos jogador
    for (let i = 0; i < nomes.length; i++) {
        const nome = nomes[i].value.trim();
        const pontuacao = parseInt(pontuacoes[i].value);

        // Só adiciona se tiver nome e pontuação válida
        if (nome && !isNaN(pontuacao)) {
            jogadores.push({
                nome: nome,
                pontuacao: pontuacao
            });
        }
    }

    return jogadores;
}

// Função para exibir os resultados no pódio
function displayResults(jogadoresOrdenados) {
    const podiumContainer = document.querySelector('.podium-container');
    const otherPlayersContainer = document.getElementById('other-players');

    // Limpa os containers
    otherPlayersContainer.innerHTML = '';

    // Atualiza o pódio (primeiros 3 lugares)
    const places = ['first-place', 'second-place', 'third-place'];

    for (let i = 0; i < Math.min(3, jogadoresOrdenados.length); i++) {
        const place = document.querySelector(`.${places[i]} .player-info`);
        const jogador = jogadoresOrdenados[i];

        place.innerHTML = `
            <div class="player-name">${jogador.nome}</div>
            <div class="player-score">${jogador.pontuacao} pts</div>
        `;
    }

    // Exibe os demais jogadores (a partir do 4º lugar)
    for (let i = 3; i < jogadoresOrdenados.length; i++) {
        const jogador = jogadoresOrdenados[i];
        const playerElement = document.createElement('div');
        playerElement.className = 'other-player';
        playerElement.innerHTML = `
            <div class="player-name">${i + 1}º ${jogador.nome}</div>
            <div class="player-score">${jogador.pontuacao} pts</div>
        `;
        otherPlayersContainer.appendChild(playerElement);
    }

    // Mostra mensagem se não houver jogadores suficientes
    if (jogadoresOrdenados.length < 3) {
        otherPlayersContainer.innerHTML = `<p>Adicione mais jogadores para preencher o pódio!</p>`;
    }
}

// Função principal executada quando o botão é clicado
function handleButtonClick() {
    try {
        // Coleta os dados dos inputs
        const jogadores = coletarDadosJogadores();

        // Valida se há jogadores
        if (jogadores.length === 0) {
            throw new Error("Por favor, insira dados para pelo menos um jogador");
        }

        // Ordena os jogadores por pontuação
        const jogadoresOrdenados = ordenarPontuacoes(jogadores);

        // Exibe os resultados
        displayResults(jogadoresOrdenados);
    } catch (error) {
        // Exibe mensagens de erro
        alert(error.message);
        console.error(error);
    }
}

// Configura o evento de clique do botão quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const sortButton = document.getElementById('sort-btn');
    sortButton.addEventListener('click', handleButtonClick);

    // Preenche alguns exemplos iniciais
    const nomes = document.querySelectorAll('.player-name');
    const pontuacoes = document.querySelectorAll('.player-score');

    // Exemplo 1
    if (nomes[0] && pontuacoes[0]) {
        nomes[0].value = 'Mario';
        pontuacoes[0].value = '150';
    }

    // Exemplo 2
    if (nomes[1] && pontuacoes[1]) {
        nomes[1].value = 'Link';
        pontuacoes[1].value = '200';
    }

    // Exemplo 3
    if (nomes[2] && pontuacoes[2]) {
        nomes[2].value = 'Donkey Kong';
        pontuacoes[2].value = '200';
    }

    // Exemplo 4
    if (nomes[3] && pontuacoes[3]) {
        nomes[3].value = 'Sonic';
        pontuacoes[3].value = '120';
    }
});