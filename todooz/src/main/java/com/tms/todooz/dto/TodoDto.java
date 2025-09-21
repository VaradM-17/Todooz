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
public class TodoDto {
	private Long id;
	@NotEmpty(message = "title should not be empty.")
	@Size(min = 3, max = 25, message = "title should be at least 3 to 20 characters")
	private String title;
	
	@NotEmpty(message = "description should not be empty.")
	@Size(min = 3, message = "title should be at least 3 or above characters")
	private String description;
	
	private Boolean status;
}
