const yup = require("yup");

const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    return res.status(400).json({ type: err.name, message: err.message });
  }
};
const updateSchema = yup.object({
  body: yup.object({
    tenThietBi: yup
      .string()
      .required("Tên thiết bị là bắt buộc")
      .max(50, "Tên thiết bị không được quá 50 ký tự"),
    tenNSX: yup.string().max(50, "Tên NSX không được quá 50 ký tự"),
    loaiThietBi: yup.string().max(30, "Loại thiết bị không được quá 30 ký tự"),
    hanSD: yup.date(),
    trangThai: yup.string().max(30, "Trạng thái không được quá 30 ký tự"),
    soLuong: yup
      .number()
      .integer()
      .positive("Số lượng phải là số nguyên dương")
      .required("Số lượng là bắt buộc"),
    donVi: yup.string().max(20, "Đơn vị không được quá 20 ký tự"),
    maNCC: yup
      .string()
      .required("Mã NCC là bắt buộc")
      .max(10, "Mã NCC không được quá 10 ký tự"),
  }),
  params: yup.object({}),
});
const addSchema = yup.object({
  body: yup.object({
    maThietBi: yup
      .string()
      .required("Mã thiết bị là bắt buộc")
      .max(10, "Mã thiết bị không được quá 10 ký tự"),
    tenThietBi: yup
      .string()
      .required("Tên thiết bị là bắt buộc")
      .max(50, "Tên thiết bị không được quá 50 ký tự"),
    tenNSX: yup.string().max(50, "Tên NSX không được quá 50 ký tự"),
    loaiThietBi: yup.string().max(30, "Loại thiết bị không được quá 30 ký tự"),
    hanSD: yup.date(),
    trangThai: yup.string().max(30, "Trạng thái không được quá 30 ký tự"),
    soLuong: yup
      .number()
      .integer()
      .positive("Số lượng phải là số nguyên dương")
      .required("Số lượng là bắt buộc"),
    donVi: yup.string().max(20, "Đơn vị không được quá 20 ký tự"),
    maNCC: yup
      .string()
      .required("Mã NCC là bắt buộc")
      .max(10, "Mã NCC không được quá 10 ký tự"),
  }),
});
const deleteSchema = yup.object({
    params: yup.string().required('Thiếu tham số param1'),
});
module.exports = {
  validateSchema,
  updateSchema,
  addSchema,
  deleteSchema,
};
