import mongoose from 'mongoose'

const Schema = mongoose.Schema

const venueSchema = new Schema({
  
  //should we include vendor profile, noticed our ERD didn't include that

  venueOwner: {
    type: Schema.Types.ObjectId, 
    ref: 'Profile'
  },

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
    //should this be required?
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
