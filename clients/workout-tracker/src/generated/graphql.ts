import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigFloat: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  Date: { input: any; output: any; }
  Datetime: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type AllowCredential = {
  __typename?: 'AllowCredential';
  id: Scalars['String']['output'];
  transports?: Maybe<Array<Scalars['String']['output']>>;
  type: Scalars['String']['output'];
};

export type AuthResult = {
  __typename?: 'AuthResult';
  token: Scalars['String']['output'];
  user: User;
};

export type AuthenticationOptions = {
  __typename?: 'AuthenticationOptions';
  allowCredentials?: Maybe<Array<AllowCredential>>;
  challenge: Scalars['String']['output'];
  rpId: Scalars['String']['output'];
  timeout?: Maybe<Scalars['Int']['output']>;
  userVerification?: Maybe<Scalars['String']['output']>;
};

export type AuthenticationResponseInput = {
  authenticatorAttachment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  rawId: Scalars['String']['input'];
  response: AuthenticatorAssertionResponseInput;
  type: Scalars['String']['input'];
};

export type AuthenticatorAssertionResponseInput = {
  authenticatorData: Scalars['String']['input'];
  clientDataJSON: Scalars['String']['input'];
  signature: Scalars['String']['input'];
  userHandle?: InputMaybe<Scalars['String']['input']>;
};

export type AuthenticatorAttestationResponseInput = {
  attestationObject: Scalars['String']['input'];
  authenticatorData?: InputMaybe<Scalars['String']['input']>;
  clientDataJSON: Scalars['String']['input'];
  publicKey?: InputMaybe<Scalars['String']['input']>;
  publicKeyAlgorithm?: InputMaybe<Scalars['Int']['input']>;
  transports?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type AuthenticatorSelection = {
  __typename?: 'AuthenticatorSelection';
  authenticatorAttachment?: Maybe<Scalars['String']['output']>;
  residentKey?: Maybe<Scalars['String']['output']>;
  userVerification?: Maybe<Scalars['String']['output']>;
};

/** All input for the create `Exercise` mutation. */
export type CreateExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Exercise` to be created by this mutation. */
  exercise: ExerciseInput;
};

/** The output of our create `Exercise` mutation. */
export type CreateExercisePayload = {
  __typename?: 'CreateExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Exercise` that was created by this mutation. */
  exercise?: Maybe<Exercise>;
  /** An edge for our `Exercise`. May be used by Relay 1. */
  exerciseEdge?: Maybe<ExercisesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Exercise`. */
  user?: Maybe<User>;
};


/** The output of our create `Exercise` mutation. */
export type CreateExercisePayloadExerciseEdgeArgs = {
  orderBy?: InputMaybe<Array<ExercisesOrderBy>>;
};

/** All input for the create `Migration` mutation. */
export type CreateMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Migration` to be created by this mutation. */
  migration: MigrationInput;
};

/** The output of our create `Migration` mutation. */
export type CreateMigrationPayload = {
  __typename?: 'CreateMigrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Migration` that was created by this mutation. */
  migration?: Maybe<Migration>;
  /** An edge for our `Migration`. May be used by Relay 1. */
  migrationEdge?: Maybe<MigrationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Migration` mutation. */
export type CreateMigrationPayloadMigrationEdgeArgs = {
  orderBy?: InputMaybe<Array<MigrationsOrderBy>>;
};

/** All input for the create `Set` mutation. */
export type CreateSetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Set` to be created by this mutation. */
  set: SetInput;
};

/** The output of our create `Set` mutation. */
export type CreateSetPayload = {
  __typename?: 'CreateSetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Set` that was created by this mutation. */
  set?: Maybe<Set>;
  /** An edge for our `Set`. May be used by Relay 1. */
  setEdge?: Maybe<SetsEdge>;
  /** Reads a single `WorkoutExercise` that is related to this `Set`. */
  workoutExercise?: Maybe<WorkoutExercise>;
};


/** The output of our create `Set` mutation. */
export type CreateSetPayloadSetEdgeArgs = {
  orderBy?: InputMaybe<Array<SetsOrderBy>>;
};

/** All input for the create `SplitWorkout` mutation. */
export type CreateSplitWorkoutInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `SplitWorkout` to be created by this mutation. */
  splitWorkout: SplitWorkoutInput;
};

/** The output of our create `SplitWorkout` mutation. */
export type CreateSplitWorkoutPayload = {
  __typename?: 'CreateSplitWorkoutPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `WorkoutSplit` that is related to this `SplitWorkout`. */
  split?: Maybe<WorkoutSplit>;
  /** The `SplitWorkout` that was created by this mutation. */
  splitWorkout?: Maybe<SplitWorkout>;
  /** An edge for our `SplitWorkout`. May be used by Relay 1. */
  splitWorkoutEdge?: Maybe<SplitWorkoutsEdge>;
};


/** The output of our create `SplitWorkout` mutation. */
export type CreateSplitWorkoutPayloadSplitWorkoutEdgeArgs = {
  orderBy?: InputMaybe<Array<SplitWorkoutsOrderBy>>;
};

/** All input for the create `TemplateExercise` mutation. */
export type CreateTemplateExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `TemplateExercise` to be created by this mutation. */
  templateExercise: TemplateExerciseInput;
};

/** The output of our create `TemplateExercise` mutation. */
export type CreateTemplateExercisePayload = {
  __typename?: 'CreateTemplateExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Exercise` that is related to this `TemplateExercise`. */
  exercise?: Maybe<Exercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `WorkoutTemplate` that is related to this `TemplateExercise`. */
  template?: Maybe<WorkoutTemplate>;
  /** The `TemplateExercise` that was created by this mutation. */
  templateExercise?: Maybe<TemplateExercise>;
  /** An edge for our `TemplateExercise`. May be used by Relay 1. */
  templateExerciseEdge?: Maybe<TemplateExercisesEdge>;
};


/** The output of our create `TemplateExercise` mutation. */
export type CreateTemplateExercisePayloadTemplateExerciseEdgeArgs = {
  orderBy?: InputMaybe<Array<TemplateExercisesOrderBy>>;
};

/** All input for the create `UserCredential` mutation. */
export type CreateUserCredentialInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `UserCredential` to be created by this mutation. */
  userCredential: UserCredentialInput;
};

/** The output of our create `UserCredential` mutation. */
export type CreateUserCredentialPayload = {
  __typename?: 'CreateUserCredentialPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserCredential`. */
  user?: Maybe<User>;
  /** The `UserCredential` that was created by this mutation. */
  userCredential?: Maybe<UserCredential>;
  /** An edge for our `UserCredential`. May be used by Relay 1. */
  userCredentialEdge?: Maybe<UserCredentialsEdge>;
};


/** The output of our create `UserCredential` mutation. */
export type CreateUserCredentialPayloadUserCredentialEdgeArgs = {
  orderBy?: InputMaybe<Array<UserCredentialsOrderBy>>;
};

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** All input for the create `WorkoutExercise` mutation. */
export type CreateWorkoutExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `WorkoutExercise` to be created by this mutation. */
  workoutExercise: WorkoutExerciseInput;
};

/** The output of our create `WorkoutExercise` mutation. */
export type CreateWorkoutExercisePayload = {
  __typename?: 'CreateWorkoutExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Exercise` that is related to this `WorkoutExercise`. */
  exercise?: Maybe<Exercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Workout` that is related to this `WorkoutExercise`. */
  workout?: Maybe<Workout>;
  /** The `WorkoutExercise` that was created by this mutation. */
  workoutExercise?: Maybe<WorkoutExercise>;
  /** An edge for our `WorkoutExercise`. May be used by Relay 1. */
  workoutExerciseEdge?: Maybe<WorkoutExercisesEdge>;
};


/** The output of our create `WorkoutExercise` mutation. */
export type CreateWorkoutExercisePayloadWorkoutExerciseEdgeArgs = {
  orderBy?: InputMaybe<Array<WorkoutExercisesOrderBy>>;
};

/** All input for the create `Workout` mutation. */
export type CreateWorkoutInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Workout` to be created by this mutation. */
  workout: WorkoutInput;
};

/** The output of our create `Workout` mutation. */
export type CreateWorkoutPayload = {
  __typename?: 'CreateWorkoutPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `WorkoutSplit` that is related to this `Workout`. */
  split?: Maybe<WorkoutSplit>;
  /** Reads a single `WorkoutTemplate` that is related to this `Workout`. */
  template?: Maybe<WorkoutTemplate>;
  /** Reads a single `User` that is related to this `Workout`. */
  user?: Maybe<User>;
  /** The `Workout` that was created by this mutation. */
  workout?: Maybe<Workout>;
  /** An edge for our `Workout`. May be used by Relay 1. */
  workoutEdge?: Maybe<WorkoutsEdge>;
};


/** The output of our create `Workout` mutation. */
export type CreateWorkoutPayloadWorkoutEdgeArgs = {
  orderBy?: InputMaybe<Array<WorkoutsOrderBy>>;
};

/** All input for the create `WorkoutSplit` mutation. */
export type CreateWorkoutSplitInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `WorkoutSplit` to be created by this mutation. */
  workoutSplit: WorkoutSplitInput;
};

/** The output of our create `WorkoutSplit` mutation. */
export type CreateWorkoutSplitPayload = {
  __typename?: 'CreateWorkoutSplitPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `WorkoutSplit`. */
  user?: Maybe<User>;
  /** The `WorkoutSplit` that was created by this mutation. */
  workoutSplit?: Maybe<WorkoutSplit>;
  /** An edge for our `WorkoutSplit`. May be used by Relay 1. */
  workoutSplitEdge?: Maybe<WorkoutSplitsEdge>;
};


/** The output of our create `WorkoutSplit` mutation. */
export type CreateWorkoutSplitPayloadWorkoutSplitEdgeArgs = {
  orderBy?: InputMaybe<Array<WorkoutSplitsOrderBy>>;
};

/** All input for the create `WorkoutTemplate` mutation. */
export type CreateWorkoutTemplateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `WorkoutTemplate` to be created by this mutation. */
  workoutTemplate: WorkoutTemplateInput;
};

/** The output of our create `WorkoutTemplate` mutation. */
export type CreateWorkoutTemplatePayload = {
  __typename?: 'CreateWorkoutTemplatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `WorkoutTemplate`. */
  user?: Maybe<User>;
  /** The `WorkoutTemplate` that was created by this mutation. */
  workoutTemplate?: Maybe<WorkoutTemplate>;
  /** An edge for our `WorkoutTemplate`. May be used by Relay 1. */
  workoutTemplateEdge?: Maybe<WorkoutTemplatesEdge>;
};


/** The output of our create `WorkoutTemplate` mutation. */
export type CreateWorkoutTemplatePayloadWorkoutTemplateEdgeArgs = {
  orderBy?: InputMaybe<Array<WorkoutTemplatesOrderBy>>;
};

/** All input for the `deleteExerciseByNodeId` mutation. */
export type DeleteExerciseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Exercise` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteExercise` mutation. */
export type DeleteExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** The output of our delete `Exercise` mutation. */
export type DeleteExercisePayload = {
  __typename?: 'DeleteExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedExerciseNodeId?: Maybe<Scalars['ID']['output']>;
  /** The `Exercise` that was deleted by this mutation. */
  exercise?: Maybe<Exercise>;
  /** An edge for our `Exercise`. May be used by Relay 1. */
  exerciseEdge?: Maybe<ExercisesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Exercise`. */
  user?: Maybe<User>;
};


/** The output of our delete `Exercise` mutation. */
export type DeleteExercisePayloadExerciseEdgeArgs = {
  orderBy?: InputMaybe<Array<ExercisesOrderBy>>;
};

/** All input for the `deleteMigrationByName` mutation. */
export type DeleteMigrationByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** All input for the `deleteMigrationByNodeId` mutation. */
export type DeleteMigrationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Migration` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteMigration` mutation. */
export type DeleteMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
};

/** The output of our delete `Migration` mutation. */
export type DeleteMigrationPayload = {
  __typename?: 'DeleteMigrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedMigrationNodeId?: Maybe<Scalars['ID']['output']>;
  /** The `Migration` that was deleted by this mutation. */
  migration?: Maybe<Migration>;
  /** An edge for our `Migration`. May be used by Relay 1. */
  migrationEdge?: Maybe<MigrationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Migration` mutation. */
export type DeleteMigrationPayloadMigrationEdgeArgs = {
  orderBy?: InputMaybe<Array<MigrationsOrderBy>>;
};

/** All input for the `deleteSetByNodeId` mutation. */
export type DeleteSetByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Set` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteSet` mutation. */
export type DeleteSetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** The output of our delete `Set` mutation. */
export type DeleteSetPayload = {
  __typename?: 'DeleteSetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSetNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Set` that was deleted by this mutation. */
  set?: Maybe<Set>;
  /** An edge for our `Set`. May be used by Relay 1. */
  setEdge?: Maybe<SetsEdge>;
  /** Reads a single `WorkoutExercise` that is related to this `Set`. */
  workoutExercise?: Maybe<WorkoutExercise>;
};


/** The output of our delete `Set` mutation. */
export type DeleteSetPayloadSetEdgeArgs = {
  orderBy?: InputMaybe<Array<SetsOrderBy>>;
};

/** All input for the `deleteSplitWorkoutByNodeId` mutation. */
export type DeleteSplitWorkoutByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SplitWorkout` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteSplitWorkoutBySplitIdAndDayOfWeek` mutation. */
export type DeleteSplitWorkoutBySplitIdAndDayOfWeekInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  dayOfWeek: Scalars['Int']['input'];
  splitId: Scalars['UUID']['input'];
};

/** All input for the `deleteSplitWorkout` mutation. */
export type DeleteSplitWorkoutInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** The output of our delete `SplitWorkout` mutation. */
export type DeleteSplitWorkoutPayload = {
  __typename?: 'DeleteSplitWorkoutPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSplitWorkoutNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `WorkoutSplit` that is related to this `SplitWorkout`. */
  split?: Maybe<WorkoutSplit>;
  /** The `SplitWorkout` that was deleted by this mutation. */
  splitWorkout?: Maybe<SplitWorkout>;
  /** An edge for our `SplitWorkout`. May be used by Relay 1. */
  splitWorkoutEdge?: Maybe<SplitWorkoutsEdge>;
};


/** The output of our delete `SplitWorkout` mutation. */
export type DeleteSplitWorkoutPayloadSplitWorkoutEdgeArgs = {
  orderBy?: InputMaybe<Array<SplitWorkoutsOrderBy>>;
};

/** All input for the `deleteTemplateExerciseByNodeId` mutation. */
export type DeleteTemplateExerciseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TemplateExercise` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteTemplateExercise` mutation. */
export type DeleteTemplateExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** The output of our delete `TemplateExercise` mutation. */
export type DeleteTemplateExercisePayload = {
  __typename?: 'DeleteTemplateExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTemplateExerciseNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Exercise` that is related to this `TemplateExercise`. */
  exercise?: Maybe<Exercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `WorkoutTemplate` that is related to this `TemplateExercise`. */
  template?: Maybe<WorkoutTemplate>;
  /** The `TemplateExercise` that was deleted by this mutation. */
  templateExercise?: Maybe<TemplateExercise>;
  /** An edge for our `TemplateExercise`. May be used by Relay 1. */
  templateExerciseEdge?: Maybe<TemplateExercisesEdge>;
};


/** The output of our delete `TemplateExercise` mutation. */
export type DeleteTemplateExercisePayloadTemplateExerciseEdgeArgs = {
  orderBy?: InputMaybe<Array<TemplateExercisesOrderBy>>;
};

/** All input for the `deleteUserByEmail` mutation. */
export type DeleteUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
};

/** All input for the `deleteUserByNodeId` mutation. */
export type DeleteUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteUserByUsername` mutation. */
export type DeleteUserByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

/** All input for the `deleteUserCredentialByCredentialId` mutation. */
export type DeleteUserCredentialByCredentialIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  credentialId: Scalars['String']['input'];
};

/** All input for the `deleteUserCredentialByNodeId` mutation. */
export type DeleteUserCredentialByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `UserCredential` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteUserCredential` mutation. */
export type DeleteUserCredentialInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** The output of our delete `UserCredential` mutation. */
export type DeleteUserCredentialPayload = {
  __typename?: 'DeleteUserCredentialPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedUserCredentialNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserCredential`. */
  user?: Maybe<User>;
  /** The `UserCredential` that was deleted by this mutation. */
  userCredential?: Maybe<UserCredential>;
  /** An edge for our `UserCredential`. May be used by Relay 1. */
  userCredentialEdge?: Maybe<UserCredentialsEdge>;
};


