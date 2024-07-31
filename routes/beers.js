import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as beersCtrl from '../controllers/beers.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, beersCtrl.index)
router.get('/:beerId', checkAuth, beersCtrl.show)
router.put('/:beerId', checkAuth, beersCtrl.update)
router.put('/:beerId/reviews', checkAuth, beersCtrl.updateReview)
router.post('/', checkAuth, beersCtrl.create)
router.post('/:beerId/reviews', checkAuth, beersCtrl.createReview)
router.delete('/:beerId', checkAuth, beersCtrl.delete)
router.delete('/:beerId/reviews/:reviewId', checkAuth, beersCtrl.deleteReview)

export { router }