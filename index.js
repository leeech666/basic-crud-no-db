const express = require('express');
const app = express();
const products = require('./data.js')
const bodyParser = require("body-parser");


app.use((req, res, next) => {
  console.log('Time: ',Date(Date.now()));
  next();
});

//app.use(express.json())
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('simple crud.');
});

app.get('/api/products', (req, res) => {
    res.json(products)
})


app.post('/api/products', (req, res) => {
	//console.log(req.body);
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    products.push(newProduct)
	//console.log(products);
    res.status(201).json(newProduct)
})

app.get('/api/products/:productID', (req, res) => {	
    const id = Number(req.params.productID)
    const product = products.find(product => product.id === id)

    if (!product) {
        return res.status(404).send('Product not found')
    }
    res.json(product)
})

app.put('/api/products/:productID', (req, res) => {
    const id = Number(req.params.productID)
    const index = products.findIndex(product => product.id === id)
    if (index === -1) {
        return res.status(404).send('Product not found')
    }
    const updatedProduct = {
        id: products[index].id,
        name: req.body.name,
        price: req.body.price
    }
    products[index] = updatedProduct
    res.status(200).json('Product updated')
})

app.delete('/api/products/:productID', (req, res) => {
    const id = Number(req.params.productID)
    const index = products.findIndex(product => product.id === id)
        if (index === -1) {
        return res.status(404).send('Product not found')
    }
    products.splice(index,1)
    res.status(200).json('Product deleted')
})

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
