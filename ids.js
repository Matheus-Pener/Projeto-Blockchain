const rooms = {
    "1": {
        description: "Arlindo deverá liberar de forma detalhada os tópicos da segunda prova",
        creator: "0xe73533a6604489d423ebed35133388da75d5593d",
        addresses: ["0xe73533a6604489d423ebed35133388da75d5593d", "0xa12345b67890c1234567890d1234567890abcd12", "0xc12345d67890e1234567890f1234567890abcd56", "0xc12345d67890e1234567890f1234567890abcd56", "0xc12345d67890e1234567890f1234567890abcd56"],
        status: "fechada",
        createdAt: "2024-08-18",
        endsAt: "2024-08-25",
        votes: {
            for: 5,
            against: 0
        }
    },
    "2": {
        description: "Decisão sobre a nova política de férias.",
        creator: "0xb12345c67890d1234567890e1234567890abcd34",
        addresses: ["0xb12345c67890d1234567890e1234567890abcd34", "0xc12345d67890e1234567890f1234567890abcd56"],
        status: "aberta",
        createdAt: "2024-08-19",
        endsAt: "2024-08-26",
        votes: {
            for: 0,
            against: 0
        }
    },
    "3": {
        description: "Aprovação da nova contratação.",
        creator: "0xd12345e67890f1234567890a1234567890abcd78",
        addresses: ["0xd12345e67890f1234567890a1234567890abcd78", "0xe12345f67890a1234567890b1234567890abcd90"],
        status: "encerrada",
        createdAt: "2024-08-15",
        endsAt: "2024-08-22",
        votes: {
            for: 0,
            against: 0
        }
    }
};

// Esta variável rastreia o último ID gerado
let nextId = Object.keys(rooms).length + 1;

function checkRoom(id, address) {
    if (!rooms[id]) {
        return { status: "error", message: "Sala Invalida!" };
    } else if (!rooms[id].addresses.includes(address.toLowerCase())) {
        return { status: "error", message: "Você não foi convidado para essa reunião" };
    } else {
        return { status: "success", message: rooms[id].description };
    }
}

function createNewRoom(description, addresses, creator, endsAt) {
    const newId = nextId.toString(); // Converte o número para string
    const currentDate = new Date().toISOString().split('T')[0]; // Data atual no formato YYYY-MM-DD
    rooms[newId] = {
        description,
        creator,
        addresses,
        status: "aberta",
        createdAt: currentDate,
        endsAt,
        votes: {
            for: 0,
            against: 0
        }
    };
    nextId++; // Incrementa o próximo ID disponível
    return newId; // Retorna o ID criado
}

function consultRoom(id) {
    if (!rooms[id]) {
        return { status: "error", message: "Sala Invalida!" };
    } else {
        return {
            status: "success",
            roomInfo: rooms[id]
        };
    }
}

function vote(id, option) {
    if (rooms[id]) {
        rooms[id].votes[option]++;
    }
}
