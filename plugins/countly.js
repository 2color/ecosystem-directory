/*
 *
 * 🔌 [Plugin | Countly] Countly
 *
 */

// ///////////////////////////////////////////////////////// Imports & Variables
// -----------------------------------------------------------------------------
import Countly from 'countly-sdk-web'

import Config from '@/nuxt.config'

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
// ////////////////////////////////////////////////////////////////// initialize
const initialize = (countlyAppKey, countlySiteUrl) => {
  console.log('C')
  Countly.init({
    app_key: countlyAppKey,
    url: countlySiteUrl,
    debug: Config.countly.debug
  })
  Countly.track_sessions()
  Countly.track_pageview()
  Countly.track_links()
}

// ////////////////////////////////////////////////////////////////// addHelpers
const addHelpers = (countlyAppKey) => {
  console.log('D')
  Countly.trackEvent = (event, data = {}) => {
    console.log(event, data)
    Countly.q.push(['add_event', {
      key: event,
      segmentation: data
    }])
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default ({ app, store, req, router, $config: { countlyAppKey, countlySiteUrl, nodeEnv } }, inject) => {
  if (!process.browser) { return }
  let error = ''
  if (!Config.hasOwnProperty('countly')) { error = '"countly" property is missing from nuxt.config.js' }
  if (!Config.countly.hasOwnProperty('debug')) { error = '"countly.debug" property is missing from nuxt.config.js' }
  if (typeof Config.countly.debug !== 'boolean') { error = '"countly.debug" property in nuxt.config.js must be of type boolean' }
  if (typeof Config.countly.disableInDevelopment !== 'boolean') { error = '"countly.disableInDevelopment" property in nuxt.config.js must be of type boolean' }
  if (typeof Config.countly.suppressErrorLogs !== 'boolean') { error = '"countly.suppressErrorLogs" property in nuxt.config.js must be of type boolean' }
  if (typeof countlyAppKey === 'undefined' || countlyAppKey === '') { error = '"COUNTLY_APP_KEY" environment variable must be set' }
  if (typeof countlySiteUrl === 'undefined' || countlySiteUrl === '') { error = '"COUNTLY_SITE_URL" environment variable must be set' }
  const disableInDevelopment = Config.countly.disableInDevelopment
  console.log(Config.countly)
  console.log(countlyAppKey, countlySiteUrl, nodeEnv)
  if (error !== '' || (nodeEnv === 'development' && disableInDevelopment)) {
    console.log('A')
    inject('Countly', {
      trackEvent: () => {
        if (!Config.countly.suppressErrorLogs) {
          console.log(new Error(error))
          console.log('→ Countly setup errors exist')
        }
      }
    })
    return
  }
  console.log('B')
  initialize(countlyAppKey, countlySiteUrl)
  addHelpers()
  console.log(Countly)
  inject('Countly', Countly)
  console.log('🔌 [Plugin | Countly] Countly')
}
