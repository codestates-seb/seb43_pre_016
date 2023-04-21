package com.codestates.preproject.User.dto;

import com.codestates.preproject.User.entity.User;
import com.codestates.preproject.answer.entity.Answer;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {

    private Long userId;

    private String user_name;

    private String email;

    private LocalDateTime modifiedAt;

    private LocalDateTime createdAt;

    private String createdBy;

    private List<Answer> answers;

//    private List<QuestionEntity> questions;

}
