import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  },
  DateOfBirth: {
    type: Date,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', UserSchema);
