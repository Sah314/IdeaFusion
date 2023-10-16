// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.FIREBASE_API_KEY,
  authDomain: "ainotetaker-f5833.firebaseapp.com",
  projectId: "ainotetaker-f5833",
  storageBucket: "ainotetaker-f5833.appspot.com",
  messagingSenderId: "674154811821",
  appId: "1:674154811821:web:cd2d88516f4440804f1124",
  measurementId: "G-GQ2EJV032L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app) 

export async function uploadFiletoFirebase(url:string,name:string){
try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer()
    const file_name = name.replace(' ','') +Date.now()+'.jpeg';
    const storageRef = ref(storage,file_name);
    await uploadBytes(storageRef,buffer,{
        contentType:'image/jpeg'
    }) 
    const firebaseURL = await getDownloadURL(storageRef) ;
    return firebaseURL;
} catch (error) {
   console.error(error); 
}
}