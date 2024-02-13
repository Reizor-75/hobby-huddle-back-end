import { Profile } from '../models/profile.js'
import { Request } from '../models/request.js'

async function create(req, res){
  try {
    req.body.student = req.user.profile
    const request = await Request.create(req.body)
    res.status(201).json(request)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)    
  } 
}

async function index(req, res){
  try {
    const requests = await Request.find({})
      .populate('student')
    res.status(200).json(requests)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)      
  }
}

async function myRequest(req, res){
  try {
    const requests = await Request.find({student:req.user.profile}).exec()
    res.status(200).json(requests)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)      
  }
}

async function deleteRequest(req, res){
  try {
    const request = await Request.findByIdAndDelete(req.params.requestId)
    res.status(200).json(request)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res){  
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.requestId,
      req.body,
      { new: true }
    ).populate('student')
    res.status(200).json(request)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export{
  create,
  index,
  myRequest,
  deleteRequest as delete,
  update,
}