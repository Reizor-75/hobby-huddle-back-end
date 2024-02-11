import { Venue } from '../models/venue.js'

async function index(req, res){
  try {
    const venues = await Venue.find({})
      .populate(['vendorName', 'phoneNumber', "email"])
    res.status(200).json(venues)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export{
  index,
}