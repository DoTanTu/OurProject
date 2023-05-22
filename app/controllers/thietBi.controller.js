const ThietbiHelper = require('../models/thietbiHelper.model')

exports.get_list = function(req, res){
    ThietbiHelper.get_all(function(data){
        res.send({result:data});
    });
};
exports.add_product = function(req, res){
    try {
        var data=req.body;
        ThietbiHelper.create(data,function(response){
            res.send({result:response})
        })
    } catch (error) {
      console.log(error)
    }
};
exports.update_product = function(req, res){
    try {
        var data=req.body;
        const {id} = req.params;
        if(id==undefined ){
            res.sendStatus(400).json({message:'id is requied'})
            return;
        }else{
          ThietbiHelper.update(data,id,function(response){
                res.send({result:response})
            })
        }
       
    } catch (error) {
        console.log(error)
    }
};
exports.delete_product = function(req, res){
    try {
        const {id} =  req.params;
        if(id==undefined){
            res.sendStatus(400).json({message:'id is requied'})
            return;
        }else{
          ThietbiHelper.remove(id,function(response){
                res.send({result:response})
            })
        }
       
    } catch (error) {
        console.log(error)
    }
}
