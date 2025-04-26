package com.tms.tms_backend.service;

import java.util.List;

import com.tms.tms_backend.dto.TodoDto;

public interface TodoService {

	// create
	TodoDto addTodo(TodoDto todoDto);

	// get by id
	TodoDto getTodo(Long id);

	// get all
	List<TodoDto> getAllTodos();

	// update
	TodoDto updateTodo(Long id, TodoDto todoDto);

	// delete
	void deleteTodo(Long id);

	// completed
	TodoDto completeTodo(Long id);

	// incomplete
	TodoDto incompleteTodo(Long id);
}
