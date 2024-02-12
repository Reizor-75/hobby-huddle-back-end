import { Router } from 'express'
import { decodeUserFromToken, checkAuth} from '../middleware/auth.js'
import * as venuesCtrl from '../controllers/venues.js'
import * as auth from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/',auth.checkVendor, venuesCtrl.create)
router.put('/:venueId',auth.checkVendor, venuesCtrl.update)
router.get('/', auth.checkVendor, venuesCtrl.index)
router.delete('/:venueId', auth.checkVendor, venuesCtrl.delete)

export { router }