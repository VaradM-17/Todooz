package com.tms.tms_backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tms.tms_backend.dto.LoginDto;
import com.tms.tms_backend.dto.RegisterDto;
import com.tms.tms_backend.service.AuthService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@CrossOrigin("http://localhost:3000/")
@RequestMapping("/api/auth")
@AllArgsConstructor
@RestController
public class AuthController {
	private AuthService authService;

	@PostMapping(value = { "/login", "/signin" })
	public ResponseEntity<String> login(@Valid @RequestBody LoginDto loginDto) {
		String response = authService.login(loginDto);
		return ResponseEntity.ok(response);
	}

	@PostMapping(value = { "/register", "/signup" })
	public ResponseEntity<String> register(@Valid @RequestBody RegisterDto registerDto) {
		String response = authService.register(registerDto);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

}
