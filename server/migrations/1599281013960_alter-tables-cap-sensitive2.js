exports.up = (pgm) => {
  pgm.renameColumn('scores', 'createdAt', 'created_at');
}