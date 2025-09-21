package com.tms.todooz.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@ResponseStatus
public class TodoAPIException extends RuntimeException {
	private HttpStatus status;
	private String message;
}
