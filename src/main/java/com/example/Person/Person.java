package com.example.Person;

import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class Person {
	@Id
	@SequenceGenerator(name = "person_id_sequence",sequenceName = "person_id_sequence")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "person_id_ sequence")
	Integer _id;
	String name;
	String email;
	Integer age;
	public Person(Integer _id, String name, String email, Integer age) {
		super();
		this._id = _id;
		this.name = name;
		this.email = email;
		this.age = age;
	}
	public Person() {
		// TODO Auto-generated constructor stub
	}
	public int get_id() {
		return _id;
	}
	public void set_id(int _id) {
		this._id = _id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@Override
	public int hashCode() {
		return Objects.hash(_id, name);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Person other = (Person) obj;
		return _id == other._id && Objects.equals(name, other.name);
	}
	@Override
	public String toString() {
		return "Person {_id=" + _id + ", name=" + name + "}";
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
	
	
	
}
