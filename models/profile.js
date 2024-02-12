import mongoose from 'mongoose'

const Schema = mongoose.Schema

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
  reviews:[{type: Schema.Types.ObjectId,ref: 'reviewSchema'}],
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
