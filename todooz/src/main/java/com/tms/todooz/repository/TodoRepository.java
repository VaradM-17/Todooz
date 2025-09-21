package com.tms.todooz.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tms.todooz.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
