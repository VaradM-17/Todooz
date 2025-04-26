package com.tms.tms_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tms.tms_backend.dto.TodoDto;
import com.tms.tms_backend.service.TodoService;

import lombok.AllArgsConstructor;

@CrossOrigin("*")
@RequestMapping("/todos")
@AllArgsConstructor
@RestController
public class TodoController {

	private TodoService todoService;

	@PostMapping("/addTodo")
	public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto) {
		TodoDto savedTodo = todoService.addTodo(todoDto);
		return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
	}

	@GetMapping("/get-todo/{id}")
	public ResponseEntity<TodoDto> getTodo(@PathVariable("id") Long id) {
		TodoDto todoDto = todoService.getTodo(id);
		return new ResponseEntity<>(todoDto, HttpStatus.OK);
	}

	@GetMapping("/getAllTodos")
	public ResponseEntity<List<TodoDto>> getAllTodos() {
		List<TodoDto> todos = todoService.getAllTodos();
		return ResponseEntity.ok(todos);
	}

	@PutMapping("/updateTodo/{id}")
	public ResponseEntity<TodoDto> updateTodo(@PathVariable("id") Long id, @RequestBody TodoDto todoDto) {
		TodoDto updatedTodo = todoService.updateTodo(id, todoDto);
		return ResponseEntity.ok(updatedTodo);
	}

	@DeleteMapping("/deleteTodo/{id}")
	public ResponseEntity<String> deleteTodo(@PathVariable("id") Long id) {
		todoService.deleteTodo(id);
		return ResponseEntity.ok("Todo deleted...");
	}

	@PatchMapping("/completeTodo/{id}")
	public ResponseEntity<TodoDto> completeTodo(@PathVariable("id") Long id) {
		TodoDto completeTodo = todoService.completeTodo(id);
		return ResponseEntity.ok(completeTodo);
	}

	@PatchMapping("/incompleteTodo/{id}")
	public ResponseEntity<TodoDto> incompleteTodo(@PathVariable("id") Long id) {
		TodoDto incompleteTodo = todoService.incompleteTodo(id);
		return ResponseEntity.ok(incompleteTodo);
	}
}
