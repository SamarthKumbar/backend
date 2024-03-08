const asynchandler=require("express-async-handler");
const Contact=require("../models/contact.js");

const getcontact=asynchandler(async(req,res)=>{
    const contact= await Contact.find({user_id:req.user.id});
    res.status(200).json(contact);
});

const postcontact = asynchandler(async (req, res) => {
    console.log("The request body is :", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400);
      throw new Error("All fields are mandatory !");
    }
    const contact = await Contact.create({
      name,
      email,
      phone,
      user_id: req.user.id,
    });
  
    res.status(201).json(contact);
  });


const getcontactid= asynchandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(400);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});
const deletecontactid= asynchandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(400);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

const updtaecontactid= asynchandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);

});

module.exports={getcontact,postcontact,getcontactid,deletecontactid,updtaecontactid};