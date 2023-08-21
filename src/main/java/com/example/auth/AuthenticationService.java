package main;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	private final userRepository repository;
	private final JwtService jwtService;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	
	public AuthenticationResponse register(RegisterRequest request) {
		var user = User.builder()
				.firstname(request.getFirstname)
				.lastname(request.getLastname)
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.type(request.getType())
				.role(Role.USER)
				.build();
		var jwtToken = jwtService.generateToken(User);
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.Username(),
						request.getPassword()
						);
			)
		var user = repository.findByUsername(request.getUsername())
		.orElseThrow();
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}

}
