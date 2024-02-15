import mongoose from 'mongoose'

const Schema = mongoose.Schema

const venueSchema = new Schema({
  venueOwner: {
    type: Schema.Types.ObjectId, 
    ref: 'Profile'
  },
  venueTitle: {
    required: true,
    type:  String
  },
  phoneNumber: {
    required: true,
    type:  String
  },
  website: {
    type:  String
  },
  email: {
    required: true,
    type:  String
  },
  address: {
    required: true,
    type:  String
  },
  capacity: Number,
  tags: {
    type: String,
    enum: ['Craft', 'Art', 'Food', 'Sport', 'Music', 'Other']
  },
  coverImage:{
    type: String
  }

},{
  timestamps: true,
})

const Venue = mongoose.model('Venue', venueSchema)

export { Venue }
