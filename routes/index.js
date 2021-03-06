import Router from '@koa/router'
import SystemController from '../controllers/system'
import CommonController from '../controllers/common'

const router = new Router()


router.post('/login', SystemController.login)
router.post('/system/addUser', SystemController.addUser)


router.post('/personal/addResume', CommonController.addResume)
router.post('/personal/info', CommonController.getResume)

router.post('/company/add', CommonController.addCompany)
router.post('/company/info', CommonController.getCompany)

router.post('/position/add', CommonController.addPosition)
router.post('/position/listForUser', CommonController.getPositionListForUser)
router.post('/position/info', CommonController.getPositionInfo)

export default router