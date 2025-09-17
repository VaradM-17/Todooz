package com.tms.tms_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {

	@NotEmpty
	private String name;
	
	@NotEmpty
	private String username;
	
	@Email
	private String email;
	
	@NotEmpty
	@Size(min = 8)
	private String password;
}
