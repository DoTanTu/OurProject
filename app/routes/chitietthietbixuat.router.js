const express = require('express');
const router = express.Router();
const ChiTietThietBiXuatController = require('../controllers/chitietthietbixuat.controller');

// Route để thêm dữ liệu vào bảng ChiTietThietBiXuat
router.post('/', ChiTietThietBiXuatController.addData);

module.exports = router;
