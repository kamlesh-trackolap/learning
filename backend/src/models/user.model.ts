import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email:{
        require:[true,'please enter the email'],
        type: String
    },
      passowrd:{
          require: [true,'please enter the password'],
        type: String
    }
})
const userModal = mongoose.model('User',userSchema);

export default userModal;