import { model, Schema } from "mongoose";

const MessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

MessageSchema.method('toJSON', function() {
  const { _id, ...object } = this.toObject(); 
  return object;
});

export default model('Message', MessageSchema);