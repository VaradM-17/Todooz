package com.tms.todooz.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostResponse {
	private List<TodoDto> content;
	private int pageNo;
	private int pageSize;
	private Long totalElements;
	private int totalPages;
	private Boolean lastPage;
}
