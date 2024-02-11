import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: String,
  role:{
    type: Number,
    required: true
  },
  myVenues:[{type: Schema.Types.ObjectId,ref: 'Venue'}]

},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
