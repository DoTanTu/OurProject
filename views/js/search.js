const API_URL = 'http://localhost:3000/thietBi';

//--HIển thị tất cả thiết bị
// getAllData();
//--FIlter
displayFilter()

//---------------------------------------------------------HIỂN THỊ FILTER-------------------------------------------------------//
function displayFilter(){
  var filterDiv = document.getElementById('div-filter');
  var filterButton = document.getElementById('filter-header');
  filterButton.addEventListener('click', function () {
    if (filterDiv.style.display === 'none') {
      filterDiv.style.display = 'block';
    } else {
      filterDiv.style.display = 'none';
      getAllData();
    }
  });
  filterDiv.addEventListener('transitionend', function () {
    if (filterDiv.style.display === 'none') {
      getAllData();
    }
  });
}

//---------------------------------------------------TÌM KIẾM THIẾT BỊ TỪ THANH TÌM KIẾM-----------------------------------------//
function searchByNameThietBi() {
  const searchValue = document.getElementById('searchInput').value.toLowerCase(); 
  console.log(searchValue);
  const deviceRows = document.getElementsByClassName('device-row'); 
  for (let i = 0; i < deviceRows.length; i++) {
      const deviceRow = deviceRows[i];
      const deviceInfo = deviceRow.innerText.toLowerCase(); 
      if (deviceInfo.includes(searchValue)) {
      deviceRow.style.display = 'table-row';
      } else {
      deviceRow.style.display = 'none';
      }
  }
  }

//------------------------------------------------------TÌM KIẾM THIẾT BỊ TỪ FILTER-----------------------------------------------//
function searchData() {
    const maNCC = document.getElementById('inputNhaCungCap').value;
    const soLuong1 = document.getElementById('inputSoLuong1').value;
    const soLuong2 = document.getElementById('inputSoLuong2').value;
    const status = document.getElementById('inputTrangThai').value;
    const dateStart = document.getElementById('inputNgayBatDau').value;
    const dateEnd = document.getElementById('inputNgayKetThuc').value;
    if (maNCC !== '') {
      if (soLuong1 !== '' && soLuong2 !== '') {
        if (status !== '' && dateStart !== '' && dateEnd !== '') {
          searchByNCC_TrangThai_soLuong_Date();
        } else if (status !== '') {
          searchByNCC_TrangThai_soLuong();
        } else if (dateStart !== '' && dateEnd !== '') {
          searchByNCCAndDate();
        } else {
          searchByNCCAndSoLuong();
        }
      } else if (status !== '' && dateStart === '' && dateEnd === '') {
        searchByNCCAndTrangThai();
      } else if (dateStart !== '' && dateEnd !== '') {
        searchByDate();
      } else {
        searchByNhaCungCap();
      }
    } else if (soLuong1 !== '' && soLuong2 !== '') {
      if (status !== '' && dateStart !== '' && dateEnd !== '') {
        searchBySoLuong_TrangThai_thoiGian();
      } else if (status !== '') {
        searchBySoLuongAndStatus();
      } else if (dateStart !== '' && dateEnd !== '') {
        searchBySoLuongAndDate();
      } else {
        searchBySoLuong();
      }
    } else if (status !== '' && dateStart === '' && dateEnd === '') {
      searchByTrangThai();
    }
    
  }

//-------------------------------------------------THỰC HIỆN ĐƯA DỮ LIỆU TRẢ VỀ TỪ API VÀO TABLE-----------------------------------//
function searchThietBi(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const tableBody = document.querySelector('#tableThietBi tbody');
        tableBody.innerHTML = '';
        if (data.result.length === 0) {
            showNoResults();
        } else{
          let element = ``;
          data.result.map((value, index) => {
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
          });
          document.getElementById("bodyTable").innerHTML = element;
          const tableElement = document.getElementById('tableThietBi');
          tableElement.scrollIntoView({ behavior: 'smooth' });
        }
        })
        .catch(error => {
            console.error(error);
        });
  }

//--------------------------------------------------KHI KHÔNG CÓ KẾT QUẢ TRẢ VỀ---------------------------------------------//
function showNoResults(tableBody) {
  alert('Không có kết quả phù hợp');
  const noResultsRow = document.createElement('tr');
  noResultsRow.innerHTML = `<td colspan="9">Không có kết quả nào phù hợp</td>`;
  tableBody.appendChild(noResultsRow);
}


// ----------------------------------------------------------TRẠNG THÁI--------------------------------------------------------------------//
function getTrangThaiLabel(trangThai) {
    if (trangThai === 1) {
      return 'Bình thường';
    } else if (trangThai === 0) {
      return 'Hỏng';
    } else if (trangThai === -1) {
      return 'Đang bảo trì';
    } else {
      return '';
    }
  }

