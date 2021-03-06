import { query } from '../mysql/db'
import { successData, errorData } from '../utils/responseData'
const moment = require('moment')
export default class QuestionController {
    static async addQuestion(ctx) {
        const req = ctx.request.body
        const SQL = 'insert into question (q_content, q_explain, q_answer, q_type, q_level, department, course, profession, point) value (?, ?, ?, ?, ?, ?, ?, ?, ?)'
        try {
            const res = await query(SQL,
                [
                    req.question,
                    req.analysis,
                    req.solution,
                    req.type,
                    req.level,
                    req.department,
                    req.course,
                    req.profession,
                    req.point
                ]
            )
            ctx.body = successData('添加成功！')
        } catch (error) {
            ctx.body = errorData('添加失败！')
        }
    }

    static async questionList(ctx) {
        const req = ctx.request.body
        // console.log(req);
        let SQL = 'SELECT SQL_CALC_FOUND_ROWS * FROM question'
        const COUNTSQL = 'SELECT FOUND_ROWS() as total'
        const map = {
            questionType: 'q_type',
            difficulty: 'q_level',
            department: 'department',
            profession: 'profession',
            course: 'course',
            point: 'point'
        }
        const params = []
        for (const key in req) {
            if (Object.hasOwnProperty.call(req, key)) {
                const element = req[key]
                if (element !== '' && element !== 0 && key !== 'pageNo' && key !== 'pageSize') {
                    params.push(map[key] + '=' + element)
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
        // console.log(SQL);
        try {
            const res = await query(`${SQL} ${COUNTSQL}`)
            ctx.body = successData({
                pageNo: req.pageNo,
                pageSize: req.pageSize,
                count: res[1][0]['total'],
                data: res[0]
            })
        } catch (error) {
            console.log(error)
            ctx.body = errorData('获取列表失败！')
        }
    }

    static async getQuestion(ctx) {
        const req = ctx.request.body
        const SQL = 'SELECT * FROM question where q_id=?'
        try {
            const res = await query(SQL, [req.id])
            ctx.body = successData(res[0])
        } catch (error) {
            ctx.body = errorData('获取信息失败！')
        }
    }

    static async editQuestion(ctx) {
        const req = ctx.request.body
        const SQL = 'update question set q_content=?, q_explain=?, q_answer=?, q_type=?, q_level=?, department=?, course=?, profession=?, point=? where q_id=?'
        try {
            const res = await query(SQL, 
                [
                    req.question,
                    req.analysis,
                    req.solution,
                    req.type,
                    req.level,
                    req.department,
                    req.course,
                    req.profession,
                    req.point,
                    req.id
                ]
            )
            ctx.body = successData('修改成功！')
        } catch (error) {
            console.log(error)
            ctx.body = errorData('添加失败！')
        }
    }

    static async createExam(ctx) {
        const req = ctx.request.body
        const SQL = 'insert into exam (e_name, e_questions, user, course, time) value (?, ?, ?, ?, ?)'
        const time = moment().format('YYYY-MM-DD')
        const questions = req.questions.map(item => item.q_id)
        try {
            const res = await query(SQL, 
                [
                    req.name,
                    JSON.stringify(questions),
                    req.userId,
                    req.course,
                    time
                ]
            )
            ctx.body = successData('添加成功！')
        } catch (error) {
            console.log(error)
            ctx.body = errorData('添加失败！')
        }
    }

    static async examList(ctx) {
        const req = ctx.request.body
        // console.log(req);
        let SQL = 'SELECT SQL_CALC_FOUND_ROWS * FROM exam'
        const COUNTSQL = 'SELECT FOUND_ROWS() as to
        tal'
        const map = {
            examName: 'e_name',
            user: 'user'
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
        console.log(SQL);
        try {
            const res = await query(`${SQL} ${COUNTSQL}`)
            ctx.body = successData({
                pageNo: req.pageNo,
                pageSize: req.pageSize,
                count: res[1][0]['total'],
                data: res[0]
            })
        } catch (error) {
            console.log(error)
            ctx.body = errorData('获取列表失败！')
        }
    }

    static async downExam(ctx) {
        const req = ctx.request.body
        const SQL = 'SELECT * FROM exam where e_id=?'
        
        try {
            const res = await query(SQL, [req.id])
            ctx.body = successData(res[0])
        } catch (error) {
            ctx.body = errorData('获取信息失败！')
        }
    }

    static async deleteExam (ctx) {
        const req = ctx.request.body
        const SQL = 'delete from exam where e_id=?'
        try {
            const res = await query(SQL, [req.id])
            ctx.body = successData('删除成功！')
        } catch (error) {
            ctx.body = errorData('删除失败！')
        }
    }
}