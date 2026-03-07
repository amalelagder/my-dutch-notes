// @ts-ignore
import script from "./scripts/bidi.inline"
import { QuartzComponentConstructor } from "./types"

const BidiAuto: QuartzComponentConstructor = () => {
  function BidiAutoComponent() {
    return null
  }

  BidiAutoComponent.afterDOMLoaded = script
  return BidiAutoComponent
}

export default BidiAuto