// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingQuery {

    struct Voting {
        uint256 id;
        string description;
        address creator;
        address[] participants;
        bool isActive;
        uint256 creationTime;
        uint256 endTime;
        uint256 votesFor;
        uint256 votesAgainst;
    }

    mapping(uint256 => Voting) public votings;
    uint256 public nextVotingId;
    address public owner;

    event VotingCreated(uint256 indexed id, string description, address indexed creator, address[] participants, uint256 endTime);
    event VoteCasted(uint256 indexed id, address indexed voter, bool inFavor);

    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o dono do contrato pode realizar essa acao.");
        _;
    }

    constructor() {
        owner = msg.sender;
        nextVotingId = 1;
    }

    function createVoting(string memory _description, address[] memory _participants, uint256 _durationInDays) public returns (uint256) {
        require(_participants.length > 0, "A votacao deve ter pelo menos um participante.");
        uint256 votingId = nextVotingId;
        uint256 endTime = block.timestamp + (_durationInDays * 1 days);
        Voting memory newVoting = Voting({
            id: votingId,
            description: _description,
            creator: msg.sender,
            participants: _participants,
            isActive: true,
            creationTime: block.timestamp,
            endTime: endTime,
            votesFor: 0,
            votesAgainst: 0
        });
        votings[votingId] = newVoting;
        nextVotingId++;
        emit VotingCreated(votingId, _description, msg.sender, _participants, endTime);
        return votingId;
    }

    function castVote(uint256 _votingId, bool _inFavor) public {
        require(votings[_votingId].id != 0, "Votacao com este ID nao existe.");
        require(votings[_votingId].isActive, "A votacao nao esta mais ativa.");
        require(block.timestamp <= votings[_votingId].endTime, "O periodo de votacao ja terminou.");
        
        if (_inFavor) {
            votings[_votingId].votesFor++;
        } else {
            votings[_votingId].votesAgainst++;
        }
        
        emit VoteCasted(_votingId, msg.sender, _inFavor);
    }

    function getVotingDetails(uint256 _votingId) public view returns (
        string memory description,
        bool isActive,
        address creator,
        address[] memory participants,
        uint256 creationTime,
        uint256 endTime,
        uint256 votesFor,
        uint256 votesAgainst
    ) {
        require(votings[_votingId].id != 0, "Votacao com este ID nao existe.");
        Voting memory voting = votings[_votingId];
        return (
            voting.description,
            voting.isActive,
            voting.creator,
            voting.participants,
            voting.creationTime,
            voting.endTime,
            voting.votesFor,
            voting.votesAgainst
        );
    }
}