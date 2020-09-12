import { tokenGet } from './tokenServices'
const BASE_URL = "/scores"

async function submitScore(time, difficulty, gridId) {
  await fetch(BASE_URL, {
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
}

async function listScores(diff) {
  const response = await fetch(BASE_URL + `?difficulty=${diff}`, {
    method: "GET",
  })
  const responseData = await response.json()
  return responseData;
}

export { submitScore, listScores }