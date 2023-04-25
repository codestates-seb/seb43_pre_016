package com.codestates.preproject.question.dto;

import com.codestates.preproject.answer.dto.AnswerDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class QuestionResponseDto {

    private Long questionId;

    private String title;

    private String body;//프런트쪽에선 content라고 명시했는데, 바꿔야할지 고민중

    private String bodyDetail;

    private Long userId;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;
    //private int score;
    //private int viewCount;

    private String createdBy;//UserName대신 작성한걸로 이해중, 나중에 조율헤서 수정할것

    private String UserName;
    private String UserEmail;
    private List<AnswerDto.Response> answers;

    private int likeCount;
    //private List<String> tags;
    //private Integer view
}
