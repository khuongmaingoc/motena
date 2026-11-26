"use client";

import { useState } from "react";
import { weeks } from "@/data/lessons";

const problems = [
  {
    number: "01",
    title: "Khách hàng không quay lại",
    text: "Mỗi lần khách rời đi mà không có lý do để trở lại là một cơ hội bị bỏ lỡ.",
  },
  {
    number: "02",
    title: "Chất lượng phục vụ thiếu nhất quán",
    text: "Trải nghiệm phụ thuộc vào từng người, chưa trở thành cách làm chung của đội ngũ.",
  },
  {
    number: "03",
    title: "Khó xử lý tình huống khó",
    text: "Nhân viên lúng túng trước phàn nàn, khách hàng nóng giận hoặc yêu cầu bất ngờ.",
  },
  {
    number: "04",
    title: "Chăm sóc thiếu cảm xúc",
    text: "Đúng quy trình nhưng chưa đủ tinh tế để khách cảm thấy mình được thấu hiểu.",
  },
];

const stories = [
  { label: "NHÀ HÀNG", title: "Một bữa ăn được nhớ đến vì sự tinh tế." },
  { label: "GIÁO DỤC", title: "Phụ huynh an tâm từ lần đầu được lắng nghe." },
  { label: "Y TẾ", title: "Thêm an tâm trong từng điểm chạm chăm sóc." },
  { label: "THƯƠNG MẠI ĐIỆN TỬ", title: "Hỗ trợ sau mua khiến khách muốn quay lại." },
];

