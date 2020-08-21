exports.up = pgm => {
  pgm.renameConstraint('users', 'unqiue username', 'unique-username')
  pgm.renameConstraint('users', 'unqiue email', 'unique-email')
};
