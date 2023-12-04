package com.example.config;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.User.Users;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	private static final String SECRET_KEY = "Hd6QCYdIAX9UeLBzOPvPXA/GuwCqus6AVfsSv6S8ba9Iop+fIoqRd2M5GYjC6RGAdOGFR1gBH4GLS3dU24HokSoX3VvvHh9Plr7hY/WMF/Eu2fCmdke4VMGSzJ4m8fHlC2/q5ZPScPfpK+W8ijKWbIVP8I4UBk/Xq9JcuSEOoupebx5ZDg0MDIaPIu/3ck92J+Mf+JsMJzK+B7z31qXjq7LuzyuF18BgNeihrzu+cA2NZ7i9u1IkRBfT+QdMmgPlkz3tmLAB2ZVKCFnw9Fdg69go3riKe4DWz7zmE1yz/CucfHTUO3pXyjo0IyZqDmnDcqlrfitSe32MedP58PI4mFaRE+G982/9w/FJ92I0G+4=\r\n";
	
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
	public String extractUsername(String token) { 
		return extractClaim(token,Claims::getSubject);
	}
	
	public String generateToken(Map<String, Object> extraClaims, 
			Users userdetails) {
		extraClaims.put("role", userdetails.getType());
		extraClaims.put("pg_id",userdetails.get_id());
		return Jwts
				.builder()
				.setClaims(extraClaims)
				.setSubject(userdetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + (1000 * 60 * 30)))
				.signWith(getSignInKey(),SignatureAlgorithm.HS256)
				.compact();
	}
	
	public String generateToken(Users userdetails) {
		return generateToken(new HashMap<>(),userdetails);
	}
	
	private Key getSignInKey() {
		byte[] keybytes = Decoders.BASE64.decode(SECRET_KEY);
		return Keys.hmacShaKeyFor(keybytes);
	}
	
	public boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}
	
	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}
	
	public boolean isTokenValid(String token, UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
	
	
	private Claims extractAllClaims(String token) {
		return Jwts
				.parserBuilder()
				.setSigningKey(getSignInKey()) 
				.build()
				.parseClaimsJws(token)
				.getBody();
	}

}
