document.addEventListener("nav", setupAudioButtons)
document.addEventListener("DOMContentLoaded", setupAudioButtons)

function setupAudioButtons() {
  let currentAudio: HTMLAudioElement | null = null
  let currentButton: HTMLElement | null = null

  document.querySelectorAll<HTMLElement>(".audio-line .play").forEach((btn) => {
    const audio = btn.previousElementSibling as HTMLAudioElement | null
    if (!audio || audio.tagName !== "AUDIO") return

    btn.onclick = () => {
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
        if (currentButton) currentButton.textContent = "🔊"
      }

      if (audio.paused) {
        audio.play()
        btn.textContent = "⏸"
        currentAudio = audio
        currentButton = btn
      } else {
        audio.pause()
        btn.textContent = "🔊"
        if (currentAudio === audio) {
          currentAudio = null
          currentButton = null
        }
      }
    }

    audio.onended = () => {
      btn.textContent = "🔊"
      if (currentAudio === audio) {
        currentAudio = null
        currentButton = null
      }
    }
  })
}