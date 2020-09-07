import { tokenGet } from './tokenServices'
const BASE_URL = "/scores"

async function submitScore(time, difficulty, gridId) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      'Authorization': "Bearer " + tokenGet(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      time,
      difficulty,
      gridId
    })
  })
  const responseData = await response.json()
}

async function listScores(diff) {
  const response = await fetch(BASE_URL + `?difficulty=${diff}`, {
    method: "GET",
  })
  const responseData = await response.json()
  return responseData;
}

export { submitScore, listScores }