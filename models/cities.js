const mongoose = require('mongose')

const citiesSchema  = new mongoose.Shema({
    name:{ type:String, require:true},
    country:{type:String, require:true},
})
const Cities = mongoose.model('cities', citiesSchema)
module.export = Cities