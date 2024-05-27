import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as beersCtrl from '../controllers/beers.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, beersCtrl.create)
router.get('/', checkAuth, beersCtrl.index)
router.put(':beerId', checkAuth, beersCtrl.update)


export { router }