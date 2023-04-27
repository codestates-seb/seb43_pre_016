package com.codestates.preproject.exception;

import lombok.Getter;

public enum ExceptionCode {
    USER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    USER_EXISTS(409, "회원이 이미 존재합니다."),
    QUESTION_NOT_FOUND(404, "질문못찾아 돌아가!"),
    ANSWER_NOT_FOUND(404,"답변을 찾을 수 없습니다."),
    METHOD_NOT_ALLOWED(405,"cannat be changed");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
