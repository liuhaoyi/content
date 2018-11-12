import Mock from 'mockjs';
const qs = require('qs');

let db = Mock.mock(
    [
        {
            "id": "1",
            "title": "炼化新闻",
            "img": "https://www.easyicon.net/api/resizeApi.php?id=1177016&size=48",
            "catalog":"0",
        },
        {
            "id": "2",
            "title": "公司动态",
            "img": "https://www.easyicon.net/api/resizeApi.php?id=1177015&size=48",
            "catalog":"0",
        },
        {
            "id": "3",
            "title": "通知公告",
            "img": "http://d.lanrentuku.com/down/png/1106/androidicons/store.png",
            "catalog":"0",
        },
        {
            "id": "4",
            "title": "重点工作",
            "img": "http://d.lanrentuku.com/down/png/1106/androidicons/store.png",
            "catalog":"0",
        },
        {
            "id": "5",
            "title": "企业文化",
            "img": "http://d.lanrentuku.com/down/png/1106/androidicons/store.png",
            "catalog":"0",
        },
        {
            "id": "6",
            "title": "员工手册",
            "img": "http://d.lanrentuku.com/down/png/1106/androidicons/store.png",
            "catalog":"0",
        },
        {
            "id": "7",
            "title": "炼化榜样",
            "img": "http://d.lanrentuku.com/down/png/1106/androidicons/store.png",
            "catalog":"0",
        },
        {
            "id": "8",
            "title": "学习园地",
            "img": "http://d.lanrentuku.com/down/png/1106/androidicons/store.png",
            "catalog":"0",
        },
        {
            "id": "9",
            "title": "公共服务",
            "img": "http://d.lanrentuku.com/down/png/1106/androidicons/store.png",
            "catalog":"0",
        },
    ]
)

module.exports={
    [`GET /api/queryBigCatalog`](req,res){

        res.status(200).json(db);
    },
}