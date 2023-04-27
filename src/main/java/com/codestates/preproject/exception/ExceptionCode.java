package com.codestates.preproject.exception;

import lombok.Getter;

public enum ExceptionCode {
    USER_NOT_FOUND(404, "user not found"),
    USER_EXISTS(409, "User exists"),

    QUESTION_NOT_FOUND(404,"question not found"),
    ANSWER_NOT_FOUND(404,"answer not found"),
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
