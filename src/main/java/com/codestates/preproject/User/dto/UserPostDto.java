package com.codestates.preproject.User.dto;

import jdk.jfr.StackTrace;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserPostDto {

    private Long userId;

    @NotBlank
    @Email
    private String email;

    @NotBlank(message = "name should not be blank.")
    private String user_name;

    @NotBlank(message = "Password name should not be blank.")
    private String password;
}
