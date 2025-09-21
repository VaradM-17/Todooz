package com.tms.todooz.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {

	@NotEmpty(message = "Name should not be empty.")
	@Size(min = 3, message = "Name should be at least 3 characters.")
	private String name;

	@NotEmpty(message = "Username should not be empty.")
	@Size(min = 3, message = "Name should be at least 3 characters.")
	private String username;

	@NotEmpty(message = "Email should not be empty or null.")
	@Email
	private String email;

	@NotEmpty(message = "Password should not be empty.")
	private String password;
}
