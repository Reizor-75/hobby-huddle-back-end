import { Router } from 'express'

import * as workshopsCtrl from '../controllers/workshops.js'

const router = Router()

/*---------- Public Routes ----------*/
router.get('/', workshopsCtrl.index)

/*---------- Protected Routes ----------*/


export { router }
