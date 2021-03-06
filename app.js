const Koa = require('koa')
import bodyParser from 'koa-bodyparser'
const app = new Koa()

import router from './routes/index'


app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8085');
    ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Max-Age', 3600 * 24);
    await next();
});

app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())
  
app.listen(3000);