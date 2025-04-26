package com.tms.tms_backend.service.lmpl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.tms.tms_backend.dto.TodoDto;
import com.tms.tms_backend.entity.Todo;
import com.tms.tms_backend.exception.ResourceNotFoundException;
import com.tms.tms_backend.repository.TodoRepository;
import com.tms.tms_backend.service.TodoService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class TodoServiceImpl implements TodoService {

	private TodoRepository todoRepository;
	private ModelMapper modelMapper;

	// add
	@Override
	public TodoDto addTodo(TodoDto todoDto) {

		Todo todo = modelMapper.map(todoDto, Todo.class); // dto to entity

		Todo savedTodo = todoRepository.save(todo); // save entity

		TodoDto savedTodoDto = modelMapper.map(savedTodo, TodoDto.class); // entity to dto

		return savedTodoDto;
	}

	// get by id
	@Override
	public TodoDto getTodo(Long id) {

		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo not found by id :" + id));

		return modelMapper.map(todo, TodoDto.class);
	}

	// get All
	@Override
	public List<TodoDto> getAllTodos() {
		List<Todo> todos = todoRepository.findAll();
		return todos.stream().map((todo) -> modelMapper.map(todo, TodoDto.class)).collect(Collectors.toList());
	}

	// update
	@Override
	public TodoDto updateTodo(Long id, TodoDto todoDto) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo not found by id :" + id));

		todo.setTitle(todoDto.getTitle());
		todo.setDescription(todoDto.getDescription());
		todo.setCompleted(todoDto.isCompleted());

		Todo updatedTodo = todoRepository.save(todo);
		return modelMapper.map(updatedTodo, TodoDto.class);
	}

	// delete
	@Override
	public void deleteTodo(Long id) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo not found by id :" + id));

		todoRepository.deleteById(id);
	}

	// completed
	@Override
	public TodoDto completeTodo(Long id) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo not found by id :" + id));

		todo.setCompleted(Boolean.TRUE);

		Todo updatedTodo = todoRepository.save(todo);

		return modelMapper.map(updatedTodo, TodoDto.class);
	}

	// incomplete
	@Override
	public TodoDto incompleteTodo(Long id) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo not found by id :" + id));

		todo.setCompleted(Boolean.FALSE);

		Todo updatedTodo = todoRepository.save(todo);

		return modelMapper.map(updatedTodo, TodoDto.class);
	}

}
