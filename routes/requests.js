import { Router } from 'express'
import * as auth from '../middleware/auth.js'
import * as requestsCtrl from '../controllers/requests.js'

const router = Router()

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/
router.use(auth.decodeUserFromToken)
router.post('/newRequest', auth.checkStudent, requestsCtrl.create)
router.get('/', auth.checkMentor, requestsCtrl.index)
router.get('/myRequests', auth.checkAuth, requestsCtrl.myRequest)
router.put('/myRequests/:requestId', auth.checkStudent, requestsCtrl.update)
//future feature
router.put('/myRequests/:requestId/:bidId', auth.checkStudent, requestsCtrl.setAprroval)
router.post('/:requestId', auth.checkMentor, requestsCtrl.createBid)
router.get('/:requestId', auth.checkAuth, requestsCtrl.show)
//future feature
router.put('/:requestId/:bidId', auth.checkMentor, requestsCtrl.updateBid)
router.delete('/:requestId', auth.checkAuth, requestsCtrl.delete)
router.delete('/:requestId/:bidId', auth.checkMentor, requestsCtrl.deleteBid)

export { router }
