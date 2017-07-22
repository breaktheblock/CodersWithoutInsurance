# Infrustructure (Ubuntu)

## Install dependencies
```
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum -y
```

## Initial blockchain setup
### Get a init file for etherium (We don't need this)
```
sudo mkdir -p /etc/breaktheblock
sudo chown ubuntu /etc/breaktheblock
mkdir -p  /etc/breaktheblock/geth
cd /etc/breaktheblock/geth
curl https://gist.githubusercontent.com/andysign/3a02e5c9797d5cc93cdf86fc649f4a71/raw/d1615e139d24740a151c935704ba2ea07124dec6/genesis.json > genesis.json
mkdir data;
geth --datadir data/ init genesis.json

sudo mkdir /var/log/ethereum
sudo chwon -R 777 /var/log/ethereum
```

## Start the geth node
```
geth --datadir /etc/breaktheblock/geth/data/ --networkid 20170125 --rpc --rpcaddr 0.0.0.0 2>/var/log/ethereum/geth.log
```
