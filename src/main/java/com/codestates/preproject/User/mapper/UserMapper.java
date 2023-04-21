package com.codestates.preproject.User.mapper;


import com.codestates.preproject.User.dto.UserDto;
import com.codestates.preproject.User.dto.UserPatchDto;
import com.codestates.preproject.User.dto.UserPostDto;
import com.codestates.preproject.User.dto.UserResponseDto;
import com.codestates.preproject.User.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User userPostDtoToUser(UserDto.Post requestBody);

    User userPatchDtoToUser(UserDto.Patch requestBody);

    UserResponseDto userToUserResponseDto(User user);

    List<UserDto.Response> usersToUserResponseDtos(List<User> users);

}