//-----------------------------------------------------HIỂN THỊ TẤT CẢ THIẾT BỊ------------------------------------------//
function getAllData() {
    const url = 'http://localhost:3000/thietBi/tat-ca';
    searchThietBi(url);
}

//---------------------------------------------ĐƯA DỮ LIỆU VÀO DANH SÁCH NHÀ CUNG CẤP------------------------------------------//
fetch('http://localhost:3000/thietBi/tat-ca')
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

//---------------------------------------------TÌM KIẾM THEO NHÀ CUNG CẤP------------------------------------------//
function searchByNhaCungCap(){
  const selectedMaNCC = document.getElementById('inputNhaCungCap').value;
  const url = `${API_URL}/tim-kiem-NCC/${selectedMaNCC}`;
  searchThietBi(url);
}

//---------------------------------------------TÌM KIẾM THEO TRẠNG THÁI------------------------------------------//
function searchByTrangThai(){
    const selectedStatus = document.getElementById('inputTrangThai').value;
    const url = `${API_URL}/tim-kiem-status/${selectedStatus}`;
    searchThietBi(url);
  }

//---------------------------------------------TÌM KIẾM THEO KHOẢNG SỐ LƯỢNG------------------------------------------//
function searchBySoLuong(){
    const selectedSoLuong1 = document.getElementById('inputSoLuong1').value;
    const selectedSoLuong2 = document.getElementById('inputSoLuong2').value;
    const url = `${API_URL}/tim-kiem-soLuong/${selectedSoLuong1}/${selectedSoLuong2}`;
    searchThietBi(url);
  }

//--------------------------------------------TÌM KIẾM THEO KHOẢN THỜI GIAN------------------------------------------//
function searchByDate(){
    const selectedDateStart = document.getElementById('inputNgayBatDau').value;
    const selectedDateEnd = document.getElementById('inputNgayKetThuc').value;
    const url = `${API_URL}/tim-kiem-date/${selectedDateStart}/${selectedDateEnd}`;
    searchThietBi(url);
  }

//---------------------------------------------TÌM KIẾM THEO MÃ NHÀ CUNG CẤP VÀ TRẠNG THÁI------------------------------------------//
function searchByNCCAndTrangThai(){
  const selectedMaNCC = document.getElementById('inputNhaCungCap').value;
  const selectedTrangThai = document.getElementById('inputTrangThai').value;
  const url = `${API_URL}/tim-kiem-NCC-status/${selectedMaNCC}/${selectedTrangThai}`;
  searchThietBi(url);
}

//---------------------------------------------TÌM KIẾM THEO MÃ NHÀ CUNG CẤP VÀ SỐ LƯỢNG------------------------------------------//
function searchByNCCAndSoLuong(){
    const selectedMaNCC = document.getElementById('inputNhaCungCap').value;
    const soLuong1 = document.getElementById('inputSoLuong1').value;
    const soLuong2 = document.getElementById('inputSoLuong2').value;
    const url = `${API_URL}/tim-kiem-NCC-SL/${selectedMaNCC}/${soLuong1}/${soLuong2}`;
    searchThietBi(url);
  }

  //---------------------------------------------TÌM KIẾM THEO MÃ NHÀ CUNG CẤP VÀ THỜI GIAN------------------------------------------//
function searchByNCCAndDate(){
    const selectedMaNCC = document.getElementById('inputNhaCungCap').value;
    const dateStart = document.getElementById('inputNgayBatDau').value;
    const dateEnd = document.getElementById('inputNgayKetThuc').value;
    const url = `${API_URL}/tim-kiem-NCC-date/${selectedMaNCC}/${dateStart}/${dateEnd}`;
    searchThietBi(url);
  }

  //---------------------------------------------TÌM KIẾM THEO SỐ LƯỢNG VÀ TRẠNG THÁI------------------------------------------//
  function searchBySoLuongAndStatus(){
    const soLuong1 = document.getElementById('soLuong1').value;
    const soLuong2 = document.getElementById('soLuong2').value;
    const Status = document.getElementById('inputTrangThai').value;
    const url = `${API_URL}/tim-kiem-SL-status/${soLuong1}/${soLuong2}/${Status}`;
    searchThietBi(url);
  }

  //---------------------------------------------TÌM KIẾM THEO SỐ LƯỢNG VÀ KHOẢN THỜI GIAN------------------------------------------//
