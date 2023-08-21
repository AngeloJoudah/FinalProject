package main;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import com.example.User.UserRepository;

@Configuration

public class ApplicationConfig {

	private final UserRepository repository;
	
	public ApplicationConfig() {
		
	}
	@Bean
	public UserDetailsService userDetailsService() {
		return username -> repository.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}
	
}
