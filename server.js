const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({quiet:true});

const PORT = process.env.PORT

app.listen  (PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


const publicPath = path.join(__dirname, 'public');  
const assetsPath = path.join(publicPath, 'assets');
const pagesPath = path.join(publicPath, 'pages');



app.get('/', (req, res) => {
    res.sendFile(path.join(pagesPath, 'index.html'));
});

app.use("/assets", (req, res,) => {
    res.sendFile(path.join(assetsPath, req.path));
});