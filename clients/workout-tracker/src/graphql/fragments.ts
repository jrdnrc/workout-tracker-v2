import { gql } from '@apollo/client';

gql`
  fragment ExerciseFields on Exercise {
    id
    name
    description
    category
    muscleGroups
    createdAt
  }
`;

gql`
  fragment TemplateFields on WorkoutTemplate {
    id
    name
    description
    createdAt
    templateExercisesByTemplateId {
      totalCount
    }
  }
`;

gql`
  fragment SplitFields on WorkoutSplit {
    id
    name
    isActive
    createdAt
    splitWorkoutsBySplitId {
      totalCount
    }
  }
`;