/** The output of our delete `UserCredential` mutation. */
export type DeleteUserCredentialPayloadUserCredentialEdgeArgs = {
  orderBy?: InputMaybe<Array<UserCredentialsOrderBy>>;
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedUserNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** All input for the `deleteWorkoutByNodeId` mutation. */
export type DeleteWorkoutByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Workout` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteWorkoutExerciseByNodeId` mutation. */
export type DeleteWorkoutExerciseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WorkoutExercise` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteWorkoutExercise` mutation. */
export type DeleteWorkoutExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** The output of our delete `WorkoutExercise` mutation. */
export type DeleteWorkoutExercisePayload = {
  __typename?: 'DeleteWorkoutExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedWorkoutExerciseNodeId?: Maybe<Scalars['ID']['output']>;
  /** Reads a single `Exercise` that is related to this `WorkoutExercise`. */
  exercise?: Maybe<Exercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Workout` that is related to this `WorkoutExercise`. */
  workout?: Maybe<Workout>;
  /** The `WorkoutExercise` that was deleted by this mutation. */
  workoutExercise?: Maybe<WorkoutExercise>;
  /** An edge for our `WorkoutExercise`. May be used by Relay 1. */
  workoutExerciseEdge?: Maybe<WorkoutExercisesEdge>;
};


/** The output of our delete `WorkoutExercise` mutation. */
export type DeleteWorkoutExercisePayloadWorkoutExerciseEdgeArgs = {
  orderBy?: InputMaybe<Array<WorkoutExercisesOrderBy>>;
};

/** All input for the `deleteWorkout` mutation. */
export type DeleteWorkoutInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** The output of our delete `Workout` mutation. */
export type DeleteWorkoutPayload = {
  __typename?: 'DeleteWorkoutPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedWorkoutNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `WorkoutSplit` that is related to this `Workout`. */
  split?: Maybe<WorkoutSplit>;
  /** Reads a single `WorkoutTemplate` that is related to this `Workout`. */
  template?: Maybe<WorkoutTemplate>;
  /** Reads a single `User` that is related to this `Workout`. */
  user?: Maybe<User>;
  /** The `Workout` that was deleted by this mutation. */
  workout?: Maybe<Workout>;
  /** An edge for our `Workout`. May be used by Relay 1. */
  workoutEdge?: Maybe<WorkoutsEdge>;
};


/** The output of our delete `Workout` mutation. */
export type DeleteWorkoutPayloadWorkoutEdgeArgs = {
  orderBy?: InputMaybe<Array<WorkoutsOrderBy>>;
};

/** All input for the `deleteWorkoutSplitByNodeId` mutation. */
export type DeleteWorkoutSplitByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WorkoutSplit` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteWorkoutSplit` mutation. */
export type DeleteWorkoutSplitInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** The output of our delete `WorkoutSplit` mutation. */
export type DeleteWorkoutSplitPayload = {
  __typename?: 'DeleteWorkoutSplitPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedWorkoutSplitNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `WorkoutSplit`. */
  user?: Maybe<User>;
  /** The `WorkoutSplit` that was deleted by this mutation. */
  workoutSplit?: Maybe<WorkoutSplit>;
  /** An edge for our `WorkoutSplit`. May be used by Relay 1. */
  workoutSplitEdge?: Maybe<WorkoutSplitsEdge>;
};


/** The output of our delete `WorkoutSplit` mutation. */
export type DeleteWorkoutSplitPayloadWorkoutSplitEdgeArgs = {
  orderBy?: InputMaybe<Array<WorkoutSplitsOrderBy>>;
};

/** All input for the `deleteWorkoutTemplateByNodeId` mutation. */
export type DeleteWorkoutTemplateByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WorkoutTemplate` to be deleted. */
  nodeId: Scalars['ID']['input'];
};

/** All input for the `deleteWorkoutTemplate` mutation. */
export type DeleteWorkoutTemplateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
};

/** The output of our delete `WorkoutTemplate` mutation. */
export type DeleteWorkoutTemplatePayload = {
  __typename?: 'DeleteWorkoutTemplatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedWorkoutTemplateNodeId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `WorkoutTemplate`. */
  user?: Maybe<User>;
  /** The `WorkoutTemplate` that was deleted by this mutation. */
  workoutTemplate?: Maybe<WorkoutTemplate>;
  /** An edge for our `WorkoutTemplate`. May be used by Relay 1. */
  workoutTemplateEdge?: Maybe<WorkoutTemplatesEdge>;
};


/** The output of our delete `WorkoutTemplate` mutation. */
export type DeleteWorkoutTemplatePayloadWorkoutTemplateEdgeArgs = {
  orderBy?: InputMaybe<Array<WorkoutTemplatesOrderBy>>;
};

export type Exercise = Node & {
  __typename?: 'Exercise';
  category?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  muscleGroups?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `TemplateExercise`. */
  templateExercises: TemplateExercisesConnection;
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `User` that is related to this `Exercise`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `WorkoutExercise`. */
  workoutExercises: WorkoutExercisesConnection;
};


export type ExerciseTemplateExercisesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TemplateExerciseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TemplateExercisesOrderBy>>;
};


export type ExerciseWorkoutExercisesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkoutExerciseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkoutExercisesOrderBy>>;
};

/**
 * A condition to be used against `Exercise` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ExerciseCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `Exercise` */
export type ExerciseInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  muscleGroups?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['UUID']['input'];
};

/** Represents an update to a `Exercise`. Fields that are set will be updated. */
export type ExercisePatch = {
  category?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  muscleGroups?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Exercise` values. */
export type ExercisesConnection = {
  __typename?: 'ExercisesConnection';
  /** A list of edges which contains the `Exercise` and cursor to aid in pagination. */
  edges: Array<ExercisesEdge>;
  /** A list of `Exercise` objects. */
  nodes: Array<Exercise>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Exercise` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Exercise` edge in the connection. */
export type ExercisesEdge = {
  __typename?: 'ExercisesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Exercise` at the end of the edge. */
  node: Exercise;
};

/** Methods to use when ordering `Exercise`. */
export enum ExercisesOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

export type Migration = Node & {
  __typename?: 'Migration';
  executedAt: Scalars['Datetime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/**
 * A condition to be used against `Migration` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type MigrationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
};

/** An input for mutations affecting `Migration` */
export type MigrationInput = {
  executedAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
};

/** Represents an update to a `Migration`. Fields that are set will be updated. */
export type MigrationPatch = {
  executedAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Migration` values. */
export type MigrationsConnection = {
  __typename?: 'MigrationsConnection';
  /** A list of edges which contains the `Migration` and cursor to aid in pagination. */
  edges: Array<MigrationsEdge>;
  /** A list of `Migration` objects. */
  nodes: Array<Migration>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Migration` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Migration` edge in the connection. */
export type MigrationsEdge = {
  __typename?: 'MigrationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Migration` at the end of the edge. */
  node: Migration;
};

/** Methods to use when ordering `Migration`. */
export enum MigrationsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Exercise`. */
  createExercise?: Maybe<CreateExercisePayload>;
  /** Creates a single `Migration`. */
  createMigration?: Maybe<CreateMigrationPayload>;
  /** Creates a single `Set`. */
  createSet?: Maybe<CreateSetPayload>;
  /** Creates a single `SplitWorkout`. */
  createSplitWorkout?: Maybe<CreateSplitWorkoutPayload>;
  /** Creates a single `TemplateExercise`. */
  createTemplateExercise?: Maybe<CreateTemplateExercisePayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `UserCredential`. */
  createUserCredential?: Maybe<CreateUserCredentialPayload>;
  /** Creates a single `Workout`. */
  createWorkout?: Maybe<CreateWorkoutPayload>;
  /** Creates a single `WorkoutExercise`. */
  createWorkoutExercise?: Maybe<CreateWorkoutExercisePayload>;
  /** Creates a single `WorkoutSplit`. */
  createWorkoutSplit?: Maybe<CreateWorkoutSplitPayload>;
  /** Creates a single `WorkoutTemplate`. */
  createWorkoutTemplate?: Maybe<CreateWorkoutTemplatePayload>;
  /** Deletes a single `Exercise` using a unique key. */
  deleteExercise?: Maybe<DeleteExercisePayload>;
  /** Deletes a single `Exercise` using its globally unique id. */
  deleteExerciseByNodeId?: Maybe<DeleteExercisePayload>;
  /** Deletes a single `Migration` using a unique key. */
  deleteMigration?: Maybe<DeleteMigrationPayload>;
  /** Deletes a single `Migration` using a unique key. */
  deleteMigrationByName?: Maybe<DeleteMigrationPayload>;
  /** Deletes a single `Migration` using its globally unique id. */
  deleteMigrationByNodeId?: Maybe<DeleteMigrationPayload>;
  /** Deletes a single `Set` using a unique key. */
  deleteSet?: Maybe<DeleteSetPayload>;
  /** Deletes a single `Set` using its globally unique id. */
  deleteSetByNodeId?: Maybe<DeleteSetPayload>;
  /** Deletes a single `SplitWorkout` using a unique key. */
  deleteSplitWorkout?: Maybe<DeleteSplitWorkoutPayload>;
  /** Deletes a single `SplitWorkout` using its globally unique id. */
  deleteSplitWorkoutByNodeId?: Maybe<DeleteSplitWorkoutPayload>;
  /** Deletes a single `SplitWorkout` using a unique key. */
  deleteSplitWorkoutBySplitIdAndDayOfWeek?: Maybe<DeleteSplitWorkoutPayload>;
  /** Deletes a single `TemplateExercise` using a unique key. */
  deleteTemplateExercise?: Maybe<DeleteTemplateExercisePayload>;
  /** Deletes a single `TemplateExercise` using its globally unique id. */
  deleteTemplateExerciseByNodeId?: Maybe<DeleteTemplateExercisePayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByEmail?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUserByNodeId?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByUsername?: Maybe<DeleteUserPayload>;
  /** Deletes a single `UserCredential` using a unique key. */
  deleteUserCredential?: Maybe<DeleteUserCredentialPayload>;
  /** Deletes a single `UserCredential` using a unique key. */
  deleteUserCredentialByCredentialId?: Maybe<DeleteUserCredentialPayload>;
  /** Deletes a single `UserCredential` using its globally unique id. */
  deleteUserCredentialByNodeId?: Maybe<DeleteUserCredentialPayload>;
  /** Deletes a single `Workout` using a unique key. */
  deleteWorkout?: Maybe<DeleteWorkoutPayload>;
  /** Deletes a single `Workout` using its globally unique id. */
  deleteWorkoutByNodeId?: Maybe<DeleteWorkoutPayload>;
  /** Deletes a single `WorkoutExercise` using a unique key. */
  deleteWorkoutExercise?: Maybe<DeleteWorkoutExercisePayload>;
  /** Deletes a single `WorkoutExercise` using its globally unique id. */
  deleteWorkoutExerciseByNodeId?: Maybe<DeleteWorkoutExercisePayload>;
  /** Deletes a single `WorkoutSplit` using a unique key. */
  deleteWorkoutSplit?: Maybe<DeleteWorkoutSplitPayload>;
  /** Deletes a single `WorkoutSplit` using its globally unique id. */
  deleteWorkoutSplitByNodeId?: Maybe<DeleteWorkoutSplitPayload>;
  /** Deletes a single `WorkoutTemplate` using a unique key. */
  deleteWorkoutTemplate?: Maybe<DeleteWorkoutTemplatePayload>;
  /** Deletes a single `WorkoutTemplate` using its globally unique id. */
  deleteWorkoutTemplateByNodeId?: Maybe<DeleteWorkoutTemplatePayload>;
  registerUser: RegistrationOptions;
  seedTemplates: Scalars['Boolean']['output'];
  startAuthentication: AuthenticationOptions;
  syncTemplateFromWorkout: Scalars['Boolean']['output'];
  /** Updates a single `Exercise` using a unique key and a patch. */
  updateExercise?: Maybe<UpdateExercisePayload>;
  /** Updates a single `Exercise` using its globally unique id and a patch. */
  updateExerciseByNodeId?: Maybe<UpdateExercisePayload>;
  /** Updates a single `Migration` using a unique key and a patch. */
  updateMigration?: Maybe<UpdateMigrationPayload>;
  /** Updates a single `Migration` using a unique key and a patch. */
  updateMigrationByName?: Maybe<UpdateMigrationPayload>;
  /** Updates a single `Migration` using its globally unique id and a patch. */
  updateMigrationByNodeId?: Maybe<UpdateMigrationPayload>;
  /** Updates a single `Set` using a unique key and a patch. */
  updateSet?: Maybe<UpdateSetPayload>;
  /** Updates a single `Set` using its globally unique id and a patch. */
  updateSetByNodeId?: Maybe<UpdateSetPayload>;
  /** Updates a single `SplitWorkout` using a unique key and a patch. */
  updateSplitWorkout?: Maybe<UpdateSplitWorkoutPayload>;
  /** Updates a single `SplitWorkout` using its globally unique id and a patch. */
  updateSplitWorkoutByNodeId?: Maybe<UpdateSplitWorkoutPayload>;
  /** Updates a single `SplitWorkout` using a unique key and a patch. */
  updateSplitWorkoutBySplitIdAndDayOfWeek?: Maybe<UpdateSplitWorkoutPayload>;
  /** Updates a single `TemplateExercise` using a unique key and a patch. */
  updateTemplateExercise?: Maybe<UpdateTemplateExercisePayload>;
  /** Updates a single `TemplateExercise` using its globally unique id and a patch. */
  updateTemplateExerciseByNodeId?: Maybe<UpdateTemplateExercisePayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByEmail?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUserByNodeId?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByUsername?: Maybe<UpdateUserPayload>;
  /** Updates a single `UserCredential` using a unique key and a patch. */
  updateUserCredential?: Maybe<UpdateUserCredentialPayload>;
  /** Updates a single `UserCredential` using a unique key and a patch. */
  updateUserCredentialByCredentialId?: Maybe<UpdateUserCredentialPayload>;
  /** Updates a single `UserCredential` using its globally unique id and a patch. */
  updateUserCredentialByNodeId?: Maybe<UpdateUserCredentialPayload>;
  /** Updates a single `Workout` using a unique key and a patch. */
  updateWorkout?: Maybe<UpdateWorkoutPayload>;
  /** Updates a single `Workout` using its globally unique id and a patch. */
  updateWorkoutByNodeId?: Maybe<UpdateWorkoutPayload>;
  /** Updates a single `WorkoutExercise` using a unique key and a patch. */
  updateWorkoutExercise?: Maybe<UpdateWorkoutExercisePayload>;
  /** Updates a single `WorkoutExercise` using its globally unique id and a patch. */
  updateWorkoutExerciseByNodeId?: Maybe<UpdateWorkoutExercisePayload>;
  /** Updates a single `WorkoutSplit` using a unique key and a patch. */
  updateWorkoutSplit?: Maybe<UpdateWorkoutSplitPayload>;
  /** Updates a single `WorkoutSplit` using its globally unique id and a patch. */
  updateWorkoutSplitByNodeId?: Maybe<UpdateWorkoutSplitPayload>;
  /** Updates a single `WorkoutTemplate` using a unique key and a patch. */
  updateWorkoutTemplate?: Maybe<UpdateWorkoutTemplatePayload>;
  /** Updates a single `WorkoutTemplate` using its globally unique id and a patch. */
  updateWorkoutTemplateByNodeId?: Maybe<UpdateWorkoutTemplatePayload>;
  verifyAuthentication: AuthResult;
  verifyRegistration: AuthResult;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateExerciseArgs = {
  input: CreateExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMigrationArgs = {
  input: CreateMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSetArgs = {
  input: CreateSetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSplitWorkoutArgs = {
  input: CreateSplitWorkoutInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTemplateExerciseArgs = {
  input: CreateTemplateExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserCredentialArgs = {
  input: CreateUserCredentialInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWorkoutArgs = {
  input: CreateWorkoutInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWorkoutExerciseArgs = {
  input: CreateWorkoutExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWorkoutSplitArgs = {
  input: CreateWorkoutSplitInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWorkoutTemplateArgs = {
  input: CreateWorkoutTemplateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteExerciseArgs = {
  input: DeleteExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteExerciseByNodeIdArgs = {
  input: DeleteExerciseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMigrationArgs = {
  input: DeleteMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMigrationByNameArgs = {
  input: DeleteMigrationByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMigrationByNodeIdArgs = {
  input: DeleteMigrationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSetArgs = {
  input: DeleteSetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSetByNodeIdArgs = {
  input: DeleteSetByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSplitWorkoutArgs = {
  input: DeleteSplitWorkoutInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSplitWorkoutByNodeIdArgs = {
  input: DeleteSplitWorkoutByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSplitWorkoutBySplitIdAndDayOfWeekArgs = {
  input: DeleteSplitWorkoutBySplitIdAndDayOfWeekInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTemplateExerciseArgs = {
  input: DeleteTemplateExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTemplateExerciseByNodeIdArgs = {
  input: DeleteTemplateExerciseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByEmailArgs = {
  input: DeleteUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByNodeIdArgs = {
  input: DeleteUserByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByUsernameArgs = {
  input: DeleteUserByUsernameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserCredentialArgs = {
  input: DeleteUserCredentialInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserCredentialByCredentialIdArgs = {
  input: DeleteUserCredentialByCredentialIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserCredentialByNodeIdArgs = {
  input: DeleteUserCredentialByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutArgs = {
  input: DeleteWorkoutInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutByNodeIdArgs = {
  input: DeleteWorkoutByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutExerciseArgs = {
  input: DeleteWorkoutExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutExerciseByNodeIdArgs = {
  input: DeleteWorkoutExerciseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutSplitArgs = {
  input: DeleteWorkoutSplitInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutSplitByNodeIdArgs = {
  input: DeleteWorkoutSplitByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutTemplateArgs = {
  input: DeleteWorkoutTemplateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutTemplateByNodeIdArgs = {
  input: DeleteWorkoutTemplateByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterUserArgs = {
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationStartAuthenticationArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSyncTemplateFromWorkoutArgs = {
  workoutId: Scalars['UUID']['input'];
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateExerciseArgs = {
  input: UpdateExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateExerciseByNodeIdArgs = {
  input: UpdateExerciseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMigrationArgs = {
  input: UpdateMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMigrationByNameArgs = {
  input: UpdateMigrationByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMigrationByNodeIdArgs = {
  input: UpdateMigrationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSetArgs = {
  input: UpdateSetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSetByNodeIdArgs = {
  input: UpdateSetByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSplitWorkoutArgs = {
  input: UpdateSplitWorkoutInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSplitWorkoutByNodeIdArgs = {
  input: UpdateSplitWorkoutByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSplitWorkoutBySplitIdAndDayOfWeekArgs = {
  input: UpdateSplitWorkoutBySplitIdAndDayOfWeekInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTemplateExerciseArgs = {
  input: UpdateTemplateExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTemplateExerciseByNodeIdArgs = {
  input: UpdateTemplateExerciseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByEmailArgs = {
  input: UpdateUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByNodeIdArgs = {
  input: UpdateUserByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByUsernameArgs = {
  input: UpdateUserByUsernameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserCredentialArgs = {
  input: UpdateUserCredentialInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserCredentialByCredentialIdArgs = {
  input: UpdateUserCredentialByCredentialIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserCredentialByNodeIdArgs = {
  input: UpdateUserCredentialByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutArgs = {
  input: UpdateWorkoutInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutByNodeIdArgs = {
  input: UpdateWorkoutByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutExerciseArgs = {
  input: UpdateWorkoutExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutExerciseByNodeIdArgs = {
  input: UpdateWorkoutExerciseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutSplitArgs = {
  input: UpdateWorkoutSplitInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutSplitByNodeIdArgs = {
  input: UpdateWorkoutSplitByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutTemplateArgs = {
  input: UpdateWorkoutTemplateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutTemplateByNodeIdArgs = {
  input: UpdateWorkoutTemplateByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationVerifyAuthenticationArgs = {
  response: AuthenticationResponseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationVerifyRegistrationArgs = {
  email: Scalars['String']['input'];
  response: RegistrationResponseInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

export type PubKeyCredParam = {
  __typename?: 'PubKeyCredParam';
  alg: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  currentUserId?: Maybe<Scalars['UUID']['output']>;
  exercise?: Maybe<Exercise>;
  /** Reads a single `Exercise` using its globally unique `ID`. */
  exerciseByNodeId?: Maybe<Exercise>;
  /** Reads and enables pagination through a set of `Exercise`. */
  exercises?: Maybe<ExercisesConnection>;
  migration?: Maybe<Migration>;
  migrationByName?: Maybe<Migration>;
  /** Reads a single `Migration` using its globally unique `ID`. */
  migrationByNodeId?: Maybe<Migration>;
  /** Reads and enables pagination through a set of `Migration`. */
  migrations?: Maybe<MigrationsConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID']['output'];
  previousWorkoutFromSplit?: Maybe<Workout>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  set?: Maybe<Set>;
  /** Reads a single `Set` using its globally unique `ID`. */
  setByNodeId?: Maybe<Set>;
  /** Reads and enables pagination through a set of `Set`. */
  sets?: Maybe<SetsConnection>;
  splitWorkout?: Maybe<SplitWorkout>;
  /** Reads a single `SplitWorkout` using its globally unique `ID`. */
  splitWorkoutByNodeId?: Maybe<SplitWorkout>;
  splitWorkoutBySplitIdAndDayOfWeek?: Maybe<SplitWorkout>;
  /** Reads and enables pagination through a set of `SplitWorkout`. */
  splitWorkouts?: Maybe<SplitWorkoutsConnection>;
  templateExercise?: Maybe<TemplateExercise>;
  /** Reads a single `TemplateExercise` using its globally unique `ID`. */
  templateExerciseByNodeId?: Maybe<TemplateExercise>;
  /** Reads and enables pagination through a set of `TemplateExercise`. */
  templateExercises?: Maybe<TemplateExercisesConnection>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
  /** Reads a single `User` using its globally unique `ID`. */
  userByNodeId?: Maybe<User>;
  userByUsername?: Maybe<User>;
  userCredential?: Maybe<UserCredential>;
  userCredentialByCredentialId?: Maybe<UserCredential>;
  /** Reads a single `UserCredential` using its globally unique `ID`. */
  userCredentialByNodeId?: Maybe<UserCredential>;
  /** Reads and enables pagination through a set of `UserCredential`. */
  userCredentials?: Maybe<UserCredentialsConnection>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>;
  workout?: Maybe<Workout>;
  /** Reads a single `Workout` using its globally unique `ID`. */
  workoutByNodeId?: Maybe<Workout>;
  workoutExercise?: Maybe<WorkoutExercise>;
  /** Reads a single `WorkoutExercise` using its globally unique `ID`. */
  workoutExerciseByNodeId?: Maybe<WorkoutExercise>;
  /** Reads and enables pagination through a set of `WorkoutExercise`. */
  workoutExercises?: Maybe<WorkoutExercisesConnection>;
  workoutSplit?: Maybe<WorkoutSplit>;
  /** Reads a single `WorkoutSplit` using its globally unique `ID`. */
  workoutSplitByNodeId?: Maybe<WorkoutSplit>;
  /** Reads and enables pagination through a set of `WorkoutSplit`. */
  workoutSplits?: Maybe<WorkoutSplitsConnection>;
  workoutTemplate?: Maybe<WorkoutTemplate>;
  /** Reads a single `WorkoutTemplate` using its globally unique `ID`. */
  workoutTemplateByNodeId?: Maybe<WorkoutTemplate>;
  /** Reads and enables pagination through a set of `WorkoutTemplate`. */
  workoutTemplates?: Maybe<WorkoutTemplatesConnection>;
  /** Reads and enables pagination through a set of `Workout`. */
  workouts?: Maybe<WorkoutsConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryExerciseArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryExerciseByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryExercisesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ExerciseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExercisesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMigrationArgs = {
  id: Scalars['Int']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMigrationByNameArgs = {
  name: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMigrationByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMigrationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<MigrationCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MigrationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPreviousWorkoutFromSplitArgs = {
  dayOfWeek: Scalars['Int']['input'];
  splitId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySetArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySetByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SetCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SetsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySplitWorkoutArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySplitWorkoutByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySplitWorkoutBySplitIdAndDayOfWeekArgs = {
  dayOfWeek: Scalars['Int']['input'];
  splitId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySplitWorkoutsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SplitWorkoutCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SplitWorkoutsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTemplateExerciseArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTemplateExerciseByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTemplateExercisesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TemplateExerciseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TemplateExercisesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByUsernameArgs = {
  username: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserCredentialArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserCredentialByCredentialIdArgs = {
  credentialId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserCredentialByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserCredentialsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserCredentialCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserCredentialsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutExerciseArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutExerciseByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutExercisesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkoutExerciseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkoutExercisesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutSplitArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutSplitByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutSplitsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkoutSplitCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkoutSplitsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutTemplateArgs = {
  id: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutTemplateByNodeIdArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutTemplatesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkoutTemplateCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkoutTemplatesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkoutCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkoutsOrderBy>>;
};

export type RegistrationOptions = {
  __typename?: 'RegistrationOptions';
  attestation?: Maybe<Scalars['String']['output']>;
  authenticatorSelection?: Maybe<AuthenticatorSelection>;
  challenge: Scalars['String']['output'];
  pubKeyCredParams: Array<PubKeyCredParam>;
  rp: RegistrationOptionsRp;
  timeout?: Maybe<Scalars['Int']['output']>;
  user: RegistrationOptionsUser;
};

export type RegistrationOptionsRp = {
  __typename?: 'RegistrationOptionsRP';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type RegistrationOptionsUser = {
  __typename?: 'RegistrationOptionsUser';
  displayName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type RegistrationResponseInput = {
  authenticatorAttachment?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  rawId: Scalars['String']['input'];
  response: AuthenticatorAttestationResponseInput;
  type: Scalars['String']['input'];
};

export type Set = Node & {
  __typename?: 'Set';
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['Datetime']['output'];
  distance?: Maybe<Scalars['BigFloat']['output']>;
  durationSeconds?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  reps?: Maybe<Scalars['Int']['output']>;
  rpe?: Maybe<Scalars['BigFloat']['output']>;
  setNumber: Scalars['Int']['output'];
  weight?: Maybe<Scalars['BigFloat']['output']>;
  /** Reads a single `WorkoutExercise` that is related to this `Set`. */
  workoutExercise?: Maybe<WorkoutExercise>;
  workoutExerciseId: Scalars['UUID']['output'];
};

/** A condition to be used against `Set` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SetCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `setNumber` field. */
  setNumber?: InputMaybe<Scalars['Int']['input']>;
  /** Checks for equality with the object’s `workoutExerciseId` field. */
  workoutExerciseId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `Set` */
export type SetInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  distance?: InputMaybe<Scalars['BigFloat']['input']>;
  durationSeconds?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reps?: InputMaybe<Scalars['Int']['input']>;
  rpe?: InputMaybe<Scalars['BigFloat']['input']>;
  setNumber: Scalars['Int']['input'];
  weight?: InputMaybe<Scalars['BigFloat']['input']>;
  workoutExerciseId: Scalars['UUID']['input'];
};

/** Represents an update to a `Set`. Fields that are set will be updated. */
export type SetPatch = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  distance?: InputMaybe<Scalars['BigFloat']['input']>;
  durationSeconds?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  reps?: InputMaybe<Scalars['Int']['input']>;
  rpe?: InputMaybe<Scalars['BigFloat']['input']>;
  setNumber?: InputMaybe<Scalars['Int']['input']>;
  weight?: InputMaybe<Scalars['BigFloat']['input']>;
  workoutExerciseId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `Set` values. */
export type SetsConnection = {
  __typename?: 'SetsConnection';
  /** A list of edges which contains the `Set` and cursor to aid in pagination. */
  edges: Array<SetsEdge>;
  /** A list of `Set` objects. */
  nodes: Array<Set>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Set` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Set` edge in the connection. */
export type SetsEdge = {
  __typename?: 'SetsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Set` at the end of the edge. */
  node: Set;
};

