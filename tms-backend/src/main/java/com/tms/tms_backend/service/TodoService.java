package com.tms.tms_backend.service;

import java.util.List;

import com.tms.tms_backend.dto.TodoDto;

public interface TodoService {

	TodoDto addTodo(TodoDto todoDto);

	TodoDto getTodo(Long id);

	List<TodoDto> getAllTodos();

	TodoDto updateTodo(Long id, TodoDto todoDto);
	
	void deleteTodo(Long id);
	
	TodoDto completeTodo(Long id);
}
