package com.example;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
import com.example.User.UserType;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
	
	private String firstname;
	private String lastname;
	private String email;
	private String password;
	private String username;
	private Integer age;
	private Boolean terms;
	private UserType type;

}
