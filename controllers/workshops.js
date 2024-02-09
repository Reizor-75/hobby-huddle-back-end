import { Workshop } from '../models/workshop.js'

async function index(req, res){
  try {
    const workshops = await Workshop.find({})
      .populate(['mentorName', 'location', "studentsAttending"])
    res.status(200).json(workshops)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export{
  index,
}