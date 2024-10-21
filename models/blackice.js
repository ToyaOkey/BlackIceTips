const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
// const {v4: uuidv4} = require('uuid'); 


// const services = [
//     {
//         id: '1', 
//         title: 'Coaching', 
//         seller: 'Beaulo', 
//         condition: 'Beginner', 
//         price: '30.00', 
//         details: 'Premium one on one coaching to help best support intro plays. ', 
//         image: '../images/coaching.svg', 
//         active: 'true', 
//         offers: '5'
//     },

//     {
//         id: '2', 
//         title: 'Game Sense Guide', 
//         seller: 'Spoit', 
//         condition: 'Intermediate', 
//         price: '9.99', 
//         details: 'Learn the best angles on each map.',
//         image: '../images/game-sense-guide.svg', 
//         active: 'true', 
//         offers: '3'
//     }, 
//     {
//         id: '3', 
//         title: 'The Ultimate Map Guide', 
//         seller: 'Braction', 
//         condition: 'Expert', 
//         price: '9.99', 
//         details: 'Learn the best angles on each map.',
//         image: '../images/map-guide.svg', 
//         active: 'true', 
//         offers: '4'
//     }, 
//     {
//         id: '4', 
//         title: 'The Ultimate Loadout Kit', 
//         seller: 'Atheino', 
//         condition: 'Advanced', 
//         price: '4.99', 
//         details: 'Know the best loadout setups for no recoil and instant aimbot.',
//         image: '../images/loadout-kit.svg', 
//         active: 'true', 
//         offers: '3'
//     }, 
//     {
//         id: '5', 
//         title: 'The Ultimate Aim Guide', 
//         seller: 'Shaiiko', 
//         condition: 'Advanced', 
//         price: '5.99', 
//         details: 'Learn the best way to practice your aim to instantly improve your rank.',
//         image: '../images/aim-guide.svg', 
//         active: 'true', 
//         offers: '4'
//     }, 
//     {
//         id: '6', 
//         title: 'The Ultimate Siege Document', 
//         seller: 'The Siege FBI', 
//         condition: 'Expert', 
//         price: '10.99', 
//         details: 'Top secret document to instantly go from copper to champion.',
//         image: '../images/ultimate-document.svg', 
//         active: 'true', 
//         offers: '11',
//     }
// ]

// services.sort((a, b) => Number(a.price) - Number(b.price));

// exports.find = () => services;

// exports.findById = (id) => services.find(service => service.id === id);

// exports.save = (service) => {
//     service.id = uuidv4();
//     services.push(service);
//     services.sort((a, b) => Number(a.price) - Number(b.price));
// };

// exports.updateById = (id, newService) => {
//     let service = services.find(service => service.id === id); 

//     if(service !== undefined){
//         // console.log(newService['condition-dropdown']); 
//         service.title = newService.title; 
//         service.seller = newService.seller; 
//         service.condition = newService['condition-dropdown']; 
//         // console.log(service.condition);
//         service.price = newService.price; 
//         service.details = newService.details; 
//         service.image = newService.image; 
//         // service.active = newService.active; 
//         // service.offers = newService.offers; 
//         console.log(service); 
//         services.sort((a, b) => Number(a.price) - Number(b.price));
//         return true; 
//     }
//     return false; 
// }; 

// exports.deleteById = (id) => {
//     let index = services.findIndex(service => service.id === id);
//     console.log(index);
//     if(index !== -1){
//         services.splice(index, 1);
//         return true;
//     } else {
//         return false;
//     }
// }



// exports.search = (searchTerm) => 
//     services.filter(service => { 
//         return service.title.toLowerCase().includes(searchTerm.toLowerCase()) || service.details.toLowerCase().includes(searchTerm.toLowerCase())

//     });
/*  title
seller
condition
price
details
image - stores the file path to the image file in the project directory
active - stores the status of the item. Set its default value to true. When the item is sold, this field is set to false. For this milestone, this field stays true. In future milestones, this field will be updated to false after an item is sold.*/  
const itemSchema = new Schema({
    title: {type: String,  required: [true, 'Title is required']}, 
    seller: {type: String,  required: [true, 'Seller is required']}, 
    condition: {type: String, required: [true, 'Condition is required'],
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Pro']
    },
    price: {type: Number, required: [true, 'You cannot have a free item!'], min: 0.01, max: 100}, 
    details: {type: String,  required: [true, 'Content is required'], 
        minLength: [10, 'The content should be atleast 10 characters']}, 
    image: {type: String}, 
    offers: {type: Number, default: 0},
    active: {type: Boolean, default: false}
}, 
{timestamps: true}); 