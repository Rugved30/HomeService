package com.example.backend.services;

import com.example.backend.dtos.UserRequestDto;
import com.example.backend.dtos.UserResponseDto;

public interface UserService {
	
	UserResponseDto register(UserRequestDto userRequestDto);
	
}
