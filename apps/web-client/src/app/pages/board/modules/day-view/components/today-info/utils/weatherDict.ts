import clearIcon from '../../../../../../../../assets/image/weather/clear.png'
import clearDarkIcon from '../../../../../../../../assets/image/weather/clear-dark.png'
import cloudIcon from '../../../../../../../../assets/image/weather/cloud.png'
import overcastIcon from '../../../../../../../../assets/image/weather/overcast.png'
import showerIcon from '../../../../../../../../assets/image/weather/shower.png'
import lightRainIcon from '../../../../../../../../assets/image/weather/light-rain.png'
import heavyRainIcon from '../../../../../../../../assets/image/weather/heavy-rain.png'
import iceIcon from '../../../../../../../../assets/image/weather/ice.png'
import stormIcon from '../../../../../../../../assets/image/weather/storm.png'
import snowFlurryIcon from '../../../../../../../../assets/image/weather/snow-flurry.png'
import lightSnowIcon from '../../../../../../../../assets/image/weather/light-snow.png'
import heavySnowIcon from '../../../../../../../../assets/image/weather/heavy-snow.png'
import snowstormIcon from '../../../../../../../../assets/image/weather/snowstorm.png'
import dustIcon from '../../../../../../../../assets/image/weather/dust.png'
import duststormIcon from '../../../../../../../../assets/image/weather/duststorm.png'
import foggyIcon from '../../../../../../../../assets/image/weather/foggy.png'
import hazeIcon from '../../../../../../../../assets/image/weather/haze.png'
import windyIcon from '../../../../../../../../assets/image/weather/windy.png'
import coldIcon from '../../../../../../../../assets/image/weather/cold.png'
import unknownIcon from '../../../../../../../../assets/image/weather/unknown.png'

const conds = new Map([
  [[0, 2, 38], clearIcon],
  [[1, 3], clearDarkIcon],
  [[4, 5, 6, 7, 8], cloudIcon],
  [[9], overcastIcon],
  [[10, 11, 12], showerIcon],
  [[13], lightRainIcon],
  [[14, 15], heavyRainIcon],
  [[16, 17, 18], stormIcon],
  [[19, 20], iceIcon],
  [[21], snowFlurryIcon],
  [[22], lightSnowIcon],
  [[23, 24], heavySnowIcon],
  [[25], snowstormIcon],
  [[26, 27], dustIcon],
  [[28, 29, 34, 35, 36], duststormIcon],
  [[30], foggyIcon],
  [[31], hazeIcon],
  [[32, 33], windyIcon],
  [[37], coldIcon]
])

const getWeatherIcon = (code: string) => {
  const c = parseInt(code, 10)

  for (const [code, icon] of conds) {
    if (code.includes(c)) {
      return icon
    }
  }

  return unknownIcon
}

export { getWeatherIcon, clearIcon }
