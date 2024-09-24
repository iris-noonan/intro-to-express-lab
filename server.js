// Setup Express

const express = require('express')
const app = express()
const port = 3000

// Q1. Be Polite, Greet the User

app.get('/greetings/:username', (req, res) => {
    res.send(`Hello there, ${req.params.username}`)
})

// Q2. Rolling the Dice

app.get('/roll/:number', (req, res) => {
    const number = Number(req.params.number);
    
    if (isNaN(number)) {
        return res.send('You must specify a number');
    } else { 
        const randomNumber = Math.round(Math.random() * number);
        return res.send(`You rolled a ${randomNumber}`)
    }
    
})

// Q3. I Want THAT One!

app.get('/collectibles/:index', (req, res) => {
    const index = Number(req.params.index);

    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
    ];
    
    const item = collectibles[index];
    
    if (!item) {
        return res.send('This item is not yet in stock. Check back soon!');
    } else { 
        const itemName = item.name;
        const itemPrice = item.price;
        return res.send(`So, you want the ${itemName}? For ${itemPrice}, it can be yours!`)
    }
    
})

// Q4. Filter Shoes by Query Parameters

app.get('/shoes', (req, res) => {
    const minPrice = Number(req.query['min-price']);
    const maxPrice = Number(req.query['max-price']);
    const type = req.query.type;

    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];

    let filterShoes = [...shoes]
    
    if (minPrice) {
        filterShoes = filterShoes.filter((shoe) => {
            return shoe.price >= minPrice
        });
    }
    if (maxPrice) {
        filterShoes = filterShoes.filter((shoe) => {
            return shoe.price <= maxPrice
        });
    }
    if (type) {
        filterShoes = filterShoes.filter((shoe) => {
            return shoe.type === type
        });
    }

    return res.send(filterShoes);
    
})


// * Start the server listening for requests
app.listen(port, () => {
    console.log(`Server up and running - listening on port ${port}`)
})
