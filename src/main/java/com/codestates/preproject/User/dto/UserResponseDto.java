package com.codestates.preproject.User.dto;

import com.codestates.preproject.User.entity.User;
import lombok.*;

import java.time.LocalDateTime;


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

    private LocalDateTime modifiedAt;

    private LocalDateTime createdAt;

    private String createdBy;

}
