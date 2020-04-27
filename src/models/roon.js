import { Mongoose } from "mongoose";

const RoomSchema = Mongoose.Schema({
  name: String
})

const Room = Mongoose.model('Room', RoomSchema)
module.exports = Room