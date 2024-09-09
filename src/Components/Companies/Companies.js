import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Rating from "@mui/material/Rating";
//import { Gauge } from '@mui/x-charts/Gauge';
import logo from "./img/logoitviec.png";
import asia from "./img/asia.png";
import SmartOSC from "./img/smartOSC.png";
import Employment from "./img/employmentHero.png";
import Trusting from "./img/trustingSocial.png";
import Tyme from "./img/tyme.png";
import createForce from "./img/createForce.png";
import DEVBLOCK from "./img/devblock.png";
import gft from "./img/gft.png";
import mti from "./img/mti.png";
import restaff from "./img/restaff.png";
const doanhnghieplon = [
  {
    id: 1,
    title: "NFQ Asia",
    img: asia,
    star: 4.8,
    percent: 98,
    comment:
      "Thật sự mình đã làm tại nhiều cty nhưng để lại ấn tượng nhất vẫn là NFQ, cty hiện tại của mình. Đầu tiên, mức lương và phúc lợi tại đây thực sự rất tốt so với mặt bằng chung trên thị trường. Thay vì 1 năm có 12 ngày nghỉ phép như các cty...",
  },
  {
    id: 2,
    title: "SmartOSC",
    img: SmartOSC,
    star: 4.2,
    percent: 88,
    comment:
      "Smart OSC is an integral part of the global tech landscape, providing exposure to international trends and encouraging a diverse work environment. The company offers flexible working hours, prioritizing a healthy work-life balance and...",
  },
  {
    id: 3,
    title: "Trusting Social",
    img: Trusting,
    star: 4.2,
    percent: 94,
    comment:
      "Về công việc, áp lực nhẹ trong 2 tháng thử việc, nhưng đc ae đồng nghiệp hỗ trợ nên thời gian nhẹ nhàn trôi. AE cty khá giỏi, ứng dụng nhiều công nghệ mới nên học đc nhiều cái mới lạ, improve bản thân kha khá. Hồi xưa học đc bát môn võ...",
  },
  {
    id: 4,
    title: "Tyme",
    img: Tyme,
    star: 4.8,
    percent: 99,
    comment:
      "Môi trường làm việc: Luôn có các task mới được assign, thay vì chỉ gói gọn trong các dự án năm nay qua năm khác. Công ty đa dạng văn hoá, có cả dân Đông Nam Á và châu Âu, nên có nhiều cơ hội làm việc với người nước ngoài để cải thiện khả...",
  },
  {
    id: 5,
    title: "Employment Hero",
    img: Employment,
    star: 4.8,
    percent: 97,
    comment:
      "Remote working: Hiện tại mình thấy khá ít công ty ở Việt Nam cho nhân viên làm remote, nên đối với một đứa hay thức khuya dậy trễ như mình thì remote working quá tuyệt zời vì đỡ phải bon chen 45 phút kẹt xe trên đường...",
  },
];
const doanhnghiepvuavanho = [
  {
    id: 1,
    title: "Creative Force",
    img: createForce,
    star: 4.9,
    percent: 98,
    comment:
      "Thời gian làm việc flexible, thêm đó có 5 ngày wfh / tuần (phù hợp với người có con nhỏ vì mình toàn dành ngày wfh đề phòng lúc con ốm). - Công ty không có checkin checkout nên khi mưa tắc đường không lo, với nếu có công việc đột xuất...",
  },
  {
    id: 2,
    title: "GFT Technologies Vietnam",
    img: gft,
    star: 4.8,
    percent: 96,
    comment:
      "Công ty đề cao diverse and inclusive nên rất quan tâm đến sự phát triển của nữ làm việc tại công ty. Mình là nữ nên có chương trình mentor riêng cho mình với các mentor là nhân sự cấp cao của GFT trên toàn cầu. Mới vào thì công ty có...",
  },
  {
    id: 3,
    title: "MTI TECHNOLOGY",
    img: mti,
    star: 4.6,
    percent: 93,
    comment:
      "Thời gian làm việc khá thoái mái, cân bằng giữa công việc và đời sống cá nhân, ko OT, nếu có OT thì sẽ được trả lương theo quy định. - Có nhiều policy cho nhân viên như có allowance tháng, có budget cho mua khoá học, mua sách để update...",
  },
  {
    id: 4,
    title: "DEVBLOCK VIETNAM",
    img: DEVBLOCK,
    star: 4.8,
    percent: 100,
    comment:
      "DB tọa lạc tại TTC tầng 7 nhé ace. Có thể nói là gút chóppp nha😍. Toàn là thứ dữ không àh😁. Nguyên một dàn MN, PM, LM, QC quá chất lượng, siêu dễ thương và tốt bụng. Một nơi rất đáng để ace chọn đầu quân vào làm việc, học hỏi và tích lũy...",
  },
  {
    id: 5,
    title: "Restaff – House Of Norway",
    img: restaff,
    star: 4.7,
    percent: 98,
    comment:
      "Có chỗ ngồi ăn trưa bao đẹp, có càfe pha máy free ngon lắm, thề. Có chỗ ngủ trưa bao phê, mình thường ngủ từ 12h15 đến 1h dậy, có hôm ngủ quên đến 1h30 nhưng sếp không là rầy, lâu lâu 1 lần thôi ngủ quài cũng kỳ. Nói chung tôn trọng lẫn...",
  },
];
function cardInTabs(data) {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title className="mb-3 fs-4 fw-bold">
            #{data.id + " " + data.title}
          </Card.Title>
          <div className="mb-3 d-flex justify-content-center">
            <Card.Img
              height={150}
              width={250}
              className="mr-5"
              variant="left"
              src={data.img}
            />
            <Card.Text className="row fs-5">
              <div className="col align-items-center d-flex ">
                <Rating
                  name="read-only"
                  value={Math.floor(data.star)}
                  readOnly
                />
                <p className="ml-2 mt-3 fw-bold">{data.star}</p>
              </div>
              <div className="col-md-auto ">
                <div className="d-flex flex-row justify-content-center">
                  {/* <Gauge width={100} height={100} value={data.percent} /> */}
                  <p className="d-flex align-items-center fs-5 fw-bold">
                    Khuyến khích làm việc tại đây!
                  </p>
                </div>
              </div>
              "{data.comment}"
              <div className="d-flex flex-row justify-content-end">
                <Button variant="link">Đánh giá</Button>
                <Button variant="link">Tuyển dụng</Button>
              </div>
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
const Companies = () => {
  const dataBig = doanhnghieplon.map((data) => {
    return cardInTabs(data);
  });
  const dataMedi = doanhnghiepvuavanho.map((data) => {
    return cardInTabs(data);
  });
  return (
    <>
      <div className="d-flex m-5">
        <div className="col-sm fs-5">
          <p className="fs-3 fw-bold">Công ty IT tốt nhất Việt Nam 2024</p>
          Top 30 công ty IT tốt nhất Việt Nam sau đây (15 doanh nghiệp Lớn, 15
          doanh nghiệp Vừa và Nhỏ) được ghi nhận mang đến văn hóa doanh nghiệp,
          phúc lợi, môi trường làm việc, sự quan tâm đến nhân viên và đào tạo
          xuất sắc nhất, dựa trên 21,500+ nhận xét từ các nhân viên IT.
          <br></br>
          Dựa trên đánh giá của nhân viên từ 1/1/2023 đến 31/12/2023
        </div>
        <img width={300} height={300} src={logo} />
      </div>

      <Tabs
        defaultActiveKey="home"
        id="justify-tab-example"
        className="m-3 fs-4 fw-bold"
        justify
      >
        <Tab eventKey="home" title="Doanh nghiệp lớn" className="m-3">
          {dataBig}
        </Tab>
        <Tab eventKey="profile" title="Doanh nghiệp vừa và nhỏ" className="m-3">
          {dataMedi}
        </Tab>
      </Tabs>
    </>
  );
};

export default Companies;
