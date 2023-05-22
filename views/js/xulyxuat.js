var stt = 1;
var stt2 = 1;

var ngayXuatKhoInput = document.getElementById('ngayXuatKho');
var ngayXuatKho = new Date(); // Lấy ngày và giờ hiện tại

// Chuyển đổi định dạng ngày tháng thành chuỗi 'DD/MM/YYYY HH:mm:ss'
var formattedNgayXuatKho = ngayXuatKho.toISOString().slice(0, 19).replace('T', ' ');
ngayXuatKhoInput.value = formattedNgayXuatKho;


document.getElementById('btn-add').addEventListener('click', function (event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit (nếu có)

  var maThietBi = document.getElementById('maThietBi').value;
  var tenThietBi = document.getElementById('tenThietBi').value;
  var loaiThietBi = document.getElementById('loaiThietBi').value;
  var ghiChu = document.getElementById('ghiChu').value;
  var soLuong = document.getElementById('soLuong').value;
  var donVi = document.getElementById('donVi').value;
  var trangThai = document.getElementById('trangThai').value;

  // Kiểm tra các ô ngoại trừ ô "Ghi chú"
  if (maThietBi && tenThietBi && loaiThietBi && soLuong && donVi && trangThai) {
    var table = document.getElementById('tblThietBi');
    var newRow = table.insertRow();
    var cell0 = newRow.insertCell();
    var cell1 = newRow.insertCell();
    var cell2 = newRow.insertCell();
    var cell3 = newRow.insertCell();
    var cell4 = newRow.insertCell();
    var cell5 = newRow.insertCell();
    var cell6 = newRow.insertCell();
    var cell7 = newRow.insertCell();
    cell0.innerHTML = stt2++;
    cell1.innerHTML = maThietBi;
    cell2.innerHTML = tenThietBi;
    cell3.innerHTML = loaiThietBi;
    cell4.innerHTML = soLuong;
    cell5.innerHTML = donVi;
    cell6.innerHTML = trangThai;
    cell7.innerHTML = ghiChu;

    document.getElementById('maThietBi').value = '';
    document.getElementById('tenThietBi').value = '';
    document.getElementById('loaiThietBi').value = '';
    document.getElementById('ghiChu').value = '';
    document.getElementById('soLuong').value = '';
    document.getElementById('donVi').value = '';
    document.getElementById('trangThai').value = '';
  } else {
    alert('Vui lòng nhập đầy đủ thông tin');
  }
});

document.getElementById('btn-cancel').addEventListener('click', function (event) {
  event.preventDefault();
  var table = document.getElementById('tblThietBi');
  var rowCount = table.rows.length;
  if (rowCount > 1) {
    table.deleteRow(rowCount - 1);
  }
});



//-- lấy danh sách thiết bị xuất
fetch('http://localhost:3000/phieuxuat/list')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#tbxuat tbody');
    data.result.forEach(phieuxuat => {
      const row = document.createElement('tr');
      const ngayXuat = new Date(phieuxuat.ngayXuat);
      const formattedNgayXuat = `${ngayXuat.getDate().toString().padStart(2, '0')}/${(ngayXuat.getMonth() + 1).toString().padStart(2, '0')}/${ngayXuat.getFullYear()} ${ngayXuat.getHours().toString().padStart(2, '0')}:${ngayXuat.getMinutes().toString().padStart(2, '0')}:${ngayXuat.getSeconds().toString().padStart(2, '0')}`;
      row.innerHTML = `
            <td>${stt++}</td>
            <td>${phieuxuat.maPX}</td>
            <td>${formattedNgayXuat}</td>
            <td>${phieuxuat.nhanVienXuat}</td>
            <td>${phieuxuat.nhanVienNhan}</td>
            <td>${phieuxuat.khoaSuDung}</td>
            <td>
              <button onclick="getByMaPX('${phieuxuat.maPX}')" action="xem" href="#" class="btn btn-primary">Xem</button>
              <button onclick="getByMaPX2('${phieuxuat.maPX}')" action="edit" href="#" class="btn btn-secondary">Sửa</button>
            </td>
        `;
      tableBody.appendChild(row);

      row.querySelector('button[action="xem"]').addEventListener('click', () => {
        selectedPhieuXuat = phieuxuat;
        displayPhieuXuatInfo();
      });
      row.querySelector('button[action="edit"]').addEventListener('click', () => {
        selectedPhieuXuat = phieuxuat;
        displayPhieuXuatInfo();
      });
      
    });
  })
  .catch(error => {
    console.error(error);
  });

