package com.codestates.preproject.User.mapper;


import com.codestates.preproject.User.dto.UserPatchDto;
import com.codestates.preproject.User.dto.UserPostDto;
import com.codestates.preproject.User.dto.UserResponseDto;
import com.codestates.preproject.User.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User userPostDtoToUser(UserPostDto userPostDto);

    User userPatchDtoToUser(UserPatchDto userPatchDto);

    UserResponseDto userToUserResponseDto(User user);

    List<UserResponseDto> usersToUserResponseDtos(List<User> users);

    void updateUserFromDto(UserPatchDto userPatchDto, @MappingTarget User user);



}
