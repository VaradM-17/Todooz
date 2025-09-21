package com.tms.todooz.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tms.todooz.dto.JwtAuthResponse;
import com.tms.todooz.dto.LoginDto;
import com.tms.todooz.dto.RegisterDto;
import com.tms.todooz.entity.Role;
import com.tms.todooz.entity.User;
import com.tms.todooz.exception.TodoAPIException;
import com.tms.todooz.repository.RoleRepository;
import com.tms.todooz.repository.UserRepository;
import com.tms.todooz.security.JwtTokenProvider;
import com.tms.todooz.service.AuthService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

	private AuthenticationManager authenticationManager;

	private UserRepository userRespository;
	private RoleRepository roleRepository;
	private PasswordEncoder passwordEncoder;

	private JwtTokenProvider jwtTokenProvider;

	@Override
	public String login(LoginDto loginDto) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginDto.getUsernameOrEmail(), loginDto.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtTokenProvider.generateToken(authentication);

		return token;
	}

	@Override
	public String register(RegisterDto registerDto) {

		if (userRespository.existsByUsername(registerDto.getUsername())) {
			throw new TodoAPIException(HttpStatus.BAD_REQUEST, "Username already exists..");
		}
		if (userRespository.existsByEmail(registerDto.getEmail())) {
			throw new TodoAPIException(HttpStatus.BAD_REQUEST, "Email already exists..");
		}

		User user = new User();
		user.setName(registerDto.getName());
		user.setUsername(registerDto.getUsername());
		user.setEmail(registerDto.getEmail());
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

		Set<Role> roles = new HashSet<>();
		Role userRole = roleRepository.findByName("USER").get();
		roles.add(userRole);

		user.setRoles(roles);

		userRespository.save(user);

		return "User register successfully..";
	}
}
