package com.example.Person;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/people")
public class PersonController {

	private final PersonRepository personRepository;
	
	public PersonController(PersonRepository personRepository) {
		this.personRepository = personRepository;
	}
	
	
	@GetMapping("/")
	public Person getPerson(Person person) {
		return person;
	}
	
	@GetMapping
	public List<Person> getPeople(){
		return personRepository.findAll();
	}
	
	record PersonRequest(String name, String email, Integer age){
		
	}
	
	@PostMapping
	public void addPerson(PersonRequest person) {
		Person newperson = new Person();
		newperson.setAge(person.age());
		newperson.setEmail(person.email());
		newperson.setName(person.name());
		personRepository.save(newperson);
	}
	
	@DeleteMapping("{id}")
	public void deletePerson(@PathVariable("id") Integer id) {
		personRepository.deleteById(id);
	}
	
	
	
}
