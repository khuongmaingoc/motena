import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import LearnerNav from "@/components/learner-nav";
import SetupState from "@/components/setup-state";
import { completeLesson } from "./actions";
import { getCurrentUser, isEnrolled } from "@/lib/academy";
import { weeks } from "@/data/lessons";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

type LessonPageProps = {
  params: Promise<{ day: string }>;
  searchParams: Promise<{ completed?: string }>;
};

function getEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    let videoId: string | null = null;

    if (hostname === "youtu.be") {
      videoId = url.pathname.slice(1);
    } else if (hostname === "youtube.com" || hostname === "www.youtube.com") {
      videoId = url.searchParams.get("v") ?? url.pathname.match(/^\/embed\/([^/]+)/)?.[1] ?? null;
    } else if (hostname === "vimeo.com" || hostname === "www.vimeo.com") {
      videoId = url.pathname.match(/^\/(\d+)/)?.[1] ?? null;
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }

    return videoId ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}` : null;
  } catch {
    return null;
  }
}

export default async function LessonPage({ params, searchParams }: LessonPageProps) {
  if (!isSupabaseConfigured()) {
    return <SetupState />;
  }

  const { day: rawDay } = await params;
  const day = Number(rawDay);
  if (!Number.isInteger(day) || day < 1 || day > 21) {
    notFound();
  }

  const lesson = weeks.flatMap((week) => week.days).find((item) => item.day === day);
  if (!lesson) {
    notFound();
  }

  const { supabase, user } = await getCurrentUser();
  if (!user) {
    redirect(`/login?next=%2Flearn%2F${day}`);
  }
  if (!(await isEnrolled(user.id))) {
    redirect("/learn");
  }

  const [{ data: progress, error: progressError }, { completed }] = await Promise.all([
    supabase
      .from("lesson_progress")
      .select("day")
      .eq("user_id", user.id)
      .eq("day", day)
      .maybeSingle(),
    searchParams,
  ]);
  if (progressError) {
    throw new Error("Không thể tải tiến độ bài học.");
  }

  const videoUrl = lesson.videoUrl;
  const embedUrl = videoUrl ? getEmbedUrl(videoUrl) : null;
  const isDirectVideo = Boolean(videoUrl && /\.(mp4|webm|ogg)(\?.*)?$/i.test(videoUrl));

  return (
    <>
      <LearnerNav email={user.email} />
      <main className="learner-page lesson-page">
        <Link className="back-link" href="/learn">← Tất cả bài học</Link>
        <div className="lesson-page-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot" /> NGÀY {String(day).padStart(2, "0")} / 21</p>
            <h1>{lesson.title}</h1>
            <p>{lesson.description}</p>
          </div>
          <span className="lesson-time">15 PHÚT<br />VIDEO + THỰC HÀNH</span>
        </div>

        <section className="video-card" aria-label={`Video bài học ngày ${day}`}>
          {embedUrl ? (
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              src={embedUrl}
              title={lesson.title}
            />
          ) : isDirectVideo && videoUrl ? (
            // Direct video links can be added to the lesson data when the content is ready.
            <video controls playsInline src={videoUrl}>
              Trình duyệt của bạn không hỗ trợ phát video.
            </video>
          ) : videoUrl ? (
            <div className="video-placeholder">
              <span className="video-play" aria-hidden="true">↗</span>
              <p>Liên kết video đã được thêm.</p>
              <a href={videoUrl} rel="noreferrer" target="_blank">Mở video trong tab mới</a>
            </div>
          ) : (
            <div className="video-placeholder">
              <span className="video-play" aria-hidden="true">▶</span>
              <p>Video bài học sẽ được cập nhật.</p>
              <small>Nội dung thực hành bên dưới đã sẵn sàng để bạn bắt đầu.</small>
            </div>
          )}
        </section>

        <section className="lesson-practice">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot" /> THỬ NGAY TRONG CÔNG VIỆC</p>
            <h2>Một hành động nhỏ hôm nay.</h2>
            <p>{lesson.action}</p>
          </div>
          <div className="lesson-completion">
            {progress ? (
              <p className="completed-message"><span>✓</span> Bạn đã hoàn thành ngày này.</p>
            ) : (
              <form action={completeLesson}>
                <input name="day" type="hidden" value={day} />
                <button className="button button-orange" type="submit">
                  Đánh dấu đã hoàn thành <span aria-hidden="true">↗</span>
                </button>
              </form>
            )}
            {completed === "1" && <small>Tiến độ đã được lưu.</small>}
          </div>
        </section>

        <nav className="lesson-pagination" aria-label="Điều hướng bài học">
          {day > 1 ? <Link href={`/learn/${day - 1}`}>← Bài trước</Link> : <span />}
          <span>NGÀY {String(day).padStart(2, "0")} / 21</span>
          {day < 21 ? <Link href={`/learn/${day + 1}`}>Bài tiếp theo →</Link> : <Link href="/learn">Về lộ trình →</Link>}
        </nav>
      </main>
    </>
  );
}
