var mongoose = require('mongoose');

// Room Schema
var RoomSchema = mongoose.Schema({
    roomname: {
        type: String,
        index:true
    },
    numpeople: {
        type: Number
    },
    email: {
        type: Array
    }
});

var Room = module.exports = mongoose.model('Room', UserSchema);

module.exports.createRoom = function(newRoom, callback){
    newUser.save(callback);
}

module.exports.getRoombyName = function(roomname, callback){
    var query = {roomname: roomname};
    Room.findOne(query, callback);
}

module.exports.RoomById = function(id, callback){
    Room.findById(id, callback);
}