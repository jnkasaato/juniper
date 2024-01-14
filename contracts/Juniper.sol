// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Juniper {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    struct Item {
        uint256 id;
        string name;
        string category;
        string vendor;
        string color;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
        string size;
    }

    struct Order {
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    mapping(address => mapping(uint256 => Order)) public orders;
    mapping(address => uint256) public orderCount;

    event ItemListed(string name, uint256 cost, uint256 stock);
    event ItemPurchased(address buyer, uint256 orderId, uint256 itemId);

    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _vendor,
        string memory _color,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock,
        string memory _size
    ) public onlyOwner {
        Item memory item = Item(
            _id,
            _name,
            _category,
            _vendor,
            _color,
            _image,
            _cost,
            _rating,
            _stock,
            _size
        );

        items[_id] = item;

        emit ItemListed(_name, _cost, _stock);
    }

    function buy(uint256 _id) public payable {
        Item storage item = items[_id];
        Order memory order = Order(block.timestamp, item);
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;
        item.stock--;
        emit ItemPurchased(msg.sender, orderCount[msg.sender], item.id);
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}
