import { makeExtendSchemaPlugin, gql } from 'graphile-utils';
import type { Pool } from 'pg';

export const WorkoutPlugin = makeExtendSchemaPlugin(() => {
  return {
    typeDefs: gql`
      extend type Query {
        previousWorkoutFromSplit(
          splitId: UUID!
          dayOfWeek: Int!
        ): Workout
      }

      extend type Mutation {
        syncTemplateFromWorkout(workoutId: UUID!): Boolean!
        seedTemplates: Boolean!
      }
    `,
    resolvers: {
      Query: {
        previousWorkoutFromSplit: async (_query, args, context) => {
          const pool: Pool = context.pgClient;
          const { splitId, dayOfWeek } = args;

          // Get the user_id from the pgSettings
          const userId = context.pgSettings?.['jwt.claims.user_id'];
          if (!userId) {
            throw new Error('Unauthorized');
          }

          // Find the most recent workout from this split on this day of week
          // We need to find workouts that match the split and were created on the same day
          const result = await pool.query(
            `SELECT w.* 
             FROM workouts w
             WHERE w.split_id = $1
               AND w.user_id = $2
               AND EXTRACT(DOW FROM w.date) = $3
               AND w.date < CURRENT_DATE
             ORDER BY w.date DESC
             LIMIT 1`,
            [splitId, userId, dayOfWeek]
          );

          if (result.rows.length === 0) {
            return null;
          }

          return result.rows[0];
        },
      },
      Mutation: {
        syncTemplateFromWorkout: async (_query, args, context) => {
          const pool: Pool = context.pgClient;
          const { workoutId } = args;

          const userId = context.pgSettings?.['jwt.claims.user_id'];
          if (!userId) {
            throw new Error('Unauthorized');
          }

          // Verify workout belongs to user and has template_id
          const workoutResult = await pool.query(
            `SELECT template_id, completed 
             FROM workouts 
             WHERE id = $1 AND user_id = $2`,
            [workoutId, userId]
          );

          if (workoutResult.rows.length === 0) {
            throw new Error('Workout not found');
          }

          const { template_id, completed } = workoutResult.rows[0];

          if (!template_id) {
            throw new Error('Workout is not linked to a template');
          }

          if (!completed) {
            throw new Error('Workout must be completed before syncing');
          }

          // Get workout exercises with sets
          const workoutExercisesResult = await pool.query(
            `SELECT 
               we.id,
               we.exercise_id,
               we.order_index,
               we.notes,
               COUNT(s.id) as set_count
             FROM workout_exercises we
             LEFT JOIN sets s ON s.workout_exercise_id = we.id
             WHERE we.workout_id = $1
             GROUP BY we.id, we.exercise_id, we.order_index, we.notes
             ORDER BY we.order_index`,
            [workoutId]
          );

          const workoutExercises = workoutExercisesResult.rows;

          // Get existing template exercises
          const templateExercisesResult = await pool.query(
            `SELECT id, exercise_id, order_index, target_sets, notes
             FROM template_exercises
             WHERE template_id = $1
             ORDER BY order_index`,
            [template_id]
          );

          const templateExercises = templateExercisesResult.rows;
          const templateExercisesByExerciseId = new Map(
            templateExercises.map((te: any) => [te.exercise_id, te])
          );

          // Update existing template exercises and add new ones
          for (const we of workoutExercises) {
            const existing = templateExercisesByExerciseId.get(we.exercise_id);

            if (existing) {
              // Update target_sets if different
              const newTargetSets = parseInt(we.set_count);
              if (existing.target_sets !== newTargetSets) {
                await pool.query(
                  `UPDATE template_exercises
                   SET target_sets = $1, notes = COALESCE($2, notes)
                   WHERE id = $3`,
                  [newTargetSets, we.notes || null, existing.id]
                );
              } else if (we.notes && we.notes !== existing.notes) {
                // Update notes if changed
                await pool.query(
                  `UPDATE template_exercises
                   SET notes = $1
                   WHERE id = $2`,
                  [we.notes, existing.id]
                );
              }

              // Update order_index if changed
              if (existing.order_index !== we.order_index) {
                await pool.query(
                  `UPDATE template_exercises
                   SET order_index = $1
                   WHERE id = $2`,
                  [we.order_index, existing.id]
                );
              }
            } else {
              // Add new exercise to template
              await pool.query(
                `INSERT INTO template_exercises 
                 (template_id, exercise_id, order_index, target_sets, notes)
                 VALUES ($1, $2, $3, $4, $5)`,
                [
                  template_id,
                  we.exercise_id,
                  we.order_index,
                  parseInt(we.set_count),
                  we.notes || null,
                ]
              );
            }
          }

          return true;
        },
        seedTemplates: async (_query, _args, context) => {
          const pool: Pool = context.pgClient;

          const userId = context.pgSettings?.['jwt.claims.user_id'];
          if (!userId) {
            throw new Error('Unauthorized');
          }

          // Check if templates already exist for this user
          const existingTemplates = await pool.query(
            'SELECT COUNT(*) FROM workout_templates WHERE user_id = $1',
            [userId]
          );

          if (parseInt(existingTemplates.rows[0].count) > 0) {
            throw new Error('User already has templates. Delete existing templates first.');
          }

          // Get all exercises as a map
          const exercisesResult = await pool.query(
            'SELECT id, name FROM exercises WHERE user_id = $1',
            [userId]
          );

          const exerciseMap = new Map<string, string>();
          exercisesResult.rows.forEach((row) => {
            exerciseMap.set(row.name, row.id);
          });

          // Default templates from seed-templates.ts
          const workoutTemplates = [
            {
              name: 'Push Day',
              description: 'Chest, shoulders, and triceps focused workout',
              exercises: [
                { exerciseName: 'Barbell Bench Press', targetSets: 4, targetReps: '8-10' },
                { exerciseName: 'Incline Dumbbell Press', targetSets: 3, targetReps: '10-12' },
                { exerciseName: 'Overhead Press', targetSets: 3, targetReps: '8-10' },
                { exerciseName: 'Lateral Raises', targetSets: 3, targetReps: '12-15' },
                { exerciseName: 'Cable Tricep Pushdown', targetSets: 3, targetReps: '12-15' },
                { exerciseName: 'Overhead Tricep Extension', targetSets: 3, targetReps: '12-15' },
              ],
            },
            {
              name: 'Pull Day',
              description: 'Back and biceps focused workout',
              exercises: [
                { exerciseName: 'Deadlift', targetSets: 4, targetReps: '5-8' },
                { exerciseName: 'Barbell Row', targetSets: 4, targetReps: '8-10' },
                { exerciseName: 'Pull-ups', targetSets: 3, targetReps: '8-12' },
                { exerciseName: 'Face Pulls', targetSets: 3, targetReps: '15-20' },
                { exerciseName: 'Barbell Curl', targetSets: 3, targetReps: '10-12' },
                { exerciseName: 'Hammer Curl', targetSets: 3, targetReps: '10-12' },
              ],
            },
            {
              name: 'Leg Day',
              description: 'Complete lower body workout',
              exercises: [
                { exerciseName: 'Barbell Back Squat', targetSets: 4, targetReps: '8-10' },
                { exerciseName: 'Romanian Deadlift', targetSets: 3, targetReps: '10-12' },
                { exerciseName: 'Leg Press', targetSets: 3, targetReps: '12-15' },
                { exerciseName: 'Leg Curl', targetSets: 3, targetReps: '12-15' },
                { exerciseName: 'Walking Lunges', targetSets: 3, targetReps: '12-15', notes: 'Per leg' },
                { exerciseName: 'Calf Raises', targetSets: 4, targetReps: '15-20' },
              ],
            },
            {
              name: 'Upper Body',
              description: 'Complete upper body workout for upper/lower split',
              exercises: [
                { exerciseName: 'Barbell Bench Press', targetSets: 4, targetReps: '8-10' },
                { exerciseName: 'Barbell Row', targetSets: 4, targetReps: '8-10' },
                { exerciseName: 'Overhead Press', targetSets: 3, targetReps: '8-10' },
                { exerciseName: 'Pull-ups', targetSets: 3, targetReps: '8-12' },
                { exerciseName: 'Dips', targetSets: 3, targetReps: '10-12' },
                { exerciseName: 'Face Pulls', targetSets: 3, targetReps: '15-20' },
              ],
            },
            {
              name: 'Lower Body',
              description: 'Complete lower body workout for upper/lower split',
              exercises: [
                { exerciseName: 'Barbell Back Squat', targetSets: 4, targetReps: '6-8' },
                { exerciseName: 'Romanian Deadlift', targetSets: 3, targetReps: '8-10' },
                { exerciseName: 'Bulgarian Split Squat', targetSets: 3, targetReps: '10-12', notes: 'Per leg' },
                { exerciseName: 'Leg Curl', targetSets: 3, targetReps: '12-15' },
                { exerciseName: 'Leg Extension', targetSets: 3, targetReps: '12-15' },
                { exerciseName: 'Calf Raises', targetSets: 4, targetReps: '15-20' },
              ],
            },
            {
              name: 'Full Body',
              description: 'Complete full body workout for 3x per week training',
              exercises: [
                { exerciseName: 'Barbell Back Squat', targetSets: 3, targetReps: '8-10' },
                { exerciseName: 'Barbell Bench Press', targetSets: 3, targetReps: '8-10' },
                { exerciseName: 'Deadlift', targetSets: 3, targetReps: '5-8' },
                { exerciseName: 'Pull-ups', targetSets: 3, targetReps: '8-12' },
                { exerciseName: 'Overhead Press', targetSets: 3, targetReps: '8-10' },
                { exerciseName: 'Plank', targetSets: 3, targetReps: '30-60s', notes: 'Hold for time' },
              ],
            },
          ];

          for (const template of workoutTemplates) {
            // Create template
            const templateResult = await pool.query(
              `INSERT INTO workout_templates (user_id, name, description, is_public)
               VALUES ($1, $2, $3, $4)
               RETURNING id`,
              [userId, template.name, template.description, false]
            );

            const templateId = templateResult.rows[0].id;

            // Add exercises to template
            for (let i = 0; i < template.exercises.length; i++) {
              const exercise = template.exercises[i];
              const exerciseId = exerciseMap.get(exercise.exerciseName);

              if (exerciseId) {
                // Parse target reps (could be a range like "8-10" or a number)
                const repsMatch = exercise.targetReps.toString().match(/(\d+)/);
                const targetReps = repsMatch ? parseInt(repsMatch[1]) : null;

                await pool.query(
                  `INSERT INTO template_exercises 
                   (template_id, exercise_id, order_index, target_sets, target_reps, notes)
                   VALUES ($1, $2, $3, $4, $5, $6)`,
                  [
                    templateId,
                    exerciseId,
                    i + 1,
                    exercise.targetSets,
                    targetReps,
                    exercise.notes || `Target: ${exercise.targetReps} reps`,
                  ]
                );
              }
            }
          }

          return true;
        },
      },
    },
  };
});

