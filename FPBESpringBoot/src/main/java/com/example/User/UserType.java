package com.example.User;

public enum UserType {
	TEACHER("Teacher"),LEGALGUARDIAN("Legal_Guardian"),PARENT("Parent");

    private final String type;


    public String getType() {
        return type;
    }
	UserType(String type) {
		this.type = type;
	}
}