/** Methods to use when ordering `Set`. */
export enum SetsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SetNumberAsc = 'SET_NUMBER_ASC',
  SetNumberDesc = 'SET_NUMBER_DESC',
  WorkoutExerciseIdAsc = 'WORKOUT_EXERCISE_ID_ASC',
  WorkoutExerciseIdDesc = 'WORKOUT_EXERCISE_ID_DESC'
}

export type SplitWorkout = Node & {
  __typename?: 'SplitWorkout';
  createdAt: Scalars['Datetime']['output'];
  dayOfWeek: Scalars['Int']['output'];
  id: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads a single `WorkoutSplit` that is related to this `SplitWorkout`. */
  split?: Maybe<WorkoutSplit>;
  splitId: Scalars['UUID']['output'];
  templateId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `SplitWorkout` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SplitWorkoutCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `splitId` field. */
  splitId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `SplitWorkout` */
export type SplitWorkoutInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  dayOfWeek: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  splitId: Scalars['UUID']['input'];
  templateId: Scalars['UUID']['input'];
};

/** Represents an update to a `SplitWorkout`. Fields that are set will be updated. */
export type SplitWorkoutPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  dayOfWeek?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  splitId?: InputMaybe<Scalars['UUID']['input']>;
  templateId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `SplitWorkout` values. */
export type SplitWorkoutsConnection = {
  __typename?: 'SplitWorkoutsConnection';
  /** A list of edges which contains the `SplitWorkout` and cursor to aid in pagination. */
  edges: Array<SplitWorkoutsEdge>;
  /** A list of `SplitWorkout` objects. */
  nodes: Array<SplitWorkout>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SplitWorkout` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `SplitWorkout` edge in the connection. */
export type SplitWorkoutsEdge = {
  __typename?: 'SplitWorkoutsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `SplitWorkout` at the end of the edge. */
  node: SplitWorkout;
};

/** Methods to use when ordering `SplitWorkout`. */
export enum SplitWorkoutsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SplitIdAsc = 'SPLIT_ID_ASC',
  SplitIdDesc = 'SPLIT_ID_DESC'
}

export type TemplateExercise = Node & {
  __typename?: 'TemplateExercise';
  createdAt: Scalars['Datetime']['output'];
  /** Reads a single `Exercise` that is related to this `TemplateExercise`. */
  exercise?: Maybe<Exercise>;
  exerciseId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  orderIndex: Scalars['Int']['output'];
  targetReps?: Maybe<Scalars['Int']['output']>;
  targetSets?: Maybe<Scalars['Int']['output']>;
  /** Reads a single `WorkoutTemplate` that is related to this `TemplateExercise`. */
  template?: Maybe<WorkoutTemplate>;
  templateId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `TemplateExercise` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type TemplateExerciseCondition = {
  /** Checks for equality with the object’s `exerciseId` field. */
  exerciseId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `templateId` field. */
  templateId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `TemplateExercise` */
export type TemplateExerciseInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  exerciseId: Scalars['UUID']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  orderIndex: Scalars['Int']['input'];
  targetReps?: InputMaybe<Scalars['Int']['input']>;
  targetSets?: InputMaybe<Scalars['Int']['input']>;
  templateId: Scalars['UUID']['input'];
};

/** Represents an update to a `TemplateExercise`. Fields that are set will be updated. */
export type TemplateExercisePatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  exerciseId?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  orderIndex?: InputMaybe<Scalars['Int']['input']>;
  targetReps?: InputMaybe<Scalars['Int']['input']>;
  targetSets?: InputMaybe<Scalars['Int']['input']>;
  templateId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `TemplateExercise` values. */
export type TemplateExercisesConnection = {
  __typename?: 'TemplateExercisesConnection';
  /** A list of edges which contains the `TemplateExercise` and cursor to aid in pagination. */
  edges: Array<TemplateExercisesEdge>;
  /** A list of `TemplateExercise` objects. */
  nodes: Array<TemplateExercise>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `TemplateExercise` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `TemplateExercise` edge in the connection. */
export type TemplateExercisesEdge = {
  __typename?: 'TemplateExercisesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `TemplateExercise` at the end of the edge. */
  node: TemplateExercise;
};

/** Methods to use when ordering `TemplateExercise`. */
export enum TemplateExercisesOrderBy {
  ExerciseIdAsc = 'EXERCISE_ID_ASC',
  ExerciseIdDesc = 'EXERCISE_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TemplateIdAsc = 'TEMPLATE_ID_ASC',
  TemplateIdDesc = 'TEMPLATE_ID_DESC'
}

/** All input for the `updateExerciseByNodeId` mutation. */
export type UpdateExerciseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Exercise` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Exercise` being updated. */
  patch: ExercisePatch;
};

/** All input for the `updateExercise` mutation. */
export type UpdateExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `Exercise` being updated. */
  patch: ExercisePatch;
};

/** The output of our update `Exercise` mutation. */
export type UpdateExercisePayload = {
  __typename?: 'UpdateExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Exercise` that was updated by this mutation. */
  exercise?: Maybe<Exercise>;
  /** An edge for our `Exercise`. May be used by Relay 1. */
  exerciseEdge?: Maybe<ExercisesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Exercise`. */
  user?: Maybe<User>;
};


/** The output of our update `Exercise` mutation. */
export type UpdateExercisePayloadExerciseEdgeArgs = {
  orderBy?: InputMaybe<Array<ExercisesOrderBy>>;
};

/** All input for the `updateMigrationByName` mutation. */
export type UpdateMigrationByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `Migration` being updated. */
  patch: MigrationPatch;
};

/** All input for the `updateMigrationByNodeId` mutation. */
export type UpdateMigrationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Migration` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Migration` being updated. */
  patch: MigrationPatch;
};

/** All input for the `updateMigration` mutation. */
export type UpdateMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `Migration` being updated. */
  patch: MigrationPatch;
};

/** The output of our update `Migration` mutation. */
export type UpdateMigrationPayload = {
  __typename?: 'UpdateMigrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** The `Migration` that was updated by this mutation. */
  migration?: Maybe<Migration>;
  /** An edge for our `Migration`. May be used by Relay 1. */
  migrationEdge?: Maybe<MigrationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Migration` mutation. */
export type UpdateMigrationPayloadMigrationEdgeArgs = {
  orderBy?: InputMaybe<Array<MigrationsOrderBy>>;
};

/** All input for the `updateSetByNodeId` mutation. */
export type UpdateSetByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Set` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Set` being updated. */
  patch: SetPatch;
};

/** All input for the `updateSet` mutation. */
export type UpdateSetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `Set` being updated. */
  patch: SetPatch;
};

/** The output of our update `Set` mutation. */
export type UpdateSetPayload = {
  __typename?: 'UpdateSetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Set` that was updated by this mutation. */
  set?: Maybe<Set>;
  /** An edge for our `Set`. May be used by Relay 1. */
  setEdge?: Maybe<SetsEdge>;
  /** Reads a single `WorkoutExercise` that is related to this `Set`. */
  workoutExercise?: Maybe<WorkoutExercise>;
};


/** The output of our update `Set` mutation. */
export type UpdateSetPayloadSetEdgeArgs = {
  orderBy?: InputMaybe<Array<SetsOrderBy>>;
};

/** All input for the `updateSplitWorkoutByNodeId` mutation. */
export type UpdateSplitWorkoutByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `SplitWorkout` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `SplitWorkout` being updated. */
  patch: SplitWorkoutPatch;
};

/** All input for the `updateSplitWorkoutBySplitIdAndDayOfWeek` mutation. */
export type UpdateSplitWorkoutBySplitIdAndDayOfWeekInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  dayOfWeek: Scalars['Int']['input'];
  /** An object where the defined keys will be set on the `SplitWorkout` being updated. */
  patch: SplitWorkoutPatch;
  splitId: Scalars['UUID']['input'];
};

