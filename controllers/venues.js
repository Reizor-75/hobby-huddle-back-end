import { Venue } from '../models/venue.js'
import { Profile } from '../models/profile.js'

async function create(req, res) {
    try {
      req.body.venueOwner = req.user.profile  
      const venue = await Venue.create(req.body)
      const profile = await Profile.findByIdAndUpdate(
        req.user.profile,
        {$push: {myVenues: venue}},
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
      .populate('venueOwner')
      .populate(req.body._id)
      res.status(200).json(venues)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }

  async function update (req,res){
    try {
      req.body.venueOwner = req.user.profile  
      const venue = await Venue.findByIdAndUpdate(
        req.params.venueId,
        req.body,
        {new: true}
      ).populate('venueOwner')
      res.status(200).json(venue)
    }
    catch (error){
      console.log(error)
      res.status(500).json(error)
    }
  }

async function deleteVenue (req,res){
  try {
    const venue = await Venue.findByIdAndDelete(req.params.venueId)
    const profile = await Profile.findById(req.user.profile)
    profile.myVenues.remove({ _id: req.params.venueId })
    await profile.save()
    res.status(200).json(venue)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export{
    create,
    index,
    deleteVenue as delete,
    update
}