const mongoose = require('mongoose');
const Schema = mongoose.Schema; 


const offerSchema = new Schema ({
    amount: ({type: Number,  min: 0.01}), 
    status: {type: String, 
        enum: ['pending', 'accepted', 'denied'],
        default: 'pending'
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: true 
    }
}); 


module.exports = mongoose.model('Offer', offerSchema); 