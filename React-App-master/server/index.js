const express = require('express');
const app = express();
const { readData, writeData } = require('./utils');

const port = 9999;
const hostname = 'localhost';

let tariffs = [];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.options('/*', (request, response) => {
    response.statusCode = 200;
    response.send('OK');
});

app.get('/orderarr', async (request, response) => {
    tariffs = await readData();
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json(tariffs);
});

app.post('/orderarr', async (request, response) => {
    const orderArr = request.body;
    tariffs.push(orderArr);
    await writeData(tariffs);
    response.status(200).json({info: 'Order succefully created!'});
});

app.post('/orderarr/:orderArrId/order', async (request, response) => {
    const order = request.body;
    const orderArrId = Number(request.params.orderArrId);
    tariffs[orderArrId].orders.push(order);
    await writeData(tariffs);
    response.status(200).json({info: 'Order succefully created!'});
});

app.patch('/orderarr/:orderArrId/order/:orderId', async (request, response) => {
    const { newName, newAuthor } = request.body;
    const orderArrId = Number(request.params.orderArrId);
    const orderId = Number(request.params.orderId);

    tariffs[orderArrId].orders[orderId].name = newName;
    tariffs[orderArrId].orders[orderId].author = newAuthor;

    await writeData(tariffs);
    response.status(200).json({info: 'Order succefully changed!'});
});

app.delete('/orderarr/:orderArrId/order/:orderId', async (request, response) => {
    const orderArrId = Number(request.params.orderArrId);
    const orderId = Number(request.params.orderId);

    tariffs[orderArrId].orders.splice(orderId, 1);

    await writeData(tariffs);
    response.status(200).json({info: 'Order succefully deleted!'});
});

app.patch('/orderarr/:orderArrId', async (request, response) => {
    const orderArrId = Number(request.params.orderArrId);
    const { orderId, destShelfId } = request.body;

    const orderToMove =  tariffs[orderArrId].orders.splice(orderId, 1);
    tariffs[destShelfId].orders.push(orderToMove);

    await writeData(tariffs);
    response.status(200).json({info: 'Order succefully moved!'});
});

app.listen(port, hostname, (error) => {
    if (error) {
        console.error(error);
    }
});
