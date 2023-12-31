const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const HandlerError = require ("./middleware/errorHandler");
const RouteNotFound = require(".//middleware/routeNotFound");

const port = 3000;
const app = express();

const postsRouter = require("./routers/posts");
const errorHandler = require("./middleware/errorHandler");

// Registro il middleware per il parsing del body
// Ogni volta che verranno inviati dei dati al server 
// con "Content-Type: application/json" verranno 
// automaticamente convertiti in un oggetto javascript
// accessibile tramite req.body
app.use(express.json());

app.use("/posts", postsRouter);

app.use(RouteNotFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`il server è in ascolto sulla porta ${port}`)
});
