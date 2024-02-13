import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bidSchema = new Schema({
  mentorInfo: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  message: String,
  fee: {
    type: Number,
    required: true
  },
  approvalStatus: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})


const requestSchema = new Schema({
  student:{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },  
  title: {
    type: String,    
    required: true
  },
  details: String,
  lowestPayment: {
    type: Number,
    required: true
  },
  highestPayment: {
    type: Number,
    required: true
  },
  bids: [bidSchema]
},{
  timestamps: true,
})

const Request = mongoose.model('Request', requestSchema)

export { Request }
