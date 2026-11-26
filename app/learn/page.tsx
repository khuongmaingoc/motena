import Link from "next/link";
import { redirect } from "next/navigation";
import LearnerNav from "@/components/learner-nav";
import SetupState from "@/components/setup-state";
import { weeks } from "@/data/lessons";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getCurrentUser } from "@/lib/academy";

export const dynamic = "force-dynamic";

export default async function LearnPage() {
  if (!isSupabaseConfigured()) {
    return <SetupState />;
  }

  const { supabase, user } = await getCurrentUser();
  if (!user) {
    redirect("/login?next=%2Flearn");
  }

  const [{ data: enrollment, error: enrollmentError }, { data: requests, error: requestError }, { data: progress, error: progressError }] =
    await Promise.all([
      supabase
        .from("enrollments")
        .select("activated_at")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("payment_requests")
        .select("status, transfer_reference, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1),
      supabase
        .from("lesson_progress")
        .select("day")
        .eq("user_id", user.id),
    ]);

  if (enrollmentError || requestError || progressError) {
    throw new Error("Không thể tải lộ trình học. Vui lòng thử lại.");
  }

  const completedDays = new Set((progress ?? []).map((item) => item.day));
  const latestRequest = requests?.[0];
  const totalLessons = weeks.reduce((count, week) => count + week.days.length, 0);

  return (
    <>
      <LearnerNav email={user.email} />
      <main className="learner-page">
        <div className="learner-welcome">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot" /> KHÔNG GIAN HỌC TẬP CỦA BẠN</p>
            <h1>
              Mỗi ngày một chút,
              <br />
              <span>tốt hơn một chút.</span>
            </h1>
            <p className="learner-lead">
              21 ngày thực hành Omotenashi. Mỗi bài khoảng 15 phút và kết thúc
              bằng một hành động trong công việc.
            </p>
          </div>
          <div className="progress-card">
            <span>TIẾN ĐỘ HÀNH TRÌNH</span>
            <strong>{completedDays.size}<small> / {totalLessons}</small></strong>
            <div className="progress-track" aria-label={`${completedDays.size} trên ${totalLessons} ngày hoàn thành`}>
              <span style={{ width: `${(completedDays.size / totalLessons) * 100}%` }} />
            </div>
            <small>ngày đã hoàn thành</small>
          </div>
        </div>

        {!enrollment ? (
          <section className={`access-state ${latestRequest?.status === "pending" ? "access-pending" : ""}`}>
            <span className="access-icon" aria-hidden="true">
              {latestRequest?.status === "pending" ? "◷" : "お"}
            </span>
            <div>
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                {latestRequest?.status === "pending" ? "ĐANG XÁC NHẬN THANH TOÁN" : "KÍCH HOẠT KHÓA HỌC"}
              </p>
              <h2>
                {latestRequest?.status === "pending"
                  ? "Thông tin chuyển khoản đang được kiểm tra."
                  : "Hoàn tất chuyển khoản để bắt đầu học."}
              </h2>
              <p>
                {latestRequest?.status === "pending"
                  ? "Sau khi đối chiếu giao dịch, đội ngũ sẽ kích hoạt quyền học cho tài khoản này. Bạn có thể quay lại trang này để kiểm tra."
                  : latestRequest?.status === "rejected"
                    ? "Yêu cầu trước chưa được xác nhận. Kiểm tra lại nội dung chuyển khoản hoặc liên hệ hỗ trợ để được hướng dẫn."
                    : "Tài khoản đã đăng nhập nhưng chưa có quyền truy cập khóa học. Gửi thông tin giao dịch sau khi chuyển khoản để được xác nhận."}
              </p>
              {latestRequest?.status !== "pending" && (
                <Link className="button button-orange" href="/payment">
                  {latestRequest?.status === "rejected" ? "Gửi lại thông tin" : "Xem hướng dẫn thanh toán"}
                  <span aria-hidden="true">↗</span>
                </Link>
              )}
            </div>
          </section>
        ) : (
          <section className="curriculum-list">
            {weeks.map((week) => (
              <div className="learner-week" key={week.number}>
                <div className="learner-week-heading">
                  <span>TUẦN 0{week.number}</span>
                  <h2>{week.title}</h2>
                  <p>{week.subtitle}</p>
                </div>
                <div className="learner-lessons">
                  {week.days.map((lesson) => {
                    const isComplete = completedDays.has(lesson.day);
                    return (
                      <Link
                        className={`learner-lesson ${isComplete ? "lesson-complete" : ""}`}
                        href={`/learn/${lesson.day}`}
                        key={lesson.day}
                      >
                        <span className="learner-day">{String(lesson.day).padStart(2, "0")}</span>
                        <span className="learner-lesson-copy">
                          <strong>{lesson.title}</strong>
                          <small>15 phút · Video và thực hành</small>
                        </span>
                        <span className="learner-lesson-status" aria-label={isComplete ? "Đã hoàn thành" : "Chưa hoàn thành"}>
                          {isComplete ? "✓" : "↗"}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </>
  );
}
