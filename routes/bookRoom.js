import express from "express";
import { booking, booking as bookingModel, room } from "../db_utils/models.js";
import { room as roomModel } from "../db_utils/models.js";

const bookRouter = express.Router();

/////////////api for booking a room///////////////

bookRouter.post('/', async (req, res) => {
    try {

        const rooms = await roomModel.find({ room_id: req.body.roomid });
        console.log(req.body.roomid);

        ///////condition to check the booking status////////////////
        if (rooms.length === 0) {
            return res.status(201).json({ message: "room not not exist" })

        } else {
            const booked = await bookingModel.find({ roomid: req.body.roomid, date: req.body.date, starttime: req.body.starttime });
            if (booked.length > 0) {
                return res.status(400).json({ message: "room already for this date and time" });
            }
            else {
                const b_id = "B" + (booked.length + 1);
                const booking = await bookingModel({ ...req.body, status: "booked", bookingid: b_id, bookingdate: new Date() });
                await booking.save();

                //res.status(200).json({ message: "room booked Successfully" });
                res.send(booking);
            }

        }
    }
    catch (err) {
        console.log(err);
    }

});

//////////api to get all the booking details/////////////////

bookRouter.get('/allbookings', async (req, res) => {
    try {
        const bookings = await bookingModel.find({});
        const bookedRooms = bookings.map(booking => {
            const { customername, date, roomid, starttime, endtime, status } = booking;
            return { customername, date, roomid, starttime, endtime, status }
        });
        res.status(201).json(bookedRooms);
    }
    catch (err) {
        console.log(err);
    }
})


///////////api to list all the rooms with booked data/////////////

bookRouter.get('/rooms', async (req, res) => {

    const rooms = await roomModel.aggregate([
        {
            $lookup: {
                from: "bookings",
                localField: "room_id",
                foreignField: "roomid",
                pipeline: [{ "$project": { _id: 0, bookingid: 0, __v: 0, bookingdate: 0 } }],
                as: "bookings",
            },
        },
        {
            $project: {
                _id: 0,
                no_of_seats: 0,
                amenities: 0,
                price_per_hour: 0,
                __v: 0

            },
        },
    ]);

    //rooms.map(room => { BookedData.push({ "roomno": room.room_id, bookings: bookingModel.find({ roomid: room.room_id }) }) });
    res.send(rooms);
})

///////////api to list all the customers with booked data/////////////

bookRouter.get('/customers', async (req, res) => {
    const customers = await bookingModel.aggregate([
        {
            $group: {
                _id: "$customername",
                data: { $push: { customername: "$customername", date: "$date", starttime: "$starttime", endtime: "$endtime", roomid: "$roomid" } } // Push the entire document into the 'data' array "$$ROOT"
            },

        }
    ]);
    res.send(customers);
})

////////////api to list how many times a user booked the room////////////

bookRouter.get('/customer/:name', async (req, res) => {
    // const customername = req.params;
    const customer = await bookingModel.find({ customername: req.params.name })
    res.send({ name: req.params.name, data: customer });
})

export default bookRouter;