function searchBySoLuongAndDate(){
    const soLuong1 = document.getElementById('inputSoLuong1').value;
    const soLuong2 = document.getElementById('inputSoLuong2').value;
    const dateStart = document.getElementById('inputNgayBatDau').value
    const dateEnd = document.getElementById('inputNgayKetThuc').value;
    const url = `${API_URL}/tim-kiem-SL-Date/${soLuong1}/${soLuong2}/${dateStart}/${dateEnd}`;
    searchThietBi(url);
  }

  //---------------------------------------------TÌM KIẾM THEO TRẠNG THÁI - THỜI GIAN------------------------------------------//
  function searchByStatusAndDate(){
    const dateStart = document.getElementById('inputNgayBatDau').value;
    const dateEnd = document.getElementById('inputNgayKetThuc').value;
    const Status = document.getElementById('inputTrangThai').value;
    const url = `${API_URL}/tim-kiem-status-Date/${Status}/${dateStart}/${dateEnd}`;
    searchThietBi(url);
  }

  //---------------------------------------------TÌM KIẾM THEO SỐ LƯỢNG - TRẠNG THÁI - THỜI GIAN------------------------------------------//
function searchBySoLuong_TrangThai_thoiGian(){
    const status = document.getElementById('inputTrangThai').value;
    const soLuong1 = document.getElementById('inputSoLuong1').value;
    const soLuong2 = document.getElementById('inputSoLuong2').value;
    const dateStart = document.getElementById('inputNgayBatDau').value;
    const dateEnd = document.getElementById('inputNgayKetThuc').value;
    const url = `${API_URL}/tim-kiem-SL-status-Date/${soLuong1}/${soLuong2}/${status}/${dateStart}/${dateEnd}`;
    searchThietBi(url)
  }

//---------------------------------------------TÌM KIẾM THEO MÃ NHÀ CUNG CẤP - TRẠNG THÁI - SỐ LƯỢNG------------------------------------------//
function searchByNCC_TrangThai_soLuong(){
  const selectedMaNCC = document.getElementById('inputNhaCungCap').value;
  const selectedTrangThai = document.getElementById('inputTrangThai').value;
  const soLuong1 = document.getElementById('inputSoLuong1').value;
  const soLuong2 = document.getElementById('inputSoLuong2').value;
  const url = `${API_URL}/tim-kiem-NCC-status-SL/${selectedMaNCC}/${selectedTrangThai}/${soLuong1}/${soLuong2}`;
  searchThietBi(url);
}

//---------------------------------------------TÌM KIẾM THEO MÃ NHÀ CUNG CẤP - TRẠNG THÁI - KHOẢN THỜI GIAN------------------------------------------//
function searchByNCC_TrangThai_Date(){
    const selectedMaNCC = document.getElementById('inputNhaCungCap').value;
    const selectedTrangThai = document.getElementById('inputTrangThai').value;
    const dateStart = document.getElementById('inputNgayBatDau').value;
    const dateEnd = document.getElementById('inputNgayKetThuc').value;
    const url = `${API_URL}/tim-kiem-NCC-status-Date/${selectedMaNCC}/${selectedTrangThai}/${dateStart}/${dateEnd}`;
    searchThietBi(url);
  }

//---------------------------------------------TÌM KIẾM THEO MÃ NHÀ CUNG CẤP - TRẠNG THÁI - SỐ LƯỢNG - KHOẢN THỜI GIAN------------------------------------------//
function searchByNCC_TrangThai_soLuong_Date(){
    const selectedMaNCC = document.getElementById('inputNhaCungCap').value;
    const selectedTrangThai = document.getElementById('inputTrangThai').value;
    const soLuong1 = document.getElementById('inputSoLuong1').value;
    const soLuong2 = document.getElementById('inputSoLuong2').value;
    const dateStart = document.getElementById('inputNgayBatDau').value;
    const dateEnd = document.getElementById('inputNgayKetThuc').value;
    const url = `${API_URL}/tim-kiem-NCC-status-SL/${selectedMaNCC}/${selectedTrangThai}/${soLuong1}/${soLuong2}/${dateStart}/${dateEnd}`;
    searchThietBi(url);
  }

//---------------------------------------------XÓA DỮ LIỆU TRÊN CÁC Ô TÌM KIẾM-------------------------------------------------//
function refreshData() {
    document.getElementById('inputNhaCungCap').value = '';
    document.getElementById('inputSoLuong1').value = '';
    document.getElementById('inputSoLuong2').value = '';
    document.getElementById('inputTrangThai').value = '';
    document.getElementById('inputNgayBatDau').value = '';
    document.getElementById('inputNgayKetThuc').value = '';
  }