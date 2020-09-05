import { tokenGet } from './tokenServices'
const BASE_URL = "/scores"

async function submitScore(score) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      'Authorization': "Bearer " + tokenGet(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(score)
  })
  const responseData = await response.json()
  console.log(responseData);
}

async function listScores(diff) {
  const response = await fetch(BASE_URL + `?difficulty=${diff}`, {
    method: "GET",
  })
  const responseData = await response.json()
  return responseData;
}

export { submitScore, listScores }