let selectedPhieuXuat;
function displayPhieuXuatInfo() {
  const form = document.getElementById('phieuXuatForm');
  form.maphieuxuat.value = selectedPhieuXuat.maPX;
  // Định dạng ngày xuất
  const ngayXuat = new Date(selectedPhieuXuat.ngayXuat);
  const formattedNgayXuat = `${ngayXuat.getDate().toString().padStart(2, '0')}/${(ngayXuat.getMonth() + 1).toString().padStart(2, '0')}/${ngayXuat.getFullYear()} ${ngayXuat.getHours().toString().padStart(2, '0')}:${ngayXuat.getMinutes().toString().padStart(2, '0')}:${ngayXuat.getSeconds().toString().padStart(2, '0')}`;
  form.ngayXuatKho.value = formattedNgayXuat;

  form.nvxuat_option.innerHTML = `<option>${selectedPhieuXuat.nhanVienXuat}</option>`;
  form.nvnhan_option.innerHTML = `<option>${selectedPhieuXuat.nhanVienNhan}</option>`;
  form.khoa_option.innerHTML = `<option>${selectedPhieuXuat.khoaSuDung}</option>`;
}

function getByMaPX(maPX) {
  fetch('http://127.0.0.1:3000/phieuxuat/dsthietbi/' + maPX)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#tblThietBi tbody');
      // Xóa dữ liệu hiện có trong bảng
      tableBody.innerHTML = '';
      // Reset số thứ tự
      let stt2 = 1;
      data.result.forEach(phieuxuat => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${stt2++}</td>
                <td>${phieuxuat.maThietBi}</td>
                <td>${phieuxuat.tenThietBi}</td>
                <td>${phieuxuat.loaiThietBi}</td>
                <td>${phieuxuat.soLuong}</td>
                <td>${phieuxuat.donVi}</td>
                <td>${phieuxuat.trangThai}</td>
                <td>${phieuxuat.ghiChu}</td>
            `;
        tableBody.appendChild(row);
      });
      // Ẩn form thêm thiết bị
      const formThemTB = document.getElementById('themtb');
      formThemTB.style.display = 'none';
      // Ẩn các button "Xác nhận" và "Hủy"
      const nut = document.getElementById('nut');
      nut.style.display = 'none';
    })
    .catch(error => {
      console.error(error);
    });
}
function getByMaPX2(maPX) {
  fetch('http://127.0.0.1:3000/phieuxuat/dsthietbi/' + maPX)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#tblThietBi tbody');
      // Xóa dữ liệu hiện có trong bảng
      tableBody.innerHTML = '';
      // Reset số thứ tự
      let stt2 = 1;
      data.result.forEach(thietbi => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${stt2++}</td>
          <td>${thietbi.maThietBi}</td>
          <td>${thietbi.tenThietBi}</td>
          <td>${thietbi.loaiThietBi}</td>
          <td>${thietbi.soLuong}</td>
          <td>${thietbi.donVi}</td>
          <td>${thietbi.trangThai}</td>
          <td>${thietbi.ghiChu}</td>
        `;
        tableBody.appendChild(row);
      });
      // Ẩn form thêm thiết bị
      const formThemTB = document.getElementById('themtb');
      formThemTB.style.display = 'block';
      // Hiển thị button xác nhận và hủy
      const nut = document.getElementById('nut');
      nut.style.display = 'block';
      const addButton = document.getElementById('btn-add');
      addButton.innerText = 'Sửa';
    })
    .catch(error => {
      console.error(error);
    });
}




//---Lấy dữ liệu từ api đổ vào trong option
fetch('http://localhost:3000/khoa/list')
  .then(response => response.json())
  .then(data => {
    const selectElement = document.getElementById('khoa_option');
    const optionValues = [];

    data.result.forEach(khoa => {
      const option = document.createElement('option');
      const optionValue = khoa.maKhoa;

      if (!optionValues.includes(optionValue)) {
        option.value = optionValue;
        option.textContent = khoa.tenKhoa;
        selectElement.appendChild(option);
        optionValues.push(optionValue);
      }
    });
  })
  .catch(error => {
    console.error(error);
  });


//---Lấy dữ liệu từ api đổ vào trong option nhân viên xuất
fetch('http://localhost:3000/nhanvien/listnvxuat')
  .then(response => response.json())
  .then(data => {
    const selectElement = document.getElementById('nvxuat_option');
    const optionValues = [];

    data.result.forEach(nhanvien => {
      const option = document.createElement('option');
      const optionValue = nhanvien.maTaiKhoan;

      if (!optionValues.includes(optionValue)) {
        option.value = optionValue;
        option.textContent = nhanvien.tenTaiKhoan;
        selectElement.appendChild(option);
        optionValues.push(optionValue);
      }
    });
  })
  .catch(error => {
    console.error(error);
  });


