import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
}, {
  timestamps: true
})


const profileSchema = new Schema({
  name: String,
  photo: String,
  role:{
    type: Number,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  aboutMe: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    required: true
  },
  myVenues:[{type: Schema.Types.ObjectId,ref: 'Venue'}],
  myWorkshops:[{type: Schema.Types.ObjectId,ref: 'Workshop'}],
  reviews: [reviewSchema]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
