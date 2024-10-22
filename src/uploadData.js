// src/uploadData.js
import { db } from './firebase/firebaseConfig.js'; // Ensure you have .js extension
import { collection, addDoc } from 'firebase/firestore';
import sportsData from './data/sportsData.js'; // Ensure you have .js extension
import streamingData from './data/streamingData.js'; // Ensure you have .js extension
import channelMapping from './data/channelMapping.js'; // Ensure you have .js extension

const uploadData = async () => {
  try {
    const sportsCollectionRef = collection(db, 'sports');
    const streamingCollectionRef = collection(db, 'streaming');
    const channelsCollectionRef = collection(db, 'channels');

    // Upload sports data
    for (const data of sportsData) {
      await addDoc(sportsCollectionRef, data);
    }

    // Upload streaming data
    for (const [country, channels] of Object.entries(streamingData)) {
      await addDoc(streamingCollectionRef, { country, channels });
    }

    // Upload channel mapping data
    for (const [channelName, channelInfo] of Object.entries(channelMapping)) {
      await addDoc(channelsCollectionRef, { name: channelName, ...channelInfo });
    }

    console.log('Data uploaded successfully!');
  } catch (error) {
    console.error('Error uploading data: ', error);
    // Optionally log which data failed to upload
  }
};

uploadData();
