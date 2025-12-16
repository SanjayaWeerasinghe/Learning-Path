# Testing - Testing Spring Boot Applications

## What You'll Learn

- JUnit 5 basics
- MockMvc for API testing
- @SpringBootTest
- Repository testing
- Service testing with Mockito
- Integration testing

## Setup

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

## Unit Testing - Service Layer

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void testGetUserById_Success() {
        // Given
        User user = new User(1L, "John Doe", "john@example.com");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // When
        User result = userService.getUserById(1L);

        // Then
        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void testGetUserById_NotFound() {
        // Given
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // When & Then
        assertThrows(ResourceNotFoundException.class, () -> {
            userService.getUserById(1L);
        });
    }
}
```

## Controller Testing with MockMvc

```java
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllUsers() throws Exception {
        // Given
        List<User> users = Arrays.asList(
            new User(1L, "John", "john@example.com"),
            new User(2L, "Jane", "jane@example.com")
        );
        when(userService.getAllUsers()).thenReturn(users);

        // When & Then
        mockMvc.perform(get("/api/users"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(2)))
            .andExpect(jsonPath("$[0].name").value("John"))
            .andExpect(jsonPath("$[1].name").value("Jane"));
    }

    @Test
    void testCreateUser() throws Exception {
        // Given
        UserDTO userDTO = new UserDTO("John", "john@example.com");
        User savedUser = new User(1L, "John", "john@example.com");

        when(userService.createUser(any(UserDTO.class))).thenReturn(savedUser);

        // When & Then
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDTO)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.name").value("John"));
    }
}
```

## Repository Testing

```java
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindByEmail() {
        // Given
        User user = new User();
        user.setName("John");
        user.setEmail("john@example.com");
        userRepository.save(user);

        // When
        Optional<User> found = userRepository.findByEmail("john@example.com");

        // Then
        assertTrue(found.isPresent());
        assertEquals("John", found.get().getName());
    }
}
```

## Integration Testing

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class UserIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void testCreateAndGetUser() throws Exception {
        // Create user
        UserDTO userDTO = new UserDTO("John", "john@example.com");

        MvcResult result = mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(userDTO)))
            .andExpect(status().isCreated())
            .andReturn();

        // Get created user
        String userId = JsonPath.read(result.getResponse().getContentAsString(), "$.id").toString();

        mockMvc.perform(get("/api/users/" + userId))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("John"));
    }
}
```

## Your Tasks

### Task 1: Service Tests
Write unit tests for all service methods using Mockito.

### Task 2: Controller Tests
Test all API endpoints with MockMvc.

### Task 3: Repository Tests
Test custom repository queries.

### Task 4: Integration Tests
Write end-to-end tests for complete workflows.

### Task 5: Test Coverage
Achieve >80% code coverage.

## Testing Annotations

- `@SpringBootTest` - Full Spring context
- `@WebMvcTest` - Test controllers only
- `@DataJpaTest` - Test repositories
- `@Mock` - Create mock object
- `@InjectMocks` - Inject mocks into tested class
- `@MockBean` - Spring Boot mock bean

## Next Steps

Move to `05-Deployment` to deploy your Spring Boot app!
