import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducers'

import promise from 'redux-promise-middleware'
import logger from 'redux-logger'

const store = createStore(reducer, applyMiddleware(promise, logger))

export default store
