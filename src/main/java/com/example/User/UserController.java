package com.example.User;

import java.util.ArrayList;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.RegisterRequest;
import com.example.auth.AuthenticationRequest;
import com.example.auth.AuthenticationResponse;
import com.example.auth.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor

public class UserController {

	private UserRepository userRepository;
	private AuthenticationService service;

	
	
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
	 public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
            return ResponseEntity.ok(service.register(request));   
        }
	
	@PostMapping("/authentication")
	public ResponseEntity<AuthenticationResponse> Authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(service.authenticate(request));   
	}
	
	@DeleteMapping("{id}")
	public void deletePerson(@PathVariable("id") Integer id) {
		userRepository.deleteById(id);
	}
	
	
	
}
