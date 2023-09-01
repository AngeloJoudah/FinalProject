package com.example.User;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")

public class UserController {

	private final UserRepository userRepository;
	private final AuthenticationService service;
	
	public UserController(UserRepository personRepository) {
		this.userRepository = personRepository;
	}
	
	
	@GetMapping
	public ResponseEntity<List<Users>> getPeople(@RequestParam(required = false) String email, @RequestParam(required = false) String username)
		{
		if(email != null) {
			List<Users> ls = new ArrayList<Users>(1);
			ls.add(userRepository.findByEmail(email).orElse(null));
			return ResponseEntity.ok(ls);
		}
		else if(username != null) {
			List<Users> ls = new ArrayList<Users>(1);
			ls.add(userRepository.findByUsername(username).orElse(null));
			return ResponseEntity.ok(ls);
		}
		return ResponseEntity.ok(userRepository.findAll());

	}
	@GetMapping("/credentials")
	public ResponseEntity<Users> getCredentials(@RequestParam(required = true) String username, @RequestParam(required = true) String password){
		return ResponseEntity.ok(userRepository.findByUsernameAndPassword(username,password).orElse(null));
	}

	
	
	@PostMapping("/register")
	 public ResponseEntity<AuthenticationResponse> register(@RequestBody Users newUser) {
        try {
            userRepository.save(newUser);
            return ResponseEntity.ok(service.register(request));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add person.");
            }
        }
	
	@PostMapping("/authentication")
	public ResponseEntity<AuthenticationResponse>(@RequestBody AuthenticationRequest request){
		
	}
	
	@DeleteMapping("{id}")
	public void deletePerson(@PathVariable("id") Integer id) {
		userRepository.deleteById(id);
	}
	
	
	
}
