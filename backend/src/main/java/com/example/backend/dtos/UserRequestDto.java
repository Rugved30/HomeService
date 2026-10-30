package com.example.backend.dtos;

import com.example.backend.validators.PasswordMatch;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@PasswordMatch
public class UserRequestDto {
	
	@NotNull
	@NotBlank
	@Size(min=2, max=25)
	private String fullName;
	
	@NotNull
	@NotBlank
	private String phoneNumber;
	
	@Pattern(regexp = "^((?!\\.)[\\w\\-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])$")
	private String email;
	
	@Pattern(regexp = "^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{6,})\\S$")
	private String password;
	
	private String confirmPassword;
	
}