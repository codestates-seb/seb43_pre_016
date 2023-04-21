package com.codestates.preproject.User.controller;

import com.codestates.preproject.User.dto.UserPatchDto;
import com.codestates.preproject.User.dto.UserPostDto;
import com.codestates.preproject.User.dto.UserResponseDto;
import com.codestates.preproject.User.mapper.UserMapper;
import com.codestates.preproject.User.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin // (origins= "")
@RestController
@RequestMapping("/users")
@Validated
@Slf4j
public class UserController {
//
    private final UserService userService;
    private final UserMapper mapper;
;
    public UserController(UserService userService, UserMapper mapper) {
        this.userService = userService;
        this.mapper = mapper;
    }

    //회원가입
    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@RequestBody @Valid UserPostDto userPostDto) {
        UserResponseDto createdUser = userService.createUser(userPostDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userid}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
        UserResponseDto user = userService.findUserById(id);
        return ResponseEntity.ok(user);
    }

    @PatchMapping("/{userid}")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Long id, @RequestBody @Valid UserPatchDto userPatchDto) {
        UserResponseDto updatedUser = userService.updateUser(id, userPatchDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{userid}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
