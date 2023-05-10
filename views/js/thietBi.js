//--HIển thị tất cả sản phẩm
getAllData();
function getAllData() {
    fetch('http://localhost:3000/thietBi/list')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#tableThietBi tbody');
            data.result.forEach(thietBi => {
                const row = document.createElement('tr');
                row.innerHTML = `
                            <td>${thietBi.maThietBi}</td>
                            <td>${thietBi.tenNCC}</td>
                            <td>${thietBi.tenThietBi}</td>
                            <td>${thietBi.tenNSX}</td>
                            <td>${thietBi.loaiThietBi}</td>
                            <td>${thietBi.hanSD}</td>
                            <td>${thietBi.trangThai === 1 ? 'Đang bảo trì' : thietBi.trangThai === 0 ? 'Bình thường' : thietBi.trangThai === -1 ? 'Hỏng' : ''}</td>
                            <td>${thietBi.soLuong}</td>
                            <td>${thietBi.donVi}</td>
                        
                        `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

//---Lấy dữ liệu từ api đổ vào trong option
fetch('http://localhost:3000/thietBi/list')
  .then(response => response.json())
  .then(data => {
    const selectElement = document.getElementById('inputNhaCungCap');
    const optionValues = []; 

    data.result.forEach(thietBi => {
      const option = document.createElement('option');
      const optionValue = thietBi.maNCC;

      if (!optionValues.includes(optionValue)) {
        option.value = optionValue;
        option.textContent = thietBi.tenNCC;
        selectElement.appendChild(option);
        optionValues.push(optionValue); 
      }
    });
  })
  .catch(error => {
    console.error(error);
  });


//---Lấy giá trị từ option đi tìm kiếm
function searchData() {
    const selectedMaNCC = document.getElementById('inputNhaCungCap').value;
    fetch('http://localhost:3000/thietBi/filter/' + selectedMaNCC)
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#tableThietBi tbody');
        tableBody.innerHTML = ''; // Xóa dữ liệu cũ trong bảng
        data.result.forEach(thietBi => {
            const row = document.createElement('tr');
            row.innerHTML = `
                        <td>${thietBi.maThietBi}</td>
                        <td>${thietBi.tenNCC}</td>
                        <td>${thietBi.tenThietBi}</td>
                        <td>${thietBi.tenNSX}</td>
                        <td>${thietBi.loaiThietBi}</td>
                        <td>${thietBi.hanSD}</td>
                        <td>${thietBi.trangThai}</td>
                        <td>${thietBi.soLuong}</td>
                        <td>${thietBi.donVi}</td>
                       
                    `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error(error);
    });
    document.getElementById('inputNhaCungCap').value = "";
  }
  