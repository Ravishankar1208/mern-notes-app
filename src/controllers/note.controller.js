const noteModel = require('../models/note.model')


async function createNoteController(req,res){

 const {title,description} = req.body

 const note = await noteModel.create({
  title,
  description,
  user:req.user._id
 })


 res.status(201).json({
  message:"note created successfully",
  note
 })

}


async function getNotesController(req,res){

 const notes = await noteModel.find({
  user:req.user._id
 })


 res.status(200).json({
  message:"notes fetched successfully",
  notes
 })

}



async function deleteNoteController(req,res){

 const {id} = req.params


 await noteModel.findOneAndDelete({
  _id:id,
  user:req.user._id
 })


 res.status(200).json({
  message:"note deleted successfully"
 })

}




async function updateNoteController(req,res){

 const {id} = req.params

 const {title,description} = req.body


 const note = await noteModel.findOneAndUpdate(
  {
   _id:id,
   user:req.user._id
  },
  {
   title,
   description
  },
  {
   new:true
  }
 )


 res.status(200).json({
  message:"note updated successfully",
  note
 })

}


module.exports = {
 createNoteController,
 getNotesController,
 deleteNoteController,
 updateNoteController
}