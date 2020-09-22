var audio = new Audio('/opening.mp3');

function openCellAudio() {
  audio.play().then(() => {
  }).catch((err) => { })
}


export { openCellAudio }