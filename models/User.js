const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const UserSchema= new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    registered_date: {
        type: Date,
        date: Date.now()
    }
})

module.exports= User= mongoose.model('user', UserSchema);
