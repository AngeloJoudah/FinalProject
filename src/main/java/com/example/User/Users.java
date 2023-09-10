package com.example.User;

import java.util.Collection;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_user")

public class Users implements UserDetails {
	@Id
	@SequenceGenerator(name = "user_id_sequence",sequenceName = "user_id_sequence")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_sequence")
    @Column(nullable = false)
	Integer _id;
    @Column(nullable = false, unique = true)
	String email;
    @Column(nullable = false)
	Integer age;
    @Column(nullable = false, unique = true)
	String username;
    @Column(nullable = false)
    String name;
    @Column(nullable = false)
    String lastName;
    @Column(nullable = false)
    Boolean terms;
	@Column(nullable = false)
	String password;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
	UserType type;
    
  
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return (List.of(new SimpleGrantedAuthority(type.name())));
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return true;
	}
	@Override
	public String getPassword() {
		return this.password;
	}
	@Override
	public String getUsername() {
		return this.username;
	}
	
	
	
}
