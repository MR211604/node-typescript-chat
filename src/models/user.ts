import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  online: {
    type: Boolean,
    default: false,
  }
})

userSchema.method('toJSON', function() {
  const { password,...object } = this.toObject();  
  return object;
});

export default model('User', userSchema);