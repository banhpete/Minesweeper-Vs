exports.up = (pgm) => {
  pgm.createTable('scores', {
    id: 'id',
    difficulty: { type: 'varchar(15)', notNull: true },
    time: { type: 'integer', notNull: true },
    userId: { type: 'integer', notNull: true, references: 'users' },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
}