//---Lấy dữ liệu từ api đổ vào trong option nhân viên nhận
fetch('http://localhost:3000/nhanvien/listnvnhan')
  .then(response => response.json())
  .then(data => {
    const selectElement = document.getElementById('nvnhan_option');
    const optionValues = [];

    data.result.forEach(nhanvien => {
      const option = document.createElement('option');
      const optionValue = nhanvien.maTaiKhoan;

      if (!optionValues.includes(optionValue)) {
        option.value = optionValue;
        option.textContent = nhanvien.tenTaiKhoan;
        selectElement.appendChild(option);
        optionValues.push(optionValue);
      }
    });
  })
  .catch(error => {
    console.error(error);
  });


//---Lấy dữ liệu từ api đổ vào trong option loại thiết bị
fetch('http://localhost:3000/loaitb/list')
  .then(response => response.json())
  .then(data => {
    const selectElement = document.getElementById('loaiThietBi');
    const optionValues = [];

    data.result.forEach(loaitb => {
      const option = document.createElement('option');
      const optionValue = loaitb.maLoaiTB;

      if (!optionValues.includes(optionValue)) {
        option.value = optionValue;
        option.textContent = loaitb.tenLoaiTB;
        selectElement.appendChild(option);
        optionValues.push(optionValue);
      }
    });
  })
  .catch(error => {
    console.error(error);
  });


//---Lấy dữ liệu từ api đổ vào trong option mã thiết bị
fetch('http://localhost:3000/matb/list')
  .then(response => response.json())
  .then(data => {
    const selectElement = document.getElementById('maThietBi');
    const optionValues = [];

    data.result.forEach(mathietbi => {
      const option = document.createElement('option');
      const optionValue = mathietbi.maThietBi;

      if (!optionValues.includes(optionValue)) {
        option.value = optionValue;
        option.textContent = mathietbi.maThietBi;
        selectElement.appendChild(option);
        optionValues.push(optionValue);
      }
    });
  })
  .catch(error => {
    console.error(error);
  });


//Lấy Mã phiếu xuất mới
fetch('http://localhost:3000/mapx/list')
  .then(response => response.json())
  .then(data => {
    const mapx = data.result[0]; // Lấy mapx đầu tiên từ danh sách
    const inputMaPX = document.querySelector('#maphieuxuat');
    inputMaPX.value = mapx.maPX; // Đổ giá trị mapx vào ô input

    // Các xử lý khác nếu cần
  })
  .catch(error => {
    console.error(error);
  });



//Thêm phiếu xuất
document.getElementById('btn-xacnhan').addEventListener('click', function () {
  // Lấy giá trị từ các trường input
  var maPhieuXuat = document.getElementById('maphieuxuat').value;
  var ngayXuatKho = document.getElementById('ngayXuatKho').value;
  var nhanVienXuat = document.getElementById('nvxuat_option').value;
  var nhanVienNhan = document.getElementById('nvnhan_option').value;
  // Tạo một đối tượng dữ liệu từ các giá trị đã lấy
  var data = {
    maPX: maPhieuXuat,
    ngayXuat: ngayXuatKho,
    nhanVienXuat: nhanVienXuat,
    nhanVienNhan: nhanVienNhan
  };
  console.log('Sending data:', data);
  // Gửi yêu cầu POST đến API để thêm dữ liệu vào bảng PhieuXuat
  fetch('http://localhost:3000/phieuxuat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error adding data');
      }
    })
    .then(function (data) {
      console.log('Data added successfully:', data);
      // Reload lại trang
      //location.reload();
    })
    .catch(function (error) {
      console.error('Error adding data:', error);
      // Xử lý lỗi (nếu cần)
    });
});



// Thêm chi tiết phiếu xuất
document.getElementById('btn-xacnhan').addEventListener('click', async function () {
  var maPhieuXuat = document.getElementById('maphieuxuat').value;
  var data = {
    maPX: maPhieuXuat,
    chiTietThietBi: []
  };

  var table = document.getElementById('tblThietBi');
  var rows = table.getElementsByTagName('tr');

  for (var i = 1; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName('td');
    var maThietBi = cells[1].innerText;
    var soLuong = parseInt(cells[4].innerText);
    var trangThai = cells[6].innerText;
    var ghiChu = cells[7].innerText;
    var thietBi = {
      maPX: maPhieuXuat, // Thêm giá trị maPX từ phiếu xuất
      maThietBi: maThietBi,
      soLuong: soLuong,
      trangThai: trangThai,
      ghiChu: ghiChu
    };
    data.chiTietThietBi.push(thietBi);
  }
  console.log('Sending data:', data.chiTietThietBi);
  try {
    const response = await fetch('http://localhost:3000/chitietthietbixuat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log('Data added successfully:', responseData);
      location.reload();
    } else {
      throw new Error('Error adding data');
    }
  } catch (error) {
    console.error('Error adding data:', error);
  }
});