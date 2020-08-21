exports.up = pgm => {
  pgm.alterColumn('users', 'password', {
    type: 'varchar(100)'
  })
};
