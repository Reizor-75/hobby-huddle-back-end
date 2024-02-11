import mongoose from 'mongoose'

const Schema = mongoose.Schema

const venueSchema = new Schema({
  vendorName: {
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

const Venue = mongoose.model('Workshop', workshopSchema)

export { Venue }
