import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  
  reviewOwner: {
    type: Schema.Types.ObjectId, 
    ref: 'Profile'
  },

  venueTitle: {
    required: true,
    type:  String
  },
  phoneNumber: {
    required: true,
    type: String
  }, 
  website: {
    type: String
  },
  email: {
    required: true,
    type: String
  },
  address: {
    required: true,
    type: String
  },
  capacity: {
    type: Number
  },
  tags: {
    type: String,
    enum: ['Craft', 'Art', 'Food', 'Sport', 'Music', 'Other']
  }
},{
  timestamps: true,
})

const Venue = mongoose.model('Venue', venueSchema)

export { Venue }
