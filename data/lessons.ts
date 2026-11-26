export type Lesson = {
  day: number;
  title: string;
  description: string;
  action: string;
  videoUrl?: string;
};

export type Week = {
  number: number;
  title: string;
  subtitle: string;
  days: Lesson[];
};

export const weeks: Week[] = [
  {
    number: 1,
    title: "Nhìn thấy khách hàng",
    subtitle: "Bắt đầu bằng sự chú tâm",
    days: [
      {
        day: 1,
        title: "Omotenashi là gì?",
        description:
          "Khám phá tinh thần phục vụ chân thành của Nhật Bản: quan tâm trước khi khách cần lên tiếng.",
        action: "Chọn một khách hàng hôm nay và ghi lại điều bạn muốn họ cảm nhận sau lần tương tác này.",
      },
      {
        day: 2,
        title: "Hành trình khách hàng",
        description:
          "Nhìn trải nghiệm qua từng điểm chạm, từ lúc khách tìm hiểu đến sau khi sử dụng dịch vụ.",
        action: "Vẽ nhanh 5 điểm chạm của khách hàng và đánh dấu nơi họ dễ phải chờ hoặc bối rối.",
      },
      {
        day: 3,
        title: "Lắng nghe chủ động",
        description:
          "Lắng nghe cả điều khách nói, điều họ ngập ngừng và điều họ thực sự cần.",
        action: "Trong một cuộc trò chuyện, thử nhắc lại nhu cầu của khách trước khi đưa ra giải pháp.",
      },
      {
        day: 4,
        title: "Quan sát tín hiệu cảm xúc",
        description:
          "Nhận biết nét mặt, giọng nói và ngôn ngữ cơ thể để chọn cách phản hồi phù hợp.",
        action: "Ghi nhận một tín hiệu cảm xúc bạn quan sát được và cách bạn đã điều chỉnh phản hồi.",
      },
      {
        day: 5,
        title: "Gọi tên khách hàng đúng cách",
        description:
          "Tạo cảm giác được ghi nhớ bằng cách xưng hô tự nhiên, chính xác và tôn trọng.",
        action: "Xác nhận cách xưng hô khách mong muốn và sử dụng tên họ đúng lúc trong cuộc trò chuyện.",
      },
      {
        day: 6,
        title: "Bài tập thực hành",
        description:
          "Kết nối các kỹ năng trong tuần qua một tình huống phục vụ quen thuộc.",
        action: "Thực hành một cuộc hội thoại 3 phút với đồng nghiệp: chào hỏi, lắng nghe và xác nhận nhu cầu.",
      },
      {
        day: 7,
        title: "Checkpoint tuần 1",
        description:
          "Nhìn lại những gì bạn đã nhận ra về khách hàng và thói quen phục vụ của mình.",
        action: "Chọn một thay đổi nhỏ trong cách quan sát khách hàng mà bạn sẽ giữ lại tuần tới.",
      },
    ],
  },
  {
    number: 2,
    title: "Phục vụ vượt mong đợi",
    subtitle: "Biến sự quan tâm thành hành động",
    days: [
      {
        day: 8,
        title: "Khoảnh khắc WOW",
        description:
          "Tạo một điểm chạm đáng nhớ bằng sự tinh tế, không cần quà tặng hay chi phí lớn.",
        action: "Tạo một bất ngờ nhỏ, phù hợp với nhu cầu thật của một khách hàng hôm nay.",
      },
      {
        day: 9,
        title: "Dự đoán nhu cầu",
        description:
          "Chủ động chuẩn bị bước tiếp theo dựa trên hoàn cảnh và tín hiệu của khách hàng.",
        action: "Trước một lượt phục vụ, tự hỏi khách có thể cần gì tiếp theo và chuẩn bị sẵn một lựa chọn.",
      },
      {
        day: 10,
        title: "Xử lý phàn nàn kiểu Nhật",
        description:
          "Đón nhận phản hồi bằng bình tĩnh, trách nhiệm và một giải pháp rõ ràng.",
        action: "Thực hành 4 bước: lắng nghe, xin lỗi vì trải nghiệm, xác nhận vấn đề, thống nhất bước xử lý.",
      },
      {
        day: 11,
        title: "Ngôn ngữ tích cực",
        description:
          "Chuyển từ câu trả lời đóng sang cách diễn đạt giúp khách nhìn thấy hướng giải quyết.",
        action: "Viết lại một câu “không thể” thành câu nêu rõ điều bạn có thể làm cho khách.",
      },
      {
        day: 12,
        title: "Chi tiết tạo khác biệt",
        description:
          "Nhận ra những chi tiết nhỏ giúp hành trình của khách dễ dàng và dễ chịu hơn.",
        action: "Cải thiện một chi tiết trong không gian hoặc quy trình phục vụ mà khách thường xuyên gặp.",
      },
      {
        day: 13,
        title: "Thực hành tình huống",
        description:
          "Thử phản hồi các tình huống khó trong môi trường an toàn, có thời gian để rút kinh nghiệm.",
        action: "Đóng vai một tình huống căng thẳng và nhờ đồng nghiệp góp ý về giọng điệu, sự rõ ràng.",
      },
      {
        day: 14,
        title: "Checkpoint tuần 2",
        description:
          "Đánh giá cách bạn chuyển sự thấu hiểu thành hành động hữu ích.",
        action: "Chia sẻ một tình huống bạn đã xử lý tốt hơn và một điều bạn muốn thử khác đi.",
      },
    ],
  },
  {
    number: 3,
    title: "Biến thành thói quen",
    subtitle: "Duy trì bằng Kaizen mỗi ngày",
    days: [
      {
        day: 15,
        title: "Checklist Omotenashi",
        description:
          "Tạo một danh sách nhắc việc ngắn, phù hợp với vai trò và điểm chạm của bạn.",
        action: "Viết checklist 3 điều bạn có thể làm trước, trong và sau khi phục vụ khách.",
      },
      {
        day: 16,
        title: "Văn hóa chủ động",
        description:
          "Khuyến khích mỗi thành viên chủ động giải quyết vấn đề trong phạm vi trách nhiệm.",
        action: "Chọn một việc bạn thường chờ nhắc và chủ động hoàn thành trước khi kết thúc ngày.",
      },
      {
        day: 17,
        title: "Tư duy Kaizen",
        description:
          "Cải tiến liên tục bằng những thay đổi nhỏ, có thể thử ngay và cùng nhau học hỏi.",
        action: "Thử một cải tiến nhỏ trong quy trình, sau đó ghi lại điều gì đã tốt hơn.",
      },
      {
        day: 18,
        title: "Ghi nhận khách hàng trung thành",
        description:
          "Thể hiện sự trân trọng bằng cách ghi nhớ sở thích và lịch sử tương tác một cách phù hợp.",
        action: "Ghi nhận một sở thích khách đã chủ động chia sẻ để lần tương tác sau chu đáo hơn.",
      },
      {
        day: 19,
        title: "Đo lường NPS",
        description:
          "Hiểu NPS là gì và cách lắng nghe câu chuyện phía sau một điểm số.",
        action: "Đặt một câu hỏi ngắn về khả năng giới thiệu và hỏi thêm lý do đằng sau câu trả lời.",
      },
      {
        day: 20,
        title: "Cam kết cá nhân",
        description:
          "Chọn một hành vi cụ thể để tiếp tục duy trì sau chương trình 21 ngày.",
        action: "Viết cam kết theo mẫu: “Mỗi ngày, tôi sẽ ___ để khách hàng ___.”",
      },
      {
        day: 21,
        title: "Chứng nhận hoàn thành",
        description:
          "Tổng kết hành trình, ghi nhận nỗ lực và xác định bước tiếp theo trong công việc.",
        action: "Chia sẻ một thay đổi bạn tự hào và một hành động Omotenashi bạn sẽ tiếp tục thực hiện.",
      },
    ],
  },
];
