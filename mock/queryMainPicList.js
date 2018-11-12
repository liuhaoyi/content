import Mock from 'mockjs';
const qs = require('qs');

let db = Mock.mock(
    [
        {
            "id": "1",
            "title": "瑞雪长廊",
            "img":"https://timgsa.baidu.com/timg?image&quality=80&"
        },
        {
            "id": "2",
            "title": "冬季炼化",
            "img":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541675173951&di=668cd5e5dec4a856c884e7345516a63c&imgtype=0&src=http%3A%2F%2Fwww.qianjia.com%2FUpload%2FNews%2F20180515%2Fimages%2F201805151536289945.jpg"
        },
        {
            "id": "3",
            "title": "客户端二维码推介",
            "img":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541675173952&di=dc2f8e27a5ee32df542f185618163cc2&imgtype=0&src=http%3A%2F%2Fec4.images-amazon.com%2Fimages%2FI%2F51ctP0%252BwZPL.jpg"
        },
        {
            "id": "4",
            "title": "美在炼化",
            "img":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541675173951&di=668cd5e5dec4a856c884e7345516a63c&imgtype=0&src=http%3A%2F%2Fwww.qianjia.com%2FUpload%2FNews%2F20180515%2Fimages%2F201805151536289945.jpg"
        },
        {
            "id": "5",
            "title": "化工产品",
            "img":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541675173973&di=eb084ea8f8970e9948bf15c20ff601bc&imgtype=0&src=http%3A%2F%2Fec4.images-amazon.com%2Fimages%2FI%2F51YTuPFOIkL.jpg"
        }
    ]
)

module.exports={
    [`GET /api/queryMainPicList`](req,res){

        res.status(200).json(db);
    },
}