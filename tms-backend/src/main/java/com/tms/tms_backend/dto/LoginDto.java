package com.tms.tms_backend.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {
	
	@NotEmpty
	private String usernameOrEmail;
	
	@NotEmpty
	@Size(min = 8)
	private String password;
}
