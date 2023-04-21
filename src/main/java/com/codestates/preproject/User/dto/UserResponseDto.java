package com.codestates.preproject.User.dto;

import lombok.*;

import java.time.LocalDateTime;


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

}
