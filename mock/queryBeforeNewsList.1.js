import Mock from 'mockjs';
const qs = require('qs');

let db = Mock.mock(
    [
        {
            "id": "1",
            "title": "文化理念1",
            "des": "文化理念1",
            "img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541675173951&di=668cd5e5dec4a856c884e7345516a63c&imgtype=0&src=http%3A%2F%2Fwww.qianjia.com%2FUpload%2FNews%2F20180515%2Fimages%2F201805151536289945.jpg",
            "modifyDatetime": "123456",
        },
        {
            "id": "2",
            "title": "文化理念1",
            "des": "文化理念1",
            "img": "/aa/aa.png",
            "modifyDatetime": "123456",
        },
    ]
)

module.exports={
    [`GET /api/queryBeforeNewsList.1`](req,res){

        res.status(200).json(db);
    },
}