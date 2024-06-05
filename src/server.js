const express       = require("express");
const app           = express();
const bodyParser    = require('body-parser');
const connectDB     = require("./config/db");
const handleError   = require('./middlewares/errorMiddleware');

const userRoutes    = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");


require('dotenv').config();

PORT                = process.env.PORT;

app.use(bodyParser.json());
app.use(express.json());

const StartServer = async () => {
    try {
        connectDB();
        app.use('/api/users', userRoutes);
        app.use('/api/account', accountRoutes);

        app.use(handleError);

        app.listen(PORT, () =>{
                console.log(`your server is running at http://localhost:${PORT}`)
        }) 

    } catch (error) {
        console.error("Unable to start server: ", error)
    }
};

StartServer();