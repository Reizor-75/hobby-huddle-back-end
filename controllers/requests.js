import { Profile } from '../models/profile.js'
import { Request } from '../models/request.js'

async function create(req, res){
  try {
    req.body.student = req.user.profile
    const request = await Request.create(req.body)
    res.status(201).json(request)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)    
  } 
}

async function index(req, res){

}

export{
  create,
  index,
}