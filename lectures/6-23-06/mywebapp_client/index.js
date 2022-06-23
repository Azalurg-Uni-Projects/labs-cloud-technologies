const express = require('express');
const axios = require('axios');
const { param } = require('express/lib/request');


const app = express();

const appPort = 5000;   // aplikacaja 


const authEndpoint = "http://localhost:8080/realms/myapprealm/protocol/openid-connect/auth";        // keycloak
const tokenEndpoint = "http://localhost:8080/realms/myapprealm/protocol/openid-connect/token";

const apiProtectedEnpoint = "http://localhost:4000/protected/data";     // api
const apiUnprotectedEnpoint = "http://localhost:4000/unprotected/data";

const clientId = "mywebappclient";                          //kopiowane z mywebappclient - clients
const clientSecret = "wtVxbUslMRjzYpmoywVrKTjvhpcv60pF";


// PKCE must be random at each request
// https://example-app.com/pkce
const codeVerifier = "cbf5d3e66bca5b8dad779980ef8e887778424951d40dc315dd6ac03b"
const codeChallenge ="AIt3pUxORr-4rX2FHG4SZUPplqL4OvBd20NnJtkO20w"

const redirectUri = "http://localhost:5000/myredirect";

const authRequest = `${authEndpoint}?
response_type=code&
client_id=${clientId}&
state=1234&
redirect_uri=${redirectUri}&
code_challenge=${codeChallenge}&
code_challenge_method=S256`;

app.use((req, res, next) => {
    console.log('----HEADERS--');
    console.log(req.headers);
    console.log('----PARAMS--');
    console.log(req.query);
    next();
    
    });

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(`
    <!DOCTYPE html>
    <body>
    <h2>Welcome to my app</h2>
    <div>
    <a href="${authRequest}">Please Login</a>
    </div>
    </body>
    </html>
    `);
});

app.get('/myredirect', (req, res) => {

    const params = new URLSearchParams();
    
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', redirectUri);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('code_verifier', codeVerifier);
    params.append('code', req.query.code);
    
    return axios
        .post(tokenEndpoint, params)
        .then(result => {
            accessToken = result.data.access_token || ''
            return axios.get(apiProtectedEnpoint, {
                headers: {'Authorization': 'Bearer ' + accessToken}
            })
        })
        .then(result2 => {   //rozpatrzeć różne scenariusze !!!!!!!!!!!
            let success = true
            if (result2.status !== 200){
                success = false
            }
            console.log(result2.data);
            res.send(`
            <!DOCTYPE html>
            <body>
            <h2>${success}</h2>
            <p>${result2.data.something || result2.data.error}</p>
            </body>
            </html>
            `);
        })
        .catch(err => {
            res.send(`
            <!DOCTYPE html>
            <body>
            <h2>Error</h2>
            </body>
            </html>
            `);
        })
})

app.listen(appPort, err => {
    console.log(`App listening on port ${appPort}`);
})