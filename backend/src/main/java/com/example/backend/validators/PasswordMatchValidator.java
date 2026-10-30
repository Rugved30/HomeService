package com.example.backend.validators;

import com.example.backend.dtos.UserRequestDto;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchValidator implements ConstraintValidator<PasswordMatch, UserRequestDto> {

	@Override
	public boolean isValid(UserRequestDto value, ConstraintValidatorContext context) {
		
		return value.getPassword().equals(value.getConfirmPassword());
	}
	
	

}
