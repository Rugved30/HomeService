package com.example.backend.security.jwt;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthFilter extends OncePerRequestFilter {
	
	@Autowired
	private JwtUtils jwtUtils;
	
	@Autowired
	private UserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String token = jwtUtils.getJwtFromHeader(request);
		
		if(token!=null && jwtUtils.validateJwtToken(token))
		{
			String username = jwtUtils.getUserNameFromJwtToken(token);
			
			UserDetails userDetails = 
					userDetailsService.loadUserByUsername(username);
			
			
			UsernamePasswordAuthenticationToken authentication 
			= new UsernamePasswordAuthenticationToken
			(userDetails, null, userDetails.getAuthorities());
			
			
			authentication.
			setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
			
			
			SecurityContext context = SecurityContextHolder.getContext();
			
			context.setAuthentication(authentication);
			
		}
	
		filterChain.doFilter(request, response);
		
	}

	
}
