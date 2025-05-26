import express ,{Application} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './interfaces/routes/userRoutes';
import technicianRouter from './interfaces/routes/technicianRoutes';
import adminRouter from './interfaces/routes/adminRoutes'
import refreshTokenRoute from './interfaces/routes/authRoutes';


dotenv.config();

const app:Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use(express.json()); 
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/technicians', technicianRouter);
app.use('/api/admin',adminRouter);
app.use("/api/refresh-token", refreshTokenRoute);


const MONGO_URI : any= process.env.MONGO_URI;


mongoose 
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Hi server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to Mongodb", err);
    
  });