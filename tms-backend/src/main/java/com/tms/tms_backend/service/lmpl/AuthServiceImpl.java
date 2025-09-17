package com.tms.tms_backend.service.lmpl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tms.tms_backend.dto.LoginDto;
import com.tms.tms_backend.dto.RegisterDto;
import com.tms.tms_backend.entity.Role;
import com.tms.tms_backend.entity.User;
import com.tms.tms_backend.exception.TodoAPIException;
import com.tms.tms_backend.repository.RoleRepository;
import com.tms.tms_backend.repository.UserRepository;
import com.tms.tms_backend.service.AuthService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
	private AuthenticationManager authenticationManager;

	private RoleRepository roleRepository;
	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;

	@Override
	public String login(LoginDto loginDto) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginDto.getUsernameOrEmail(), loginDto.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		return "User logged in successull..";
	}

	@Override
	public String register(RegisterDto registerDto) {

		if (userRepository.existsByUsername(registerDto.getUsername())) {
			throw new TodoAPIException(HttpStatus.BAD_REQUEST, "Username already exists.");
		}
		if (userRepository.existsByEmail(registerDto.getEmail())) {
			throw new TodoAPIException(HttpStatus.BAD_REQUEST, "Email already exists.");
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

		userRepository.save(user);

		return "User register successful.";
	}

}
