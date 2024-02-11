import { Venue } from '../models/venue.js'
import {Profile} from '../models/profile.js'

async function create(req, res) {
    try {
      req.body.venueOwner = req.user.profile  
      const venue = await Venue.create(req.body)
      const profile = await Profile.findByIdAndUpdate(
        req.user.profile,
        {$push: {venues: venue}},
        {new:true}
      )
      venue.venueOwner = profile
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