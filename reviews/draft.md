# Code Review - Draft Notes
## Workout Tracker Frontend (`clients/workout-tracker`)

## Issues Found

### 1. Error Handling
- **Problem**: Consistent use of `alert()` for error messages throughout the codebase
- **Locations**: All form pages, mutation handlers
- **Impact**: Poor UX, not accessible, not modern
- **Examples**:
  - `SplitFormPage.tsx`: `alert('Please enter a split name')`
  - `TemplateFormPage.tsx`: `alert('Failed to create template')`
  - `ExercisesPage.tsx`: `alert('Failed to create exercise')`
  - `WorkoutsPage.tsx`: `alert('Failed to create workout')`
  - `WorkoutLogPage.tsx`: Multiple alerts for errors
  - `SplitsPage.tsx`: `alert('Failed to delete split')`

### 2. Type Safety
- **Problem**: Extensive use of `any` types
- **Locations**: 
  - `SplitFormPage.tsx`: `templates[sw.dayOfWeek] = sw.templateId;` (implicit any)
  - `TemplateFormPage.tsx`: `template.templateExercisesByTemplateId.nodes.map((te: any) => ...)`
  - `WorkoutLogPage.tsx`: `workout?.workoutExercisesByWorkoutId?.nodes?.map((workoutExercise: any) => ...)`
  - `DashboardPage.tsx`: `workoutsData?.allWorkouts?.nodes?.filter((w: any) => ...)`
- **Impact**: Loss of type safety, potential runtime errors

### 3. Repeated Code Patterns

#### Form Submission Patterns
- **Repeated in**: `SplitFormPage.tsx`, `TemplateFormPage.tsx`, `ExercisesPage.tsx`, `WorkoutsPage.tsx`
- **Pattern**: 
  - Manual form state management with `useState`
  - Manual validation with `if (!name.trim()) alert(...)`
  - Similar try-catch blocks
  - Similar error handling

#### Delete Handler Patterns
- **Repeated in**: `SplitsPage.tsx`, `TemplatesPage.tsx`, `ExercisesPage.tsx`
- **Pattern**:
  - `if (!confirm(...)) return;`
  - `try { await mutation(); refetch(); } catch { alert(...); }`

#### Date Formatting
- **Repeated in**: `DashboardPage.tsx`, `WorkoutsPage.tsx`, `WorkoutLogPage.tsx`
- **Pattern**: `new Date(workout.date).toLocaleDateString('en-US', { weekday: 'long', ... })`

#### Back Button Pattern
- **Repeated in**: `SplitFormPage.tsx`, `TemplateFormPage.tsx`, `WorkoutLogPage.tsx`
- **Pattern**: `<button onClick={() => navigate('/...')}>← Back</button>`

### 4. Manual Debouncing
- **Problem**: Custom debouncing implementation in `WorkoutLogPage.tsx`
- **Code**: Lines 244-310 manually implement debouncing with `useRef` and `setTimeout`
- **Impact**: Reinventing the wheel, potential bugs, harder to maintain
- **Better**: Use `use-debounce` library or React's built-in patterns

### 5. GraphQL Query Organization
- **Problem**: GraphQL queries defined inline in component files
- **Impact**: Hard to reuse, hard to maintain, harder to test
- **Locations**: All page components have inline `gql` queries
- **Better**: Extract to separate files or use fragments

### 6. Form State Management
- **Problem**: Manual form state with multiple `useState` calls
- **Examples**:
  - `SplitFormPage.tsx`: `const [name, setName] = useState(''); const [setAsActive, setSetAsActive] = useState(true);`
  - `TemplateFormPage.tsx`: Multiple state variables for form fields
  - `ExercisesPage.tsx`: Form data object but still manual
- **Better**: Use `react-hook-form` or `formik`

### 7. Missing Utilities
- **Problem**: No centralized utilities for:
  - Date formatting
  - Error handling/toast notifications
  - Form validation
  - API error extraction
  - Confirmation dialogs

### 8. Component Duplication
- **Problem**: Similar form structures repeated across pages
- **Pattern**: Card wrapper, FormField usage, submit button pattern

### 9. No Custom Hooks
- **Problem**: No reusable hooks for:
  - Form handling
  - Delete operations
  - Form validation
  - Error handling
  - Data fetching patterns

### 10. Accessibility Issues
- **Problem**: 
  - Using `alert()` (not accessible)
  - Some buttons missing proper ARIA labels
  - Form validation messages not properly associated with inputs

### 11. Code Organization
- **Problem**: 
  - All GraphQL queries in component files
  - No hooks directory
  - No utils directory
  - No constants file

### 12. Missing Loading States
- **Problem**: Some operations don't show loading states
- **Example**: Delete operations, some mutations

### 13. Optimistic Updates
- **Problem**: Only `WorkoutLogPage.tsx` uses optimistic updates
- **Impact**: Inconsistent UX across the app

### 14. Refetch Patterns
- **Problem**: Some pages use `refetch()`, others don't update cache properly
- **Examples**: 
  - `ExercisesPage.tsx`: Uses `refetch()`
  - `SplitsPage.tsx`: Uses `refetch()`
  - `TemplatesPage.tsx`: Uses `refetch()`
- **Better**: Use Apollo cache updates or React Query

### 15. Missing Error Boundaries
- **Problem**: No error boundaries for React error handling
- **Impact**: App crashes on errors instead of graceful degradation

### 16. Date Handling
- **Problem**: Manual date manipulation throughout
- **Examples**: `new Date().toISOString().split('T')[0]`, `new Date(workout.date).getDay()`
- **Better**: Use `date-fns` or `dayjs`

### 17. Confirmation Dialogs
- **Problem**: Using native `confirm()` dialogs
- **Locations**: Delete handlers throughout
- **Better**: Use a proper dialog component/library

### 18. GraphQL Query Naming
- **Problem**: Some queries have inconsistent naming
- **Example**: `useGetWorkoutByIdQuery as useGetWorkoutQuery` (aliasing)

### 19. Magic Strings
- **Problem**: Hardcoded strings throughout
- **Examples**: `'/splits'`, `'/templates'`, `'Failed to create...'`
- **Better**: Extract to constants

### 20. Missing PropTypes/TypeScript Strictness
- **Problem**: Some components accept `any` props
- **Impact**: Type safety lost

## Strengths
- Good component structure
- Using TypeScript
- Using GraphQL codegen
- Good use of Tailwind CSS
- Responsive design considerations
- Clean component separation

## Modernization Opportunities
1. Replace `alert()` with toast notifications (react-hot-toast, sonner)
2. Add form library (react-hook-form)
3. Add date library (date-fns or dayjs)
4. Add debounce library (use-debounce)
5. Add dialog library (radix-ui, headlessui)
6. Create custom hooks for common patterns
7. Extract GraphQL queries to separate files
8. Add error boundaries
9. Improve type safety (remove `any`)
10. Add proper loading states everywhere
11. Consistent optimistic updates
12. Better cache management

