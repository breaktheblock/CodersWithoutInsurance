# blockudocs
> Document signing using Blockchain Technology

### Prerequisites
Checkout the documentation for [grunt-contrib-sass](https://github.com/gruntjs/grunt-contrib-sass) as it explains the prerequisites required to use the module.

Install ruby
-brew install ruby

Install sass
-gem install sass

Ensure geth is installed.

Then, install the modules for this project.
```
npm install
```

### Usage
 - add server initializing script for blockchain (CI)
 - https://ipfs.io/docs/getting-started/

### Other Dependencies
```
brew upgrade
brew tap ethereum/ethereum
brew install cpp-ethereum
brew linkapps cpp-ethereum
```

### API server and application
You can start a live-instance of your project with the following command. It will run on port ```8080```. This can be changed using enviromental variables.

```
npm run start
```

For production, it is recomended to use this application with a process manager and can be run by calling this package. ```node .```.

#### Enviromental Variables

Key             | Description
--------------- | --------------------------------------
```NODE_ENV```  | You can use development, preproduction and production ```NODE_ENV=production```
```PORT```      | The port you would like the server to run on. e.g. ```PORT=1337```
