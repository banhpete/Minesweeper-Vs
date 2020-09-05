exports.up = (pgm) => {
  pgm.renameColumn('scores', 'userId', 'user_id');
  pgm.renameColumn('users', 'createdAt', 'created_at');
}