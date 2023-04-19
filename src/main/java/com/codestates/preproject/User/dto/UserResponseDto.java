package com.codestates.preproject.User.dto;

import com.codestates.preproject.User.entity.User;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponseDto {

    private Long id;
    private Long userId;
    private String user_name;
    private String email;

    public static UserResponseDto of(User user){
        return UserResponseDto.builder()
                .id(user.getId())
                .userId(user.getUserId())
                .user_name(user.getUser_name())
                .email(user.getEmail())
                .build();
    }
}
