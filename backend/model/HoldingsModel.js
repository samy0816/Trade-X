const {model}=require("mongoose");

const{HoldingSchema}=require("../schemas/HoldingSchema");

const HoldingsModel=model("Holding",HoldingSchema);

module.exports={HoldingsModel};



