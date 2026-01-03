import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8KTfpfDb9d3VIIiznLWN2c3vuqBo798",
  authDomain: "hrms-53f24.firebaseapp.com",
  projectId: "hrms-53f24",
  storageBucket: "hrms-53f24.appspot.com",
  messagingSenderId: "673318817382",
  appId: "1:673318817382:web:209dc334447644a84a7a7",
};

const app = initializeApp(firebaseConfig);

// 🔐 Auth service export
export const auth = getAuth(app);
