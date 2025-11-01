import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const commonExercises = [
  // Chest
  { name: 'Barbell Bench Press', category: 'Compound', muscleGroups: ['Chest', 'Triceps', 'Shoulders'], description: 'Classic compound chest exercise' },
  { name: 'Dumbbell Bench Press', category: 'Compound', muscleGroups: ['Chest', 'Triceps', 'Shoulders'], description: 'Dumbbell variation of bench press' },
  { name: 'Incline Barbell Bench Press', category: 'Compound', muscleGroups: ['Upper Chest', 'Triceps', 'Shoulders'], description: 'Targets upper chest' },
  { name: 'Incline Dumbbell Press', category: 'Compound', muscleGroups: ['Upper Chest', 'Triceps', 'Shoulders'], description: 'Incline press with dumbbells' },
  { name: 'Dumbbell Flyes', category: 'Isolation', muscleGroups: ['Chest'], description: 'Chest isolation exercise' },
  { name: 'Cable Flyes', category: 'Isolation', muscleGroups: ['Chest'], description: 'Cable variation of chest flyes' },
  { name: 'Push-ups', category: 'Compound', muscleGroups: ['Chest', 'Triceps', 'Shoulders'], description: 'Bodyweight chest exercise' },
  { name: 'Dips', category: 'Compound', muscleGroups: ['Chest', 'Triceps', 'Shoulders'], description: 'Bodyweight compound exercise' },

  // Back
  { name: 'Deadlift', category: 'Compound', muscleGroups: ['Back', 'Hamstrings', 'Glutes', 'Core'], description: 'King of all lifts' },
  { name: 'Barbell Row', category: 'Compound', muscleGroups: ['Back', 'Biceps'], description: 'Classic back builder' },
  { name: 'Dumbbell Row', category: 'Compound', muscleGroups: ['Back', 'Biceps'], description: 'Unilateral back exercise' },
  { name: 'Pull-ups', category: 'Compound', muscleGroups: ['Back', 'Biceps'], description: 'Bodyweight back exercise' },
  { name: 'Chin-ups', category: 'Compound', muscleGroups: ['Back', 'Biceps'], description: 'Underhand grip pull-ups' },
  { name: 'Lat Pulldown', category: 'Compound', muscleGroups: ['Lats', 'Biceps'], description: 'Machine-based lat exercise' },
  { name: 'Seated Cable Row', category: 'Compound', muscleGroups: ['Back', 'Biceps'], description: 'Cable row for back thickness' },
  { name: 'T-Bar Row', category: 'Compound', muscleGroups: ['Back', 'Biceps'], description: 'Landmine row variation' },
  { name: 'Face Pulls', category: 'Isolation', muscleGroups: ['Rear Delts', 'Upper Back'], description: 'Shoulder health exercise' },

  // Legs
  { name: 'Barbell Back Squat', category: 'Compound', muscleGroups: ['Quads', 'Glutes', 'Hamstrings'], description: 'King of leg exercises' },
  { name: 'Front Squat', category: 'Compound', muscleGroups: ['Quads', 'Core'], description: 'Quad-dominant squat variation' },
  { name: 'Romanian Deadlift', category: 'Compound', muscleGroups: ['Hamstrings', 'Glutes', 'Lower Back'], description: 'Hamstring-focused deadlift' },
  { name: 'Leg Press', category: 'Compound', muscleGroups: ['Quads', 'Glutes'], description: 'Machine-based leg exercise' },
  { name: 'Bulgarian Split Squat', category: 'Compound', muscleGroups: ['Quads', 'Glutes'], description: 'Unilateral leg exercise' },
  { name: 'Leg Extension', category: 'Isolation', muscleGroups: ['Quads'], description: 'Quad isolation' },
  { name: 'Leg Curl', category: 'Isolation', muscleGroups: ['Hamstrings'], description: 'Hamstring isolation' },
  { name: 'Walking Lunges', category: 'Compound', muscleGroups: ['Quads', 'Glutes', 'Hamstrings'], description: 'Dynamic leg exercise' },
  { name: 'Hip Thrust', category: 'Compound', muscleGroups: ['Glutes', 'Hamstrings'], description: 'Glute-dominant exercise' },
  { name: 'Calf Raises', category: 'Isolation', muscleGroups: ['Calves'], description: 'Calf development' },

  // Shoulders
  { name: 'Overhead Press', category: 'Compound', muscleGroups: ['Shoulders', 'Triceps'], description: 'Primary shoulder builder' },
  { name: 'Dumbbell Shoulder Press', category: 'Compound', muscleGroups: ['Shoulders', 'Triceps'], description: 'Dumbbell variation of OHP' },
  { name: 'Lateral Raises', category: 'Isolation', muscleGroups: ['Side Delts'], description: 'Side delt isolation' },
  { name: 'Front Raises', category: 'Isolation', muscleGroups: ['Front Delts'], description: 'Front delt isolation' },
  { name: 'Rear Delt Flyes', category: 'Isolation', muscleGroups: ['Rear Delts'], description: 'Rear delt isolation' },
  { name: 'Arnold Press', category: 'Compound', muscleGroups: ['Shoulders'], description: 'All-around shoulder exercise' },
  { name: 'Upright Row', category: 'Compound', muscleGroups: ['Shoulders', 'Traps'], description: 'Shoulder and trap builder' },

  // Arms - Biceps
  { name: 'Barbell Curl', category: 'Isolation', muscleGroups: ['Biceps'], description: 'Classic bicep exercise' },
  { name: 'Dumbbell Curl', category: 'Isolation', muscleGroups: ['Biceps'], description: 'Dumbbell bicep curl' },
  { name: 'Hammer Curl', category: 'Isolation', muscleGroups: ['Biceps', 'Forearms'], description: 'Neutral grip curl' },
  { name: 'Preacher Curl', category: 'Isolation', muscleGroups: ['Biceps'], description: 'Isolated bicep curl' },
  { name: 'Cable Curl', category: 'Isolation', muscleGroups: ['Biceps'], description: 'Cable bicep variation' },

  // Arms - Triceps
  { name: 'Close-Grip Bench Press', category: 'Compound', muscleGroups: ['Triceps', 'Chest'], description: 'Compound tricep exercise' },
  { name: 'Tricep Dips', category: 'Compound', muscleGroups: ['Triceps', 'Chest'], description: 'Bodyweight tricep exercise' },
  { name: 'Skull Crushers', category: 'Isolation', muscleGroups: ['Triceps'], description: 'Lying tricep extension' },
  { name: 'Overhead Tricep Extension', category: 'Isolation', muscleGroups: ['Triceps'], description: 'Overhead tricep isolation' },
  { name: 'Cable Tricep Pushdown', category: 'Isolation', muscleGroups: ['Triceps'], description: 'Cable tricep exercise' },
  { name: 'Diamond Push-ups', category: 'Compound', muscleGroups: ['Triceps', 'Chest'], description: 'Tricep-focused push-up' },

  // Core
  { name: 'Plank', category: 'Isolation', muscleGroups: ['Core', 'Abs'], description: 'Isometric core exercise' },
  { name: 'Hanging Leg Raises', category: 'Isolation', muscleGroups: ['Abs', 'Hip Flexors'], description: 'Advanced ab exercise' },
  { name: 'Cable Crunches', category: 'Isolation', muscleGroups: ['Abs'], description: 'Weighted crunch variation' },
  { name: 'Russian Twists', category: 'Isolation', muscleGroups: ['Obliques', 'Core'], description: 'Rotational core exercise' },
  { name: 'Ab Wheel Rollout', category: 'Isolation', muscleGroups: ['Core', 'Abs'], description: 'Advanced core exercise' },
  { name: 'Dead Bug', category: 'Isolation', muscleGroups: ['Core'], description: 'Core stability exercise' },
];

