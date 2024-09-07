pragma solidity ^0.8.0;

contract IsAuthorized {

    struct Voting {
        uint256 id;
        address creator;
        address[] participants;
        bool isActive;
    }
    mapping(uint256 => Voting) public votings;
    address public owner;

    event VotingCreated(uint256 indexed id, address indexed creator, address[] participants);

    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o dono do contrato pode realizar essa acao.");
        _;
    }
    constructor() {
        owner = msg.sender;
    }

    function createVoting(uint256 _id, address[] memory _participants) public {
        require(votings[_id].id == 0, "Votacao com este ID ja existe."); // Verifica se a votação já existe

        Voting memory newVoting = Voting({
            id: _id,
            creator: msg.sender,
            participants: _participants,
            isActive: true
        });

        votings[_id] = newVoting;

        emit VotingCreated(_id, msg.sender, _participants);
    }

    function isAuthorized(uint256 _votingId, address _user) public view returns (bool) {
        Voting memory voting = votings[_votingId];

        require(voting.isActive, "A votacao nao esta mais ativa.");
        require(voting.id != 0, "Votacao com este ID nao existe.");

        for (uint i = 0; i < voting.participants.length; i++) {
            if (voting.participants[i] == _user) {
                return true;
            }
        }

        return false;
    }
    function deactivateVoting(uint256 _votingId) public onlyOwner {
        require(votings[_votingId].id != 0, "Votacao com este ID nao existe.");
        votings[_votingId].isActive = false;
    }
}
