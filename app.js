// Adicionando o Web3.js ao projeto
const Web3 = require('web3');

// Detectar se a MetaMask está instalada
document.getElementById('connectButton').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        // Conectando à MetaMask
        const web3 = new Web3(window.ethereum);
        try {
            // Solicitar contas
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            document.getElementById('account').innerText = `Conectado: ${accounts[0]}`;

            // Mostrar os botões extras
            document.getElementById('extraButton1').classList.remove('hidden');
            document.getElementById('extraButton2').classList.remove('hidden');
            document.getElementById('extraButton3').classList.remove('hidden');
        } catch (error) {
            console.error("Erro ao conectar com MetaMask:", error);
        }
    } else {
        alert("MetaMask não está instalada!");
    }
});

// Lógica para o primeiro botão extra (Ingresso em Votação)
document.getElementById('extraButton1').addEventListener('click', () => {
    // Ocultar imagem e botões
    document.querySelector('.container').classList.add('hidden');
    document.getElementById('connectButton').classList.add('hidden');
    document.getElementById('extraButton1').classList.add('hidden');
    document.getElementById('extraButton2').classList.add('hidden');
    document.getElementById('extraButton3').classList.add('hidden');

    // Mostrar a nova seção de ingressar em votação
    document.getElementById('votingIdSection').classList.remove('hidden');
});

// Lógica para o segundo botão extra (Criação de Votação)
document.getElementById('extraButton2').addEventListener('click', () => {
    // Ocultar imagem e botões
    document.querySelector('.container').classList.add('hidden');
    document.getElementById('connectButton').classList.add('hidden');
    document.getElementById('extraButton1').classList.add('hidden');
    document.getElementById('extraButton2').classList.add('hidden');
    document.getElementById('extraButton3').classList.add('hidden');

    // Mostrar a seção de criação de votação
    document.getElementById('createVotingSection').classList.remove('hidden');
});

// Lógica para o terceiro botão extra (Consulta de Votação)
document.getElementById('extraButton3').addEventListener('click', () => {
    // Ocultar imagem e botões
    document.querySelector('.container').classList.add('hidden');
    document.getElementById('connectButton').classList.add('hidden');
    document.getElementById('extraButton1').classList.add('hidden');
    document.getElementById('extraButton2').classList.add('hidden');
    document.getElementById('extraButton3').classList.add('hidden');

    // Mostrar a seção de consulta de votação
    document.getElementById('consultIdSection').classList.remove('hidden');
});

// Lógica para criação de uma nova votação
document.getElementById('finalizeButton').addEventListener('click', () => {
    const description = document.getElementById('votingDescription').value.trim();
    const addresses = document.getElementById('votingAddresses').value.split(',').map(addr => addr.trim());
    const creator = document.getElementById('account').innerText.replace('Conectado: ', '').trim();
    const endsAt = new Date();
    endsAt.setDate(endsAt.getDate() + 7); // Define a data de término como 7 dias após a criação
    const endsAtFormatted = endsAt.toISOString().split('T')[0]; // Formata a data de término

    // Criar uma nova sala com a descrição, endereços fornecidos e criador
    const newId = createNewRoom(description, addresses, creator, endsAtFormatted);

    // Exibir o resultado
    const resultMessage = `Votação criada! ID: ${newId}`;
    document.getElementById('creationResult').innerText = resultMessage;

    // (Opcional) Atualizar o arquivo ids.js ou a base de dados
    // Aqui, você precisaria de uma função server-side para persistir essa atualização.
});

// Lógica para pesquisar por ID de votação
document.getElementById('searchButton').addEventListener('click', () => {
    const id = document.getElementById('votingIdInput').value.trim();
    const account = document.getElementById('account').innerText.replace('Conectado: ', '').trim();

    const result = checkRoom(id, account);

    if (result.status === "success") {
        document.getElementById('resultMessage').innerHTML = `
            <p>${result.message}</p>
            <button id="voteForButton">A Favor</button>
            <button id="voteAgainstButton">Contra</button>
        `;

        document.getElementById('voteForButton').addEventListener('click', () => {
            vote(id, 'for');
            document.getElementById('resultMessage').innerText = "Voto bem sucedido!";
        });

        document.getElementById('voteAgainstButton').addEventListener('click', () => {
            vote(id, 'against');
            document.getElementById('resultMessage').innerText = "Voto bem sucedido!";
        });
    } else {
        document.getElementById('resultMessage').innerText = result.message;
    }
});

// Lógica para consulta de votação por ID
document.getElementById('consultButton').addEventListener('click', () => {
    const id = document.getElementById('consultIdInput').value.trim();
    const result = consultRoom(id);

    if (result.status === "success") {
        const room = result.roomInfo;
        document.getElementById('consultResult').innerHTML = `
            <p><strong>Descrição:</strong> ${room.description}</p>
            <p><strong>Status:</strong> ${room.status}</p>
            <p><strong>Criador:</strong> ${room.creator}</p>
            <p><strong>Participantes:</strong> ${room.addresses.join(', ')}</p>
            <p><strong>Data de Criação:</strong> ${room.createdAt}</p>
            <p><strong>Data de Término:</strong> ${room.endsAt}</p>
            <p><strong>Votos a Favor:</strong> ${room.votes.for}</p>
            <p><strong>Votos Contra:</strong> ${room.votes.against}</p>
        `;
    } else {
        document.getElementById('consultResult').innerText = result.message;
    }
});
