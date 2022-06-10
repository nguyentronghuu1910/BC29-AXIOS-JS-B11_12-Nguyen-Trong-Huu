var services = new Services();
var validation = new Validation();
var dsnd = new DanhSachNguoiDung();

function getID(id) {
   return document.getElementById(id);
}

function getListOurTeachs() {
   services
      .getListOurTeachApi()
      .then(function (result) {
         dsnd.arr = result.data
         renderListOurTeachs(dsnd.arr);
      })
      .catch(function (error) {
         console.log(error);
      });
}

getListOurTeachs();

function renderListOurTeachs(data) {
   var contentHTML = "";

   data.forEach(function (ourTeach, index) {
      contentHTML += `
      <tr>
            <td>${index + 1}</td>
            <td>${ourTeach.taiKhoan}</td>
            <td>${ourTeach.matKhau}</td>
            <td>${ourTeach.hoTen}</td>
            <td>${ourTeach.email}</td>
            <td>${ourTeach.ngonNgu}</td>
            <td>${ourTeach.userType}</td>
            <td>${ourTeach.moTa}</td>
            <td>
                  <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editOurTeach(${ourTeach.id})">Sửa</button>
                  <button class="btn btn-danger" onclick="deleteOurTeach(${ourTeach.id})">Xóa</button>
            </td>
      </tr>
      `;
   });

   getID("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

/**
 * Xoa ND
 */
function deleteOurTeach(id) {
   services
      .deleteOurTeachApi(id)
      .then(function () {
         // render table
         getListOurTeachs();
      })
      .catch(function (error) {
         console.log(error);
      });
}

getID("btnThemNguoiDung").onclick = function () {
   // Sửa lại title modal
   document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Người Dùng";
   // Thêm nút "Add" vào footer modal
   var footer = `<button class = "btn btn-success" onclick="addOurTeach()">Add</button>`;
   document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
};

/**
 * Add ND
 */

function addOurTeach(isEdit) {
   var taiKhoan = getID("TaiKhoan").value;
   var matKhau = getID("MatKhau").value;
   var hoTen = getID("HoTen").value;
   var email = getID("Email").value;
   var hinhAnh = getID("HinhAnh").value;
   var loaiNgonNgu = getID("loaiNgonNgu").value;
   var loaiNguoiDung = getID("loaiNguoiDung").value;
   var moTa = getID("MoTa").value;
   // flag isValid 
   var isValid = true;

   // Check validation
   // Check tài khoản
   if (!isEdit) {
      isValid &= validation.kiemTraRong(
         taiKhoan,
         "tbTK",
         "(*) Không được để trống."
      ) &&
         validation.kiemTraTKTonTai(
            taiKhoan,
            "tbTK",
            "(*) Tài khoản đã tồn tại",
            dsnd.arr
         )
   }

   // Check password
   isValid &= validation.kiemTraRong(
      matKhau,
      "tbMK",
      "(*) Không được để trống."
   ) && validation.kiemTraPassword(
      matKhau,
      "tbMK",
      "(*) Đúng format (có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số)"
   ) && validation.kiemTraDoDaiKiTu(
      matKhau,
      "tbMK",
      6,
      8,
      "(*) Độ dài 6-8"
   )
   // Check họ tên
   isValid &= validation.kiemTraRong(
      hoTen,
      "tbHoTen",
      "(*) Không được để trống."
   ) && validation.kiemTraChuoiKiTu(
      hoTen,
      "tbHoTen",
      "(*) Không chứa số và ký tự đặc biệt"
   )
   // Check email
   isValid &= validation.kiemTraRong(
      email,
      "tbEmail",
      "(*) Không được để trống."
   ) && validation.kiemTraEmail(
      email,
      "tbEmail",
      "Đúng format email"
   )
   // Check hình ảnh
   isValid &= validation.kiemTraRong(
      hinhAnh,
      "tbHinhAnh",
      "(*) Không được để trống."
   )
   // Check loại ngôn ngữ
   isValid &= validation.kiemTraOption(
      "loaiNgonNgu",
      "tbNgonNgu",
      "(*) Vui lòng chọn loại người dùng."
   )
   // Check loại người dùng
   isValid &= validation.kiemTraOption(
      "loaiNguoiDung",
      "tbND",
      "(*) Vui lòng chọn loại ngôn ngữ."
   )
   // Check mô tả
   isValid &= validation.kiemTraRong(
      moTa,
      "tbMoTa",
      "(*) Không được để trống."
   ) && validation.kiemTraDoDaiKiTu(
      moTa,
      "tbMoTa",
      5,
      60,
      "(*)Không vượt quá 60 ký tự"
   )
   if (!isValid) return;
   // đối tượng ourTeach
   var ourTeach = new OurTeach(
      "",
      taiKhoan,
      matKhau,
      hoTen,
      email,
      hinhAnh,
      loaiNgonNgu,
      loaiNguoiDung,
      moTa,
   );
   return ourTeach


}

function editOurTeach(id) {
   // Sửa lại title modal
   document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Người Dùng";
   // Thêm nút "Update" vào footer modal
   var footer = `<button class = "btn btn-success" onclick="updateOurTeach(${id})">Update</button>`;
   document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
   // getOurTeachById
   services
      .getOurTeachById(id)
      .then(function (result) {
         // show thông tin ra các thẻ input
         getID("TaiKhoan").value = result.data.taiKhoan;
         getID("MatKhau").value = result.data.matKhau;
         getID("HoTen").value = result.data.hoTen;
         getID("Email").value = result.data.email;
         getID("HinhAnh").value = result.data.hinhAnh;
         getID("loaiNgonNgu").value = result.data.ngonNgu;
         getID("loaiNguoiDung").value = result.data.userType;
         getID("MoTa").value = result.data.moTa;

      })
      .catch(function (error) {
         console.log(error);
      });

   // disable input#tknv
   getID("TaiKhoan").disabled = true;
}

/**
 * Update ND
 */

function addOurTeachAPI() {
   var ourTeach = addOurTeach()
   services
      .addOurTeachApi(ourTeach)
      .then(function () {
         // render table
         getListOurTeachs();
         // close modal
         document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
         console.log(error);
      });
}

function updateOurTeach(id) {
   // var taiKhoan = getID("TaiKhoan").value;
   // var matKhau = getID("MatKhau").value;
   // var hoTen = getID("HoTen").value;
   // var email = getID("Email").value;
   // var hinhAnh = getID("HinhAnh").value;
   // var loaiNgonNgu = getID("loaiNgonNgu").value;
   // var loaiNguoiDung = getID("loaiNguoiDung").value;
   // var moTa = getID("MoTa").value;

   var nguoiDung = addOurTeach(true);
   nguoiDung.id = id

   // dsnd.update(nguoiDung);
   // renderListOurTeachs(dsnd.arr);

   // var ourTeach = new OurTeach(
   //    id,
   //    taiKhoan,
   //    matKhau,
   //    hoTen,
   //    email,
   //    hinhAnh,
   //    loaiNgonNgu,
   //    loaiNguoiDung,
   //    moTa
   // );
   services
      .updateOurTeachApi(nguoiDung)
      .then(function () {
         // render table
         getListOurTeachs();
         // close modal
         document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
         console.log(error);
      });

}