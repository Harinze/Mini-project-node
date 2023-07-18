import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const decadevSchema = new Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    squadNumber : {
        type: String,
        required: true
    },
    stack : {
        type: String,
        required: true
    },
    linkedinLink : {
        type: String,
        required: false
    },
    email : {
        type: String,
        required: true,
        unique:true
    },
    password : {
        type: String,
        required: true
    }
})


// module.exports = mongoose.model('Decadev', decadevSchema);
export default mongoose.model('Decadev', decadevSchema)