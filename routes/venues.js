import { Router } from 'express'

import * as venuesCtrl from '../controllers/venues.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', venuesCtrl.index)

/*---------- Protected Routes ----------*/


export { router }