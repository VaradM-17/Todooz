package com.tms.todooz.service;

import com.tms.todooz.dto.PostResponse;
import com.tms.todooz.dto.TodoDto;

public interface TodoService {

	TodoDto create(TodoDto todoDto);

	TodoDto getTodoById(Long id);

	PostResponse getAllTodos(int pageNo, int pageSize, String sortBy, String sortDir);

	TodoDto updateTodo(Long id, TodoDto todoDto);

	void deleteTodo(Long id);

	TodoDto completeTodo(Long id);

	TodoDto inCompleteTodo(Long id);
}
