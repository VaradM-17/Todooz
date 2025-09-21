package com.tms.todooz.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.tms.todooz.security.JwtAuthenticationEntryPoint;
import com.tms.todooz.security.JwtAuthenticationFilter;

import lombok.AllArgsConstructor;

@Configuration
@EnableMethodSecurity
@AllArgsConstructor
public class SecurityConfig {

	private UserDetailsService userDetailsService;

	private JwtAuthenticationFilter authenticationFilter;
	private JwtAuthenticationEntryPoint authenticationEntryPoint;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable()).authorizeHttpRequests((auth) -> {
			auth.requestMatchers("/api/auth/**").permitAll();
			auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
			auth.anyRequest().authenticated();

		}).httpBasic(Customizer.withDefaults())
				.exceptionHandling(exception -> exception.authenticationEntryPoint(authenticationEntryPoint))
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}

//	@Bean
//	public UserDetailsService userDetailsService() {
//
//		UserDetails varad = User.builder().username("").password(passwordEncoder().encode("")).roles("USER")
//				.build();
//
//		UserDetails admin = User.builder().username("").password(passwordEncoder().encode("")).roles("ADMIN")
//				.build();
//
//		return new InMemoryUserDetailsManager(varad, admin);
//	}

}
