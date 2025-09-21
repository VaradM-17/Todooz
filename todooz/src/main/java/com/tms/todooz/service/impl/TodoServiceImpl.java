package com.tms.todooz.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.tms.todooz.dto.PostResponse;
import com.tms.todooz.dto.TodoDto;
import com.tms.todooz.entity.Todo;
import com.tms.todooz.exception.ResourceNotFoundException;
import com.tms.todooz.repository.TodoRepository;
import com.tms.todooz.service.TodoService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

	private ModelMapper modelMapper;
	private TodoRepository todoRepository;

	@Override
	public TodoDto create(TodoDto todoDto) {
		Todo addTodo = modelMapper.map(todoDto, Todo.class);
		Todo todo = todoRepository.save(addTodo);
		return modelMapper.map(todo, TodoDto.class);
	}

	@Override
	public TodoDto getTodoById(Long id) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo", "Id", id.toString()));
		return modelMapper.map(todo, TodoDto.class);
	}

	@Override
	public PostResponse getAllTodos(int pageNo, int pageSize, String sortBy, String sortDir) {

		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
				: Sort.by(sortBy).descending();

		Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

		Page<Todo> todos = todoRepository.findAll(pageable);

		List<TodoDto> content = todos.stream().map(todo -> modelMapper.map(todo, TodoDto.class))
				.collect(Collectors.toList());

		PostResponse postResponse = new PostResponse();
		postResponse.setContent(content);
		postResponse.setPageNo(todos.getNumber());
		postResponse.setPageSize(todos.getSize());
		postResponse.setTotalElements(todos.getTotalElements());
		postResponse.setTotalPages(todos.getTotalPages());
		postResponse.setLastPage(todos.isLast());

		return postResponse;
	}

	@Override
	public TodoDto updateTodo(Long id, TodoDto todoDto) {

		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo", "Id", id.toString()));

		todo.setTitle(todoDto.getTitle());
		todo.setDescription(todoDto.getDescription());
		todo.setStatus(Boolean.FALSE);

		Todo updateTodo = todoRepository.save(todo);

		return modelMapper.map(updateTodo, TodoDto.class);
	}

	@Override
	public void deleteTodo(Long id) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo", "Id", id.toString()));
		todoRepository.deleteById(id);
	}

	@Override
	public TodoDto completeTodo(Long id) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo", "Id", id.toString()));
		todo.setStatus(Boolean.TRUE);

		Todo complete = todoRepository.save(todo);
		return modelMapper.map(complete, TodoDto.class);
	}

	@Override
	public TodoDto inCompleteTodo(Long id) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo", "Id", id.toString()));
		todo.setStatus(Boolean.FALSE);

		Todo inComplete = todoRepository.save(todo);
		return modelMapper.map(inComplete, TodoDto.class);
	}
}
