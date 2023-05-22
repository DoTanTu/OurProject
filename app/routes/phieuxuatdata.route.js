const express = require('express');
const router = express.Router();
const PhieuXuatController = require('../controllers/phieuxuatdata.controller');

// Route để thêm dữ liệu vào bảng Phiếu Xuất
router.post('/phieuxuat', PhieuXuatController.addData);

module.exports = router;
