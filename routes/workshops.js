import { Router } from 'express'
import * as auth from '../middleware/auth.js'

import * as workshopsCtrl from '../controllers/workshops.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', workshopsCtrl.index)

/*---------- Protected Routes ----------*/
router.use(auth.decodeUserFromToken)
router.post('/newWorkshop', auth.checkMentor, workshopsCtrl.create)

export { router }
