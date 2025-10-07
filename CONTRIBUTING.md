# Contributing Guide

Thank you for your interest in contributing to the AI Inference App! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

### Prerequisites

- Node.js >= 20
- npm or yarn
- React Native development environment
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/frontend-mobile-inference.git
   cd frontend-mobile-inference
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the App

#### Metro Bundler
```bash
npm start
```

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

### Running Tests

```bash
npm test
```

Watch mode:
```bash
npm test -- --watch
```

### Linting

```bash
npm run lint
```

Auto-fix:
```bash
npm run lint -- --fix
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define interfaces for all data structures
- Avoid `any` type - use `unknown` if necessary
- Enable strict mode

**Good:**
```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

function updateProfile(profile: UserProfile): void {
  // Implementation
}
```

**Bad:**
```typescript
function updateProfile(profile: any): void {
  // Implementation
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use meaningful prop names

**Good:**
```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

function Button({ title, onPress, disabled = false }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
```

### Styling

- Use StyleSheet.create for styles
- Keep styles at the bottom of the file
- Use meaningful style names
- Follow mobile-first approach

**Good:**
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
});
```

### File Organization

- One component per file
- Related files in same directory
- Index files for clean imports
- Consistent naming conventions

```
src/
  components/
    Button/
      Button.tsx
      Button.test.tsx
      Button.styles.ts
      index.ts
```

### Naming Conventions

- **Files**: PascalCase for components, camelCase for utilities
- **Components**: PascalCase
- **Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Interfaces/Types**: PascalCase with descriptive names

## Testing Guidelines

### Unit Tests

- Test business logic in services
- Test component behavior
- Mock external dependencies
- Aim for >80% coverage

**Example:**
```typescript
describe('AuthService', () => {
  it('should sign in user with email', async () => {
    const user = await authService.signInWithEmail('test@example.com', 'password');
    expect(user).toBeDefined();
    expect(user.email).toBe('test@example.com');
  });
});
```

### Integration Tests

- Test service interactions
- Test navigation flows
- Test data persistence

### Component Tests

- Test rendering
- Test user interactions
- Test props handling

**Example:**
```typescript
describe('LoginScreen', () => {
  it('should display login form', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });
});
```

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```
feat(auth): add Microsoft authentication support

Implement Microsoft OAuth authentication using Firebase Auth.
Add Microsoft sign-in button to login screen.

Closes #123
```

```
fix(chat): prevent duplicate messages in chat history

Fix race condition when sending messages quickly.
Add message deduplication logic.

Fixes #456
```

## Pull Request Process

### Before Submitting

1. **Update from main:**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Run tests:**
   ```bash
   npm test
   npm run lint
   ```

3. **Update documentation** if needed

4. **Test on both platforms** if applicable

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Tested on iOS
- [ ] Tested on Android

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
```

### Review Process

1. Automated checks must pass
2. At least one approval required
3. No unresolved conversations
4. Up-to-date with main branch

## Project Structure

```
/src
  /components      # Reusable UI components
  /screens        # Screen components
  /navigation     # Navigation setup
  /services       # Business logic
  /store          # State management
  /types          # TypeScript definitions
  /utils          # Utility functions
  /models         # AI model assets
  /ads            # Ad configurations
  /config         # App configuration
```

## Common Tasks

### Adding a New Screen

1. Create screen component in `src/screens/`
2. Add to navigation in `src/navigation/AppNavigator.tsx`
3. Add tests in `src/screens/__tests__/`
4. Update navigation types

### Adding a New Service

1. Create service file in `src/services/`
2. Export singleton instance
3. Add TypeScript interfaces
4. Write unit tests
5. Update API.md documentation

### Adding Dependencies

1. Install package:
   ```bash
   npm install package-name
   ```

2. For iOS, install pods:
   ```bash
   cd ios && pod install && cd ..
   ```

3. Update documentation if it affects setup

### Updating Styles

1. Follow existing style patterns
2. Use theme colors/constants
3. Test on different screen sizes
4. Consider dark mode (future)

## Tips for Success

### For New Contributors

- Start with "good first issue" labels
- Ask questions in issues/discussions
- Read existing code to understand patterns
- Test changes thoroughly

### For Regular Contributors

- Help review PRs
- Mentor new contributors
- Improve documentation
- Suggest architecture improvements

### Common Pitfalls

- Not testing on both platforms
- Forgetting to run linter
- Not updating documentation
- Breaking existing tests
- Merge conflicts from not rebasing

## Getting Help

- **Documentation**: Check SETUP.md, ARCHITECTURE.md, API.md
- **Issues**: Search existing issues or create new one
- **Discussions**: Use GitHub Discussions for questions
- **Code Review**: Tag maintainers for review help

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in commit messages

Thank you for contributing! 🎉
