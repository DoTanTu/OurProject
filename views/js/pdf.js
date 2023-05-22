
window.jsPDF = window.jspdf.jsPDF;

function createpdf() {
    const soluong = document.getElementById('SLhiencon').value;
    fetch('http://localhost:3000/thietBi/report/' + soluong)
        .then(response => response.json())
        .then(data => {
            const thietBiData = data.result;

            // Tạo một đối tượng jsPDF mới
            const doc = new window.jsPDF();

            // Đặt font chữ thành font chữ Unicode hệ thống
            doc.setFont('Tahoma', 'normal');


            // Định dạng bảng
            const columns = ['Mã', 'Ten', 'Nha san xuat', 'Loại', 'Hạn sử dụng', 'Trạng thái', 'Số lượng', 'Đơn vị', 'Nhà cung cấp'];
            const rows = thietBiData.map(thietBi => [
                thietBi.maThietBi,
                thietBi.tenThietBi,
                thietBi.tenNSX,
                thietBi.loaiThietBi,
                thietBi.hanSD,
                thietBi.trangThai,
                thietBi.soLuong,
                thietBi.donVi,
                thietBi.maNCC
            ]);

            // Tạo bảng và thiết lập dữ liệu
            doc.autoTable({
                head: [columns],
                body: rows,
                startY: 5,
                styles: {
                    fontSize: 10,
                    font: 'Tahoma'

                },
                columnStyles: {
                    // Định dạng tự động fit cho các cột
                    0: { cellWidth: 'auto' },
                    1: { cellWidth: 'auto' },
                    2: { cellWidth: 'auto' },
                    3: { cellWidth: 'auto' },
                    4: { cellWidth: 'auto' },
                    5: { cellWidth: 'auto' },
                    6: { cellWidth: 'auto' },
                    7: { cellWidth: 'auto' },
                    8: { cellWidth: 'auto' },
                },
            });

            // Lưu tệp PDF xuống đĩa
            doc.save('output.pdf');
        });
}

function createpdf_thongkexuat() {
    const tuNgay = document.getElementById('fromDate').value;
    const denNgay = document.getElementById('toDate').value;
    fetch('http://localhost:3000/thietBiXuat/reportsothietbixuat/' + tuNgay + '/' + denNgay)
        .then(response => response.json())
        .then(data => {
            const thietBiData = data.result;

            // Tạo một đối tượng jsPDF mới
            const doc = new window.jsPDF();

            // Đặt font chữ thành font chữ Unicode hệ thống
            doc.setFont('Arial', 'normal');


            // Định dạng bảng
            const columns = ['Mã Thiết Bị', 'Ten', 'Số Lượng xuất', 'Trạng thái'];
            const rows = thietBiData.map(thietBiXuat => [
                thietBiXuat.maThietBi,
                thietBiXuat.tenThietBi,
                thietBiXuat.soLuongXuat,
                thietBiXuat.trangThai,
            ]);

            // Tạo bảng và thiết lập dữ liệu
            doc.autoTable({
                head: [columns],
                body: rows,
                startY: 5,
                styles: {
                    fontSize: 10,
                    font: 'Arial'

                },
                columnStyles: {
                    // Định dạng tự động fit cho các cột
                    0: { cellWidth: 'auto' },
                    1: { cellWidth: 'auto' },
                    2: { cellWidth: 'auto' },
                    3: { cellWidth: 'auto' }
                },
            });

            // Lưu tệp PDF xuống đĩa
            doc.save('thongkexuat.pdf');
        });
}
function createpdf_thongkenhap() {
    const tuNgay = document.getElementById('fromDate_N').value;
    const denNgay = document.getElementById('toDate_N').value;
    fetch('http://localhost:3000/thietBiNhap/reportsothietbinhap/' + tuNgay + '/' + denNgay)
        .then(response => response.json())
        .then(data => {
            const thietBiData = data.result;

            // Tạo một đối tượng jsPDF mới
            const doc = new window.jsPDF();

            // Đặt font chữ thành font chữ Unicode hệ thống
            doc.setFont('Arial', 'normal');


            // Định dạng bảng
            const columns = ['Mã Thiết Bị', 'Tên', 'Số Lượng Nhập', 'Trạng thái'];
            const rows = thietBiData.map(thietBiNhap => [
                thietBiNhap.maThietBi,
                thietBiNhap.tenThietBi,
                thietBiNhap.soLuongNhap,
                thietBiNhap.trangThai,
            ]);

            // Tạo bảng và thiết lập dữ liệu
            doc.autoTable({
                head: [columns],
                body: rows,
                startY: 5,
                styles: {
                    fontSize: 10,
                    font: 'Arial'

                },
                columnStyles: {
                    // Định dạng tự động fit cho các cột
                    0: { cellWidth: 'auto' },
                    1: { cellWidth: 'auto' },
                    2: { cellWidth: 'auto' },
                    3: { cellWidth: 'auto' }
                },
            });

            // Lưu tệp PDF xuống đĩa
            doc.save('thongkenhap.pdf');
        });
}
