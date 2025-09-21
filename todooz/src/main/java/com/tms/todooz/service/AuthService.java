package com.tms.todooz.service;

import com.tms.todooz.dto.LoginDto;
import com.tms.todooz.dto.RegisterDto;

public interface AuthService {

	String login(LoginDto loginDto);

	String register(RegisterDto registerDto);

}
