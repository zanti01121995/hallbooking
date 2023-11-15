import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    "room_id": {
        type: 'string',
        required: true
    },
    "no_of_seats": {
        type: 'string',
        required: true
    },
    "amenities": {
        type: 'string',
        required: true
    },
    "price_per_hour": {
        type: 'string',
        required: true
    }
});




const room = mongoose.model('createrooms', roomSchema);

const bookSchema = new mongoose.Schema({
    "customername": {
        type: 'string',
        required: true
    },
    "date": {
        type: 'string',
        required: true
    },
    "starttime": {
        type: 'string',
        required: true
    },
    "endtime": {
        type: 'string',
        required: true
    },
    "roomid": {
        type: 'string',
        required: true
    },
    "status": {
        type: 'string',
        required: true
    },
    "bookingid": {
        type: 'string',
        required: true
    },
    "bookingdate": {
        type: 'string',
        required: true
    }

});

const booking = mongoose.model('bookings', bookSchema);


export { room, booking, };