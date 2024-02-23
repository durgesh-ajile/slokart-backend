import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type : String,
        required : [true, "please add the contact name"]
    },
    email: {
        type : String,
        required : true
    },
},
{timestamp : true}
)

const contactModel = mongoose.model("Contactcheck", contactSchema)
export default contactModel