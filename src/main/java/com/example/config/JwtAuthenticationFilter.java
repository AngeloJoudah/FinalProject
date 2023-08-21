package com.example.config;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	private final UserDetailsService userDetailsService;
	private final JwtService jwtService;
	@Override
	protected void doFilterInternal(
			@NonNull HttpServletRequest request, 
			@NonNull HttpServletResponse response, 
			@NonNull FilterChain filterChain)
			throws ServletException, IOException {
				final String authHeader = request.getHeader("Authorization");
				final String jwt;
				final String userName;
				if(authHeader == null || !authHeader.startsWith("Bearer: ")) {
					filterChain.doFilter(request, response);
					return;
				}
				jwt = authHeader.substring(7);
				userName = jwtService.extractUsername(jwt);// TODO extract the userName from JWT token
				if(userName != null && SecurityContextHolder.getContext().getAuthentication() != null) {
					Users userDetails = this.userDetailsService.loadByUsername(userEmail);
					if(jwtService.isTokenValid(jwt,UserDetails)) {
						UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
								userDetails,
								null,
								userDetails.getAuthorities
								);
						authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
						SecurityContextHolder.getContext().setAuthentication(authToken);
					}
					filterChain.doFilter(request, response);
				}
		
			}

}
