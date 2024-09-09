import React from 'react'
import blog1 from "../img/blog1.png";
import avatar from "../img/avatar.png"
import general from '../general/general';

const data = [
  {
    key: 1,
    manufacturingDate: "31/07/2024",
    updateDate: "31/07/2024",
    title: "Backend là gì: Tổng hợp các kiến thức cần biết về Backend",
    general: "Giao diện bài viết mà bạn đang xem được tạo ra bởi frontend, và việc bạn truy cập được vào bài viết này là nhờ quá trình xử lý backend. Vậy chính xác Backend là gì, cách thức hoạt động như thế nào? Nếu bạn đang có ý định trở thành backend developer, nhất định phải đọc bài viết này.",
    imgBlog: blog1,
    content: [
      {
        key: 1,
        topic: "Backend là gì? ",
        content: `Backend, hay còn gọi là phía máy chủ, là phần cốt lõi của một ứng dụng web hoặc trang web mà người dùng không trực tiếp nhìn thấy. \n
        Tương tự với một trang web, frontend chính là những gì đang hiện hữu trên màn hình mà người dùng thấy và backend chính là tất cả quá trình xử lý phía sau gồm logic, lưu trữ dữ liệu và các chức năng bảo mật cần thiết để ứng dụng hoạt động chính xác theo những hành động mà người dùng thực hiện.`,
      },
      {
        key: 2,
        topic: "Vai trò của backend trong thiết kế web",
        content: "Backend là một phần thiết yếu của ứng dụng web vì nó xử lý tất cả hoạt động hậu trường để ứng dụng hoạt động hiệu quả và an toàn. Không chỉ vậy, backend còn kết hợp với frontend để mang đến trải nghiệm hoàn chỉnh cho người dùng."
      },
      {
        key: 3,
        topic: "Tổng kết Backend là gì",
        content: "Để xây dựng một trang web có tính tương tác cao, mượt mà, ngoài frontend, bạn còn cần đầu tư “chất xám” cho backend – quá trình xử lý các yêu cầu, hoạt động từ người dùng trên mỗi trang web. <br/> Với những thông tin trong bài viết này, hy vọng bạn đã hiểu hơn về Backend là gì, các thành phần cấu thành và cách hoạt động của nó. Ngoài ra còn có những thông tin tổng quan về ngôn ngữ lập trình backend, các loại frameworks và thư viện backend thường được dùng."
      }
    ],
    author: "Linh Trao",
    positionAuthor: "Content Writer",
    introduceAuthor: 'Bắt đầu từ lúc còn là Sinh viên Báo chí - Truyền thông đến nay, Linh đã tích lũy hơn 8 năm kinh nghiệm trong chuyên môn viết lách. Với phương châm “chọn lọc đi kèm hiệu quả”, mỗi bài viết trên ITviec Linh đều đã “tối giản hóa” để người đọc dù là người mới bắt đầu hay IT có nhiều năm kinh nghiệm đều dễ tiếp cận, dễ hiểu và nhớ lâu. Linh chuyên sản xuất các bài viết thuộc chủ đề Front-End như CSS, TypeScript, JavaScript.',
    relativePerson: 'Nguyễn Trường Nguyên',
    positionRelativePerson: 'Software Engineer',
    introduceRelativePerson: 'Nguyễn Trường Nguyên là Software Engineer với 5 năm kinh nghiệm trong lĩnh vực phát triển phần mềm tại các công ty công nghệ. Nguyên đã có kinh nghiệm làm việc tại các công ty công nghệ uy tín như Divine Shop (Website bán game và key bản quyền lớn tại Việt Nam), Cốc Cốc và Vua Nệm. Trong quá trình làm việc, Nguyên đã tham gia vào nhiều dự án phát triển phần mềm khác nhau, từ đó tích lũy được nhiều kinh nghiệm quý báu. Ngoài công việc chính, Nguyên còn tham gia vào cộng đồng Careerly (Một ứng dụng kết nối người Việt làm tại các công ty công nghệ) với vai trò là Curator thường xuyên chia sẻ những bài viết về công nghệ nói chung, góp phần giúp cộng đồng hiểu rõ hơn về lĩnh vực này. Nguyên cũng tham gia các cuộc thi viết do ITviec tổ chức và nhận về các giải thưởng Câu Chuyện IT Thú Vị tại cuộc thi "Từ Ao Làng Đến Ao Trình" (2022), Bài Viết Xuất Sắc Nhất tại cuộc thi "Là IT Thì Mình Cứ Viết Đi" (2023).',
    avatar: avatar,
  }
];

function Blog(data) {
  return (
    <div key={data.key} className='row position-relative'>
      <div className='col-md-8'>
        <div className='border rounded bg-light p-5 my-3'>
          <p className='fst-italic fw-light fs-5 mb-3'>
            Ngày xuất bản: {data.manufacturingDate}
            <br />
            Ngày cập nhật: {data.updateDate}
          </p>
          <p className='h1 text-center mb-3'>
            {data.title}
          </p>
          <div className='d-flex justify-content-center'>
            <img src={data.imgBlog} className='w-75 h-75 ' />
          </div>
          <div className='fs-5'>
            <p className='fw-bold mt-3 fst-italic'>
              {data.general}
            </p>
            <p>
              Đọc bài viết để hiểu rõ hơn:
              <br />
            </p>
            <ul style={{ listStyleType: 'disc' }}>
              {
                data.content.map((item) => {
                  return (
                    <li key={item.key}>{item.topic}</li>
                  )
                })
              }
            </ul>

            <div>
              {
                data.content.map((item) => {
                  return (
                    <div key={item.key}>
                      <p key={item.topic} className='fw-bold text-danger fs-1'>
                        {item.topic}
                      </p>
                      <p key={item.content}>
                        {item.content}
                      </p>
                    </div>
                  )
                })
              }
            </div>

            <hr />
            <div>
              <p className='text-uppercase text-secondary fw-bold'>Tác giả</p>
              <div className='d-flex'>
                <img src={data.avatar} className='rounded-circle w-20 h-20' />
                <div className='pl-3'>
                  <p className="m-0 fs-3 fw-bold">{data.author}</p>
                  <p className='fs-5 fst-italic'>{data.positionAuthor}</p>
                </div>
              </div>
              {data.introduceAuthor}
            </div>
          </div>
        </div>
      </div>

      <div className='col-md-4 '>
        <div className='position-sticky top-3 border rounded bg-light p-3 my-3 fs-5'>
          <div className=''>
            <p className='text-primary fs-5 fw-bold'>Được tham vấn kĩ thuật bởi</p>
            <div>
              <div className='d-flex'>
                <img src={data.avatar} className='rounded-circle w-20 h-20' />
                <div className='pl-3'>
                  <p className="m-0 fs-3 fw-bold">{data.relativePerson}</p>
                  <p className='fs-5 fst-italic'>{data.positionRelativePerson}</p>
                </div>
              </div>
              {data.introduceRelativePerson}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
function detail() {
  const dataMap = data.map((data) => {
    return (
      Blog(data)
    )
  })

  return (
    <>
      {dataMap}
    </>
  )
}

export default detail