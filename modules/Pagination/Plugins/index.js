/*
 *
 * 🔌 [Plugin | Pagination] Pagination
 *
 */

// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
// ///////////////////////////////////////////////////////////////////// General
import Vue from 'vue'
import Store from '@/modules/Pagination/Store'

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
// ///////////////////////////////////////////////////////// registerGlobalStore
const registerStore = (App, next) => {
  App.store.registerModule('pagination', Object.assign({
    namespaced: true
  }, Store))
  if (next) { return next() }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default ({ app }, inject) => {
  registerStore(app, () => {
    console.log(`🔌 [Plugin | Pagination] Pagination`)
  })
}
