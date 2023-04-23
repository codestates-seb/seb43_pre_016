package com.codestates.preproject.user.controller;

import com.codestates.preproject.user.dto.UserDto;
import com.codestates.preproject.user.entity.User;
import com.codestates.preproject.user.mapper.UserMapper;
import com.codestates.preproject.user.service.UserService;
import com.codestates.preproject.response.MultiResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@CrossOrigin // (origins= "")
@RestController
@RequestMapping("/users")
@Validated
@Slf4j
public class UserController {

    private final UserService userService;
    private final UserMapper mapper;
;
    public UserController(UserService userService, UserMapper mapper) {
        this.userService = userService;
        this.mapper = mapper;
    }

    //회원생성
    @PostMapping
    public ResponseEntity postUser(@Valid @RequestBody UserDto.Post requestBody) {
        User user = mapper.userPostDtoToUser(requestBody);
        User createdUser = userService.createUser(user);

        return new ResponseEntity<>(mapper.userToUserResponseDto(createdUser), HttpStatus.CREATED);
    }

    //회원수정
    @PatchMapping("/{user-id}")
    public ResponseEntity patchUser(@PathVariable("user-id") @Positive Long userId,
                                    @Valid @RequestBody UserDto.Patch requestBody){
        requestBody.setUserId(userId);
        User user = userService.updateUser(mapper.userPatchDtoToUser(requestBody));

        return new ResponseEntity<>(mapper.userToUserResponseDto(user),HttpStatus.OK);
    }

    //회원검색
//    @GetMapping("/{user-id}")
//    public ResponseEntity getUser(@PathVariable("user-id") @Positive Long userId){
//        User user = userService.findUser(userId);
//        return new ResponseEntity<>(mapper.userToUserResponseDto(user),HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity getUsers(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size){
        Page<User> pageUsers = userService.findUsers(page -1,size);
        List<User> users = pageUsers.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.usersToUserResponseDtos(users),pageUsers),HttpStatus.OK);
    }

    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteUser(@PathVariable("user-id") @Positive Long userId){
        userService.deleteUser(userId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity deleteAll(){
        userService.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    //    @GetMapping("/{userId}/answers")
    //    public List<Answer> getUserAnswers(@PathVariable Long userId){
    //        return userService.getUserAnswers(userId);
    //    }
//
//    @GetMapping("/{userId}/questions")
//    public List<QuestionEntity> getUserQuestions(@PathVariable Long userId){
//        return userService.getUserQuestions(userId);
//    }
//    @GetMapping("/{userid}/answers")
//    public List<Answer> getUserAnswers(@PathVariable("userid") Long userId){
//        System.out.println("컨트롤러의 겟유저엔써!!!!!!");
//        return userService.getUserAnswers(userId);
//    }

    @GetMapping("/{user-id}")
    public ResponseEntity getUser(@PathVariable("user-id") long userId){
        User dbUser = userService.findUser(userId);

        return new ResponseEntity(mapper.userToUserMyPageDto(dbUser),HttpStatus.OK);
    }

}
