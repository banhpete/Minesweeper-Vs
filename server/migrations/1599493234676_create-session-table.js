exports.up = pgm => {
  pgm.createTable('user_sessions', {
    sid: { type: 'varchar(100)', notNull: true, collation: '"default"', primaryKey: true },
    sess: { type: 'json', notNull: true },
    expire: { type: 'timestamp' },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};