require('dotenv').config();
import express, { Application } from 'express';
import authRoutes from './routes/auth.routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

//Settings
app.set('port', process.env.PORT);

app.get("/", (req, res) => {
	res.json({
		message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
	});
});

app.use(express.json());
//Configuring cookie-parser
app.use(cookieParser());


//Routes
app.use('/api/auth', authRoutes);


export default app;