/** All input for the `updateSplitWorkout` mutation. */
export type UpdateSplitWorkoutInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `SplitWorkout` being updated. */
  patch: SplitWorkoutPatch;
};

/** The output of our update `SplitWorkout` mutation. */
export type UpdateSplitWorkoutPayload = {
  __typename?: 'UpdateSplitWorkoutPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `WorkoutSplit` that is related to this `SplitWorkout`. */
  split?: Maybe<WorkoutSplit>;
  /** The `SplitWorkout` that was updated by this mutation. */
  splitWorkout?: Maybe<SplitWorkout>;
  /** An edge for our `SplitWorkout`. May be used by Relay 1. */
  splitWorkoutEdge?: Maybe<SplitWorkoutsEdge>;
};


/** The output of our update `SplitWorkout` mutation. */
export type UpdateSplitWorkoutPayloadSplitWorkoutEdgeArgs = {
  orderBy?: InputMaybe<Array<SplitWorkoutsOrderBy>>;
};

/** All input for the `updateTemplateExerciseByNodeId` mutation. */
export type UpdateTemplateExerciseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `TemplateExercise` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `TemplateExercise` being updated. */
  patch: TemplateExercisePatch;
};

/** All input for the `updateTemplateExercise` mutation. */
export type UpdateTemplateExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `TemplateExercise` being updated. */
  patch: TemplateExercisePatch;
};

/** The output of our update `TemplateExercise` mutation. */
export type UpdateTemplateExercisePayload = {
  __typename?: 'UpdateTemplateExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Exercise` that is related to this `TemplateExercise`. */
  exercise?: Maybe<Exercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `WorkoutTemplate` that is related to this `TemplateExercise`. */
  template?: Maybe<WorkoutTemplate>;
  /** The `TemplateExercise` that was updated by this mutation. */
  templateExercise?: Maybe<TemplateExercise>;
  /** An edge for our `TemplateExercise`. May be used by Relay 1. */
  templateExerciseEdge?: Maybe<TemplateExercisesEdge>;
};


/** The output of our update `TemplateExercise` mutation. */
export type UpdateTemplateExercisePayloadTemplateExerciseEdgeArgs = {
  orderBy?: InputMaybe<Array<TemplateExercisesOrderBy>>;
};

/** All input for the `updateUserByEmail` mutation. */
export type UpdateUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUserByNodeId` mutation. */
export type UpdateUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUserByUsername` mutation. */
export type UpdateUserByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  username: Scalars['String']['input'];
};

/** All input for the `updateUserCredentialByCredentialId` mutation. */
export type UpdateUserCredentialByCredentialIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  credentialId: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `UserCredential` being updated. */
  patch: UserCredentialPatch;
};

/** All input for the `updateUserCredentialByNodeId` mutation. */
export type UpdateUserCredentialByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `UserCredential` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `UserCredential` being updated. */
  patch: UserCredentialPatch;
};

/** All input for the `updateUserCredential` mutation. */
export type UpdateUserCredentialInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `UserCredential` being updated. */
  patch: UserCredentialPatch;
};

/** The output of our update `UserCredential` mutation. */
export type UpdateUserCredentialPayload = {
  __typename?: 'UpdateUserCredentialPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserCredential`. */
  user?: Maybe<User>;
  /** The `UserCredential` that was updated by this mutation. */
  userCredential?: Maybe<UserCredential>;
  /** An edge for our `UserCredential`. May be used by Relay 1. */
  userCredentialEdge?: Maybe<UserCredentialsEdge>;
};


/** The output of our update `UserCredential` mutation. */
export type UpdateUserCredentialPayloadUserCredentialEdgeArgs = {
  orderBy?: InputMaybe<Array<UserCredentialsOrderBy>>;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

/** All input for the `updateWorkoutByNodeId` mutation. */
export type UpdateWorkoutByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Workout` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Workout` being updated. */
  patch: WorkoutPatch;
};

/** All input for the `updateWorkoutExerciseByNodeId` mutation. */
export type UpdateWorkoutExerciseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WorkoutExercise` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `WorkoutExercise` being updated. */
  patch: WorkoutExercisePatch;
};

/** All input for the `updateWorkoutExercise` mutation. */
export type UpdateWorkoutExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `WorkoutExercise` being updated. */
  patch: WorkoutExercisePatch;
};

/** The output of our update `WorkoutExercise` mutation. */
export type UpdateWorkoutExercisePayload = {
  __typename?: 'UpdateWorkoutExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Reads a single `Exercise` that is related to this `WorkoutExercise`. */
  exercise?: Maybe<Exercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Workout` that is related to this `WorkoutExercise`. */
  workout?: Maybe<Workout>;
  /** The `WorkoutExercise` that was updated by this mutation. */
  workoutExercise?: Maybe<WorkoutExercise>;
  /** An edge for our `WorkoutExercise`. May be used by Relay 1. */
  workoutExerciseEdge?: Maybe<WorkoutExercisesEdge>;
};


/** The output of our update `WorkoutExercise` mutation. */
export type UpdateWorkoutExercisePayloadWorkoutExerciseEdgeArgs = {
  orderBy?: InputMaybe<Array<WorkoutExercisesOrderBy>>;
};

/** All input for the `updateWorkout` mutation. */
export type UpdateWorkoutInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `Workout` being updated. */
  patch: WorkoutPatch;
};

/** The output of our update `Workout` mutation. */
export type UpdateWorkoutPayload = {
  __typename?: 'UpdateWorkoutPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `WorkoutSplit` that is related to this `Workout`. */
  split?: Maybe<WorkoutSplit>;
  /** Reads a single `WorkoutTemplate` that is related to this `Workout`. */
  template?: Maybe<WorkoutTemplate>;
  /** Reads a single `User` that is related to this `Workout`. */
  user?: Maybe<User>;
  /** The `Workout` that was updated by this mutation. */
  workout?: Maybe<Workout>;
  /** An edge for our `Workout`. May be used by Relay 1. */
  workoutEdge?: Maybe<WorkoutsEdge>;
};


/** The output of our update `Workout` mutation. */
export type UpdateWorkoutPayloadWorkoutEdgeArgs = {
  orderBy?: InputMaybe<Array<WorkoutsOrderBy>>;
};

/** All input for the `updateWorkoutSplitByNodeId` mutation. */
export type UpdateWorkoutSplitByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WorkoutSplit` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `WorkoutSplit` being updated. */
  patch: WorkoutSplitPatch;
};

/** All input for the `updateWorkoutSplit` mutation. */
export type UpdateWorkoutSplitInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `WorkoutSplit` being updated. */
  patch: WorkoutSplitPatch;
};

/** The output of our update `WorkoutSplit` mutation. */
export type UpdateWorkoutSplitPayload = {
  __typename?: 'UpdateWorkoutSplitPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `WorkoutSplit`. */
  user?: Maybe<User>;
  /** The `WorkoutSplit` that was updated by this mutation. */
  workoutSplit?: Maybe<WorkoutSplit>;
  /** An edge for our `WorkoutSplit`. May be used by Relay 1. */
  workoutSplitEdge?: Maybe<WorkoutSplitsEdge>;
};


/** The output of our update `WorkoutSplit` mutation. */
export type UpdateWorkoutSplitPayloadWorkoutSplitEdgeArgs = {
  orderBy?: InputMaybe<Array<WorkoutSplitsOrderBy>>;
};

/** All input for the `updateWorkoutTemplateByNodeId` mutation. */
export type UpdateWorkoutTemplateByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `WorkoutTemplate` to be updated. */
  nodeId: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `WorkoutTemplate` being updated. */
  patch: WorkoutTemplatePatch;
};

/** All input for the `updateWorkoutTemplate` mutation. */
export type UpdateWorkoutTemplateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['UUID']['input'];
  /** An object where the defined keys will be set on the `WorkoutTemplate` being updated. */
  patch: WorkoutTemplatePatch;
};

/** The output of our update `WorkoutTemplate` mutation. */
export type UpdateWorkoutTemplatePayload = {
  __typename?: 'UpdateWorkoutTemplatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `WorkoutTemplate`. */
  user?: Maybe<User>;
  /** The `WorkoutTemplate` that was updated by this mutation. */
  workoutTemplate?: Maybe<WorkoutTemplate>;
  /** An edge for our `WorkoutTemplate`. May be used by Relay 1. */
  workoutTemplateEdge?: Maybe<WorkoutTemplatesEdge>;
};


/** The output of our update `WorkoutTemplate` mutation. */
export type UpdateWorkoutTemplatePayloadWorkoutTemplateEdgeArgs = {
  orderBy?: InputMaybe<Array<WorkoutTemplatesOrderBy>>;
};

export type User = Node & {
  __typename?: 'User';
  createdAt: Scalars['Datetime']['output'];
  email: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Exercise`. */
  exercises: ExercisesConnection;
  id: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  updatedAt: Scalars['Datetime']['output'];
  /** Reads and enables pagination through a set of `UserCredential`. */
  userCredentials: UserCredentialsConnection;
  username: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `WorkoutSplit`. */
  workoutSplits: WorkoutSplitsConnection;
  /** Reads and enables pagination through a set of `WorkoutTemplate`. */
  workoutTemplates: WorkoutTemplatesConnection;
  /** Reads and enables pagination through a set of `Workout`. */
  workouts: WorkoutsConnection;
};


export type UserExercisesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<ExerciseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExercisesOrderBy>>;
};


export type UserUserCredentialsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserCredentialCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserCredentialsOrderBy>>;
};


export type UserWorkoutSplitsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkoutSplitCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkoutSplitsOrderBy>>;
};


export type UserWorkoutTemplatesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkoutTemplateCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkoutTemplatesOrderBy>>;
};


export type UserWorkoutsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkoutCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkoutsOrderBy>>;
};

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `username` field. */
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UserCredential = Node & {
  __typename?: 'UserCredential';
  counter: Scalars['BigInt']['output'];
  createdAt: Scalars['Datetime']['output'];
  credentialId: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastUsedAt?: Maybe<Scalars['Datetime']['output']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  publicKey: Scalars['String']['output'];
  transports?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** Reads a single `User` that is related to this `UserCredential`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
};

/**
 * A condition to be used against `UserCredential` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UserCredentialCondition = {
  /** Checks for equality with the object’s `credentialId` field. */
  credentialId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `UserCredential` */
export type UserCredentialInput = {
  counter?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  credentialId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  lastUsedAt?: InputMaybe<Scalars['Datetime']['input']>;
  publicKey: Scalars['String']['input'];
  transports?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId: Scalars['UUID']['input'];
};

/** Represents an update to a `UserCredential`. Fields that are set will be updated. */
export type UserCredentialPatch = {
  counter?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  credentialId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  lastUsedAt?: InputMaybe<Scalars['Datetime']['input']>;
  publicKey?: InputMaybe<Scalars['String']['input']>;
  transports?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `UserCredential` values. */
export type UserCredentialsConnection = {
  __typename?: 'UserCredentialsConnection';
  /** A list of edges which contains the `UserCredential` and cursor to aid in pagination. */
  edges: Array<UserCredentialsEdge>;
  /** A list of `UserCredential` objects. */
  nodes: Array<UserCredential>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserCredential` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `UserCredential` edge in the connection. */
export type UserCredentialsEdge = {
  __typename?: 'UserCredentialsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `UserCredential` at the end of the edge. */
  node: UserCredential;
};

/** Methods to use when ordering `UserCredential`. */
export enum UserCredentialsOrderBy {
  CredentialIdAsc = 'CREDENTIAL_ID_ASC',
  CredentialIdDesc = 'CREDENTIAL_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** An input for mutations affecting `User` */
export type UserInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  username: Scalars['String']['input'];
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `User` values. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>;
  /** A list of `User` objects. */
  nodes: Array<User>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `User` at the end of the edge. */
  node: User;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC'
}

export type Workout = Node & {
  __typename?: 'Workout';
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['Datetime']['output'];
  date: Scalars['Date']['output'];
  durationMinutes?: Maybe<Scalars['Int']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  /** Reads a single `WorkoutSplit` that is related to this `Workout`. */
  split?: Maybe<WorkoutSplit>;
  /** The split this workout belongs to. Used for finding previous workouts from the same split. */
  splitId?: Maybe<Scalars['UUID']['output']>;
  /** Reads a single `WorkoutTemplate` that is related to this `Workout`. */
  template?: Maybe<WorkoutTemplate>;
  /** The template this workout was created from. Used for syncing changes back to template. */
  templateId?: Maybe<Scalars['UUID']['output']>;
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `User` that is related to this `Workout`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `WorkoutExercise`. */
  workoutExercises: WorkoutExercisesConnection;
};


export type WorkoutWorkoutExercisesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkoutExerciseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkoutExercisesOrderBy>>;
};

/** A condition to be used against `Workout` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type WorkoutCondition = {
  /** Checks for equality with the object’s `date` field. */
  date?: InputMaybe<Scalars['Date']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `splitId` field. */
  splitId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `templateId` field. */
  templateId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type WorkoutExercise = Node & {
  __typename?: 'WorkoutExercise';
  createdAt: Scalars['Datetime']['output'];
  /** Reads a single `Exercise` that is related to this `WorkoutExercise`. */
  exercise?: Maybe<Exercise>;
  exerciseId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  orderIndex: Scalars['Int']['output'];
  /** Reads and enables pagination through a set of `Set`. */
  sets: SetsConnection;
  /** Reads a single `Workout` that is related to this `WorkoutExercise`. */
  workout?: Maybe<Workout>;
  workoutId: Scalars['UUID']['output'];
};


export type WorkoutExerciseSetsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SetCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SetsOrderBy>>;
};

/**
 * A condition to be used against `WorkoutExercise` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type WorkoutExerciseCondition = {
  /** Checks for equality with the object’s `exerciseId` field. */
  exerciseId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `workoutId` field. */
  workoutId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `WorkoutExercise` */
export type WorkoutExerciseInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  exerciseId: Scalars['UUID']['input'];
  id?: InputMaybe<Scalars['UUID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  orderIndex: Scalars['Int']['input'];
  workoutId: Scalars['UUID']['input'];
};

/** Represents an update to a `WorkoutExercise`. Fields that are set will be updated. */
export type WorkoutExercisePatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  exerciseId?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  orderIndex?: InputMaybe<Scalars['Int']['input']>;
  workoutId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `WorkoutExercise` values. */
export type WorkoutExercisesConnection = {
  __typename?: 'WorkoutExercisesConnection';
  /** A list of edges which contains the `WorkoutExercise` and cursor to aid in pagination. */
  edges: Array<WorkoutExercisesEdge>;
  /** A list of `WorkoutExercise` objects. */
  nodes: Array<WorkoutExercise>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WorkoutExercise` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `WorkoutExercise` edge in the connection. */
export type WorkoutExercisesEdge = {
  __typename?: 'WorkoutExercisesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `WorkoutExercise` at the end of the edge. */
  node: WorkoutExercise;
};

/** Methods to use when ordering `WorkoutExercise`. */
export enum WorkoutExercisesOrderBy {
  ExerciseIdAsc = 'EXERCISE_ID_ASC',
  ExerciseIdDesc = 'EXERCISE_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  WorkoutIdAsc = 'WORKOUT_ID_ASC',
  WorkoutIdDesc = 'WORKOUT_ID_DESC'
}

/** An input for mutations affecting `Workout` */
export type WorkoutInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  durationMinutes?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  /** The split this workout belongs to. Used for finding previous workouts from the same split. */
  splitId?: InputMaybe<Scalars['UUID']['input']>;
  /** The template this workout was created from. Used for syncing changes back to template. */
  templateId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['UUID']['input'];
};

/** Represents an update to a `Workout`. Fields that are set will be updated. */
export type WorkoutPatch = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  date?: InputMaybe<Scalars['Date']['input']>;
  durationMinutes?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  /** The split this workout belongs to. Used for finding previous workouts from the same split. */
  splitId?: InputMaybe<Scalars['UUID']['input']>;
  /** The template this workout was created from. Used for syncing changes back to template. */
  templateId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type WorkoutSplit = Node & {
  __typename?: 'WorkoutSplit';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `SplitWorkout`. */
  splitWorkoutsBySplitId: SplitWorkoutsConnection;
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `User` that is related to this `WorkoutSplit`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Workout`. */
  workoutsBySplitId: WorkoutsConnection;
};


export type WorkoutSplitSplitWorkoutsBySplitIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SplitWorkoutCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SplitWorkoutsOrderBy>>;
};


export type WorkoutSplitWorkoutsBySplitIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkoutCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkoutsOrderBy>>;
};

/**
 * A condition to be used against `WorkoutSplit` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type WorkoutSplitCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `WorkoutSplit` */
export type WorkoutSplitInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['UUID']['input'];
};

/** Represents an update to a `WorkoutSplit`. Fields that are set will be updated. */
export type WorkoutSplitPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `WorkoutSplit` values. */
export type WorkoutSplitsConnection = {
  __typename?: 'WorkoutSplitsConnection';
  /** A list of edges which contains the `WorkoutSplit` and cursor to aid in pagination. */
  edges: Array<WorkoutSplitsEdge>;
  /** A list of `WorkoutSplit` objects. */
  nodes: Array<WorkoutSplit>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WorkoutSplit` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `WorkoutSplit` edge in the connection. */
export type WorkoutSplitsEdge = {
  __typename?: 'WorkoutSplitsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `WorkoutSplit` at the end of the edge. */
  node: WorkoutSplit;
};

/** Methods to use when ordering `WorkoutSplit`. */
export enum WorkoutSplitsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

export type WorkoutTemplate = Node & {
  __typename?: 'WorkoutTemplate';
  createdAt: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isPublic: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID']['output'];
  /** Reads and enables pagination through a set of `TemplateExercise`. */
  templateExercisesByTemplateId: TemplateExercisesConnection;
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `User` that is related to this `WorkoutTemplate`. */
  user?: Maybe<User>;
  userId: Scalars['UUID']['output'];
  /** Reads and enables pagination through a set of `Workout`. */
  workoutsByTemplateId: WorkoutsConnection;
};


export type WorkoutTemplateTemplateExercisesByTemplateIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TemplateExerciseCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TemplateExercisesOrderBy>>;
};


export type WorkoutTemplateWorkoutsByTemplateIdArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<WorkoutCondition>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkoutsOrderBy>>;
};

