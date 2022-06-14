const Cities = require('../models/cities')

const citiesControllers = {
    getCities: async(req, res) => {
        let cities
        let error = null
        try{
            cities= await Cities.find()
        }catch (err) {error = err}
        res.json({
            response: error ? 'ERROR' : { cities },
            success: error ? false : true,
            error: error
        })
    },


    getOneCities: async (req,res) => {
        const id = req.params.id
        let city
        let error = null
        try{
            city = await Cities.findOne({_id:id})
        }catch(err){
            error = err
            console.log(err)
        }
        res.json({
            response: error ? 'ERROR' : city,
            succes : error ? false : true,
        })
    },


    addCities: async (req, res) => {
        const {name,country,,description}=req.body.data
        let city
        let error = null
        try{
            city = await new Cities({
                name:name,
                country:country,
                description:description
            }).save()
        }catch(err){error = err}
        res.json({
            response: error ? 'ERROR' : city,
            succes: error ? false : true,
            error: error
        })
    },


    modifyCities: async (req, res) => {
        const id = req.params.id
        const city = req.body.data
        let citydb
        let error = null
        try {
            citydb = await Cities.findOneAndUpdate({ _id:id }), city,{ new: true}
        } catch(err){ error = err }
        res.json({
            response: error ? 'ERROR' : citydb,
            succes: error ? false : true,
            error: error
        })
    },


    removeCities: async (req, res) => {
        const id = req.params.id
        let city
        let error = null
        try {
            city = await Cities.findOneAndDelete({_id:id})
        } catch(err) {error = err}     
        res.json({
                response: error ? 'ERROR' : city,
                succes: error ? false : true,
                error: error
            })
        },
}

module.export = citiesControllers