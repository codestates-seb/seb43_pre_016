package com.codestates.preproject.user.dto;

import com.codestates.preproject.answer.dto.AnswerDto;
import com.codestates.preproject.answer.like.AnswerLikeDto;
import com.codestates.preproject.question.dto.QuestionMyPageDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class UserDto {
    @Setter
    @Getter
    @NoArgsConstructor
    public static class Post{

        @NotBlank
        @Email
        private String email;

        @NotBlank(message = "이름은 공백이 아니어야 합니다.")
        private String userName;

        @NotBlank//패스워드 유효성검증
        private String password;

        //패스워드 입려확인필드 추가로존재하는게 좋다 두 패스워드가 일치하는지 검증하는 로직까지/
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {
        private long userId;

        private String userName;

        @Email
        private String email;

        private String password;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response {
        private Long userId;
        private String userName;
        private String email;
        private LocalDateTime modifiedAt;
        private LocalDateTime createdAt;
        private String createdBy;
    }

    //22일 수정
    @Getter
    @Setter
    public static class MyPage{
        private long userId;
        private String email;
        private String userName;
        private List<QuestionMyPageDto> questions;
        private List<AnswerDto.MyPageDto> answers;
        private List<AnswerLikeDto> answerLikes;
        private LocalDateTime createdAt;
    }

}
