package com.codestates.preproject.question.like;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QuestionLikeDto {
    private long questionId;
    private boolean isLiked;

}
