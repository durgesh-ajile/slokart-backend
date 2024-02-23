import contactModel from "../Models/ContactModels.js";

const getContact = async (req, res) => {
    try {
    const {id} = req.query;
    const fetchedContact = await contactModel.findById(id);
    if(!fetchedContact){
        res.status(404).json({
            status : false,
            message: "no such item in database"
        }) 
    }
    return res.status(201).json({status: true, message: fetchedContact})
}
    catch(err) {
        console.log(err)
    }
}


const deleteContact = async (req, res) => {
    try {const { id } = req.query;
    const deleteContact = await contactModel.findByIdAndDelete(id)
    if(!deleteContact){
        res.status(404).json({message:"delete contact not found"})
    }
    res.status(201).json({ message: "successfully deleted contact" })}
    catch(err) {
        console.log(err)
    }
}

const addContact = async (req, res) => {
    try {
        const { name, mail } = req.body;
        const notUnique = await contactModel.findOne({email: mail})
        if(notUnique){
            res.status(401).json({status: false, message: "mail already exist"})
        }
        console.log(req.user)
        const newContact = new contactModel({
            name: name,
            email: mail
        })
        const savedContact = await newContact.save();

        res.status(201).json({status: true, message:savedContact})
    }
    catch (err) {
        res.status(500).json({status: false, message:"Something went wrong"})
    }
}

const updateContact = async (req, res) => {
    try {
    const {id, name} = req.body;
    if(!id || !name || !mail){
        res.status(411).json({status: false, message: "Id and name are required"})
    }
    const fetchedContact = await contactModel.findByIdAndUpdate(
        { _id : id},
        {name : name}
        );
    if(!fetchedContact){
        res.status(404).json({
            status : false,
            message: "unable to find item"
        }) 
    }
    return res.status(201).json({status: true, message: fetchedContact})
}
    catch(err) {
        console.log(err)
    }
}

export { getContact, deleteContact, addContact, updateContact }