package com.tms.tms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tms.tms_backend.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long>{

}
