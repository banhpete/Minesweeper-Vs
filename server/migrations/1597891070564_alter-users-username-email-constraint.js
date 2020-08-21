exports.up = pgm => {
  pgm.addConstraint('users', 'unqiue username', {
    unique: 'username'
  })

  pgm.addConstraint('users', 'unqiue email', {
    unique: 'email'
  })
};
