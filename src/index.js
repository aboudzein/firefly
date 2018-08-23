import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'

import App from './views/App'

console.log('create-react-app env:', process.env.NODE_ENV)
console.log('firefly app env:', process.env.REACT_APP_ENV)

// DATABASE
const dbConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
}
Firebase.initializeApp(dbConfig)

// https://firebase.google.com/docs/reference/js/firebase.firestore.Settings#~timestampsInSnapshots
// temporary setting to squash error date warning
// TODO - remove once this is the firebase default behavior
Firebase.firestore().settings({timestampsInSnapshots: true})

// TRACKING
ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID, {debug: true})
if (process.env.NODE_ENV === 'production') {
  window.Raven.config(process.env.REACT_APP_SENTRY_RAVEN_TRACKING_URL).install()
}

// REACT
ReactDOM.render(<App />, document.getElementById('root'))
