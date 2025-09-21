package com.tms.todooz.dto;

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
public class LoginDto {

	@NotEmpty(message = "Username or Email should not be empty.")
	private String usernameOrEmail;

	@NotEmpty(message = "Password should not be empty.")
	private String password;
}
