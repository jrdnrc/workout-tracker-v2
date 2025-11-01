import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

interface TemplateExercise {
  exerciseName: string;
  targetSets: number;
  targetReps: number | string;
  notes?: string;
}

interface WorkoutTemplate {
  name: string;
  description: string;
  exercises: TemplateExercise[];
}

const workoutTemplates: WorkoutTemplate[] = [
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

async function seedTemplates() {
  const client = await pool.connect();

  try {
    console.log('🏋️  Starting workout template seeding...');

    // Check if we have any users
    const usersResult = await client.query('SELECT id, email FROM users LIMIT 1');

    if (usersResult.rows.length === 0) {
      console.log('⚠️  No users found. Please register a user first, then run this seed script.');
      return;
    }

    const userId = usersResult.rows[0].id;
    const userEmail = usersResult.rows[0].email;
    console.log(`📝 Seeding workout templates for user: ${userEmail}`);

    // Check if templates already exist for this user
    const existingTemplates = await client.query(
      'SELECT COUNT(*) FROM workout_templates WHERE user_id = $1',
      [userId]
    );

    if (parseInt(existingTemplates.rows[0].count) > 0) {
      console.log(`⚠️  User already has ${existingTemplates.rows[0].count} templates.`);
      console.log('   Skipping seed to avoid duplicates.');
      return;
    }

    // Get all exercises as a map
    const exercisesResult = await client.query(
      'SELECT id, name FROM exercises WHERE user_id = $1',
      [userId]
    );

    const exerciseMap = new Map<string, string>();
    exercisesResult.rows.forEach((row) => {
      exerciseMap.set(row.name, row.id);
    });

    console.log(`📚 Found ${exerciseMap.size} exercises in database`);

    let templateCount = 0;
    let exerciseCount = 0;

    for (const template of workoutTemplates) {
      // Create template
      const templateResult = await client.query(
        `INSERT INTO workout_templates (user_id, name, description, is_public)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [userId, template.name, template.description, false]
      );

      const templateId = templateResult.rows[0].id;
      templateCount++;

      // Add exercises to template
      for (let i = 0; i < template.exercises.length; i++) {
        const exercise = template.exercises[i];
        const exerciseId = exerciseMap.get(exercise.exerciseName);

        if (exerciseId) {
          // Parse target reps (could be a range like "8-10" or a number)
          const repsMatch = exercise.targetReps.toString().match(/(\d+)/);
          const targetReps = repsMatch ? parseInt(repsMatch[1]) : null;

          await client.query(
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
          exerciseCount++;
        } else {
          console.log(`   ⚠️  Exercise "${exercise.exerciseName}" not found, skipping`);
        }
      }

      console.log(`   ✓ Created template: ${template.name}`);
    }

    console.log('');
    console.log(`✅ Successfully seeded ${templateCount} workout templates!`);
    console.log(`   Total exercises added: ${exerciseCount}`);
    console.log('');
    console.log('Templates created:');
    console.log('  - Push Day (Push/Pull/Legs split)');
    console.log('  - Pull Day (Push/Pull/Legs split)');
    console.log('  - Leg Day (Push/Pull/Legs split)');
    console.log('  - Upper Body (Upper/Lower split)');
    console.log('  - Lower Body (Upper/Lower split)');
    console.log('  - Full Body (3x per week)');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seedTemplates();

