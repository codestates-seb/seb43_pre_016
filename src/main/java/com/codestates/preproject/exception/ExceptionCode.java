package com.codestates.preproject.exception;

import lombok.Getter;

public enum ExceptionCode {  //예외코드, message

    //USER
    USER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    USER_EXISTS(409, "회원이 이미 존재합니다."),


    //QUESTION
    QUESTION_NOT_FOUND(404, "테스트 질문못찾아 돌아가."),
//    QUESTION_EXISTS(490, "존재하는 질문입니다.")

    //ANSWER
    ANSWER_NOT_FOUND(404,"답변을 찾을 수 없습니다.");




    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
