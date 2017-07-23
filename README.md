# BreakTheBlock Hackathon Team Coders without Insurance

## Insure your Event

Problem statement: 

Insurance companies are commonly assoicated with being untrustworthy and are facing high administration costs and significant levels of fraud. Smart contracts are an incredibly powerful and adaptable way of ensuring all parties within the contract execute if all the parameters are met. When brought together, we believe there is a massive opportunity to reduce processing times, reduce administration costs, prevent fraud and increase customer satisfaction. Below we've got one application of our idea, however there is a huge number of areas and applications that our hack can be applied to. 

There is an inherent dependency between the success of an outdoor event such a music festival, sports event or any outdoor event that generates business and the financial loss that can incur if the weather is poor.

The flow is that a event organiser creates an event on our DAPP, which will create a contract. This contract can be sent to the attendees and they can insure it against the weather. A query to a weather forecast API (Wolfram Alpha) and how much the event is in the future determines the premium and the payout (if it rains).

If there is any impact of the rain (e.g. the festival/concert gets cancelled) a sensor network of Raspberry Pis along side with further Weather API queries will trigger a sms message to the insured people. The message contains a link which opens the claim process page on their phone. Part of the claim process requires that the user's mobile browser detects the location and depending if the location and time is correct the funds will be released to the originator.

With this Mobile site process we can ensure that the attendees were actually at the event (or intended to go to the event) and we can mitigate the risk that people would insure evens they never intended to attend. The insured de facto have to "go and pick up their insurance claim at a the location they originally intended to go.

## Involvement of the sensor network
In order to detect the rain, we also propose to involve a raspberry pi sensor network to verify that the rain event actually occured:

- rain sensor "seesaw style"
- rain sensor using camera (counting open umbrellas at any given time)
- rain sensor using camera looking at sky
- humidity sensor

The information coming from the (various) sensors helps weighing the decision of rain and ensures the trigger is more verified.

## Flow

- Joe is organising a festival 🎉
- Joe decides he wants give visitors the option to get insurance in case the event gets cancelled due to weather 🌧️
- Joe enters the event details on Insure your Festival and shares insure link to the ticket holders so they can use ETH to get insurance ✅
- On the day of the festival, it starts raining and the Festival gets cancelled 😞
- Visitors now receive a text saying their insurance has been triggered and they have to confirm their location to claim the insurance 📱
- Once confirmed at the correct location, the smart contract is triggered and the funds are released 💸

## Why Blockchain?

The blockchain, especially smart contracts are perfect for automatically integrate into sensor and api data sources and trigger the flow of value tokens automatically. Blockchain also enables to re-insure pools of risk more easily (e.g. one pool of risk could be one event).


## Todo

- The implementation is very basic and many shortcuts have been taken
- Implement the weather api fully
- Automatic release after the claims process have been confirmed
- Add dashboard for events
- Full Implementation of the sensor network
- Triggering the SMS automatically through the blockchain
- We are currently having issues getting reliable information from the Raspberry Pi sensors - we may have to trigger the SMS manually

## Possible Expansion

- this concept can be used as a template to insure anything that can be triggered by API data and where there is a central organiser that want to distribute the insurance risk amongst the attendees (and offload the risk cover to them).

- future iterations could also use Foreign Office Travel Advice API to aid the detect acts of terrorism at events abroad.

- Various other IoT devices will allow contract triggers, for example early earthquake detectors (RASPBERRY SHAKE – YOUR PERSONAL SEISMOGRAPH) will allow a variety of triggers e.g. financial compensation to use for evacuation. 

## Application
Documentation for the Angular Application can be found [here](./application/README.md).

## Backend API
Documentation for the Backend API can be found [here](./application/README.md).