export default function AcademyLanding() {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedDay, setSelectedDay] = useState(1);
  const week = weeks[selectedWeek];
  const lesson = week.days.find((item) => item.day === selectedDay) ?? week.days[0];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Omotenashi Academy - Trang chủ">
          <span className="brand-mark" aria-hidden="true">
            お
          </span>
          <span className="brand-name">
            omotenashi<span>academy</span>
          </span>
        </a>
        <nav className="main-nav" aria-label="Điều hướng chính">
          <a href="#program">Chương trình</a>
          <a href="#stories">Ứng dụng</a>
          <a href="#pricing">Học phí</a>
          <a href="/login">Đăng nhập</a>
        </nav>
        <a className="button button-small button-dark header-cta" href="/register">
          Vào học <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light">
            <span className="eyebrow-dot" /> NGHỆ THUẬT PHỤC VỤ TỪ TÂM
          </p>
          <h1>
            Khách hàng
            <br />
            nhớ cảm giác 
            <br />
            <span> mà bạn mang lại cho họ.</span>
          </h1>
          <p className="hero-description">
            Rèn luyện tinh thần Omotenashi qua những hành động nhỏ, để mỗi trải
            nghiệm đều khiến khách hàng muốn quay lại.
          </p>
          <div className="hero-actions">
            <a className="button button-orange" href="/register">
              Bắt đầu hành trình <span aria-hidden="true">↗</span>
            </a>
            <span className="hero-note">Dành 15 phút mỗi ngày</span>
          </div>
          <div className="hero-proof">
            <div className="proof-avatars" aria-hidden="true">
              <span>AN</span>
              <span>MK</span>
              <span>TH</span>
            </div>
            <p>
              Học cùng đội ngũ
              <br />
              <strong>phục vụ bằng sự thấu hiểu</strong>
            </p>
          </div>
        </div>

        <div className="hero-art" aria-label="Lộ trình học tập 21 ngày">
          <div className="sun-disc" aria-hidden="true" />
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <div className="hero-caption">
            <span className="caption-kicker">HÀNH TRÌNH CỦA BẠN</span>
            <span className="caption-number">21<span> ngày</span></span>
            <span className="caption-subtitle">mỗi ngày tốt hơn một chút</span>
          </div>
          <div className="floating-note note-top">
            <span className="note-icon note-icon-red">心</span>
            <span>
              <strong>Phục vụ từ tâm</strong>
              <small>Chủ động thấu hiểu</small>
            </span>
          </div>
          <div className="floating-note note-bottom">
            <span className="note-icon note-icon-green">一</span>
            <span>
              <strong>Mỗi ngày một hành động</strong>
              <small>Nhỏ thôi, nhưng thật</small>
            </span>
          </div>
          <span className="art-stamp" aria-hidden="true">おもてなし</span>
        </div>
      </section>

      <section className="belief-strip" aria-label="Thông tin khóa học">
        <span>MICRO-LEARNING</span>
        <i aria-hidden="true" />
        <span>21 NGÀY</span>
        <i aria-hidden="true" />
        <span>15 PHÚT MỖI NGÀY</span>
        <i aria-hidden="true" />
        <span>1 HÀNH ĐỘNG THỰC TẾ</span>
      </section>

      <section className="section pain-section" id="why">
        <div className="section-intro">
          <p className="eyebrow"><span className="eyebrow-dot" /> ĐIỀU ĐANG CẢN TRỞ BẠN</p>
          <h2>
            Khách hàng không rời đi
            <br />
            chỉ vì <span>giá cả.</span>
          </h2>
          <p className="section-description">
            Họ nhớ cảm giác được lắng nghe, được trân trọng — và cả những lần
            trải nghiệm chưa như mong đợi.
          </p>
        </div>
        <div className="problem-grid">
          {problems.map((problem) => (
            <article className="problem-card" key={problem.number}>
              <span className="problem-number">{problem.number}</span>
              <h3>{problem.title}</h3>
              <p>{problem.text}</p>
              <span className="problem-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="program-section" id="program">
        <div className="program-inner">
          <div className="program-heading">
            <div>
              <p className="eyebrow eyebrow-light">
                <span className="eyebrow-dot" /> LỘ TRÌNH 21 NGÀY
              </p>
              <h2>
                Học một chút.
                <br />
                <span>Thay đổi thật nhiều.</span>
              </h2>
            </div>
            <p>
              Không phải xem thật nhiều video. Mỗi ngày, bạn học một ý tưởng
              ngắn rồi thử ngay trong công việc.
            </p>
          </div>

          <div className="curriculum">
            <div className="curriculum-main">
              <div className="week-tabs" role="group" aria-label="Chọn tuần học">
                {weeks.map((item, index) => (
                  <button
                    className={`week-tab ${selectedWeek === index ? "is-active" : ""}`}
                    key={item.number}
                    onClick={() => {
                      setSelectedWeek(index);
                      setSelectedDay(item.days[0].day);
                    }}
                    aria-pressed={selectedWeek === index}
                  >
                    <span>0{item.number}</span>
                    <strong>Tuần {item.number}</strong>
                    <small>{item.title}</small>
                  </button>
                ))}
              </div>

              <div className="week-content">
                <div className="week-content-heading">
                  <div>
                    <span className="week-label">TUẦN 0{week.number} / 03</span>
                    <h3>{week.title}</h3>
                  </div>
                  <span className="week-subtitle">{week.subtitle}</span>
                </div>
                <div className="lesson-list">
                  {week.days.map((item) => (
                    <button
                      className={`lesson-row ${selectedDay === item.day ? "is-selected" : ""}`}
                      key={item.day}
                      onClick={() => setSelectedDay(item.day)}
                      aria-pressed={selectedDay === item.day}
                    >
                      <span className="lesson-day">{String(item.day).padStart(2, "0")}</span>
                      <span className="lesson-title">{item.title}</span>
                      <span className="lesson-duration">15 phút</span>
                      <span className="lesson-chevron" aria-hidden="true">↗</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <aside className="lesson-preview" aria-live="polite">
              <div className="preview-topline">
                <span className="preview-tag">BÀI HỌC MẪU</span>
                <span className="preview-day">NGÀY {String(lesson.day).padStart(2, "0")}</span>
              </div>
              <div className="preview-illustration" aria-hidden="true">
                <span className="preview-circle" />
                <span className="preview-jp">心</span>
                <span className="preview-line preview-line-one" />
                <span className="preview-line preview-line-two" />
              </div>
              <p className="preview-overline">HÔM NAY BẠN SẼ HỌC</p>
              <h3>{lesson.title}</h3>
              <p className="preview-description">{lesson.description}</p>
              <div className="action-box">
                <span className="action-icon" aria-hidden="true">✳</span>
                <div>
                  <strong>THỬ NGAY TRONG CÔNG VIỆC</strong>
                  <p>{lesson.action}</p>
                </div>
              </div>
              <div className="preview-footer">
                <span>VIDEO NGẮN + BÀI TẬP</span>
                <span>15 PHÚT <i aria-hidden="true">·</i> 01 HÀNH ĐỘNG</span>
              </div>
            </aside>
          </div>

          <p className="program-footnote">
            <span aria-hidden="true">✳</span> 21 bài học · 3 checkpoint · 1 cam kết
            thay đổi sau khóa học
          </p>
        </div>
      </section>

      <section className="section method-section">
        <div className="method-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> CÁCH HỌC KHÁC BIỆT</p>
          <h2>
            Không chỉ biết.
            <br />
            <span>Mà làm được.</span>
          </h2>
          <p className="section-description">
            Từng bài học được thiết kế để bạn áp dụng trong ca làm, cuộc gọi hay
            lần gặp khách tiếp theo.
          </p>
          <a className="text-link" href="#pricing">
            Xem cách tham gia <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="method-steps">
          <article className="method-step">
            <span className="step-number">01</span>
            <div>
              <h3>Hiểu một ý tưởng</h3>
              <p>Bài học ngắn gọn, gắn với một tình huống quen thuộc.</p>
            </div>
            <span className="step-time">05 PHÚT</span>
          </article>
          <article className="method-step">
            <span className="step-number">02</span>
            <div>
              <h3>Thử một hành động</h3>
              <p>Đưa điều vừa học vào một điểm chạm với khách hàng.</p>
            </div>
            <span className="step-time">05 PHÚT</span>
          </article>
          <article className="method-step">
            <span className="step-number">03</span>
            <div>
              <h3>Nhìn lại và cải tiến</h3>
              <p>Ghi nhận điều hiệu quả, điều chỉnh và thử tiếp ngày mai.</p>
            </div>
            <span className="step-time">05 PHÚT</span>
          </article>
          <div className="method-summary">
            <span className="summary-mark" aria-hidden="true">一</span>
            <p>
              <strong>21 ngày, một phiên bản tốt hơn.</strong>
              <br />
              Thói quen phục vụ tốt bắt đầu từ điều nhỏ nhất.
            </p>
          </div>
        </div>
      </section>

      <section className="stories-section" id="stories">
        <div className="section stories-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot" /> OMOTENASHI Ở MỌI ĐIỂM CHẠM</p>
            <h2>
              Phục vụ tốt,
              <br />
              <span>ngành nào cũng cần.</span>
            </h2>
          </div>
          <p>
            Một tinh thần, nhiều cách thể hiện — phù hợp với từng đội ngũ và
            từng khách hàng.
          </p>
        </div>
        <div className="section story-grid">
          {stories.map((story, index) => (
            <article className={`story-card story-card-${index + 1}`} key={story.label}>
              <span className="story-index">0{index + 1}</span>
              <span className="story-label">{story.label}</span>
              <h3>{story.title}</h3>
              <span className="story-mark" aria-hidden="true">{["和", "学", "心", "縁"][index]}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-section" id="pricing">
        <div className="pricing-card">
          <div className="pricing-main">
            <p className="eyebrow eyebrow-light">
              <span className="eyebrow-dot" /> BẮT ĐẦU TỪ ĐIỀU NHỎ
            </p>
            <h2>
              Một trải nghiệm
              <br />
              tốt hơn, <span>bắt đầu hôm nay.</span>
            </h2>
            <p>
              Dành cho cá nhân muốn nâng cấp kỹ năng hoặc doanh nghiệp muốn tạo
              chuẩn phục vụ chung cho đội ngũ.
            </p>
            <a className="button button-orange" href="/register">
              Đăng ký học <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="pricing-side">
            <span className="pricing-label">CHƯƠNG TRÌNH</span>
            <strong>21<span> ngày</span></strong>
            <ul>
              <li><span>✓</span> 21 bài học ngắn</li>
              <li><span>✓</span> Bài tập ứng dụng mỗi ngày</li>
              <li><span>✓</span> 3 checkpoint nhìn lại</li>
              <li><span>✓</span> Cam kết hành động cá nhân</li>
            </ul>
            <p className="pricing-note">
              Hình thức và học phí sẽ được cập nhật theo nhu cầu của từng nhóm
              học viên.
            </p>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="faq-heading">
          <p className="eyebrow"><span className="eyebrow-dot" /> CÂU HỎI THƯỜNG GẶP</p>
          <h2>
            Bạn đang
            <br />
            <span>băn khoăn?</span>
          </h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>Tôi cần có kinh nghiệm dịch vụ trước khi học không?</summary>
            <p>
              Không cần. Chương trình phù hợp với cả người mới bắt đầu và người
              đang muốn làm mới cách phục vụ khách hàng.
            </p>
          </details>
          <details>
            <summary>Mỗi ngày cần dành bao nhiêu thời gian?</summary>
            <p>
              Khoảng 15 phút mỗi ngày: một bài học ngắn, một hành động thực tế
              và một chút thời gian nhìn lại.
            </p>
          </details>
          <details>
            <summary>Chương trình có phù hợp để đào tạo cả đội ngũ?</summary>
            <p>
              Có. Lộ trình có thể áp dụng cho CSKH, bán hàng, lễ tân, nhà hàng,
              khách sạn, giáo dục và các đội ngũ thường xuyên tiếp xúc khách hàng.
            </p>
          </details>
          <details>
            <summary>Đã có thể đăng ký và theo dõi tiến độ học chưa?</summary>
            <p>
              Đây là bản giới thiệu chương trình. Tính năng tài khoản, lưu tiến
              độ và thanh toán sẽ được bổ sung ở giai đoạn tiếp theo.
            </p>
          </details>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <a className="brand brand-footer" href="#home">
          <span className="brand-mark" aria-hidden="true">お</span>
          <span className="brand-name">
            omotenashi<span>academy</span>
          </span>
        </a>
        <p>Phục vụ bằng sự thấu hiểu. Cải tiến bằng những điều nhỏ.</p>
        <a href="#home">Về đầu trang ↑</a>
        <span className="footer-copy">© OMOTENASHI ACADEMY</span>
      </footer>
    </main>
  );
}
