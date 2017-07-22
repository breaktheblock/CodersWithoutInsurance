pragma solidity ^0.4.0;

contract Shipment {
  struct Seller
  {
    bytes32 name;
    bytes32 company;
    bytes32 location;
    address account;
  }

  struct Buyer
  {
    bytes32 name;
    bytes32 company;
    bytes32 location;
    address account;
    bool paid;
  }

  struct Cargo
  {
    bytes32 name;
    string description;
    uint quantity;
    uint weight;

    uint startdate;
    uint enddate; // expiry date?
    uint price;
    uint penalty;
    string hash; // hash from mongo?
  }

  struct Leg
  {
    bytes32 origin;
    bytes32 destination;
    address account;

    bool active;
    bool isDelivered;

    uint startdate;
    uint enddate;
  }

  Seller seller;
  Buyer buyer;
  Cargo public cargo;
  Leg[] transit;
  
  function Shipment(bytes32 _name,
               bytes32 _company,
               bytes32 _location,
               bytes32 _cargo_name,
               string _description,
               uint _quantity,
               uint _weight,
               uint _price,
               string _hash)
  {
    seller.name = _name;
    seller.company = _company;
    seller.location = _location;
    seller.account = msg.sender;

    cargo.name = _cargo_name;
    cargo.description = _description;
    cargo.quantity = _quantity;
    cargo.weight = _weight;
    cargo.startdate = now;
    cargo.price = _price;
    cargo.hash = _hash;
  }

  function buy(bytes32 _name, bytes32 _company, bytes32 _location)
  {
    buyer.name = _name;
    buyer.company = _company;
    buyer.location = _location;
    buyer.account = msg.sender;
    buyer.paid = true;
    buyer.account.send(cargo.price);
  }

  function getCargo() constant returns (uint) {
    return 13;
  }

  function addTravelLeg(bytes32 _origin, bytes32 _destination, bool _active, bool _is_delivered)
  {
    transit.push(Leg(
        _origin,
        _destination,
        msg.sender,
        _active,
        _is_delivered,
        now,
        now
    ));
  }
}
