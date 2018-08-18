/*
 *   Helper functions for working with Firebase Firestore
 */

const Firebase = require('firebase')

const prepareDocForCreate = doc => {

  // timestamps
  doc.createdBy = Firebase.auth().currentUser ? Firebase.auth().currentUser.uid : null
  doc.createdOn = new Date()

  return doc
}

const prepareDocForUpdate = doc => {

  // timestamps
  doc.updatedBy = Firebase.auth().currentUser ? Firebase.auth().currentUser.uid : null
  doc.updatedOn = new Date()

  // don't save the id as part of the document
  delete doc.id

  // don't save values that start with an underscore (these are calculated by the backend)
  Object.keys(doc).forEach( key => {
    if (key.indexOf('_') === 0) {
      delete doc[key]
    }
  })

  return doc
}

export {
  prepareDocForCreate,
  prepareDocForUpdate,
}