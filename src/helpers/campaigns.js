import { firebaseAuth, db } from '../config/constants';

function getByUserId(userId) {
  const usersCollection = db.collection('campaigns');
  const query = usersCollection.where('userId', '==', userId);
  return db
    .collection(`campaigns`)
    .get()
    .then(querySnapshot => {
      return querySnapshot.docs.map(documentSnapshot => {
        return documentSnapshot.data();
      });
    })
    .catch(error => {
      console.warn('Error getting documents: ', error);
    });
}

const CampaignsData = {
  getByUserId
};

export default CampaignsData;
