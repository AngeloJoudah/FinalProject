package com.example.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Integer>{
	Optional<Users> findByNameAndLastName(String name, String lastName);
	Optional<Users> findByUsername(String username);
	Optional<Users> findByEmail(String email);
	Optional<Users> findByUsernameAndPassword(String username, String password);
}
