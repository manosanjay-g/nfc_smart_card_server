const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();

//Router Initialization
const authRouter = require('./routes/auth_route');
const adminRouter = require('./routes/admin_route');
const userRouter = require("./routes/user_route");
const branchRouter = require('./routes/branch_route');

//DB Initialization
const connectDB = require('./configs/database_config');


//Middleware Declaration
const { authenticateToken } = require('./middlewares/auth_middleware')

//Middleware Initialization
app.use(cors())
app.use(express.json());
app.use('/public', express.static('public'))

app.use('/auth', authRouter)
app.use('/admin', adminRouter)
app.use('/user', userRouter)
app.use('/branch', branchRouter)

app.get('/', (req, res) => {
    const u = req.user;
    res.send(u);
})

//Express
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on PORT ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start()