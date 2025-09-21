package com.tms.todooz.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tms.todooz.dto.PostResponse;
import com.tms.todooz.dto.TodoDto;
import com.tms.todooz.service.TodoService;
import com.tms.todooz.utils.AppConstants;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RequestMapping("/api/todos")
@RestController
@AllArgsConstructor
public class TodoController {

	private TodoService todoService;

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/todo")
	public ResponseEntity<TodoDto> create(@Valid @RequestBody TodoDto todoDto) {
		TodoDto todo = todoService.create(todoDto);
		return new ResponseEntity<TodoDto>(todo, HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<TodoDto> getTodoById(@PathVariable Long id) {
		TodoDto todo = todoService.getTodoById(id);
		return ResponseEntity.ok(todo);
	}

	@GetMapping
	public ResponseEntity<PostResponse> getAllTodos(
			@RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
			@RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
			@RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIR, required = false) String sortDir) {

		PostResponse todos = todoService.getAllTodos(pageNo, pageSize, sortBy, sortDir);

		return ResponseEntity.ok(todos);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<TodoDto> updateTodo(@PathVariable Long id, @Valid @RequestBody TodoDto todoDto) {
		TodoDto updateTodo = todoService.updateTodo(id, todoDto);
		return ResponseEntity.ok(updateTodo);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteTodo(@PathVariable Long id) {
		todoService.deleteTodo(id);
		return ResponseEntity.ok("Todo deleted successfully");
	}

	@PatchMapping("/complete/{id}")
	public ResponseEntity<TodoDto> completeTodo(@PathVariable Long id) {
		TodoDto complete = todoService.completeTodo(id);
		return ResponseEntity.ok(complete);
	}

	@PatchMapping("/incomplete/{id}")
	public ResponseEntity<TodoDto> inCompleteTodo(@PathVariable Long id) {
		TodoDto inComplete = todoService.inCompleteTodo(id);
		return ResponseEntity.ok(inComplete);
	}
}
