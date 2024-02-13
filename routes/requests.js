import { Router } from 'express'
import * as auth from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(auth.decodeUserFromToken)

export { router }
