import { getStorage } from "firebase-admin/storage";
import { initializeApp, cert } from "firebase-admin/app";
import dotenv from "dotenv";

dotenv.config();

initializeApp({
  credential: cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    //  private_key: process.env.PRIVATE_KEY,
    private_key: process.env.PRIVATE_KEY
      ? process.env.PRIVATE_KEY.replace(/\\n/gm, "\n")
      : undefined,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_url: "https://accounts.google.com/o/oauth2/auth",
    token_url: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    "client _x509_cert_url": process.env.CLIENT_X509_CERT_URL,
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

const storage = getStorage().bucket();

export default storage;
