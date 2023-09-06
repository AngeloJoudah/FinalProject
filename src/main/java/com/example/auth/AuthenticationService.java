package com.example.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.RegisterRequest;

import lombok.RequiredArgsConstructor;
import com.example.User.UserRepository;
import com.example.User.Users;
import com.example.config.JwtService;
@Service
@RequiredArgsConstructor

public class AuthenticationService {
	
	private final UserRepository repository;
	private final JwtService jwtService;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	
	public AuthenticationResponse register(RegisterRequest request) {
		Users user = Users.builder()
				.username(request.getUsername())
				.name(request.getFirstname())
				.lastName(request.getLastname())
				.email(request.getEmail())
				.age(request.getAge())
				.terms(request.getTerms())
				.password(passwordEncoder.encode(request.getPassword()))
				.type(request.getType())
				.build();
		repository.save(user);
		String jwtToken = jwtService.generateToken((Users)user);
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}
	
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
				request.getUsername(),
				request.getPassword()
				);
		authenticationManager.authenticate(token);
		var user = repository.findByUsername(request.getUsername())
		.orElseThrow();
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}

}
