import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

async function index(req, res) {
  try {
    const profiles = await Profile.find({})
    res.json(profiles)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function addPhoto(req, res) {
  try {
    const imageFile = req.files.photo.path
    const profile = await Profile.findById(req.params.id)

    const image = await cloudinary.uploader.upload(
      imageFile, 
      { tags: `${req.user.email}` }
    )
    profile.photo = image.url
    
    await profile.save()
    res.status(201).json(profile.photo)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function update (req, res){
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.profileId,
      req.body,
      { new: true }
      ).populate('author')
    res.status(200).json(blog)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findById(req.params.profileId)
      .populate(['myWorkshops', 'myVenues', 'reviews'])
      res.status(200).json(profile)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function createReview(req, res){
  try {
    req.body.reviewer = req.user.profile
    const profile = await Profile.findById(req.params.profileId)
    profile.reviews.push(req.body)
    await profile.save()
    console.log("🔥profile:", profile)
    const newReview = profile.reviews[profile.reviews.length - 1]

    const commentAuthor = await Profile.findById(req.user.profile)
    newReview.reviewer = commentAuthor

    res.status(201).json(newReview)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function updateReview(req, res) {
  try {
    const profile = await Profile.findById(req.params.profileId)
    // match id of review that needs updating with profile.reviews
    const review = profile.reviews.find((review) => review._id === req.params.reviewId)
    // set the old review body to the new review body 
    review.content = req.body.content
    review.title = req.body.title
    console.log(review)
    // update and then save the profile. Map all reviews and then replace old review with new review via matching id. Set profile.reviews with updated review.
    await review.save()
    res.status(200).json(review)
  } catch (err) {
    res.status(500).json(err)
  }
}


export { 
  index, 
  addPhoto,
  update,
  show,
  createReview,
  updateReview 
}
