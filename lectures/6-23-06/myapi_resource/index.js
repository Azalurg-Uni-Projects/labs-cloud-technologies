const express = require('express');
const axios = require('axios');
const { param } = require('express/lib/request');

const app = express();

const appPort = 4000;

// Use it for token validation
const introspectionEndpoint = "http://127.0.0.1:8080/realms/myapprealm/protocol/openid-connect/token/introspect";
const userInfoEndpoint = "http://localhost:8080/realms/myapprealm/protocol/openid-connect/userinfo";

const clientId = "mywebappclient";
const clientSecret = "wtVxbUslMRjzYpmoywVrKTjvhpcv60pF";

app.get('/protected/data', (req, res) => {

const accessToken = (req.headers.authorization || '').split(' ')[1] || '';
console.log(accessToken);
const params = new URLSearchParams();
params.append('client_id', clientId);
params.append('client_secret', clientSecret);
params.append('token', accessToken);

return axios
    .post(introspectionEndpoint, params)
    .then(result => {
        console.log("Introspection result");
        console.log(result);
        res.set('Content-Type', 'application/json');
        if(result.data.active === true){
            res.send(JSON.stringify({something: 3.14}))
        } else {
            res.send({error: "Invalid token"})
        }
        
        
    })
    .catch(error => {
        console.log(error);
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify({error: "Some other error"}))
    })
});

app.listen(appPort, err => {
    console.log(`App listening on port ${appPort}`);
})