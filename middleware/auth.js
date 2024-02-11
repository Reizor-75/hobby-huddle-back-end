import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET

const decodeUserFromToken = (req, res, next) => {
  let token = req.get('Authorization') || req.query.token || req.body.token
  if (!token) return next()

  token = token.replace('Bearer ', '')
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return next(err)

    req.user = decoded.user
    next()
  })
}

function checkAuth(req, res, next) {
  return req.user ? next() : res.status(401).json({ err: 'Not Authorized' })
}

function checkMentor(req, res, next){
  //mentor role === 500
  if(req.user && req.user.role >= 500 ) return next() 
  return res.status(401).json({ err: 'Not Authorized' })
}

function checkStudent(req, res, next){
  //student role === 200
  if(req.user && req.user.profile.role === 200 ) return next() 
  return res.status(401).json({ err: 'Not Authorized' })
}

function checkVendor(req, res, next){
  //vendor role === 100
  if(req.user && req.user.profile.role === 100 ) return next() 
  return res.status(401).json({ err: 'Not Authorized' })
}

export { 
  decodeUserFromToken, 
  checkAuth,
  checkMentor,
  checkStudent,
  checkVendor,  
}
