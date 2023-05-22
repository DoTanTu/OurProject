const db = require('../common/connect');
const LoaiTB = function(LTB){
    this.maLoaiTB=LTB.maLoaiTB;
    this.tenLoaiTB=LTB.tenLoaiTB;
}
LoaiTB.get_all = function(result){
    db.query("select * from loaiThietbi",function(err,loaiThietbi){
        if(err){
            result(err);
        }else{
            result(loaiThietbi);
        }
    })
}
module.exports=LoaiTB
