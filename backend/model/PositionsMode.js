const {model}=require("mongoose");

const{PositionSchema}=require("../schemas/PositionSchema");

const PositionsModel=model("Position",PositionSchema);

module.exports={PositionsModel};



