import mongoose from "mongoose";
const { Schema } = mongoose;
const RegisterModel = new Schema({
    name: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    },
    date: {
        type: String,
        default: null
    },
    hobby: {
        type: Array,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    resume: {
        type: String,
        default: null
    }
})


export default mongoose.model("register", RegisterModel)