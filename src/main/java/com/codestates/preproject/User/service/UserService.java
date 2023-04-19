package com.codestates.preproject.User.service;

import com.codestates.preproject.User.dto.UserPatchDto;
import com.codestates.preproject.User.dto.UserPostDto;
import com.codestates.preproject.User.dto.UserResponseDto;
import com.codestates.preproject.User.entity.User;
import com.codestates.preproject.User.mapper.UserMapper;
import com.codestates.preproject.User.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper mapper;

    public UserService(UserRepository userRepository, UserMapper mapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
    }

    public UserResponseDto createUser(UserPostDto userPostDto) {
        User user = mapper.userPostDtoToUser(userPostDto);
        User savedUser = userRepository.save(user);
        return mapper.userToUserResponseDto(savedUser);
    }

    public List<UserResponseDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        return mapper.usersToUserResponseDtos(users);
    }

    public UserResponseDto findUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
        return mapper.userToUserResponseDto(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public UserResponseDto updateUser(Long id, UserPatchDto userPatchDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
        mapper.updateUserFromDto(userPatchDto, user);
        User updatedUser = userRepository.save(user);
        return mapper.userToUserResponseDto(updatedUser);
    }

}
