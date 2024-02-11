import { Router } from 'express'
import { decodeUserFromToken, checkAuth} from '../middleware/auth.js'
import * as venuesCtrl from '../controllers/venues.js'

const router = Router()

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/',checkAuth, venuesCtrl.create)
router.get('/', checkAuth, venuesCtrl.index)


export { router }