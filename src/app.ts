import express from 'express'
import router from './routes';

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/api/v1',router);



export default app;