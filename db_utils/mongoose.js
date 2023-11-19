import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env);
// const localMongoUrl = 'mongodb://localhost:27017/bookingDB';
const username = process.env.DB_USERNAME || '';
const password = process.env.DB_PASSWORD || '';
const clustername = process.env.DB_CLUSTER || '';
const cloudMongoUrl = `mongodb+srv://${username}:${password}@${clustername}/?retryWrites=true&w=majority`;
const localMongoUrl = "mongodb://localhost:27017/bookingDB"
const dbConnect = async () => {
    try {
        await mongoose.connect(cloudMongoUrl, {
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