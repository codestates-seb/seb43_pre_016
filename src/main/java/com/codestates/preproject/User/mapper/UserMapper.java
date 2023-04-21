package com.codestates.preproject.User.mapper;


import com.codestates.preproject.User.dto.UserDto;
import com.codestates.preproject.User.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User userPostDtoToUser(UserDto.Post requestBody);

    User userPatchDtoToUser(UserDto.Patch requestBody);

    UserDto.Response userToUserResponseDto(User user);

    List<UserDto.Response> usersToUserResponseDtos(List<User> users);

}
