const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const {
    Cashfree
} = require('cashfree-pg');
const axios = require('axios');


require('dotenv').config();

const app = express();

const corsOptions = {
    origin: ['https://mediax-hia-blue.vercel.app','https://happening-in-agra.vercel.app', 'https://happeninginagra.com', 'https://mediax-hia.vercel.app', 'https://mediax-hia-backend.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


Cashfree.XEnableErrorAnalytics = true;
Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;
// Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;


function generateOrderId() {
    const uniqueId = crypto.randomBytes(16).toString('hex');

    const hash = crypto.createHash('sha256');
    hash.update(uniqueId);

    const orderId = hash.digest('hex');

    return orderId.substr(0, 12);
}


app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.get('/payment', (req, res) => {

    try {

        let request = {
            "order_amount": 1999,
            "order_currency": "INR",
            "order_id": generateOrderId(),
            "customer_details": {
                "customer_id": `${Date.now()}`,
                "customer_phone": "9999999999",
                "customer_name": "Mediax Hia",
                "customer_email": "jitender.rathore@mediax.com"
            },
        }

        Cashfree.PGCreateOrder("2023-08-01", request).then(response => {
            // console.log(JSON.stringify(response));
            res.json(response.data);
        }).catch(error => {
            res.status(400);
            res.json({"error": "From Promise catch of /payment"});
        })


    } catch (error) {
        console.log(JSON.stringify(error));
        res.status(400);
        // res.json(error);
        res.json({"error": "From try catch of /payment"});
    }


})

app.post('/verify', async (req, res) => {

    try {

        let { orderId } = req.body;
        console.log('orderId', orderId);

        axios({
            method: 'get',
            url: `https://api.cashfree.com/pg/orders/${orderId}`,
            headers: {
                "Accept": "application/json, text/plain, */*",
                "x-client-secret": Cashfree.XClientSecret,
                "x-client-id": Cashfree.XClientId,
                "x-api-version": "2023-08-01",
                "Accept-Encoding": "gzip, compress, deflate, br"
            }
        }).then((response) => {
            console.log('response', response.data);
            res.json(response.data);
        })
        .catch((error) => {
            // console.error('Error fetching order', error);
            res.status(400);
            res.json({"errObj": error, "message": "from .catch of promise"});
        });
        // Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then((response) => {
        //     console.log('response', response);
        //     res.json(response);
        // })
        // .catch((error) => {
        //     // console.error('Error fetching order', error);
        //     res.status(400);
        //     res.json({"errObj": error, "message": "from .catch of promise"});
        // });
        
        // Cashfree.PGFetchOrder("2022-09-01", orderId).then((response) => {
        //     res.json(response);
        // }).catch(error => {
        //     res.status(400);
        //     res.json(error);
        // });
    } catch (error) {
        // console.log(JSON.stringify(error));
        res.status(400);
        res.json({ "error" : "From catch of /verify block"});
    }
})

app.listen(8000, () => {
    console.log('Server is running on port 8000');
})
