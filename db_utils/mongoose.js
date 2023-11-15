import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// const localMongoUrl = 'mongodb://localhost:27017/bookingDB';


const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/bookingDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4,
        });
        console.log("DB Connected successfully");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default dbConnect;