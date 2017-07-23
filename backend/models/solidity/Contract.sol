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

    address organizer;
    string eventName;
    string phoneNumber;
    string location;
    string date;
    mapping(address=>Insurance) insurances;

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
        
    }

    function oricalizeCheck() private {
        oraclize_query("WolframAlpha", strConcat("will it rain in ", location, " on timestamp ", date));
    }

    function locationCheck() private {

    }

    function buyContract(
        uint _price,
        uint _payout
    ) payable {
        // ensure the payout in relation to payour is within a 5% error margin
        insurances[msg.sender] = Insurance(
            _price,
            _payout,
            false,
            false
        );
    }
}