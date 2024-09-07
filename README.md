# Projeto-Blockchain
Esse repositório tem como objetivo registrar e centralizar todo desenvolvimento da implementação de uma aplicação decentralizada (DApp) proposta na disciplina de Tópicos da Computação II

# PROPOSTA
Este projeto é uma aplicação descentralizada (dApp) construída na Ethereum, projetada para implementar um sistema de votação através de salas privadas em que a autentificação de permissionamente para cada sala seja feita através da carteira digital. O sistema permite que os usuários autentiquem-se via MetaMask, participem de processos de votação e tomem decisões através de contratos inteligentes.

*SEGURANÇA E TRANSPARÊNCIA :* Garante segurança e transparência ao utilizar blockchain e autenticação impedindo acessos não autorizados e registro imutável dos votos, assegurando a integridade e a confiança no processo de votação.

*CONTROLE :* O criador de uma sala tem controle sobre quem pode participar da votação, gerando um ID exclusivo para cada sala e autorizando apenas usuários específicos a votar, garantindo que apenas autorizados possam participar do processo decisório

![VisualInicial](https://github.com/user-attachments/assets/58aa9a40-56dd-430b-8544-eb85c90b8699)

# FUNCIONALIDADES
*Autenticação com MetaMask:* Os usuários devem se autenticar usando suas carteiras MetaMask para que possam acessar a rede. Após a autentificação será possibilitado três funcionalidades para serem realizadas:

![pós-permissão](https://github.com/user-attachments/assets/96ab3157-c005-41a2-949a-5bdbd8ce01bb)

*1ª Funcionalidade :* INGRESSE NUMA VOTAÇÃO

Nesta funcionalidade, vamos ingressar numa votação a partir de um ID único gerado por um contrato e, caso a carteira digital do usuário tenha permissão para ingressar, assim será feito possibilitanto ao usuário receber a descrição da votação e a decisão de ser a favor ou contra a proposta.

![votando](https://github.com/user-attachments/assets/5d32bdea-34c1-4185-95a3-da060f65c464)

*2ª Funcionalidade :* CRIE UMA VOTAÇÃO

Aqui será permitido ao usuário criar uma votação com a proposta da votação e inserir quais são os endereços de carteira válido. Após isso teremos a compilação do contrato para geração de um ID único dá votação

![CriandoVoto](https://github.com/user-attachments/assets/5f0a24f7-f193-4c34-8b5e-0b69cd7d4109)

*3ª Funcionalidade :* CONSULTE UMA VOTAÇÃO

Por fim, com finalidade de garantir transparência ao usuário, poderá ser consultado o ID da votação trazendo as seguintes informações ao usuário:
Descrição, Status, Criador, Participantes, Data de criação, Data de Término, Votos a favor, Votos contra.

![consultandoID](https://github.com/user-attachments/assets/f4cdf5ad-2e2b-4abc-8713-316a1ca1a949)

# Observações gerais do projeto

- Apenas poderá ingressar numa sala autorizada
- Ao realizar o voto saíra automaticamente da sala
- Após votar não conseguirá ingressar na sala novamente
- Um endereço poderá criar uma votação a cada 10 dias
- A votação encerrará automaticamente após uma semana
- Quem criou a votação poderá realizar um voto também
- Utilização das seguintes tecnologias: Ganache, Javascript, Html, Css, Rede Ethereum, Meta Mask 
