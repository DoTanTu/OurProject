
function viewChart () {
    const tuNgay = document.getElementById('fromDate').value;
    const denNgay = document.getElementById('toDate').value;
    fetch('http://localhost:3000/thietBiXuat/reportsothietbixuat/' + tuNgay + '/' + denNgay)
        .then(response => response.json())
        .then(data => {const thietBiData = data.result;

            // Chuẩn bị dữ liệu cho biểu đồ
            const labels = thietBiData.map(item => item.tenThietBi); // Nhãn của các cột
            const values = thietBiData.map(item => item.soLuongXuat); // Giá trị của các cột
        
            // Vẽ biểu đồ
            var ctx = document.getElementById('myChart').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Số lượng thiết bị xuất ',
                        data: values,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
}
function viewChart2 () {
    const tuNgay = document.getElementById('fromDate_N').value;
    const denNgay = document.getElementById('toDate_N').value;
    fetch('http://localhost:3000/thietBiNhap/reportsothietbinhap/' + tuNgay + '/' + denNgay)
        .then(response => response.json())
        .then(data => {const thietBiData = data.result;

            // Chuẩn bị dữ liệu cho biểu đồ
            const labels = thietBiData.map(item => item.tenThietBi); // Nhãn của các cột
            const values = thietBiData.map(item => item.soLuongNhap); // Giá trị của các cột
        
            // Vẽ biểu đồ
            var ctx = document.getElementById('myChart1').getContext('2d');
            var chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Số lượng thiết bị nhập ',
                        data: values,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
}