package com.example.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entities.User;


public interface UserRepository extends JpaRepository<User, String> {
	
	Optional<User> findByEmail(String email);
	
}	
