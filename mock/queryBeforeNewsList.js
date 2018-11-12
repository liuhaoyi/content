import Mock from 'mockjs';
const qs = require('qs');

let db = Mock.mock(
    [
        {
            "id": "1",
            "title": "文化理念1",
            "des": "文化理念2",
            "img": "/aa/aa.png",
            "modifyDatetime": "123456",
        },
        {
            "id": "2",
            "title": "文化理念2",
            "des": "文化理念2",
            "img": "/aa/aa.png",
            "modifyDatetime": "123456",
        },
        // {
        //     "id": "3",
        //     "title": "文化理念3",
        //     "des": "文化理念3",
        //     "img": "/aa/aa.png",
        // },
        // {
        //     "id": "4",
        //     "title": "文化理念4",
        //     "des": "文化理念4",
        //     "img": "/aa/aa.png",
        // },
        // {
        //     "id": "5",
        //     "title": "文化理念5",
        //     "des": "文化理念5",
        //     "img": "/aa/aa.png",
        // },
        // {
        //     "id": "6",
        //     "title": "文化理念6",
        //     "des": "文化理念6",
        //     "img": "/aa/aa.png",
        // },
        // {
        //     "id": "7",
        //     "title": "文化理念7",
        //     "des": "文化理念7",
        //     "img": "/aa/aa.png",
        // },
        // {
        //     "id": "8",
        //     "title": "文化理念8",
        //     "des": "文化理念8",
        //     "img": "/aa/aa.png",
        // },
        // {
        //     "id": "9",
        //     "title": "文化理念9",
        //     "des": "文化理念9",
        //     "img": "/aa/aa.png",
        // },

    ]
)

module.exports={
    [`GET /api/queryBeforeNewsList`](req,res){

        res.status(200).json(db);
    },
}