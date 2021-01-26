const DEFAULT_EMAIL_HOST = "etherio.net";
const { auth } = require("firebase-admin");

class User {
  static all(user_id) {
    return auth()
      .listUsers()
      .then(({ users }) =>
        user_id ? users.filter(({ uid }) => user_id !== uid) : users
      );
  }

  static create({ username, email, displayName, password, photoURL }) {
    let emailVerified = false;

    if (username) {
      email = [username, DEFAULT_EMAIL_HOST].join("@");
      emailVerified = true;
    }

    return auth().createUser({
      email,
      emailVerified,
      displayName,
      password,
      photoURL,
    });
  }
}

module.exports = User;
