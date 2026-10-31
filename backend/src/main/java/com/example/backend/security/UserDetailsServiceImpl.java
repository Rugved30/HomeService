package com.example.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.example.backend.entities.User;
import com.example.backend.exceptions.EmailNotFoundException;
import com.example.backend.repositories.UserRepository;


@Component
public class UserDetailsServiceImpl  implements UserDetailsService{
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		User user = userRepository.findByEmail(email)
		.orElseThrow(()->new EmailNotFoundException("User with given email not found"));	
		
		return user;
	}

}
