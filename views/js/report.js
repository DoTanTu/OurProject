window.jsPDF = window.jspdf.jsPDF;

// getAllData();
function filterNumber() {
    const soluong = document.getElementById('SLhiencon').value;
    fetch('http://localhost:3000/thietBi/report/' + soluong)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#tableThietBi tbody');
            tableBody.innerHTML = '';
            data.result.forEach(thietBi => {
                const row = document.createElement('tr');
                row.innerHTML = `
                            <td>${thietBi.maThietBi}</td>
                            <td>${thietBi.tenThietBi}</td>
                            <td>${thietBi.tenNSX}</td>
                            <td>${thietBi.loaiThietBi}</td>
                            <td>${thietBi.hanSD}</td>
                            <td>${thietBi.trangThai}</td>
                            <td>${thietBi.soLuong}</td>
                            <td>${thietBi.donVi}</td>
                            <td>${thietBi.maNCC}</td>
                        
                        `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.log(error);
        });
};

function thongKeXuat() {
    const tuNgay = document.getElementById('fromDate').value;
    const denNgay = document.getElementById('toDate').value;
    fetch('http://localhost:3000/thietBiXuat/reportsothietbixuat/' + tuNgay + '/' + denNgay)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#tableThietBiXuat tbody');
            tableBody.innerHTML = '';
            data.result.forEach(thietBiXuat => {
                const row = document.createElement('tr');
                row.innerHTML = `
                            <td>${thietBiXuat.maThietBi}</td>
                            <td>${thietBiXuat.tenThietBi}</td>
                            <td>${thietBiXuat.trangThai}</td>
                            <td>${thietBiXuat.soLuongXuat}</td>
                        
                        `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.log(error);
        });
};
function thongKeNhap() {
    const tuNgay = document.getElementById('fromDate_N').value;
    const denNgay = document.getElementById('toDate_N').value;
    fetch('http://localhost:3000/thietBiNhap/reportsothietbinhap/' + tuNgay + '/' + denNgay)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#tableThietBiNhap tbody');
            tableBody.innerHTML = '';
            data.result.forEach(thietBiNhap => {
                const row = document.createElement('tr');
                row.innerHTML = `
                            <td>${thietBiNhap.maThietBi}</td>
                            <td>${thietBiNhap.tenThietBi}</td>
                            <td>${thietBiNhap.trangThai}</td>
                            <td>${thietBiNhap.soLuongNhap}</td>
                        
                        `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.log(error);
        });
};


