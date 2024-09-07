// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingManager {

    struct Voting {
        uint256 id;
        string description;
        address creator;
        address[] participants;
        bool isActive;
        uint256 creationTime;
        uint256 endTime;
    }

    mapping(uint256 => Voting) public votings;
    uint256 public nextVotingId;
    address public owner;

    event VotingCreated(uint256 indexed id, string description, address indexed creator, address[] participants, uint256 endTime);

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
            endTime: endTime
        });
        votings[votingId] = newVoting;
        nextVotingId++;
        emit VotingCreated(votingId, _description, msg.sender, _participants, endTime);
        return votingId;
    }

    function deactivateVoting(uint256 _votingId) public onlyOwner {
        require(votings[_votingId].id != 0, "Votacao com este ID nao existe.");
        votings[_votingId].isActive = false;
    }

    function getVotingDetails(uint256 _votingId) public view returns (
        uint256 id,
        string memory description,
        address creator,
        address[] memory participants,
        bool isActive,
        uint256 creationTime,
        uint256 endTime
    ) {
        require(votings[_votingId].id != 0, "Votacao com este ID nao existe.");
        Voting memory voting = votings[_votingId];
        return (
            voting.id,
            voting.description,
            voting.creator,
            voting.participants,
            voting.isActive,
            voting.creationTime,
            voting.endTime
        );
    }
}
