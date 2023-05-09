const db = require('../common/connect')
const Book = function(book){
    this.maTaiKhoan = book.maTaiKhoan;
    this.tenTaiKhoan = book.tenTaiKhoan;
    this.matKhau = book.matKhau;
    this.phongBan = book.phongBan;
    this.gmail = book.gmail;
    this.maKhoa = book.maKhoa;
}

Book.getAll = function(result){
    db.query("SELECT * FROM TaiKhoan", function(err,book){
        if (err)
            result(null);
        else 
            result(book);
    });

};

Book.getById = function(id, result) {
    db.query("Select * from book where id = ?", id, function(err,book){
        if (err || book.length == 0){
            result(null);
        }
        else{
            result(book[0]);
        }
    })
    
}

Book.create = function(data, result){
    db.query("INSERT INTO book(name, image, author_id) VALUES(?,?,?)", [data.name, data.image, data.author_id], function(err,book){
        if (err)
            result(null);
        else{
            result(book);
        }
    });
}
    

Book.remove = function(id, result){
    result("xoa id: " + id + " thanh cong");
};

module.exports = Book;