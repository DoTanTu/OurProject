
var Book = require('../models/book.model')

exports.get_list = function(req, res){
    Book.getAll(function(data){
        res.send({result:data});
    });
};


exports.detail = function(req, res){
   Book.getById(req.params.id, function(data){
        res.send({ result: data });
   });

};

exports.add_book = function(req, res){
    var data = {"id": 1, "name": "John"}
    Book.create(data, function(respone){
        res.send({result:respone});
    });
}

exports.remove_book = function(req, res){
    var id = req.params.id
    Book.remove(id, function(respones){
        res.send({result:respones});
    });
}