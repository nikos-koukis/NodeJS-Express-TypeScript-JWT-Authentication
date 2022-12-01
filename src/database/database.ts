require('dotenv').config();
import mongoose from 'mongoose';

mongoose.connect(`${process.env.MONGO_URI}`, {})
    .then(db => console.log('Database is connected successfully'))
    .catch(err => console.log(err));