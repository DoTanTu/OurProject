const db = require('../common/connect');
const NCC = function(ncc){
    this.maNCC=ncc.maNCC;
    this.tenNCC=ncc.tenNCC;
}
NCC.get_all = function(result){
    db.query("select * from NhaCungCap",function(err,ncc){
        if(err){
            result(err);
        }else{
            result(ncc);
        }
    })
}
module.exports=NCC
