const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const itemSchema = new Schema({
    title: {type: String,  required: [true, 'Title is required']}, 
    seller: {type: Schema.Types.ObjectId,  required: [true, 'Seller is required'], ref:"User"}, 
    condition: {type: String, required: [true, 'Condition is required'],
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Pro']
    },
    price: {type: Number, required: [true, 'You cannot have a free item!'], min: 0.01, max: 100}, 
    details: {type: String,  required: [true, 'Content is required'], 
        minLength: [10, 'The content should be atleast 10 characters']}, 
    image: {type: String, required: true}, 
    offers: {
        type: Schema.Types.ObjectId,
        ref: 'Offer'
    },
    totalOffers: {type: Number, default: 0},
    highestOffer: {type: Number, default: 0},
    active: {type: Boolean, default: true}
}, 
{timestamps: true}); 

module.exports = mongoose.model('Item', itemSchema);