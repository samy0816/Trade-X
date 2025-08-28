const {Schema}=require("mongoose");

const OrdersSchema=new Schema({

    name: { type: String,},
    qty: { type: Number,},
    price: { type: Number },
    mode: { type: String }
});

module.exports={OrdersSchema};