/**
 * A condition to be used against `WorkoutTemplate` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type WorkoutTemplateCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** An input for mutations affecting `WorkoutTemplate` */
export type WorkoutTemplateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['UUID']['input'];
};

/** Represents an update to a `WorkoutTemplate`. Fields that are set will be updated. */
export type WorkoutTemplatePatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

/** A connection to a list of `WorkoutTemplate` values. */
export type WorkoutTemplatesConnection = {
  __typename?: 'WorkoutTemplatesConnection';
  /** A list of edges which contains the `WorkoutTemplate` and cursor to aid in pagination. */
  edges: Array<WorkoutTemplatesEdge>;
  /** A list of `WorkoutTemplate` objects. */
  nodes: Array<WorkoutTemplate>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WorkoutTemplate` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `WorkoutTemplate` edge in the connection. */
export type WorkoutTemplatesEdge = {
  __typename?: 'WorkoutTemplatesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `WorkoutTemplate` at the end of the edge. */
  node: WorkoutTemplate;
};

/** Methods to use when ordering `WorkoutTemplate`. */
export enum WorkoutTemplatesOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** A connection to a list of `Workout` values. */
export type WorkoutsConnection = {
  __typename?: 'WorkoutsConnection';
  /** A list of edges which contains the `Workout` and cursor to aid in pagination. */
  edges: Array<WorkoutsEdge>;
  /** A list of `Workout` objects. */
  nodes: Array<Workout>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Workout` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Workout` edge in the connection. */
export type WorkoutsEdge = {
  __typename?: 'WorkoutsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Workout` at the end of the edge. */
  node: Workout;
};

/** Methods to use when ordering `Workout`. */
export enum WorkoutsOrderBy {
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SplitIdAsc = 'SPLIT_ID_ASC',
  SplitIdDesc = 'SPLIT_ID_DESC',
  TemplateIdAsc = 'TEMPLATE_ID_ASC',
  TemplateIdDesc = 'TEMPLATE_ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

export type ExerciseFieldsFragment = { __typename?: 'Exercise', id: any, name: string, description?: string | null, category?: string | null, muscleGroups?: Array<string | null> | null, createdAt: any };

export type TemplateFieldsFragment = { __typename?: 'WorkoutTemplate', id: any, name: string, description?: string | null, createdAt: any, templateExercisesByTemplateId: { __typename?: 'TemplateExercisesConnection', totalCount: number } };

export type SplitFieldsFragment = { __typename?: 'WorkoutSplit', id: any, name: string, isActive: boolean, createdAt: any, splitWorkoutsBySplitId: { __typename?: 'SplitWorkoutsConnection', totalCount: number } };

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'RegistrationOptions', challenge: string, timeout?: number | null, attestation?: string | null, rp: { __typename?: 'RegistrationOptionsRP', name: string, id: string }, user: { __typename?: 'RegistrationOptionsUser', id: string, name: string, displayName: string }, pubKeyCredParams: Array<{ __typename?: 'PubKeyCredParam', alg: number, type: string }>, authenticatorSelection?: { __typename?: 'AuthenticatorSelection', authenticatorAttachment?: string | null, residentKey?: string | null, userVerification?: string | null } | null } };

export type VerifyRegistrationMutationVariables = Exact<{
  email: Scalars['String']['input'];
  response: RegistrationResponseInput;
}>;


export type VerifyRegistrationMutation = { __typename?: 'Mutation', verifyRegistration: { __typename?: 'AuthResult', token: string, user: { __typename?: 'User', id: any, email: string, username: string } } };

export type StartAuthenticationMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
}>;


export type StartAuthenticationMutation = { __typename?: 'Mutation', startAuthentication: { __typename?: 'AuthenticationOptions', challenge: string, timeout?: number | null, rpId: string, userVerification?: string | null, allowCredentials?: Array<{ __typename?: 'AllowCredential', id: string, type: string, transports?: Array<string> | null }> | null } };

export type VerifyAuthenticationMutationVariables = Exact<{
  response: AuthenticationResponseInput;
}>;


export type VerifyAuthenticationMutation = { __typename?: 'Mutation', verifyAuthentication: { __typename?: 'AuthResult', token: string, user: { __typename?: 'User', id: any, email: string, username: string } } };

export type RecentWorkoutsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentWorkoutsQuery = { __typename?: 'Query', workouts?: { __typename?: 'WorkoutsConnection', nodes: Array<{ __typename?: 'Workout', id: any, name: string, date: any, completed: boolean, durationMinutes?: number | null }> } | null };

export type DashboardStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type DashboardStatsQuery = { __typename?: 'Query', workouts?: { __typename?: 'WorkoutsConnection', totalCount: number } | null, exercises?: { __typename?: 'ExercisesConnection', totalCount: number } | null };

export type TodayWorkoutQueryVariables = Exact<{ [key: string]: never; }>;


export type TodayWorkoutQuery = { __typename?: 'Query', workoutSplits?: { __typename?: 'WorkoutSplitsConnection', nodes: Array<{ __typename?: 'WorkoutSplit', id: any, name: string, isActive: boolean, splitWorkoutsBySplitId: { __typename?: 'SplitWorkoutsConnection', nodes: Array<{ __typename?: 'SplitWorkout', id: any, dayOfWeek: number, templateId: any }> } }> } | null, workoutTemplates?: { __typename?: 'WorkoutTemplatesConnection', nodes: Array<{ __typename?: 'WorkoutTemplate', id: any, name: string, description?: string | null, templateExercisesByTemplateId: { __typename?: 'TemplateExercisesConnection', totalCount: number, nodes: Array<{ __typename?: 'TemplateExercise', exercise?: { __typename?: 'Exercise', name: string } | null }> } }> } | null };

export type SeedTemplatesMutationVariables = Exact<{ [key: string]: never; }>;


export type SeedTemplatesMutation = { __typename?: 'Mutation', seedTemplates: boolean };

export type DeleteWorkoutMutationVariables = Exact<{
  input: DeleteWorkoutInput;
}>;


export type DeleteWorkoutMutation = { __typename?: 'Mutation', deleteWorkout?: { __typename?: 'DeleteWorkoutPayload', workout?: { __typename?: 'Workout', id: any } | null } | null };

export type ExercisesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExercisesQuery = { __typename?: 'Query', exercises?: { __typename?: 'ExercisesConnection', nodes: Array<{ __typename?: 'Exercise', id: any, name: string, description?: string | null, category?: string | null, muscleGroups?: Array<string | null> | null, createdAt: any }> } | null };

export type CreateExerciseMutationVariables = Exact<{
  input: CreateExerciseInput;
}>;


export type CreateExerciseMutation = { __typename?: 'Mutation', createExercise?: { __typename?: 'CreateExercisePayload', exercise?: { __typename?: 'Exercise', id: any, name: string, description?: string | null, category?: string | null, muscleGroups?: Array<string | null> | null } | null } | null };

export type DeleteExerciseMutationVariables = Exact<{
  input: DeleteExerciseInput;
}>;


export type DeleteExerciseMutation = { __typename?: 'Mutation', deleteExercise?: { __typename?: 'DeleteExercisePayload', exercise?: { __typename?: 'Exercise', id: any } | null } | null };

export type GetSplitQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetSplitQuery = { __typename?: 'Query', workoutSplit?: { __typename?: 'WorkoutSplit', id: any, name: string, isActive: boolean, splitWorkoutsBySplitId: { __typename?: 'SplitWorkoutsConnection', nodes: Array<{ __typename?: 'SplitWorkout', id: any, dayOfWeek: number, templateId: any }> } } | null };

export type TemplatesForSplitQueryVariables = Exact<{ [key: string]: never; }>;


export type TemplatesForSplitQuery = { __typename?: 'Query', workoutTemplates?: { __typename?: 'WorkoutTemplatesConnection', nodes: Array<{ __typename?: 'WorkoutTemplate', id: any, name: string, description?: string | null }> } | null };

export type CreateSplitMutationVariables = Exact<{
  input: CreateWorkoutSplitInput;
}>;


export type CreateSplitMutation = { __typename?: 'Mutation', createWorkoutSplit?: { __typename?: 'CreateWorkoutSplitPayload', workoutSplit?: { __typename?: 'WorkoutSplit', id: any } | null } | null };

export type CreateSplitWorkoutMutationVariables = Exact<{
  input: CreateSplitWorkoutInput;
}>;


export type CreateSplitWorkoutMutation = { __typename?: 'Mutation', createSplitWorkout?: { __typename?: 'CreateSplitWorkoutPayload', splitWorkout?: { __typename?: 'SplitWorkout', id: any } | null } | null };

export type DeleteSplitWorkoutMutationVariables = Exact<{
  input: DeleteSplitWorkoutInput;
}>;


export type DeleteSplitWorkoutMutation = { __typename?: 'Mutation', deleteSplitWorkout?: { __typename?: 'DeleteSplitWorkoutPayload', splitWorkout?: { __typename?: 'SplitWorkout', id: any } | null } | null };

export type SplitsQueryVariables = Exact<{ [key: string]: never; }>;


export type SplitsQuery = { __typename?: 'Query', workoutSplits?: { __typename?: 'WorkoutSplitsConnection', nodes: Array<{ __typename?: 'WorkoutSplit', id: any, name: string, isActive: boolean, createdAt: any, splitWorkoutsBySplitId: { __typename?: 'SplitWorkoutsConnection', totalCount: number } }> } | null };

export type DeleteSplitMutationVariables = Exact<{
  input: DeleteWorkoutSplitInput;
}>;


export type DeleteSplitMutation = { __typename?: 'Mutation', deleteWorkoutSplit?: { __typename?: 'DeleteWorkoutSplitPayload', workoutSplit?: { __typename?: 'WorkoutSplit', id: any } | null } | null };

export type ActivateSplitMutationVariables = Exact<{
  input: UpdateWorkoutSplitInput;
}>;


export type ActivateSplitMutation = { __typename?: 'Mutation', updateWorkoutSplit?: { __typename?: 'UpdateWorkoutSplitPayload', workoutSplit?: { __typename?: 'WorkoutSplit', id: any, isActive: boolean } | null } | null };

export type GetTemplateQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetTemplateQuery = { __typename?: 'Query', workoutTemplate?: { __typename?: 'WorkoutTemplate', id: any, name: string, description?: string | null, templateExercisesByTemplateId: { __typename?: 'TemplateExercisesConnection', nodes: Array<{ __typename?: 'TemplateExercise', id: any, exerciseId: any, orderIndex: number, targetSets?: number | null, targetReps?: number | null, notes?: string | null, exercise?: { __typename?: 'Exercise', id: any, name: string } | null }> } } | null };

export type ExercisesForTemplateQueryVariables = Exact<{ [key: string]: never; }>;


export type ExercisesForTemplateQuery = { __typename?: 'Query', exercises?: { __typename?: 'ExercisesConnection', nodes: Array<{ __typename?: 'Exercise', id: any, name: string }> } | null };

export type CreateTemplateMutationVariables = Exact<{
  input: CreateWorkoutTemplateInput;
}>;


export type CreateTemplateMutation = { __typename?: 'Mutation', createWorkoutTemplate?: { __typename?: 'CreateWorkoutTemplatePayload', workoutTemplate?: { __typename?: 'WorkoutTemplate', id: any } | null } | null };

export type CreateTemplateExerciseMutationVariables = Exact<{
  input: CreateTemplateExerciseInput;
}>;


export type CreateTemplateExerciseMutation = { __typename?: 'Mutation', createTemplateExercise?: { __typename?: 'CreateTemplateExercisePayload', templateExercise?: { __typename?: 'TemplateExercise', id: any } | null } | null };

export type TemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type TemplatesQuery = { __typename?: 'Query', workoutTemplates?: { __typename?: 'WorkoutTemplatesConnection', nodes: Array<{ __typename?: 'WorkoutTemplate', id: any, name: string, description?: string | null, createdAt: any, templateExercisesByTemplateId: { __typename?: 'TemplateExercisesConnection', totalCount: number } }> } | null };

export type DeleteTemplateMutationVariables = Exact<{
  input: DeleteWorkoutTemplateInput;
}>;


export type DeleteTemplateMutation = { __typename?: 'Mutation', deleteWorkoutTemplate?: { __typename?: 'DeleteWorkoutTemplatePayload', workoutTemplate?: { __typename?: 'WorkoutTemplate', id: any } | null } | null };

export type SyncTemplateFromWorkoutMutationVariables = Exact<{
  workoutId: Scalars['UUID']['input'];
}>;


export type SyncTemplateFromWorkoutMutation = { __typename?: 'Mutation', syncTemplateFromWorkout: boolean };

export type GetWorkoutQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetWorkoutQuery = { __typename?: 'Query', workout?: { __typename?: 'Workout', id: any, name: string, date: any, notes?: string | null, completed: boolean, durationMinutes?: number | null, templateId?: any | null, splitId?: any | null, workoutExercises: { __typename?: 'WorkoutExercisesConnection', nodes: Array<{ __typename?: 'WorkoutExercise', id: any, orderIndex: number, notes?: string | null, exercise?: { __typename?: 'Exercise', id: any, name: string } | null, sets: { __typename?: 'SetsConnection', nodes: Array<{ __typename?: 'Set', id: any, setNumber: number, weight?: any | null, reps?: number | null, rpe?: any | null, completed: boolean, notes?: string | null }> } }> } } | null };

export type PreviousWorkoutFromSplitQueryVariables = Exact<{
  splitId: Scalars['UUID']['input'];
  dayOfWeek: Scalars['Int']['input'];
}>;


export type PreviousWorkoutFromSplitQuery = { __typename?: 'Query', previousWorkoutFromSplit?: { __typename?: 'Workout', id: any, workoutExercises: { __typename?: 'WorkoutExercisesConnection', nodes: Array<{ __typename?: 'WorkoutExercise', exercise?: { __typename?: 'Exercise', id: any, name: string } | null, sets: { __typename?: 'SetsConnection', nodes: Array<{ __typename?: 'Set', setNumber: number, weight?: any | null, reps?: number | null, rpe?: any | null }> } }> } } | null };

export type ExercisesForWorkoutQueryVariables = Exact<{ [key: string]: never; }>;


export type ExercisesForWorkoutQuery = { __typename?: 'Query', exercises?: { __typename?: 'ExercisesConnection', nodes: Array<{ __typename?: 'Exercise', id: any, name: string }> } | null };

export type AddExerciseToWorkoutMutationVariables = Exact<{
  input: CreateWorkoutExerciseInput;
}>;


export type AddExerciseToWorkoutMutation = { __typename?: 'Mutation', createWorkoutExercise?: { __typename?: 'CreateWorkoutExercisePayload', workoutExercise?: { __typename?: 'WorkoutExercise', id: any } | null } | null };

export type AddSetMutationVariables = Exact<{
  input: CreateSetInput;
}>;


export type AddSetMutation = { __typename?: 'Mutation', createSet?: { __typename?: 'CreateSetPayload', set?: { __typename?: 'Set', id: any } | null } | null };

export type UpdateSetMutationVariables = Exact<{
  input: UpdateSetInput;
}>;


export type UpdateSetMutation = { __typename?: 'Mutation', updateSet?: { __typename?: 'UpdateSetPayload', set?: { __typename?: 'Set', id: any, weight?: any | null, reps?: number | null, rpe?: any | null, completed: boolean } | null } | null };

export type UpdateWorkoutMutationVariables = Exact<{
  input: UpdateWorkoutInput;
}>;


export type UpdateWorkoutMutation = { __typename?: 'Mutation', updateWorkout?: { __typename?: 'UpdateWorkoutPayload', workout?: { __typename?: 'Workout', id: any, completed: boolean } | null } | null };

export type WorkoutsQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkoutsQuery = { __typename?: 'Query', workouts?: { __typename?: 'WorkoutsConnection', nodes: Array<{ __typename?: 'Workout', id: any, name: string, date: any, notes?: string | null, completed: boolean, durationMinutes?: number | null, workoutExercises: { __typename?: 'WorkoutExercisesConnection', totalCount: number } }> } | null };

export type GetTemplateForWorkoutQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type GetTemplateForWorkoutQuery = { __typename?: 'Query', workoutTemplate?: { __typename?: 'WorkoutTemplate', id: any, name: string, templateExercisesByTemplateId: { __typename?: 'TemplateExercisesConnection', nodes: Array<{ __typename?: 'TemplateExercise', exerciseId: any, orderIndex: number, targetSets?: number | null, targetReps?: number | null, notes?: string | null }> } } | null };

export type CreateWorkoutMutationVariables = Exact<{
  input: CreateWorkoutInput;
}>;


export type CreateWorkoutMutation = { __typename?: 'Mutation', createWorkout?: { __typename?: 'CreateWorkoutPayload', workout?: { __typename?: 'Workout', id: any, name: string, date: any } | null } | null };

