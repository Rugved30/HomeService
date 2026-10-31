package com.example.backend.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.dtos.UserRequestDto;
import com.example.backend.dtos.UserResponseDto;
import com.example.backend.entities.User;
import com.example.backend.enums.Role;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserResponseDto register(UserRequestDto userRequestDto) {
		
		//dto to entity conversion
		User user = modelMapper.map(userRequestDto, User.class);
		
		user.setRole(Role.ROLE_USER);
		
		String encodePassword = passwordEncoder.encode(user.getPassword());
		
		user.setPassword(encodePassword);
		
		User savedUser = userRepository.save(user);
		
		UserResponseDto savedDto = modelMapper.map(savedUser, UserResponseDto.class);
		
		return savedDto;
	}
	
}