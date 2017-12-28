'use strict';

const db = require('../config/db');
const markets = require('../config/markets').btcMarkets;
var bittrex = require('../config/bittrex-connection').bittrex;

//Nhập market vào record
var insertPairs = () => {
    for(var i=0;i<markets.length;i++){
        console.log(i);
        db.markets.create({market: markets[i]}).then(market => {
            console.log(task);
            if (market.market === 'BTC-ENG') {
                return console.log('finish');
            }
        }).catch((error) => {
            return console.error(error);
        });
    }
}


//cập nhật giá thấp nhất và các vùng giá, hàm cần khoảng 10s để hoàn thành
var getLowestPrices = () => {
    for(var i=0;i<markets.length;i++){
        db.markets.findOne({where: {market: markets[i]}}).then(market => {
            let marketName = market.market;
            bittrex.getcandles({
                marketName: marketName,
                tickInterval: 'day'
            }, (data, err) => {
                if (err){
                    return console.error(err);
                }
                var lowCandle = data.result[0];
                for(var j=1;j<data.result.length; j++) {
                    if (lowCandle.H > data.result[j].H) {
                        lowCandle = data.result[j];
                    }
                }

                let low = lowCandle.H;
                let high1 = (low*2).toFixed(8);
                let high2 = (low*4.5).toFixed(8);
                let high3 = (low*8).toFixed(8);
                let date_low = lowCandle.T;

                market.update({
                    low: low,
                    high1: high1,
                    high2: high2,
                    high3: high3,
                    date_low: date_low
                }).then(data => {
                    if (data.market === 'BTC-ENG') {
                        return console.log('finish');
                    }
                }).catch((error) => {
                    return console.error(error);
                });;
            });
        }).catch((error) => {
            return console.error(error);
        });
    }   
}

// cập nhật giá hiện tại
var updateNewestPrice = () => {
    for(var i=0; i<markets.length; i++){
        db.markets.findOne({where: {market: markets[i]}})
    }
};
