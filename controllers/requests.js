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
    const requests = await Request.find({student:req.user.profile})
      .populate('bids.mentorInfo')
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

async function createBid(req, res){
  try {
    req.body.mentorInfo = req.user.profile
    const request = await Request.findById(req.params.requestId)
    request.bids.push(req.body)
    await request.save()
    
    const newBid = request.bids[request.bids.length - 1]
    const profile = await Profile.findById(req.user.profile)
    newBid.mentorInfo = profile
    res.status(201).json(newBid)

    res.status(201).json()
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteBid(req, res){
  try {
    const request = await Request.findById(req.params.requestId)
    request.bids.remove({ _id: req.params.bidId })
    await request.save()
    res.status(200).json(request)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function updateBid(req, res){
  try {
    const request = await Request.findById(req.params.requestId)
    const bid = request.bids.id(req.params.bidId)
    bid.message = req.body.message
    bid.fee = req.body.fee
    await bid.save()
    await request.save()
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
  createBid,
  deleteBid,
  updateBid,
}