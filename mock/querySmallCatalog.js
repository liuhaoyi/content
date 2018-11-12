import Mock from 'mockjs';
const qs = require('qs');

let db = Mock.mock(
    [
        {
            "id": "1",
            "title": "文化理念",
        },
        {
            "id": "2",
            "title": "文化推进",
        },
        {
            "id": "3",
            "title": "文化展示",
        },
        {
            "id": "4",
            "title": "文化测试",
        },
        {
            "id": "5",
            "title": "文化推进5",
        },
        {
            "id": "6",
            "title": "文化展示6",
        },
        {
            "id": "7",
            "title": "文化测试7",
        },
    ]
)

module.exports={
    [`GET /api/querySmallCatalog`](req,res){

        res.status(200).json(db);
    },
}