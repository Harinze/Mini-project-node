import mongoose from 'mongoose'
// import { number } from 'zod';

const Schema = mongoose.Schema;

const userSchema =  new Schema({
    email: {
        type: String,
        required: true 
    },

    roles: {
        user: {
            type: Number,
            default: 1000
        },
        Editor: Number,
        Admin: Number
    },

    password: {
        type: String,
        required: true
    },

    refreshToken: String
})

//module.exports = userSchema;
//module.exports = mongoose.model('User', userSchema)
export default mongoose.model('User', userSchema)
