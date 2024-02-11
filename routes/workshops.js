import { Router } from 'express'
import * as auth from '../middleware/auth.js'

import * as workshopsCtrl from '../controllers/workshops.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', workshopsCtrl.index)
router.get('/:workshopId', workshopsCtrl.show)

/*---------- Protected Routes ----------*/
router.use(auth.decodeUserFromToken)
router.post('/newWorkshop', auth.checkMentor, workshopsCtrl.create)
router.delete('/:workshopId', auth.checkMentor, workshopsCtrl.delete)

export { router }
