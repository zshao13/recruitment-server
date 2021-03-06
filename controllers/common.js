import { query } from '../mysql/db'
import { successData, errorData } from '../utils/responseData'

export default class CommonController {
    static async addResume(ctx) {
        const req = ctx.request.body
        const SQL = 'insert into resume (base_info, edu_info, work_info, object_info, user_id) value (?, ?, ?, ?, ?)'
        const updateSQL = 'update resume set base_info=?, edu_info=?, work_info=?, object_info=?, user_id=? where r_id=?'
        try {
            const baseInfo = JSON.stringify(req.baseInfo)
            const educationInfo = JSON.stringify(req.educationInfo)
            const work = JSON.stringify(req.workInfo)
            const objectInfo = JSON.stringify(req.objectInfo)
            
            if (req.id !== undefined) {
                const res = await query(updateSQL, [baseInfo, educationInfo, work, objectInfo, req.userId, req.id])
                ctx.body = successData('编辑成功！')
            } else {
                const res = await query(SQL, [baseInfo, educationInfo, work, objectInfo, req.userId])
                ctx.body = successData('添加成功！')
            }
        } catch (error) {
            ctx.body = errorData('添加失败！')
        }
    }

    static async getResume(ctx) {
        const req = ctx.request.body
        const SQL = 'SELECT * FROM resume where user_id = ?'
        try {
            const res = await query(SQL, [req.id])
            if (res.length > 0) {
                const info = res[0]
                const data = {
                    baseInfo: JSON.parse(info.base_info),
                    eduInfo:  JSON.parse(info.edu_info),
                    objectInfo:  JSON.parse(info.object_info),
                    rId: info.r_id,
                    userId: info.user_id,
                    workInfo:  JSON.parse(info.work_info)
                }
                ctx.body = successData(data)
            } else {
                ctx.body = successData(null)
            }
        } catch (error) {
            ctx.body = errorData('查询失败！')
        }
    }

    static async addCompany(ctx) {
        const req = ctx.request.body
        const querySQL = 'select * from company where user_id=?'
        const SQL = 'insert into company (c_name, c_number, c_type, user_id) value (?, ?, ?, ?)'
        const updateSQL = 'update company set c_name=?, c_number=?, c_type=? where user_id=?'
        try {
            const isHave = await query(querySQL, [req.userId])
            if (isHave.length > 0) {
                const res = await query(updateSQL, [req.name, req.number, req.type, req.userId])
                ctx.body = successData('编辑成功！')
            } else {
                const res = await query(SQL, [req.name, req.number, req.type, req.userId])
                ctx.body = successData('添加成功！')
            }
        } catch (error) {
            ctx.body = errorData('添加失败！')
        }
    }

    static async getCompany(ctx) {
        const req = ctx.request.body
        const SQL = 'select * from company where user_id=?'
        
        try {
            const res = await query(SQL, [req.id])
            if (res.length > 0) {
                const info = res[0]
                const data = {
                    name: info.c_name,
                    number: info.c_number,
                    type: info.c_type
                }
                ctx.body = successData(data)
            } else {
                ctx.body = successData(null)
            }
        } catch (error) {
            ctx.body = errorData('添加失败！')
        }
    }

    static async addPosition(ctx) {
        const req = ctx.request.body
        const SQL = 'insert into positions (p_name, p_tags, p_remark, p_demand, receive_user, user_id, status) value (?, ?, ?, ?, ?, ?, ?)'
        const updateSQL = 'update positions set p_name=?, p_tags=?, p_remark=?, p_demand=? where p_id=?'
        try {
            const tags = JSON.stringify(req.tags)
            
            if (req.id !== undefined) {
                const res = await query(updateSQL, [req.name, tags, req.remark, req.demand, req.id])
                ctx.body = successData('编辑成功！')
            } else {
                const res = await query(SQL, [req.name, tags, req.remark, req.demand, null, req.userId, '1'])
                ctx.body = successData('添加成功！')
            }
        } catch (error) {
            ctx.body = errorData('添加失败！')
        }
    }

    static async getPositionListForUser(ctx) {
        const req = ctx.request.body
        let SQL = 'SELECT SQL_CALC_FOUND_ROWS * FROM positions'
        const COUNTSQL = 'SELECT FOUND_ROWS() as total'
        const map = {
            id: 'user_id'
        }
        const params = []
        for (const key in req) {
            if (Object.hasOwnProperty.call(req, key)) {
                const element = req[key]
                if (element !== '' && element !== 0 && key !== 'pageNo' && key !== 'pageSize') {
                    params.push(map[key] + '=' + `'${element}'`)
                }
            }
        }
        let search = ' where '
        if (params.length > 0) {
            search += params.join(' and ')
            SQL += search
        }
        const start = (req.pageNo - 1)*req.pageSize
        SQL += ` limit ${start}, ${req.pageSize};`
        try {
            const res = await query(`${SQL} ${COUNTSQL}`)
            ctx.body = successData({
                pageNo: req.pageNo,
                pageSize: req.pageSize,
                count: res[1][0]['total'],
                data: res[0]
            })
        } catch (error) {
            ctx.body = errorData('获取列表失败！')
        }
    }

    static async getPositionInfo(ctx) {
        const req = ctx.request.body
        const SQL = 'select * from positions where p_id=?'
        
        try {
            const res = await query(SQL, [req.id])
            if (res.length > 0) {
                const info = res[0]
                ctx.body = successData(info)
            } else {
                ctx.body = successData(null)
            }
        } catch (error) {
            ctx.body = errorData('添加失败！')
        }
    }
}