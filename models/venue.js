import mongoose from 'mongoose'

const Schema = mongoose.Schema

const venueSchema = new Schema({
  
  reviewer: {
    type: Schema.Types.ObjectId, 
    ref: 'Profile'
  },
  title: {
    required: true,
    type:  String
  },
  content: {
    required: true,
    type:  String
  },

},{
  timestamps: true,
})

const Venue = mongoose.model('Venue', venueSchema)

export { Venue }
