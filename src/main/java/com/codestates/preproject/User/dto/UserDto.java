package com.codestates.preproject.User.dto;

import com.codestates.preproject.User.entity.User;
import jdk.jfr.StackTrace;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private Long id;
    private Long userId;
    private String user_name;
    private String email;
    private String password;

    public static UserDto of(User user) {
        return UserDto.builder()
                .id(user.getId())
                .userId(user.getUserId())
                .user_name(user.getUser_name())
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
    }




}
