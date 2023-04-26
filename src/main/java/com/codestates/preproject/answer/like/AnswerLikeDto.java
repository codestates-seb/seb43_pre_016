package com.codestates.preproject.answer.like;

import com.codestates.preproject.answer.entity.Answer;
import com.codestates.preproject.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AnswerLikeDto {

    private long answerId;
    private boolean isLiked;

}
