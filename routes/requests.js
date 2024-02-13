import { Router } from 'express'
import * as auth from '../middleware/auth.js'
import * as requestsCtrl from '../controllers/requests.js'

const router = Router()

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(auth.decodeUserFromToken)
router.post('/:workshopId', auth.checkStudent, requestsCtrl.create)


export { router }
