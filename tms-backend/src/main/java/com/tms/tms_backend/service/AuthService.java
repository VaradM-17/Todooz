package com.tms.tms_backend.service;

import com.tms.tms_backend.dto.LoginDto;
import com.tms.tms_backend.dto.RegisterDto;

public interface AuthService {
	String login(LoginDto loginDto);
	String register(RegisterDto registerDto);
}
