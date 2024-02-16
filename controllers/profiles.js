import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

async function index(req, res) {
  try {
    const profiles = await Profile.find({role: 500})
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
  console.log("REQUEST BODY", req.body)
  try {
    const profile = await Profile.findById(req.params.profileId)
    profile.phoneNumber = req.body.phoneNumber
    profile.email = req.body.email
    profile.skills = req.body.skills
    profile.aboutMe = req.body.aboutMe
    await profile.save()
    res.status(200).json(profile)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findById(req.params.profileId)
      .populate(['myWorkshops', 'myVenues', 'reviews.reviewer'])
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
    const newReview = profile.reviews[profile.reviews.length - 1]

    const commentAuthor = await Profile.findById(req.user.profile)
    newReview.reviewer = commentAuthor

    res.status(201).json(newReview)
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateReview = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId)
    const review = profile.reviews.id(req.params.reviewId)
    review.title = req.body.title
    review.content = req.body.content
    await profile.save()
    res.status(200).json(profile)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteReview = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.profileId)
    profile.reviews.remove({ _id: req.params.reviewId })
    await profile.save()
    res.status(200).json(profile)
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
  updateReview,
  deleteReview 
}