import { makeAddPgTableOrderByPlugin, orderByAscDesc } from 'graphile-utils';

/**
 * Plugin to add SET_NUMBER ordering to the Sets table
 * This allows ordering sets by set_number ascending/descending
 */
export const SetOrderByPlugin = makeAddPgTableOrderByPlugin(
  'public',
  'sets',
  (build) => {
    const { pgSql: sql } = build;
    return orderByAscDesc(
      'SET_NUMBER',
      ({ queryBuilder }) => {
        const orderByFragment = sql.fragment`${queryBuilder.getTableAlias()}.set_number`;
        return orderByFragment;
      },
      { nulls: 'last-iff-ascending' }
    );
  }
);

