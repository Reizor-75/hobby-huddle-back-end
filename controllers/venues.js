import { Venue } from '../models/venue.js'

async function create(req, res) {
    try {
      const venue = await Venue.create(req.body)
      res.status(201).json(venue)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }

async function index(req, res){
  try {
    const venues = await Venue.find({})
    res.status(200).json(venues)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export{
    create,
    index
}