package com.example.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.dtos.UserRequestDto;
import com.example.backend.dtos.UserResponseDto;
import com.example.backend.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@CrossOrigin("http://localhost:5173/")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping
	public ResponseEntity<UserResponseDto> register(@Valid @RequestBody UserRequestDto userRequestDto){
		
		UserResponseDto responseDto = userService.register(userRequestDto);
		
		return new ResponseEntity<UserResponseDto>(responseDto, HttpStatus.CREATED);
	}
	
}

