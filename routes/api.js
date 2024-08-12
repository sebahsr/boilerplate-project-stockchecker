'use strict';
const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');

const anonymizeIp = (ip) => {
  return crypto.createHash('sha256').update(ip).digest('hex');
};
const getStockData = async (symbol) => {
  try {
    const response = await axios.get(`https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol}/quote`);
    console.log(response.data)
    const price = response.data.latestPrice;
    return { stock: symbol, price };
  } catch (error) {
    return { error: 'Stock data not found',erro:error};
  }
};

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function  (req, res){
      const { stock, like } = req.query;
      const ip = anonymizeIp(req.ip);
 

  if (Array.isArray(stock)) {
    let stockData= await stock.map(symbol => {console.log(symbol)
      return getStockData(symbol)})
    const rel_likes = Math.abs(stockData[0].likes - stockData[1].likes);
    console.log(stockData, rel_likes,"sebah 11")
    stockData.forEach(data => data.rel_likes = rel_likes);
    res.json({ stockData });
  } else {
    console.log(stock)
    const stockData = await getStockData(stock);
    console.log(stockData)
    res.json({ stockData:{...stockData,likes:like?1:-1  }});
  }
    });
    
};
