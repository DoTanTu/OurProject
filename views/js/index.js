let products = []
let nhacungcap = []
let LoaiTB = []
let checkUpdate = true
async function getProducts() {
    try {
        let data = await axios.get("http://127.0.0.1:3000/thietBi/list")
        products = data.data.result
        console.log(products)
        renderProduct()
    } catch (error) {
        console.log(error)
    }
}
async function getNCC() {
    try {
        let data = await axios.get("http://127.0.0.1:3000/NCC/list")
        nhacungcap = data.data.result
        console.log(nhacungcap)
        renderNCC()
    } catch (error) {
        console.log(error)
    }
}
async function getLoaiTB() {
    try {
        let data = await axios.get("http://127.0.0.1:3000/LoaiTB/list")
        LoaiTB = data.data.result
        console.log(LoaiTB)
        renderLTB()
    } catch (error) {
        console.log(error)
    }
}
async function addProducts(data) {
    try {
        axios.post('http://127.0.0.1:3000/thietbi/add', data).then(function (response) {
            console.log(response);
            getProducts()
            renderProduct()
        }).catch(function (error) {
            console.log(error);
        });
    } catch (error) {
        console.log(error)
    }
}
async function updateProducts(data) {
    try {
        axios.patch(`http://127.0.0.1:3000/thietbi/update/${data.maThietBi}`, data).then(function (response) {
            console.log(response);
            getProducts()
            renderProduct()
        }).catch(function (error) {
            console.log(error);
        });
    } catch (error) {
        console.log(error)
    }
}
async function deleteProducts(id) {
    console.log(id)
    try {
        if (confirm("bạn có muốn xóa hay không")) {
            axios.delete(`http://127.0.0.1:3000/thietbi/delete/${id}`).then(function (response) {
                console.log(response);
                getProducts()
                renderProduct()
            }).catch(function (error) {
                console.log(error);
            });
        }
    } catch (error) {
        console.log(error)
    }
}

function resetInputupdate() {
    checkUpdate = true
    document.getElementById('btn-add').style.display = "inline-block"
    document.getElementById('btn-update').style.display = "none"
    document.getElementById("maThietBi").disabled = false
}

function checkTrangthai(data) {
    switch (data) {
        case 1:
            return "Đang bảo trì"
            break;
        case 0:
            return "Bình thường"
            break;
        case -1:
            return "Hỏng"
            break;
        default:
    }
}

function resetInput() {
    document.getElementById("loaiThietBi").value = ""
    document.getElementById("maThietBi").value = ""
    document.getElementById("tenThietBi").value = ""
    document.getElementById("donVi").value = ""
    document.getElementById("tenNSX").value = ""
    document.getElementById("hanSD").value = ""
    document.getElementById("soLuong").value = ""
    document.getElementById("trangThai").value = ""
    document.getElementById("NCC").value = ""
}
Validator({
    form: '#form-1',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#loaiThietBi', 'vui lòng nhập đầy đủ'),
        Validator.isMathietbi('#maThietBi', 'vui lòng nhập đầy đủ'),
        Validator.isRequired('#tenThietBi'),
        Validator.isRequired('#donVi'),
        Validator.isRequired('#tenNSX'),
        Validator.isRequired('#hanSD'),
        Validator.isRequired('#soLuong'),
        Validator.isRequired('#trangThai'),
        Validator.isRequired('#NCC'),
    ],
    onSubmit: function (data) {
        console.log(data)
        if (checkUpdate) {
            if (confirm("bạn có muốn thêm hay không")) {
                addProducts(data)
            }
        } else {
            if (confirm("bạn có muốn sửa hay không")) {
                updateProducts(data)
                resetInputupdate()
            }
        }
        getProducts()
        renderProduct()
        resetInput()
    }
})

function formatDate(data) {
    const dateValue = new Date(data);
    const formattedDate = `${dateValue.getFullYear()}-${(dateValue.getMonth()+1).toString().padStart(2, '0')}-${dateValue.getDate().toString().padStart(2, '0')}`; // định dạng ngày theo định dạng YYYY-MM-DD
    const formattedTime = `${dateValue.getHours().toString().padStart(2, '0')}:${dateValue.getMinutes().toString().padStart(2, '0')}:${dateValue.getSeconds().toString().padStart(2, '0')}`; // định dạng giờ theo định dạng hh:mm:ss
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime
}

function renderNCC() {
    let element = `<option value="" style="padding-left: 35px;">--Chọn nhà cung cấp--</option>`
    nhacungcap.map((value, index) => {
        element += `<option value="${value.maNCC}">${value.tenNCC}</option>`
    })
    document.getElementById("NCC").innerHTML = element
}

function renderLTB() {
    let element = `<option value="">--Chọn loại--</option>`
    LoaiTB.map((value, index) => {
        element += `<option value="${value.maLoaiTB}">${value.tenLoaiTB}</option>`
    })
    document.getElementById("loaiThietBi").innerHTML = element
}

function editProduct(index) {

    checkUpdate = false
    console.log(products[index])
    document.getElementById("tenThietBi").value = products[index].tenThietBi
    document.getElementById("tenNSX").value = products[index].tenNSX
    document.getElementById("loaiThietBi").value = products[index].loaiThietBi
    document.getElementById("hanSD").value = formatDate(products[index].hanSD)
    document.getElementById("trangThai").value = products[index].trangThai
    document.getElementById("soLuong").value = products[index].soLuong
    document.getElementById("donVi").value = products[index].donVi
    document.getElementById("NCC").value = products[index].maNCC
    document.getElementById("maThietBi").value = products[index].maThietBi
    document.getElementById('btn-add').style.display = "none"
    document.getElementById('btn-update').style.display = "inline-block"
    document.getElementById("maThietBi").disabled = true;

}

function renderProduct() {
    let element = ``
    products.map((value, index) => {
        let date = formatDate(value.hanSD)
        let Trangthai = checkTrangthai(value.trangThai)
        element += `<tr onclick="editProduct('${index}')">
                                <td>${value.maThietBi}</td>
                                <td>${value.tenThietBi}</td>
                                <td>${value.tenLoaiTB}</td>
                                <td>${value.soLuong}</td>
                                <td>${value.donVi}</td>
                                <td>${value.tenNSX}</td>
                                <td>${Trangthai}</td>
                                <td>${date}</td>
                                <td><button onclick={deleteProducts('${value.maThietBi}')} action="delete" href="#" 
                                    class="btn btn-danger"> Delete </button></td>
                            </tr>`
    })
    document.getElementById("bodyTable").innerHTML = element
}