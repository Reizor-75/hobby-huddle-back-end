import { Profile } from '../models/profile.js'
import { Workshop } from '../models/workshop.js'

async function index(req, res){
  try {
    const workshops = await Workshop.find({})
      .populate(['mentorInfo', 'location'])
      .sort({date:'desc'})
    res.status(200).json(workshops)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function create(req, res){
  try {
    req.body.mentorInfo = req.user.profile
    const workshop = await Workshop.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { myWorkshops: workshop } },
      { new: true }
    )
    workshop.mentorInfo = profile
    res.status(201).json(workshop)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res){
  try { 
    const workshop = await Workshop.findById(req.params.workshopId)
      .populate(['mentorInfo', 'location', 'studentsAttending'])
    res.status(201).json(workshop)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteWorkshop(req, res){
  try {
    const workshop = await Workshop.findByIdAndDelete(req.params.workshopId)
    const profile = await Profile.findById(req.user.profile)
    profile.myWorkshops.remove({ _id: req.params.workshopId })
    await profile.save()
    res.status(201).json(workshop)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function apply(req, res){
  try {
    const workshop = await Workshop.findById(req.params.workshopId)
    if(workshop.workshopLimit - workshop.studentsAttending.length <= 0) {
      res.status(401).json(new Error("Class is full"))
    }
    else {
      workshop.studentsAttending.push(req.user.profile)    
      await workshop.save()
      // const profile = await Profile.findById(req.user.profile)
      // profile.myWorkshops.push(workshop._id)
      // await profile.save()
      res.status(201).json(workshop)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)    
  }
}

export{
  index,
  create,
  show,
  deleteWorkshop as delete, 
  apply,
}