async function seedExercises() {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Starting exercise seeding...');
    
    // Check if we have any users
    const usersResult = await client.query('SELECT id, email FROM users LIMIT 1');
    
    if (usersResult.rows.length === 0) {
      console.log('⚠️  No users found. Please register a user first, then run this seed script.');
      console.log('   The exercises will be seeded for the first registered user.');
      return;
    }
    
    const userId = usersResult.rows[0].id;
    const userEmail = usersResult.rows[0].email;
    console.log(`📝 Seeding exercises for user: ${userEmail}`);
    
    // Check if exercises already exist for this user
    const existingExercises = await client.query(
      'SELECT COUNT(*) FROM exercises WHERE user_id = $1',
      [userId]
    );
    
    if (parseInt(existingExercises.rows[0].count) > 0) {
      console.log(`⚠️  User already has ${existingExercises.rows[0].count} exercises.`);
      console.log('   Skipping seed to avoid duplicates.');
      console.log('   Delete existing exercises first if you want to reseed.');
      return;
    }
    
    // Insert exercises
    let count = 0;
    for (const exercise of commonExercises) {
      await client.query(
        `INSERT INTO exercises (user_id, name, description, category, muscle_groups)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          userId,
          exercise.name,
          exercise.description,
          exercise.category,
          exercise.muscleGroups,
        ]
      );
      count++;
    }
    
    console.log(`✅ Successfully seeded ${count} exercises!`);
    console.log('');
    console.log('Exercise categories:');
    console.log('  - Compound movements');
    console.log('  - Isolation exercises');
    console.log('');
    console.log('Muscle groups covered:');
    console.log('  - Chest, Back, Legs, Shoulders, Arms, Core');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seedExercises();

