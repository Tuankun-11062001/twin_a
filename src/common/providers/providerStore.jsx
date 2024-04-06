import React from 'react'
import { Provider } from 'react-redux'
import store from './store'
import MainRouter from '../router/mainRouter'

const ProviderStore = () => {
  return (
    <Provider store={store}>
        <MainRouter/>
    </Provider>
  )
}

export default ProviderStore