export type AddWorkoutExerciseMutationVariables = Exact<{
  input: CreateWorkoutExerciseInput;
}>;


export type AddWorkoutExerciseMutation = { __typename?: 'Mutation', createWorkoutExercise?: { __typename?: 'CreateWorkoutExercisePayload', workoutExercise?: { __typename?: 'WorkoutExercise', id: any } | null } | null };

export type AddSetFromTemplateMutationVariables = Exact<{
  input: CreateSetInput;
}>;


export type AddSetFromTemplateMutation = { __typename?: 'Mutation', createSet?: { __typename?: 'CreateSetPayload', set?: { __typename?: 'Set', id: any } | null } | null };

export type TemplatesForWorkoutQueryVariables = Exact<{ [key: string]: never; }>;


export type TemplatesForWorkoutQuery = { __typename?: 'Query', workoutTemplates?: { __typename?: 'WorkoutTemplatesConnection', nodes: Array<{ __typename?: 'WorkoutTemplate', id: any, name: string, description?: string | null, templateExercisesByTemplateId: { __typename?: 'TemplateExercisesConnection', totalCount: number } }> } | null };

export const ExerciseFieldsFragmentDoc = gql`
    fragment ExerciseFields on Exercise {
  id
  name
  description
  category
  muscleGroups
  createdAt
}
    `;
export const TemplateFieldsFragmentDoc = gql`
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
export const SplitFieldsFragmentDoc = gql`
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
export const RegisterUserDocument = gql`
    mutation RegisterUser($email: String!, $username: String!) {
  registerUser(email: $email, username: $username) {
    challenge
    rp {
      name
      id
    }
    user {
      id
      name
      displayName
    }
    pubKeyCredParams {
      alg
      type
    }
    timeout
    attestation
    authenticatorSelection {
      authenticatorAttachment
      residentKey
      userVerification
    }
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const VerifyRegistrationDocument = gql`
    mutation VerifyRegistration($email: String!, $response: RegistrationResponseInput!) {
  verifyRegistration(email: $email, response: $response) {
    token
    user {
      id
      email
      username
    }
  }
}
    `;
export type VerifyRegistrationMutationFn = Apollo.MutationFunction<VerifyRegistrationMutation, VerifyRegistrationMutationVariables>;

/**
 * __useVerifyRegistrationMutation__
 *
 * To run a mutation, you first call `useVerifyRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyRegistrationMutation, { data, loading, error }] = useVerifyRegistrationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      response: // value for 'response'
 *   },
 * });
 */
export function useVerifyRegistrationMutation(baseOptions?: Apollo.MutationHookOptions<VerifyRegistrationMutation, VerifyRegistrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyRegistrationMutation, VerifyRegistrationMutationVariables>(VerifyRegistrationDocument, options);
      }
export type VerifyRegistrationMutationHookResult = ReturnType<typeof useVerifyRegistrationMutation>;
export type VerifyRegistrationMutationResult = Apollo.MutationResult<VerifyRegistrationMutation>;
export type VerifyRegistrationMutationOptions = Apollo.BaseMutationOptions<VerifyRegistrationMutation, VerifyRegistrationMutationVariables>;
export const StartAuthenticationDocument = gql`
    mutation StartAuthentication($email: String) {
  startAuthentication(email: $email) {
    challenge
    timeout
    rpId
    userVerification
    allowCredentials {
      id
      type
      transports
    }
  }
}
    `;
export type StartAuthenticationMutationFn = Apollo.MutationFunction<StartAuthenticationMutation, StartAuthenticationMutationVariables>;

/**
 * __useStartAuthenticationMutation__
 *
 * To run a mutation, you first call `useStartAuthenticationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartAuthenticationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startAuthenticationMutation, { data, loading, error }] = useStartAuthenticationMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useStartAuthenticationMutation(baseOptions?: Apollo.MutationHookOptions<StartAuthenticationMutation, StartAuthenticationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartAuthenticationMutation, StartAuthenticationMutationVariables>(StartAuthenticationDocument, options);
      }
export type StartAuthenticationMutationHookResult = ReturnType<typeof useStartAuthenticationMutation>;
export type StartAuthenticationMutationResult = Apollo.MutationResult<StartAuthenticationMutation>;
export type StartAuthenticationMutationOptions = Apollo.BaseMutationOptions<StartAuthenticationMutation, StartAuthenticationMutationVariables>;
export const VerifyAuthenticationDocument = gql`
    mutation VerifyAuthentication($response: AuthenticationResponseInput!) {
  verifyAuthentication(response: $response) {
    token
    user {
      id
      email
      username
    }
  }
}
    `;
export type VerifyAuthenticationMutationFn = Apollo.MutationFunction<VerifyAuthenticationMutation, VerifyAuthenticationMutationVariables>;

/**
 * __useVerifyAuthenticationMutation__
 *
 * To run a mutation, you first call `useVerifyAuthenticationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyAuthenticationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyAuthenticationMutation, { data, loading, error }] = useVerifyAuthenticationMutation({
 *   variables: {
 *      response: // value for 'response'
 *   },
 * });
 */
export function useVerifyAuthenticationMutation(baseOptions?: Apollo.MutationHookOptions<VerifyAuthenticationMutation, VerifyAuthenticationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyAuthenticationMutation, VerifyAuthenticationMutationVariables>(VerifyAuthenticationDocument, options);
      }
export type VerifyAuthenticationMutationHookResult = ReturnType<typeof useVerifyAuthenticationMutation>;
export type VerifyAuthenticationMutationResult = Apollo.MutationResult<VerifyAuthenticationMutation>;
export type VerifyAuthenticationMutationOptions = Apollo.BaseMutationOptions<VerifyAuthenticationMutation, VerifyAuthenticationMutationVariables>;
export const RecentWorkoutsDocument = gql`
    query RecentWorkouts {
  workouts(first: 5, orderBy: DATE_DESC) {
    nodes {
      id
      name
      date
      completed
      durationMinutes
    }
  }
}
    `;

/**
 * __useRecentWorkoutsQuery__
 *
 * To run a query within a React component, call `useRecentWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentWorkoutsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecentWorkoutsQuery(baseOptions?: Apollo.QueryHookOptions<RecentWorkoutsQuery, RecentWorkoutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecentWorkoutsQuery, RecentWorkoutsQueryVariables>(RecentWorkoutsDocument, options);
      }
export function useRecentWorkoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentWorkoutsQuery, RecentWorkoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecentWorkoutsQuery, RecentWorkoutsQueryVariables>(RecentWorkoutsDocument, options);
        }
export function useRecentWorkoutsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RecentWorkoutsQuery, RecentWorkoutsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RecentWorkoutsQuery, RecentWorkoutsQueryVariables>(RecentWorkoutsDocument, options);
        }
export type RecentWorkoutsQueryHookResult = ReturnType<typeof useRecentWorkoutsQuery>;
export type RecentWorkoutsLazyQueryHookResult = ReturnType<typeof useRecentWorkoutsLazyQuery>;
export type RecentWorkoutsSuspenseQueryHookResult = ReturnType<typeof useRecentWorkoutsSuspenseQuery>;
export type RecentWorkoutsQueryResult = Apollo.QueryResult<RecentWorkoutsQuery, RecentWorkoutsQueryVariables>;
export const DashboardStatsDocument = gql`
    query DashboardStats {
  workouts {
    totalCount
  }
  exercises {
    totalCount
  }
}
    `;

/**
 * __useDashboardStatsQuery__
 *
 * To run a query within a React component, call `useDashboardStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashboardStatsQuery(baseOptions?: Apollo.QueryHookOptions<DashboardStatsQuery, DashboardStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardStatsQuery, DashboardStatsQueryVariables>(DashboardStatsDocument, options);
      }
export function useDashboardStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardStatsQuery, DashboardStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardStatsQuery, DashboardStatsQueryVariables>(DashboardStatsDocument, options);
        }
export function useDashboardStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<DashboardStatsQuery, DashboardStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DashboardStatsQuery, DashboardStatsQueryVariables>(DashboardStatsDocument, options);
        }
export type DashboardStatsQueryHookResult = ReturnType<typeof useDashboardStatsQuery>;
export type DashboardStatsLazyQueryHookResult = ReturnType<typeof useDashboardStatsLazyQuery>;
export type DashboardStatsSuspenseQueryHookResult = ReturnType<typeof useDashboardStatsSuspenseQuery>;
export type DashboardStatsQueryResult = Apollo.QueryResult<DashboardStatsQuery, DashboardStatsQueryVariables>;
export const TodayWorkoutDocument = gql`
    query TodayWorkout {
  workoutSplits(orderBy: NATURAL) {
    nodes {
      id
      name
      isActive
      splitWorkoutsBySplitId {
        nodes {
          id
          dayOfWeek
          templateId
        }
      }
    }
  }
  workoutTemplates(orderBy: NATURAL) {
    nodes {
      id
      name
      description
      templateExercisesByTemplateId {
        totalCount
        nodes {
          exercise {
            name
          }
        }
      }
    }
  }
}
    `;

/**
 * __useTodayWorkoutQuery__
 *
 * To run a query within a React component, call `useTodayWorkoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodayWorkoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodayWorkoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useTodayWorkoutQuery(baseOptions?: Apollo.QueryHookOptions<TodayWorkoutQuery, TodayWorkoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TodayWorkoutQuery, TodayWorkoutQueryVariables>(TodayWorkoutDocument, options);
      }
export function useTodayWorkoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodayWorkoutQuery, TodayWorkoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TodayWorkoutQuery, TodayWorkoutQueryVariables>(TodayWorkoutDocument, options);
        }
export function useTodayWorkoutSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TodayWorkoutQuery, TodayWorkoutQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TodayWorkoutQuery, TodayWorkoutQueryVariables>(TodayWorkoutDocument, options);
        }
export type TodayWorkoutQueryHookResult = ReturnType<typeof useTodayWorkoutQuery>;
export type TodayWorkoutLazyQueryHookResult = ReturnType<typeof useTodayWorkoutLazyQuery>;
export type TodayWorkoutSuspenseQueryHookResult = ReturnType<typeof useTodayWorkoutSuspenseQuery>;
export type TodayWorkoutQueryResult = Apollo.QueryResult<TodayWorkoutQuery, TodayWorkoutQueryVariables>;
export const SeedTemplatesDocument = gql`
    mutation SeedTemplates {
  seedTemplates
}
    `;
export type SeedTemplatesMutationFn = Apollo.MutationFunction<SeedTemplatesMutation, SeedTemplatesMutationVariables>;

/**
 * __useSeedTemplatesMutation__
 *
 * To run a mutation, you first call `useSeedTemplatesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSeedTemplatesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [seedTemplatesMutation, { data, loading, error }] = useSeedTemplatesMutation({
 *   variables: {
 *   },
 * });
 */
export function useSeedTemplatesMutation(baseOptions?: Apollo.MutationHookOptions<SeedTemplatesMutation, SeedTemplatesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SeedTemplatesMutation, SeedTemplatesMutationVariables>(SeedTemplatesDocument, options);
      }
export type SeedTemplatesMutationHookResult = ReturnType<typeof useSeedTemplatesMutation>;
export type SeedTemplatesMutationResult = Apollo.MutationResult<SeedTemplatesMutation>;
export type SeedTemplatesMutationOptions = Apollo.BaseMutationOptions<SeedTemplatesMutation, SeedTemplatesMutationVariables>;
export const DeleteWorkoutDocument = gql`
    mutation DeleteWorkout($input: DeleteWorkoutInput!) {
  deleteWorkout(input: $input) {
    workout {
      id
    }
  }
}
    `;
export type DeleteWorkoutMutationFn = Apollo.MutationFunction<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>;

/**
 * __useDeleteWorkoutMutation__
 *
 * To run a mutation, you first call `useDeleteWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkoutMutation, { data, loading, error }] = useDeleteWorkoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>(DeleteWorkoutDocument, options);
      }
export type DeleteWorkoutMutationHookResult = ReturnType<typeof useDeleteWorkoutMutation>;
export type DeleteWorkoutMutationResult = Apollo.MutationResult<DeleteWorkoutMutation>;
export type DeleteWorkoutMutationOptions = Apollo.BaseMutationOptions<DeleteWorkoutMutation, DeleteWorkoutMutationVariables>;
export const ExercisesDocument = gql`
    query Exercises {
  exercises(orderBy: NATURAL) {
    nodes {
      ...ExerciseFields
    }
  }
}
    ${ExerciseFieldsFragmentDoc}`;

/**
 * __useExercisesQuery__
 *
 * To run a query within a React component, call `useExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExercisesQuery({
 *   variables: {
 *   },
 * });
 */
export function useExercisesQuery(baseOptions?: Apollo.QueryHookOptions<ExercisesQuery, ExercisesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExercisesQuery, ExercisesQueryVariables>(ExercisesDocument, options);
      }
export function useExercisesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExercisesQuery, ExercisesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExercisesQuery, ExercisesQueryVariables>(ExercisesDocument, options);
        }
export function useExercisesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExercisesQuery, ExercisesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExercisesQuery, ExercisesQueryVariables>(ExercisesDocument, options);
        }
export type ExercisesQueryHookResult = ReturnType<typeof useExercisesQuery>;
export type ExercisesLazyQueryHookResult = ReturnType<typeof useExercisesLazyQuery>;
export type ExercisesSuspenseQueryHookResult = ReturnType<typeof useExercisesSuspenseQuery>;
export type ExercisesQueryResult = Apollo.QueryResult<ExercisesQuery, ExercisesQueryVariables>;
export const CreateExerciseDocument = gql`
    mutation CreateExercise($input: CreateExerciseInput!) {
  createExercise(input: $input) {
    exercise {
      id
      name
      description
      category
      muscleGroups
    }
  }
}
    `;
export type CreateExerciseMutationFn = Apollo.MutationFunction<CreateExerciseMutation, CreateExerciseMutationVariables>;

/**
 * __useCreateExerciseMutation__
 *
 * To run a mutation, you first call `useCreateExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseMutation, { data, loading, error }] = useCreateExerciseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateExerciseMutation(baseOptions?: Apollo.MutationHookOptions<CreateExerciseMutation, CreateExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExerciseMutation, CreateExerciseMutationVariables>(CreateExerciseDocument, options);
      }
export type CreateExerciseMutationHookResult = ReturnType<typeof useCreateExerciseMutation>;
export type CreateExerciseMutationResult = Apollo.MutationResult<CreateExerciseMutation>;
export type CreateExerciseMutationOptions = Apollo.BaseMutationOptions<CreateExerciseMutation, CreateExerciseMutationVariables>;
export const DeleteExerciseDocument = gql`
    mutation DeleteExercise($input: DeleteExerciseInput!) {
  deleteExercise(input: $input) {
    exercise {
      id
    }
  }
}
    `;
export type DeleteExerciseMutationFn = Apollo.MutationFunction<DeleteExerciseMutation, DeleteExerciseMutationVariables>;

/**
 * __useDeleteExerciseMutation__
 *
 * To run a mutation, you first call `useDeleteExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExerciseMutation, { data, loading, error }] = useDeleteExerciseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteExerciseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExerciseMutation, DeleteExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExerciseMutation, DeleteExerciseMutationVariables>(DeleteExerciseDocument, options);
      }
export type DeleteExerciseMutationHookResult = ReturnType<typeof useDeleteExerciseMutation>;
export type DeleteExerciseMutationResult = Apollo.MutationResult<DeleteExerciseMutation>;
export type DeleteExerciseMutationOptions = Apollo.BaseMutationOptions<DeleteExerciseMutation, DeleteExerciseMutationVariables>;
export const GetSplitDocument = gql`
    query GetSplit($id: UUID!) {
  workoutSplit(id: $id) {
    id
    name
    isActive
    splitWorkoutsBySplitId {
      nodes {
        id
        dayOfWeek
        templateId
      }
    }
  }
}
    `;

/**
 * __useGetSplitQuery__
 *
 * To run a query within a React component, call `useGetSplitQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSplitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSplitQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSplitQuery(baseOptions: Apollo.QueryHookOptions<GetSplitQuery, GetSplitQueryVariables> & ({ variables: GetSplitQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSplitQuery, GetSplitQueryVariables>(GetSplitDocument, options);
      }
export function useGetSplitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSplitQuery, GetSplitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSplitQuery, GetSplitQueryVariables>(GetSplitDocument, options);
        }
export function useGetSplitSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSplitQuery, GetSplitQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSplitQuery, GetSplitQueryVariables>(GetSplitDocument, options);
        }
export type GetSplitQueryHookResult = ReturnType<typeof useGetSplitQuery>;
export type GetSplitLazyQueryHookResult = ReturnType<typeof useGetSplitLazyQuery>;
export type GetSplitSuspenseQueryHookResult = ReturnType<typeof useGetSplitSuspenseQuery>;
export type GetSplitQueryResult = Apollo.QueryResult<GetSplitQuery, GetSplitQueryVariables>;
export const TemplatesForSplitDocument = gql`
    query TemplatesForSplit {
  workoutTemplates(orderBy: NATURAL) {
    nodes {
      id
      name
      description
    }
  }
}
    `;

/**
 * __useTemplatesForSplitQuery__
 *
 * To run a query within a React component, call `useTemplatesForSplitQuery` and pass it any options that fit your needs.
 * When your component renders, `useTemplatesForSplitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTemplatesForSplitQuery({
 *   variables: {
 *   },
 * });
 */
export function useTemplatesForSplitQuery(baseOptions?: Apollo.QueryHookOptions<TemplatesForSplitQuery, TemplatesForSplitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TemplatesForSplitQuery, TemplatesForSplitQueryVariables>(TemplatesForSplitDocument, options);
      }
