if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

async function downloadCredential(url, path) {
  const { default: axios } = require("axios");
  const { writeFileSync } = require("fs");

  try {
    const { data } = await axios.get(url);
    writeFileSync(path, JSON.stringify(data), "utf-8");
  } catch (err) {
    console.log(err);
    process.abort();
  }
}

function initializeApp() {
  const admin = require("firebase-admin");
  const {
    FIREBASE_DATABASE_URL: databaseURL,
    FIREBASE_STORAGE_BUCKET: storageBucket,
  } = process.env;

  if (admin.apps.length) {
    return admin.app();
  }

  return admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL,
    storageBucket,
  });
}

async function bootstrap() {
  const { resolve } = require("path");
  const { existsSync } = require("fs");

  process.env.GOOGLE_APPLICATION_CREDENTIALS = resolve(
    process.cwd(),
    "server-account.json"
  );

  if (!existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    await downloadCredential(
      process.env.SERVICE_ACCOUNT_CREDENTIAL,
      process.env.GOOGLE_APPLICATION_CREDENTIALS
    );
  }

  return initializeApp();
}

module.exports = bootstrap();
