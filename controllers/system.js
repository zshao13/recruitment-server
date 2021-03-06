import { query } from '../mysql/db'
import { successData, errorData } from '../utils/responseData'

export default class TestController {
    static async addUser(ctx) {
        const req = ctx.request.body
        const SQL = 'insert into user (u_name, u_phone, u_password, u_type) value (?, ?, ?, ?)'
        try {
            const res = await query(SQL, [req.name, req.phone, req.password, req.type])
            ctx.body = successData('添加成功！')
        } catch (error) {
            ctx.body = errorData('添加失败！')
        }
    }

    static async login(ctx) {
        const req = ctx.request.body
        const SQL = 'SELECT * FROM user where u_phone = ?'
        const res = await query(SQL, [req.phone])
        if (res.length > 0) {
            const userInfo = res[0]
            if (userInfo.u_password === req.password) {
                ctx.body = successData(userInfo)
            } else {
                ctx.body = errorData('密码错误！')
            }
        } else {
            ctx.body = errorData('未查到该用户！')
        }
    }
}