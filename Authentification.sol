// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Authentication {

    address public authorizedAddress;

    mapping(address => bool) public authorizedUsers;

    address public owner;

    event UserAuthorized(address indexed user);

    event UserRevoked(address indexed user);

    constructor(address _initialAuthorizedAddress) {
        authorizedAddress = _initialAuthorizedAddress;
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Apenas o dono do contrato pode realizar essa acao.");
        _;
    }

    function authorizeUser(address _user) public onlyOwner {
        authorizedUsers[_user] = true;
        emit UserAuthorized(_user);
    }

    function revokeUser(address _user) public onlyOwner {
        authorizedUsers[_user] = false;
        emit UserRevoked(_user);
    }

    function isAuthorized(address _user) public view returns (bool) {
        return authorizedUsers[_user] || _user == authorizedAddress;
    }

    function changeAuthorizedAddress(address _newAddress) public onlyOwner {
        authorizedAddress = _newAddress;
    }
}