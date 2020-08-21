exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    username: { type: 'varchar(1000)', notNull: true },
    password: { type: 'varchar(25)', notNull: true },
    email: { type: 'varchar(50)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
}