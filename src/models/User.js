const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    role: {
      type: String,
      enum: ['student', 'manager', 'admin'],
      required: true,
      default: 'student'
    },
    profilePicture: {
      type: String,
      default: ""
    },
    fullName: {
    type: String,
    default: ""
    },
    registerNumber: {
    type: String,
    default: ""
    },
      department: {
      type: String,
      default: ""
    },
    year: {
    type: String,
    default: ""
    },
    section: {
    type: String,
    default: ""
   },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
