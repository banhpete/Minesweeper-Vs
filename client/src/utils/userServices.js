import { tokenGet, tokenRemove, tokenSet } from './tokenServices'
const BASE_URL = "/user/"

function userGet() {
  const token = tokenGet()
  return token ? JSON.parse(atob(token.split('.')[1])).username : ""
}

function userLogoff() {
  return tokenRemove();
}

async function userCreate({ username, password, email }) {
  const response = await fetch(BASE_URL + '/create', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password, email })
  })
  const responseData = await response.json()

  if (!responseData.error) {
    tokenSet(responseData.token)
  }
  return responseData
}

async function userLogin({ username, password }) {
  const response = await fetch(BASE_URL + '/signin', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  const responseData = await response.json()

  if (!responseData.error) {
    tokenSet(responseData.token)
  }
  return responseData
}

export { userGet, userLogoff, userCreate, userLogin }