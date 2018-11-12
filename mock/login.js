import Mock from 'mockjs';
const qs = require('qs');

let db = Mock.mock( 
    {
        "code": "1",
        "data": "登录失败",
    }
)

module.exports={
    [`POST /api/login`](req,res){
        res.status(200).json(db);
    },
}