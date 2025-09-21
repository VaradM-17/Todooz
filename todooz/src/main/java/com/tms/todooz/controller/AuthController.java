package com.tms.todooz.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tms.todooz.dto.JwtAuthResponse;
import com.tms.todooz.dto.LoginDto;
import com.tms.todooz.dto.RegisterDto;
import com.tms.todooz.service.AuthService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping("/api/auth")
@RestController
public class AuthController {
	private AuthService authService;

	@PostMapping(value = { "/login", "/signin" })
	public ResponseEntity<JwtAuthResponse> login(@Valid @RequestBody LoginDto loginDto) {
		String token = authService.login(loginDto);

		JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
		jwtAuthResponse.setAccessToken(token);

		return ResponseEntity.ok(jwtAuthResponse);
	}

	@PostMapping(value = { "/register", "/signup" })
	public ResponseEntity<String> register(@Valid @RequestBody RegisterDto registerDto) {
		String response = authService.register(registerDto);
		return new ResponseEntity<String>(response, HttpStatus.CREATED);
	}
}
