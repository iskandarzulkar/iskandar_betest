const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountId: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastLoginDateTime: { type: Date },
  userId: { type: String, required: true }
});


const Account = mongoose.model('accounts', accountSchema);

module.exports = Account;
