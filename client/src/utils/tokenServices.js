function tokenGet() {
  let token = localStorage.getItem('token')
  if (token) {
    let payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp < Date.now() / 1000) {
      token = tokenRemove()
    }
  }
  return token
}

function tokenRemove() {
  localStorage.removeItem('token');
  return null
}

function tokenSet(token) {
  localStorage.setItem('token', token)
}

export { tokenGet, tokenRemove, tokenSet }