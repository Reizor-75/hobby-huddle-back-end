import mongoose from 'mongoose'

const Schema = mongoose.Schema

const workshopSchema = new Schema({
  mentorInfo: {
    type: Schema.Types.ObjectId, 
    ref: 'Profile'
  },
  title: {
    required: true,
    type: String,
  }, 
  date: {
    required: true,
    type: Date,
  },
  pricePerPerson: {
    required: true,
    type: Number,
  },
  location: {
    type: Schema.Types.ObjectId, 
    ref: 'Venue'
  },
  workshopLimit: {
    required: true,
    type: Number,
  },
  studentsAttending: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  description: {
    required: true,
    type: String,
  },
  category: {
    type: String,
    required: true,
    enum: ['Craft', 'Art', 'Food', 'Sport', 'Music', 'Other']
  }
},{
  timestamps: true,
})

const Workshop = mongoose.model('Workshop', workshopSchema)

export { Workshop }
