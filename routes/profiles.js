import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, profilesCtrl.index)
router.get('/:profileId', checkAuth, profilesCtrl.show)
router.put('/:id/add-photo', checkAuth, profilesCtrl.addPhoto)
router.put('/:profileId', checkAuth, profilesCtrl.update)
router.put('./:profileId/reviews/:reviewId', checkAuth, profilesCtrl.updateReview)
router.post('/:profileId/reviews', checkAuth, profilesCtrl.createReview)
router.delete('/:profileId/reviews/:reviewId', checkAuth, blogsCtrl.deleteReview)

export { router }
