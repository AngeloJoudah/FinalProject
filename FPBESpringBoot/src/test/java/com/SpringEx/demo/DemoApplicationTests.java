package com.SpringEx.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
@SpringBootTest(classes=DemoApplicationTests.class)
class DemoApplicationTests {

	class Calculator{
		int add(int x, int y) {
			return x + y;
		}
	}
	
	@Test
	void itShouldAddNumbers() {
		assertEquals(2,new Calculator().add(1, 1));
	}

}
