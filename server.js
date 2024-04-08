const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const bodyParser=require('body-parser');
const connectToDB=require('./config/db');
const PORT=process.env.PORT || 6000;
const adminRoutes=require('./routes/adminRoutes');

const app=express();  
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use('/api',adminRoutes);
connectToDB();




app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`);
});

