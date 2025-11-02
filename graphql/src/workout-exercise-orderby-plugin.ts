import { makeAddPgTableOrderByPlugin, orderByAscDesc } from 'graphile-utils';

/**
 * Plugin to add ORDER_INDEX ordering to the workout_exercises table
 * This allows ordering workout exercises by order_index ascending/descending
 */
export const WorkoutExerciseOrderByPlugin = makeAddPgTableOrderByPlugin(
  'public',
  'workout_exercises',
  (build) => {
    const { pgSql: sql } = build;
    return orderByAscDesc(
      'ORDER_INDEX',
      ({ queryBuilder }) => {
        const orderByFragment = sql.fragment`${queryBuilder.getTableAlias()}.order_index`;
        return orderByFragment;
      },
      { nulls: 'last-iff-ascending' }
    );
  }
);