export function useTemplatesForSplitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TemplatesForSplitQuery, TemplatesForSplitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TemplatesForSplitQuery, TemplatesForSplitQueryVariables>(TemplatesForSplitDocument, options);
        }
export function useTemplatesForSplitSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TemplatesForSplitQuery, TemplatesForSplitQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TemplatesForSplitQuery, TemplatesForSplitQueryVariables>(TemplatesForSplitDocument, options);
        }
export type TemplatesForSplitQueryHookResult = ReturnType<typeof useTemplatesForSplitQuery>;
export type TemplatesForSplitLazyQueryHookResult = ReturnType<typeof useTemplatesForSplitLazyQuery>;
export type TemplatesForSplitSuspenseQueryHookResult = ReturnType<typeof useTemplatesForSplitSuspenseQuery>;
export type TemplatesForSplitQueryResult = Apollo.QueryResult<TemplatesForSplitQuery, TemplatesForSplitQueryVariables>;
export const CreateSplitDocument = gql`
    mutation CreateSplit($input: CreateWorkoutSplitInput!) {
  createWorkoutSplit(input: $input) {
    workoutSplit {
      id
    }
  }
}
    `;
export type CreateSplitMutationFn = Apollo.MutationFunction<CreateSplitMutation, CreateSplitMutationVariables>;

/**
 * __useCreateSplitMutation__
 *
 * To run a mutation, you first call `useCreateSplitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSplitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSplitMutation, { data, loading, error }] = useCreateSplitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSplitMutation(baseOptions?: Apollo.MutationHookOptions<CreateSplitMutation, CreateSplitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSplitMutation, CreateSplitMutationVariables>(CreateSplitDocument, options);
      }
export type CreateSplitMutationHookResult = ReturnType<typeof useCreateSplitMutation>;
export type CreateSplitMutationResult = Apollo.MutationResult<CreateSplitMutation>;
export type CreateSplitMutationOptions = Apollo.BaseMutationOptions<CreateSplitMutation, CreateSplitMutationVariables>;
export const CreateSplitWorkoutDocument = gql`
    mutation CreateSplitWorkout($input: CreateSplitWorkoutInput!) {
  createSplitWorkout(input: $input) {
    splitWorkout {
      id
    }
  }
}
    `;
export type CreateSplitWorkoutMutationFn = Apollo.MutationFunction<CreateSplitWorkoutMutation, CreateSplitWorkoutMutationVariables>;

/**
 * __useCreateSplitWorkoutMutation__
 *
 * To run a mutation, you first call `useCreateSplitWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSplitWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSplitWorkoutMutation, { data, loading, error }] = useCreateSplitWorkoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSplitWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateSplitWorkoutMutation, CreateSplitWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSplitWorkoutMutation, CreateSplitWorkoutMutationVariables>(CreateSplitWorkoutDocument, options);
      }
export type CreateSplitWorkoutMutationHookResult = ReturnType<typeof useCreateSplitWorkoutMutation>;
export type CreateSplitWorkoutMutationResult = Apollo.MutationResult<CreateSplitWorkoutMutation>;
export type CreateSplitWorkoutMutationOptions = Apollo.BaseMutationOptions<CreateSplitWorkoutMutation, CreateSplitWorkoutMutationVariables>;
export const DeleteSplitWorkoutDocument = gql`
    mutation DeleteSplitWorkout($input: DeleteSplitWorkoutInput!) {
  deleteSplitWorkout(input: $input) {
    splitWorkout {
      id
    }
  }
}
    `;
export type DeleteSplitWorkoutMutationFn = Apollo.MutationFunction<DeleteSplitWorkoutMutation, DeleteSplitWorkoutMutationVariables>;

/**
 * __useDeleteSplitWorkoutMutation__
 *
 * To run a mutation, you first call `useDeleteSplitWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSplitWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSplitWorkoutMutation, { data, loading, error }] = useDeleteSplitWorkoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteSplitWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSplitWorkoutMutation, DeleteSplitWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSplitWorkoutMutation, DeleteSplitWorkoutMutationVariables>(DeleteSplitWorkoutDocument, options);
      }
export type DeleteSplitWorkoutMutationHookResult = ReturnType<typeof useDeleteSplitWorkoutMutation>;
export type DeleteSplitWorkoutMutationResult = Apollo.MutationResult<DeleteSplitWorkoutMutation>;
export type DeleteSplitWorkoutMutationOptions = Apollo.BaseMutationOptions<DeleteSplitWorkoutMutation, DeleteSplitWorkoutMutationVariables>;
export const SplitsDocument = gql`
    query Splits {
  workoutSplits(orderBy: NATURAL) {
    nodes {
      ...SplitFields
    }
  }
}
    ${SplitFieldsFragmentDoc}`;

/**
 * __useSplitsQuery__
 *
 * To run a query within a React component, call `useSplitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSplitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSplitsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSplitsQuery(baseOptions?: Apollo.QueryHookOptions<SplitsQuery, SplitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SplitsQuery, SplitsQueryVariables>(SplitsDocument, options);
      }
export function useSplitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SplitsQuery, SplitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SplitsQuery, SplitsQueryVariables>(SplitsDocument, options);
        }
export function useSplitsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SplitsQuery, SplitsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SplitsQuery, SplitsQueryVariables>(SplitsDocument, options);
        }
export type SplitsQueryHookResult = ReturnType<typeof useSplitsQuery>;
export type SplitsLazyQueryHookResult = ReturnType<typeof useSplitsLazyQuery>;
export type SplitsSuspenseQueryHookResult = ReturnType<typeof useSplitsSuspenseQuery>;
export type SplitsQueryResult = Apollo.QueryResult<SplitsQuery, SplitsQueryVariables>;
export const DeleteSplitDocument = gql`
    mutation DeleteSplit($input: DeleteWorkoutSplitInput!) {
  deleteWorkoutSplit(input: $input) {
    workoutSplit {
      id
    }
  }
}
    `;
export type DeleteSplitMutationFn = Apollo.MutationFunction<DeleteSplitMutation, DeleteSplitMutationVariables>;

/**
 * __useDeleteSplitMutation__
 *
 * To run a mutation, you first call `useDeleteSplitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSplitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSplitMutation, { data, loading, error }] = useDeleteSplitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteSplitMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSplitMutation, DeleteSplitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSplitMutation, DeleteSplitMutationVariables>(DeleteSplitDocument, options);
      }
export type DeleteSplitMutationHookResult = ReturnType<typeof useDeleteSplitMutation>;
export type DeleteSplitMutationResult = Apollo.MutationResult<DeleteSplitMutation>;
export type DeleteSplitMutationOptions = Apollo.BaseMutationOptions<DeleteSplitMutation, DeleteSplitMutationVariables>;
export const ActivateSplitDocument = gql`
    mutation ActivateSplit($input: UpdateWorkoutSplitInput!) {
  updateWorkoutSplit(input: $input) {
    workoutSplit {
      id
      isActive
    }
  }
}
    `;
export type ActivateSplitMutationFn = Apollo.MutationFunction<ActivateSplitMutation, ActivateSplitMutationVariables>;

/**
 * __useActivateSplitMutation__
 *
 * To run a mutation, you first call `useActivateSplitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateSplitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateSplitMutation, { data, loading, error }] = useActivateSplitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivateSplitMutation(baseOptions?: Apollo.MutationHookOptions<ActivateSplitMutation, ActivateSplitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateSplitMutation, ActivateSplitMutationVariables>(ActivateSplitDocument, options);
      }
export type ActivateSplitMutationHookResult = ReturnType<typeof useActivateSplitMutation>;
export type ActivateSplitMutationResult = Apollo.MutationResult<ActivateSplitMutation>;
export type ActivateSplitMutationOptions = Apollo.BaseMutationOptions<ActivateSplitMutation, ActivateSplitMutationVariables>;
export const GetTemplateDocument = gql`
    query GetTemplate($id: UUID!) {
  workoutTemplate(id: $id) {
    id
    name
    description
    templateExercisesByTemplateId(orderBy: NATURAL) {
      nodes {
        id
        exerciseId
        orderIndex
        targetSets
        targetReps
        notes
        exercise {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetTemplateQuery__
 *
 * To run a query within a React component, call `useGetTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTemplateQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTemplateQuery(baseOptions: Apollo.QueryHookOptions<GetTemplateQuery, GetTemplateQueryVariables> & ({ variables: GetTemplateQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTemplateQuery, GetTemplateQueryVariables>(GetTemplateDocument, options);
      }
export function useGetTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTemplateQuery, GetTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTemplateQuery, GetTemplateQueryVariables>(GetTemplateDocument, options);
        }
export function useGetTemplateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTemplateQuery, GetTemplateQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTemplateQuery, GetTemplateQueryVariables>(GetTemplateDocument, options);
        }
export type GetTemplateQueryHookResult = ReturnType<typeof useGetTemplateQuery>;
export type GetTemplateLazyQueryHookResult = ReturnType<typeof useGetTemplateLazyQuery>;
export type GetTemplateSuspenseQueryHookResult = ReturnType<typeof useGetTemplateSuspenseQuery>;
export type GetTemplateQueryResult = Apollo.QueryResult<GetTemplateQuery, GetTemplateQueryVariables>;
export const ExercisesForTemplateDocument = gql`
    query ExercisesForTemplate {
  exercises(orderBy: NATURAL) {
    nodes {
      id
      name
    }
  }
}
    `;

/**
 * __useExercisesForTemplateQuery__
 *
 * To run a query within a React component, call `useExercisesForTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useExercisesForTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExercisesForTemplateQuery({
 *   variables: {
 *   },
 * });
 */
export function useExercisesForTemplateQuery(baseOptions?: Apollo.QueryHookOptions<ExercisesForTemplateQuery, ExercisesForTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExercisesForTemplateQuery, ExercisesForTemplateQueryVariables>(ExercisesForTemplateDocument, options);
      }
export function useExercisesForTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExercisesForTemplateQuery, ExercisesForTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExercisesForTemplateQuery, ExercisesForTemplateQueryVariables>(ExercisesForTemplateDocument, options);
        }
export function useExercisesForTemplateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExercisesForTemplateQuery, ExercisesForTemplateQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExercisesForTemplateQuery, ExercisesForTemplateQueryVariables>(ExercisesForTemplateDocument, options);
        }
export type ExercisesForTemplateQueryHookResult = ReturnType<typeof useExercisesForTemplateQuery>;
export type ExercisesForTemplateLazyQueryHookResult = ReturnType<typeof useExercisesForTemplateLazyQuery>;
export type ExercisesForTemplateSuspenseQueryHookResult = ReturnType<typeof useExercisesForTemplateSuspenseQuery>;
export type ExercisesForTemplateQueryResult = Apollo.QueryResult<ExercisesForTemplateQuery, ExercisesForTemplateQueryVariables>;
export const CreateTemplateDocument = gql`
    mutation CreateTemplate($input: CreateWorkoutTemplateInput!) {
  createWorkoutTemplate(input: $input) {
    workoutTemplate {
      id
    }
  }
}
    `;
export type CreateTemplateMutationFn = Apollo.MutationFunction<CreateTemplateMutation, CreateTemplateMutationVariables>;

/**
 * __useCreateTemplateMutation__
 *
 * To run a mutation, you first call `useCreateTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTemplateMutation, { data, loading, error }] = useCreateTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTemplateMutation(baseOptions?: Apollo.MutationHookOptions<CreateTemplateMutation, CreateTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTemplateMutation, CreateTemplateMutationVariables>(CreateTemplateDocument, options);
      }
export type CreateTemplateMutationHookResult = ReturnType<typeof useCreateTemplateMutation>;
export type CreateTemplateMutationResult = Apollo.MutationResult<CreateTemplateMutation>;
export type CreateTemplateMutationOptions = Apollo.BaseMutationOptions<CreateTemplateMutation, CreateTemplateMutationVariables>;
export const CreateTemplateExerciseDocument = gql`
    mutation CreateTemplateExercise($input: CreateTemplateExerciseInput!) {
  createTemplateExercise(input: $input) {
    templateExercise {
      id
    }
  }
}
    `;
export type CreateTemplateExerciseMutationFn = Apollo.MutationFunction<CreateTemplateExerciseMutation, CreateTemplateExerciseMutationVariables>;

/**
 * __useCreateTemplateExerciseMutation__
 *
 * To run a mutation, you first call `useCreateTemplateExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTemplateExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTemplateExerciseMutation, { data, loading, error }] = useCreateTemplateExerciseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTemplateExerciseMutation(baseOptions?: Apollo.MutationHookOptions<CreateTemplateExerciseMutation, CreateTemplateExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTemplateExerciseMutation, CreateTemplateExerciseMutationVariables>(CreateTemplateExerciseDocument, options);
      }
export type CreateTemplateExerciseMutationHookResult = ReturnType<typeof useCreateTemplateExerciseMutation>;
export type CreateTemplateExerciseMutationResult = Apollo.MutationResult<CreateTemplateExerciseMutation>;
export type CreateTemplateExerciseMutationOptions = Apollo.BaseMutationOptions<CreateTemplateExerciseMutation, CreateTemplateExerciseMutationVariables>;
export const TemplatesDocument = gql`
    query Templates {
  workoutTemplates(orderBy: NATURAL) {
    nodes {
      ...TemplateFields
    }
  }
}
    ${TemplateFieldsFragmentDoc}`;

/**
 * __useTemplatesQuery__
 *
 * To run a query within a React component, call `useTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTemplatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTemplatesQuery(baseOptions?: Apollo.QueryHookOptions<TemplatesQuery, TemplatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TemplatesQuery, TemplatesQueryVariables>(TemplatesDocument, options);
      }
export function useTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TemplatesQuery, TemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TemplatesQuery, TemplatesQueryVariables>(TemplatesDocument, options);
        }
export function useTemplatesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TemplatesQuery, TemplatesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TemplatesQuery, TemplatesQueryVariables>(TemplatesDocument, options);
        }
export type TemplatesQueryHookResult = ReturnType<typeof useTemplatesQuery>;
export type TemplatesLazyQueryHookResult = ReturnType<typeof useTemplatesLazyQuery>;
export type TemplatesSuspenseQueryHookResult = ReturnType<typeof useTemplatesSuspenseQuery>;
export type TemplatesQueryResult = Apollo.QueryResult<TemplatesQuery, TemplatesQueryVariables>;
export const DeleteTemplateDocument = gql`
    mutation DeleteTemplate($input: DeleteWorkoutTemplateInput!) {
  deleteWorkoutTemplate(input: $input) {
    workoutTemplate {
      id
    }
  }
}
    `;
export type DeleteTemplateMutationFn = Apollo.MutationFunction<DeleteTemplateMutation, DeleteTemplateMutationVariables>;

/**
 * __useDeleteTemplateMutation__
 *
 * To run a mutation, you first call `useDeleteTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTemplateMutation, { data, loading, error }] = useDeleteTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTemplateMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTemplateMutation, DeleteTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTemplateMutation, DeleteTemplateMutationVariables>(DeleteTemplateDocument, options);
      }
export type DeleteTemplateMutationHookResult = ReturnType<typeof useDeleteTemplateMutation>;
export type DeleteTemplateMutationResult = Apollo.MutationResult<DeleteTemplateMutation>;
export type DeleteTemplateMutationOptions = Apollo.BaseMutationOptions<DeleteTemplateMutation, DeleteTemplateMutationVariables>;
export const SyncTemplateFromWorkoutDocument = gql`
    mutation SyncTemplateFromWorkout($workoutId: UUID!) {
  syncTemplateFromWorkout(workoutId: $workoutId)
}
    `;
export type SyncTemplateFromWorkoutMutationFn = Apollo.MutationFunction<SyncTemplateFromWorkoutMutation, SyncTemplateFromWorkoutMutationVariables>;

/**
 * __useSyncTemplateFromWorkoutMutation__
 *
 * To run a mutation, you first call `useSyncTemplateFromWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncTemplateFromWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncTemplateFromWorkoutMutation, { data, loading, error }] = useSyncTemplateFromWorkoutMutation({
 *   variables: {
 *      workoutId: // value for 'workoutId'
 *   },
 * });
 */
export function useSyncTemplateFromWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<SyncTemplateFromWorkoutMutation, SyncTemplateFromWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SyncTemplateFromWorkoutMutation, SyncTemplateFromWorkoutMutationVariables>(SyncTemplateFromWorkoutDocument, options);
      }
export type SyncTemplateFromWorkoutMutationHookResult = ReturnType<typeof useSyncTemplateFromWorkoutMutation>;
export type SyncTemplateFromWorkoutMutationResult = Apollo.MutationResult<SyncTemplateFromWorkoutMutation>;
export type SyncTemplateFromWorkoutMutationOptions = Apollo.BaseMutationOptions<SyncTemplateFromWorkoutMutation, SyncTemplateFromWorkoutMutationVariables>;
export const GetWorkoutDocument = gql`
    query GetWorkout($id: UUID!) {
  workout(id: $id) {
    id
    name
    date
    notes
    completed
    durationMinutes
    templateId
    splitId
    workoutExercises(orderBy: NATURAL) {
      nodes {
        id
        orderIndex
        notes
        exercise {
          id
          name
        }
        sets(orderBy: SET_NUMBER_ASC) {
          nodes {
            id
            setNumber
            weight
            reps
            rpe
            completed
            notes
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetWorkoutQuery__
 *
 * To run a query within a React component, call `useGetWorkoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkoutQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetWorkoutQuery(baseOptions: Apollo.QueryHookOptions<GetWorkoutQuery, GetWorkoutQueryVariables> & ({ variables: GetWorkoutQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkoutQuery, GetWorkoutQueryVariables>(GetWorkoutDocument, options);
      }
export function useGetWorkoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkoutQuery, GetWorkoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkoutQuery, GetWorkoutQueryVariables>(GetWorkoutDocument, options);
        }
export function useGetWorkoutSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWorkoutQuery, GetWorkoutQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWorkoutQuery, GetWorkoutQueryVariables>(GetWorkoutDocument, options);
        }
