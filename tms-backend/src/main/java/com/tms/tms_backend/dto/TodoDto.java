package com.tms.tms_backend.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TodoDto {
	private Long id;
	@NotEmpty
	@Size(min = 5, message = "Title should not be empty and should be minimum 5 characters.")
	private String title;

	@NotEmpty(message = "Description should not be empty.")
	private String description;
	private Boolean completed;
}
