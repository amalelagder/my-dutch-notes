// @ts-ignore
import script from "./scripts/audio.inline"
import { QuartzComponentConstructor } from "./types"

const AudioButtons: QuartzComponentConstructor = () => {
  function AudioButtonsComponent() {
    return null
  }

  AudioButtonsComponent.afterDOMLoaded = script
  return AudioButtonsComponent
}

export default AudioButtons