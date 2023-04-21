package com.codestates.preproject.User.mapper;

import com.codestates.preproject.User.dto.UserDto;
import com.codestates.preproject.User.dto.UserResponseDto;
import com.codestates.preproject.User.entity.User;
import com.codestates.preproject.answer.entity.Answer;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-22T00:48:29+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.16.1 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User userPostDtoToUser(UserDto.Post requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        User user = new User();

        user.setUser_name( requestBody.getUser_name() );
        user.setEmail( requestBody.getEmail() );
        user.setPassword( requestBody.getPassword() );

        return user;
    }

    @Override
    public User userPatchDtoToUser(UserDto.Patch requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        User user = new User();

        user.setUserId( requestBody.getUserId() );
        user.setUser_name( requestBody.getUser_name() );
        user.setEmail( requestBody.getEmail() );
        user.setPassword( requestBody.getPassword() );

        return user;
    }

    @Override
    public UserResponseDto userToUserResponseDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponseDto.UserResponseDtoBuilder userResponseDto = UserResponseDto.builder();

        userResponseDto.userId( user.getUserId() );
        userResponseDto.user_name( user.getUser_name() );
        userResponseDto.email( user.getEmail() );
        userResponseDto.modifiedAt( user.getModifiedAt() );
        userResponseDto.createdAt( user.getCreatedAt() );
        userResponseDto.createdBy( user.getCreatedBy() );
        List<Answer> list = user.getAnswers();
        if ( list != null ) {
            userResponseDto.answers( new ArrayList<Answer>( list ) );
        }

        return userResponseDto.build();
    }

    @Override
    public List<UserDto.Response> usersToUserResponseDtos(List<User> users) {
        if ( users == null ) {
            return null;
        }

        List<UserDto.Response> list = new ArrayList<UserDto.Response>( users.size() );
        for ( User user : users ) {
            list.add( userToResponse( user ) );
        }

        return list;
    }

    protected UserDto.Response userToResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto.Response response = new UserDto.Response();

        response.setUserId( user.getUserId() );
        response.setUser_name( user.getUser_name() );
        response.setEmail( user.getEmail() );
        response.setModifiedAt( user.getModifiedAt() );
        response.setCreatedAt( user.getCreatedAt() );
        response.setCreatedBy( user.getCreatedBy() );

        return response;
    }
}
