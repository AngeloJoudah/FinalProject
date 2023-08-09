package com.example.User;

import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Users {
	@Id
	@SequenceGenerator(name = "user_id_sequence",sequenceName = "user_id_sequence")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_sequence")
    @Column(nullable = false)
	Integer _id;
    @Column(nullable = false)
	String email;
    @Column(nullable = false)
	Integer age;
    @Column(nullable = false)
	String username;
    @Column(nullable = false)
    String name;
    @Column(nullable = false)
    String lastName;
    @Column(nullable = false)
    Boolean terms;
    public Users() {
    	
    }
    public Users(Integer _id, String email, Integer age, String username, String name, String lastName, String password,
			UserType type) {
		super();
		this._id = _id;
		this.email = email;
		this.age = age;
		this.username = username;
		this.name = name;
		this.lastName = lastName;
		this.password = password;
		this.type = type;
	}
	@Column(nullable = false)
	String password;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
	UserType type;

	public int get_id() {
		return _id;
	}
	public void set_id(int _id) {
		this._id = _id;
	}
	@Override
	public int hashCode() {
		return Objects.hash(_id, username);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Users other = (Users) obj;
		return _id == other._id && Objects.equals(_id, other._id);
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	public void set_id(Integer _id) {
		this._id = _id;
	}
	@Override
	public String toString() {
		return "Users {_id=" + _id + ", email=" + email + ", age=" + age + ", username=" + username + ", name=" + name
				+ ", lastName=" + lastName + ", password=" + password + ", type=" + type + ", " + terms +  "}";
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public UserType getType() {
		return type;
	}
	public void setType(UserType type) {
		this.type = type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public Boolean getTerms() {
		return terms;
	}
	public void setTerms(Boolean terms) {
		this.terms = terms;
	}
	
	
	
}
