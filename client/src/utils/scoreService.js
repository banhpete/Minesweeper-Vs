import { tokenGet } from './tokenServices'
const BASE_URL = "/score"

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

export { submitScore }