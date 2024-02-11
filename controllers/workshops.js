import { Profile } from '../models/profile.js'
import { Workshop } from '../models/workshop.js'

async function index(req, res){
  try {
    const workshops = await Workshop.find({})
      // .populate(['mentorName', 'location', "studentsAttending"])
    res.status(200).json(workshops)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function create(req, res){
  try {
    req.body.mentorName = req.user.profile
    const workshop = await Workshop.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { myWorkshops: workshop } },
      { new: true }
    )
    workshop.mentorName = profile
    res.status(201).json(workshop)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
async function show(req, res){
  try { 
    const workshop = await Workshop.findById(req.params.workshopId)
      .populate(['mentorName', 'studentsAttending'])
      console.log(workshop)
    res.status(201).json(workshop)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export{
  index,
  create,
  show,
}