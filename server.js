import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import questionRoutes from './routes/questionRoute.js';
import cors from 'cors';
import courseRoutes from './routes/courseRoute.js';
import examRoutes from './routes/examRoute.js'
import subjectRoutes from './routes/subjectRoute.js'


//config dotenv
dotenv.config();

//connect db
connectDB();

const app = express();

//middleware
app.use('*', cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/question', questionRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/subject', subjectRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Wellcome to online test</h1>');
});

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});
