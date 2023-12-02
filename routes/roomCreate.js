import express from "express";
import { room as roomModel } from "../db_utils/models.js";

const roomRouter = express.Router();


/////////////api for creating a room///////////////

roomRouter.post('/', async (req, res) => {

    const room = new roomModel({ ...req.body });
    const rooms = await roomModel.find({ room_id: room.room_id });
    if (rooms.length > 0) {
        console.log("already have room")
        res.status(201).json({ message: "room exist already" })

    } else {
        await room.save();
        res.send(room)
        res.status(201)
        console.log(room.room_id);
    }


})

/////////////api for get all the room details///////////////

roomRouter.get('/', async (req, res) => {

    try {
        const rooms = await roomModel.find({}, { room_id: 1, no_of_seats: 1, amenities: 1, price_per_hour: 1, _id: 0 });

        res.send(rooms);

    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Error occuerred while fetching users' });
    }
}
)

/////////////api for get particular room details///////////////

roomRouter.get('/:roomid', async (req, res) => {

    const { roomid } = req.params;
    try {
        const room = await roomModel.findOne({ room_id: roomid }, { room_id: 1, no_of_seats: 1, amenities: 1, price_per_hour: 1, _id: 0 });

        res.send(room);

    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Error occuerred while fetching users' });
    }
}
)

/////////////api for update a particular room details///////////////

roomRouter.put('/:roomid', async (req, res) => {
    const { roomid } = req.params;
    try {
        new roomModel(req.body);
        await roomModel.updateOne({ room_id: roomid }, { '$set': req.body });
        res.send({ msg: "room_updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Error while updating room' });
    }
});

/////////////api for delete a room details///////////////

roomRouter.delete('/:roomid', async (req, res) => {
    const { roomid } = req.params;
    try {
        await roomModel.deleteOne({ room_id: roomid });
        res.send({ msg: "room deleted" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Error in deleting' });
    }
})
export default roomRouter;