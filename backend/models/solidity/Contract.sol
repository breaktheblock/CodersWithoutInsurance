pragma solidity ^0.4.0;
import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

contract SunshineContract is usingOraclize {
    struct Insurance
    {
        uint price;
        uint payout;
        bool isPaidout;
        bool isLocationVerified;
    }

    address public organizer;
    string public eventName;
    string public phoneNumber;
    string public location;
    string public date;
    mapping(address=>Insurance) public insurances;

    function SunshineContract(
        string _eventName,
        string _phoneNumber,
        string _location,
        string _date
    ) {
        organizer = msg.sender;
        eventName = _eventName;
        phoneNumber = _phoneNumber;
        location = _location;
        date = _date;
    }

    function __callback(string myid, string result) {
        require(msg.sender != oraclize_cbAddress());
        // on reciept, if rain is found in result,
        // the insurances will get released by insurances[0].send(insurances[0].payout)
        
    }

    function oricalizeCheck() private {
        // this would be delayed until the day of the demo
        // it would run this query every 1 hour
        oraclize_query("WolframAlpha", strConcat("will it rain in ", location, " on timestamp ", date));
    }

    function locationCheck() private {

    }

    function buyContract(
        uint _price,
        uint _payout
    ) payable {
        // ensure the payout in relation to payour is within a 5% error margin
        // msg.sender should be the same value as _price
        insurances[msg.sender] = Insurance(
            _price,
            _payout, // this contains the amount of money to be paid out
            false,
            false
        );
    }
}