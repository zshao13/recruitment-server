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
router.post('/position/all', CommonController.getPositionAll)
router.post('/position/status', CommonController.setPositionStatus)
router.post('/position/send', CommonController.sendPosition)


router.post('/personal/sendList', CommonController.getSendList)
router.post('/personal/list', CommonController.getTalentsList)
router.post('/resume/status', CommonController.setStatus)
router.post('/personal/listforp', CommonController.getTalentsListForP)

export default router