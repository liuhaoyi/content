import Mock from 'mockjs';
const qs = require('qs');

let db = Mock.mock(
    {
        "id": "1",
        "title": "炼化最新新闻",
        "content": "2017年12月28日，最高人民法院向社会公布对张文中案、顾雏军案及江苏牧羊集团案等3件在全国有重大影响的涉产权案件启动再审。目前，张文中案已经审结，该案准确把握了国家政策的发展变化，对民营企业经营过程中存在的一些不规范行为实事求是地予以看待和妥善处理，严格区分了罪与非罪的界限，是人民法院落实党中央产权保护和企业家合法权益保护政策的一个“标杆”案件，社会反响良好。顾雏军案和江苏牧羊集团案正在加快审理中。上述三案启动再审，及时向社会传递了党中央依法保护产权的政策导向，有助于增强企业家人身和财产安全感以及干事创业信心，有助于稳定社会预期。江必新：一是要加大民营企业家的人身、财产权利的保护力度，增强民营企业家的安全感。严格执行刑事法律和司法解释，坚决防止利用刑事手段干预经济纠纷。对改革开放以来一些民营企业历史上曾经有过的一些不规范行为，要以发展的眼光看问题，严格遵循罪刑法定、疑罪从无的原则处理，让企业家卸下思想包袱，轻装前进。坚持罪刑法定原则，对企业家在生产、经营、融资活动中的创新创业行为，只要不违反刑事法律的规定，不得以犯罪论处。严格非法经营罪、合同诈骗罪的构成要件，防止随意扩大适用。对于在合同签订、履行过程中产生的民事争议，如无确实充分的证据证明符合犯罪构成的，不得作为刑事案件处理。严格区分企业家违法所得和合法财产，没有充分证据证明为违法所得的，不得判决追缴或者责令退赔。严格区分企业家个人财产和企业法人财产，在处理企业犯罪时不得牵连企业家个人合法财产和家庭成员财产。",
        "img": "https://zos.alipayobjects.com/rmsportal/1.png",
        "date": "2018-10-28",
        "editor": "刘好义",
        "readCount": "123",
        "smallCatalog":"0",
    }
)


module.exports={
    [`GET /api/queryDetail`](req,res){

        res.status(200).json(db);
    },
}