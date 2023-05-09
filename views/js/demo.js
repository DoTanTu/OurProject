fetch('http://localhost:3000/book/list')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#bookTable tbody');
                data.result.forEach(book => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${book.maTaiKhoan}</td>
                        <td>${book.tenTaiKhoan}</td>
                        <td>${book.phongBan}</td>
                        <td>${book.gmail}</td>
                        <td>${book.maKhoa}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error(error);
            });