export type GetWorkoutQueryHookResult = ReturnType<typeof useGetWorkoutQuery>;
export type GetWorkoutLazyQueryHookResult = ReturnType<typeof useGetWorkoutLazyQuery>;
export type GetWorkoutSuspenseQueryHookResult = ReturnType<typeof useGetWorkoutSuspenseQuery>;
export type GetWorkoutQueryResult = Apollo.QueryResult<GetWorkoutQuery, GetWorkoutQueryVariables>;
export const PreviousWorkoutFromSplitDocument = gql`
    query PreviousWorkoutFromSplit($splitId: UUID!, $dayOfWeek: Int!) {
  previousWorkoutFromSplit(splitId: $splitId, dayOfWeek: $dayOfWeek) {
    id
    workoutExercises(orderBy: NATURAL) {
      nodes {
        exercise {
          id
          name
        }
        sets(orderBy: SET_NUMBER_ASC) {
          nodes {
            setNumber
            weight
            reps
            rpe
          }
        }
      }
    }
  }
}
    `;

/**
 * __usePreviousWorkoutFromSplitQuery__
 *
 * To run a query within a React component, call `usePreviousWorkoutFromSplitQuery` and pass it any options that fit your needs.
 * When your component renders, `usePreviousWorkoutFromSplitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePreviousWorkoutFromSplitQuery({
 *   variables: {
 *      splitId: // value for 'splitId'
 *      dayOfWeek: // value for 'dayOfWeek'
 *   },
 * });
 */
export function usePreviousWorkoutFromSplitQuery(baseOptions: Apollo.QueryHookOptions<PreviousWorkoutFromSplitQuery, PreviousWorkoutFromSplitQueryVariables> & ({ variables: PreviousWorkoutFromSplitQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PreviousWorkoutFromSplitQuery, PreviousWorkoutFromSplitQueryVariables>(PreviousWorkoutFromSplitDocument, options);
      }
export function usePreviousWorkoutFromSplitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreviousWorkoutFromSplitQuery, PreviousWorkoutFromSplitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PreviousWorkoutFromSplitQuery, PreviousWorkoutFromSplitQueryVariables>(PreviousWorkoutFromSplitDocument, options);
        }
export function usePreviousWorkoutFromSplitSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PreviousWorkoutFromSplitQuery, PreviousWorkoutFromSplitQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PreviousWorkoutFromSplitQuery, PreviousWorkoutFromSplitQueryVariables>(PreviousWorkoutFromSplitDocument, options);
        }
export type PreviousWorkoutFromSplitQueryHookResult = ReturnType<typeof usePreviousWorkoutFromSplitQuery>;
export type PreviousWorkoutFromSplitLazyQueryHookResult = ReturnType<typeof usePreviousWorkoutFromSplitLazyQuery>;
export type PreviousWorkoutFromSplitSuspenseQueryHookResult = ReturnType<typeof usePreviousWorkoutFromSplitSuspenseQuery>;
export type PreviousWorkoutFromSplitQueryResult = Apollo.QueryResult<PreviousWorkoutFromSplitQuery, PreviousWorkoutFromSplitQueryVariables>;
export const ExercisesForWorkoutDocument = gql`
    query ExercisesForWorkout {
  exercises(orderBy: NATURAL) {
    nodes {
      id
      name
    }
  }
}
    `;

/**
 * __useExercisesForWorkoutQuery__
 *
 * To run a query within a React component, call `useExercisesForWorkoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useExercisesForWorkoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExercisesForWorkoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useExercisesForWorkoutQuery(baseOptions?: Apollo.QueryHookOptions<ExercisesForWorkoutQuery, ExercisesForWorkoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExercisesForWorkoutQuery, ExercisesForWorkoutQueryVariables>(ExercisesForWorkoutDocument, options);
      }
export function useExercisesForWorkoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExercisesForWorkoutQuery, ExercisesForWorkoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExercisesForWorkoutQuery, ExercisesForWorkoutQueryVariables>(ExercisesForWorkoutDocument, options);
        }
export function useExercisesForWorkoutSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExercisesForWorkoutQuery, ExercisesForWorkoutQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExercisesForWorkoutQuery, ExercisesForWorkoutQueryVariables>(ExercisesForWorkoutDocument, options);
        }
export type ExercisesForWorkoutQueryHookResult = ReturnType<typeof useExercisesForWorkoutQuery>;
export type ExercisesForWorkoutLazyQueryHookResult = ReturnType<typeof useExercisesForWorkoutLazyQuery>;
export type ExercisesForWorkoutSuspenseQueryHookResult = ReturnType<typeof useExercisesForWorkoutSuspenseQuery>;
export type ExercisesForWorkoutQueryResult = Apollo.QueryResult<ExercisesForWorkoutQuery, ExercisesForWorkoutQueryVariables>;
export const AddExerciseToWorkoutDocument = gql`
    mutation AddExerciseToWorkout($input: CreateWorkoutExerciseInput!) {
  createWorkoutExercise(input: $input) {
    workoutExercise {
      id
    }
  }
}
    `;
export type AddExerciseToWorkoutMutationFn = Apollo.MutationFunction<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>;

/**
 * __useAddExerciseToWorkoutMutation__
 *
 * To run a mutation, you first call `useAddExerciseToWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddExerciseToWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addExerciseToWorkoutMutation, { data, loading, error }] = useAddExerciseToWorkoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddExerciseToWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>(AddExerciseToWorkoutDocument, options);
      }
export type AddExerciseToWorkoutMutationHookResult = ReturnType<typeof useAddExerciseToWorkoutMutation>;
export type AddExerciseToWorkoutMutationResult = Apollo.MutationResult<AddExerciseToWorkoutMutation>;
export type AddExerciseToWorkoutMutationOptions = Apollo.BaseMutationOptions<AddExerciseToWorkoutMutation, AddExerciseToWorkoutMutationVariables>;
export const AddSetDocument = gql`
    mutation AddSet($input: CreateSetInput!) {
  createSet(input: $input) {
    set {
      id
    }
  }
}
    `;
export type AddSetMutationFn = Apollo.MutationFunction<AddSetMutation, AddSetMutationVariables>;

/**
 * __useAddSetMutation__
 *
 * To run a mutation, you first call `useAddSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSetMutation, { data, loading, error }] = useAddSetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddSetMutation(baseOptions?: Apollo.MutationHookOptions<AddSetMutation, AddSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSetMutation, AddSetMutationVariables>(AddSetDocument, options);
      }
export type AddSetMutationHookResult = ReturnType<typeof useAddSetMutation>;
export type AddSetMutationResult = Apollo.MutationResult<AddSetMutation>;
export type AddSetMutationOptions = Apollo.BaseMutationOptions<AddSetMutation, AddSetMutationVariables>;
export const UpdateSetDocument = gql`
    mutation UpdateSet($input: UpdateSetInput!) {
  updateSet(input: $input) {
    set {
      id
      weight
      reps
      rpe
      completed
    }
  }
}
    `;
export type UpdateSetMutationFn = Apollo.MutationFunction<UpdateSetMutation, UpdateSetMutationVariables>;

/**
 * __useUpdateSetMutation__
 *
 * To run a mutation, you first call `useUpdateSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSetMutation, { data, loading, error }] = useUpdateSetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSetMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSetMutation, UpdateSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSetMutation, UpdateSetMutationVariables>(UpdateSetDocument, options);
      }
export type UpdateSetMutationHookResult = ReturnType<typeof useUpdateSetMutation>;
export type UpdateSetMutationResult = Apollo.MutationResult<UpdateSetMutation>;
export type UpdateSetMutationOptions = Apollo.BaseMutationOptions<UpdateSetMutation, UpdateSetMutationVariables>;
export const UpdateWorkoutDocument = gql`
    mutation UpdateWorkout($input: UpdateWorkoutInput!) {
  updateWorkout(input: $input) {
    workout {
      id
      completed
    }
  }
}
    `;
export type UpdateWorkoutMutationFn = Apollo.MutationFunction<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>;

/**
 * __useUpdateWorkoutMutation__
 *
 * To run a mutation, you first call `useUpdateWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkoutMutation, { data, loading, error }] = useUpdateWorkoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>(UpdateWorkoutDocument, options);
      }
export type UpdateWorkoutMutationHookResult = ReturnType<typeof useUpdateWorkoutMutation>;
export type UpdateWorkoutMutationResult = Apollo.MutationResult<UpdateWorkoutMutation>;
export type UpdateWorkoutMutationOptions = Apollo.BaseMutationOptions<UpdateWorkoutMutation, UpdateWorkoutMutationVariables>;
export const WorkoutsDocument = gql`
    query Workouts {
  workouts(orderBy: NATURAL) {
    nodes {
      id
      name
      date
      notes
      completed
      durationMinutes
      workoutExercises {
        totalCount
      }
    }
  }
}
    `;

/**
 * __useWorkoutsQuery__
 *
 * To run a query within a React component, call `useWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkoutsQuery({
 *   variables: {
 *   },
 * });
 */
export function useWorkoutsQuery(baseOptions?: Apollo.QueryHookOptions<WorkoutsQuery, WorkoutsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkoutsQuery, WorkoutsQueryVariables>(WorkoutsDocument, options);
      }
export function useWorkoutsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkoutsQuery, WorkoutsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkoutsQuery, WorkoutsQueryVariables>(WorkoutsDocument, options);
        }
export function useWorkoutsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<WorkoutsQuery, WorkoutsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WorkoutsQuery, WorkoutsQueryVariables>(WorkoutsDocument, options);
        }
export type WorkoutsQueryHookResult = ReturnType<typeof useWorkoutsQuery>;
export type WorkoutsLazyQueryHookResult = ReturnType<typeof useWorkoutsLazyQuery>;
export type WorkoutsSuspenseQueryHookResult = ReturnType<typeof useWorkoutsSuspenseQuery>;
export type WorkoutsQueryResult = Apollo.QueryResult<WorkoutsQuery, WorkoutsQueryVariables>;
export const GetTemplateForWorkoutDocument = gql`
    query GetTemplateForWorkout($id: UUID!) {
  workoutTemplate(id: $id) {
    id
    name
    templateExercisesByTemplateId(orderBy: NATURAL) {
      nodes {
        exerciseId
        orderIndex
        targetSets
        targetReps
        notes
      }
    }
  }
}
    `;

/**
 * __useGetTemplateForWorkoutQuery__
 *
 * To run a query within a React component, call `useGetTemplateForWorkoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTemplateForWorkoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTemplateForWorkoutQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTemplateForWorkoutQuery(baseOptions: Apollo.QueryHookOptions<GetTemplateForWorkoutQuery, GetTemplateForWorkoutQueryVariables> & ({ variables: GetTemplateForWorkoutQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTemplateForWorkoutQuery, GetTemplateForWorkoutQueryVariables>(GetTemplateForWorkoutDocument, options);
      }
export function useGetTemplateForWorkoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTemplateForWorkoutQuery, GetTemplateForWorkoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTemplateForWorkoutQuery, GetTemplateForWorkoutQueryVariables>(GetTemplateForWorkoutDocument, options);
        }
export function useGetTemplateForWorkoutSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetTemplateForWorkoutQuery, GetTemplateForWorkoutQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetTemplateForWorkoutQuery, GetTemplateForWorkoutQueryVariables>(GetTemplateForWorkoutDocument, options);
        }
export type GetTemplateForWorkoutQueryHookResult = ReturnType<typeof useGetTemplateForWorkoutQuery>;
export type GetTemplateForWorkoutLazyQueryHookResult = ReturnType<typeof useGetTemplateForWorkoutLazyQuery>;
export type GetTemplateForWorkoutSuspenseQueryHookResult = ReturnType<typeof useGetTemplateForWorkoutSuspenseQuery>;
export type GetTemplateForWorkoutQueryResult = Apollo.QueryResult<GetTemplateForWorkoutQuery, GetTemplateForWorkoutQueryVariables>;
export const CreateWorkoutDocument = gql`
    mutation CreateWorkout($input: CreateWorkoutInput!) {
  createWorkout(input: $input) {
    workout {
      id
      name
      date
    }
  }
}
    `;
export type CreateWorkoutMutationFn = Apollo.MutationFunction<CreateWorkoutMutation, CreateWorkoutMutationVariables>;

/**
 * __useCreateWorkoutMutation__
 *
 * To run a mutation, you first call `useCreateWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkoutMutation, { data, loading, error }] = useCreateWorkoutMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkoutMutation, CreateWorkoutMutationVariables>(CreateWorkoutDocument, options);
      }
export type CreateWorkoutMutationHookResult = ReturnType<typeof useCreateWorkoutMutation>;
export type CreateWorkoutMutationResult = Apollo.MutationResult<CreateWorkoutMutation>;
export type CreateWorkoutMutationOptions = Apollo.BaseMutationOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>;
export const AddWorkoutExerciseDocument = gql`
    mutation AddWorkoutExercise($input: CreateWorkoutExerciseInput!) {
  createWorkoutExercise(input: $input) {
    workoutExercise {
      id
    }
  }
}
    `;
export type AddWorkoutExerciseMutationFn = Apollo.MutationFunction<AddWorkoutExerciseMutation, AddWorkoutExerciseMutationVariables>;

/**
 * __useAddWorkoutExerciseMutation__
 *
 * To run a mutation, you first call `useAddWorkoutExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWorkoutExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWorkoutExerciseMutation, { data, loading, error }] = useAddWorkoutExerciseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddWorkoutExerciseMutation(baseOptions?: Apollo.MutationHookOptions<AddWorkoutExerciseMutation, AddWorkoutExerciseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddWorkoutExerciseMutation, AddWorkoutExerciseMutationVariables>(AddWorkoutExerciseDocument, options);
      }
export type AddWorkoutExerciseMutationHookResult = ReturnType<typeof useAddWorkoutExerciseMutation>;
export type AddWorkoutExerciseMutationResult = Apollo.MutationResult<AddWorkoutExerciseMutation>;
export type AddWorkoutExerciseMutationOptions = Apollo.BaseMutationOptions<AddWorkoutExerciseMutation, AddWorkoutExerciseMutationVariables>;
export const AddSetFromTemplateDocument = gql`
    mutation AddSetFromTemplate($input: CreateSetInput!) {
  createSet(input: $input) {
    set {
      id
    }
  }
}
    `;
export type AddSetFromTemplateMutationFn = Apollo.MutationFunction<AddSetFromTemplateMutation, AddSetFromTemplateMutationVariables>;

/**
 * __useAddSetFromTemplateMutation__
 *
 * To run a mutation, you first call `useAddSetFromTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSetFromTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSetFromTemplateMutation, { data, loading, error }] = useAddSetFromTemplateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddSetFromTemplateMutation(baseOptions?: Apollo.MutationHookOptions<AddSetFromTemplateMutation, AddSetFromTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSetFromTemplateMutation, AddSetFromTemplateMutationVariables>(AddSetFromTemplateDocument, options);
      }
export type AddSetFromTemplateMutationHookResult = ReturnType<typeof useAddSetFromTemplateMutation>;
export type AddSetFromTemplateMutationResult = Apollo.MutationResult<AddSetFromTemplateMutation>;
export type AddSetFromTemplateMutationOptions = Apollo.BaseMutationOptions<AddSetFromTemplateMutation, AddSetFromTemplateMutationVariables>;
export const TemplatesForWorkoutDocument = gql`
    query TemplatesForWorkout {
  workoutTemplates(orderBy: NATURAL) {
    nodes {
      id
      name
      description
      templateExercisesByTemplateId {
        totalCount
      }
    }
  }
}
    `;

/**
 * __useTemplatesForWorkoutQuery__
 *
 * To run a query within a React component, call `useTemplatesForWorkoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useTemplatesForWorkoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTemplatesForWorkoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useTemplatesForWorkoutQuery(baseOptions?: Apollo.QueryHookOptions<TemplatesForWorkoutQuery, TemplatesForWorkoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TemplatesForWorkoutQuery, TemplatesForWorkoutQueryVariables>(TemplatesForWorkoutDocument, options);
      }
export function useTemplatesForWorkoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TemplatesForWorkoutQuery, TemplatesForWorkoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TemplatesForWorkoutQuery, TemplatesForWorkoutQueryVariables>(TemplatesForWorkoutDocument, options);
        }
export function useTemplatesForWorkoutSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TemplatesForWorkoutQuery, TemplatesForWorkoutQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TemplatesForWorkoutQuery, TemplatesForWorkoutQueryVariables>(TemplatesForWorkoutDocument, options);
        }
export type TemplatesForWorkoutQueryHookResult = ReturnType<typeof useTemplatesForWorkoutQuery>;
export type TemplatesForWorkoutLazyQueryHookResult = ReturnType<typeof useTemplatesForWorkoutLazyQuery>;
export type TemplatesForWorkoutSuspenseQueryHookResult = ReturnType<typeof useTemplatesForWorkoutSuspenseQuery>;
export type TemplatesForWorkoutQueryResult = Apollo.QueryResult<TemplatesForWorkoutQuery, TemplatesForWorkoutQueryVariables>;