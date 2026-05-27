/* ================= JAVASCRIPT XỬ LÝ & VALIDATION ================= */

let students = JSON.parse(localStorage.getItem('students'));
if (!students || students.length === 0) {
    students = [
        { studentId: "SV001", fullName: "Nguyễn Văn A", dob: "2004-05-12", className: "64KTPM3", gpa: "8.5", email: "nva@example.com" }
    ];
    localStorage.setItem('students', JSON.stringify(students));
}

const tableBody = document.getElementById('studentTableBody');
const modalOverlay = document.getElementById('modalOverlay');
const studentForm = document.getElementById('studentForm');
const modalTitle = document.getElementById('modalTitle');
const notification = document.getElementById('notification');
 

function renderStudents() {
    tableBody.innerHTML = ''; 
    if (students.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="empty-message">Chưa có dữ liệu sinh viên.</td></tr>';
        document.getElementById('totalStudents').innerText = '0';
        document.getElementById('avgClassGpa').innerText = '0.0';
        return;
    }

    let sumGpa = 0;
    students.forEach((student, index) => {
        sumGpa += parseFloat(student.gpa);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${student.studentId}</td>
            <td>${student.fullName}</td>
            <td>${student.dob}</td>
            <td>${student.className}</td>
            <td>${student.gpa}</td>
            <td>${student.email}</td>
            <td>
                <button class="btn-edit" onclick="editStudent(${index})">Sửa</button>
                <button class="btn-delete" onclick="deleteStudent(${index})">Xóa</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    document.getElementById('totalStudents').innerText = students.length;
    document.getElementById('avgClassGpa').innerText = (sumGpa / students.length).toFixed(2);
}

function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

function showNotification(msg) {
    notification.innerText = msg;
    notification.className = 'notify-success';
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 3000);
}

// ================= CÁC HÀM VALIDATION ================= 

// Hiển thị lỗi 
function showError(inputId, message) {
    document.getElementById(inputId).classList.add('input-error');
    document.getElementById(`err-${inputId}`).innerText = message;
}

// Xóa toàn bộ cảnh báo lỗi cũ
function clearErrors() {
    const inputs = document.querySelectorAll('.form-group input');
    const errorMsgs = document.querySelectorAll('.error-msg');
    inputs.forEach(input => input.classList.remove('input-error'));
    errorMsgs.forEach(msg => msg.innerText = '');
}

// Hàm kiểm tra tổng thể
function validateForm() {
    clearErrors();
    let isValid = true;

    // 1. Kiểm tra Mã Sinh Viên (Bắt buộc, định dạng SV + 3 số) [cite: 228, 233]
    const id = document.getElementById('studentId').value.trim();
    if (!id) {
        showError('studentId', 'Không được để trống mã sinh viên.');
        isValid = false;
    } else if (!/^SV\d{3}$/.test(id)) {
        showError('studentId', 'Mã SV phải có định dạng SV + 3 chữ số (VD: SV001).');
        isValid = false;
    }

    // 2. Kiểm tra Họ Tên (Bắt buộc, tối thiểu 5 ký tự) [cite: 228, 234]
    const name = document.getElementById('fullName').value.trim();
    if (!name) {
        showError('fullName', 'Không được để trống họ tên.');
        isValid = false;
    } else if (name.length < 5) {
        showError('fullName', 'Họ tên phải có ít nhất 5 ký tự.');
        isValid = false;
    }

    // 3. Kiểm tra Ngày sinh (Không được để trống, không được lớn hơn ngày hiện tại) [cite: 228, 231]
    const dob = document.getElementById('dob').value;
    if (!dob) {
        showError('dob', 'Vui lòng chọn ngày sinh.');
        isValid = false;
    } else {
        const selectedDate = new Date(dob);
        const today = new Date();
        if (selectedDate >= today) {
            showError('dob', 'Ngày sinh phải nhỏ hơn ngày hiện tại.');
            isValid = false;
        }
    }

    // 4. Lớp học (Bắt buộc) [cite: 228]
    const className = document.getElementById('className').value.trim();
    if (!className) {
        showError('className', 'Không được để trống lớp học.');
        isValid = false;
    }

    // 5. Kiểm tra Điểm TB (Từ 0 đến 10) [cite: 228, 230, 235]
    const gpa = document.getElementById('gpa').value;
    if (gpa === '') {
        showError('gpa', 'Không được để trống điểm trung bình.');
        isValid = false;
    } else if (isNaN(gpa) || parseFloat(gpa) < 0 || parseFloat(gpa) > 10) {
        showError('gpa', 'Điểm phải là số hợp lệ từ 0 đến 10.');
        isValid = false;
    }

    // 6. Kiểm tra Email (Định dạng chuẩn) [cite: 228, 229]
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('email', 'Không được để trống email.');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('email', 'Email không đúng định dạng.');
        isValid = false;
    }

    return isValid; // Trả về true nếu tất cả đều hợp lệ [cite: 238]
}

// ================= KẾT THÚC VALIDATION ================= 

btnOpenAddForm.addEventListener('click', () => {
    studentForm.reset();
    clearErrors(); // Xóa lỗi cũ khi mở lại form
    document.getElementById('editIndex').value = '-1';
    modalTitle.innerText = 'Thêm Sinh Viên Mới';
    modalOverlay.classList.add('active');
});

btnCloseForm.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

// Chặn submit và gọi hàm kiểm tra [cite: 238]
studentForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    // CHẠY KIỂM TRA VALIDATION TẠI ĐÂY
    if (!validateForm()) {
        return; // Nếu có lỗi, dừng việc submit
    }

    const editIndex = parseInt(document.getElementById('editIndex').value);
    const newStudent = {
        studentId: document.getElementById('studentId').value.trim(),
        fullName: document.getElementById('fullName').value.trim(),
        dob: document.getElementById('dob').value,
        className: document.getElementById('className').value.trim(),
        gpa: document.getElementById('gpa').value,
        email: document.getElementById('email').value.trim()
    };

    if (editIndex === -1) {
        students.push(newStudent);
        showNotification('Thêm sinh viên thành công!');
    } else {
        students[editIndex] = newStudent;
        showNotification('Cập nhật sinh viên thành công!');
    }

    saveStudents(); 
    renderStudents(); 
    modalOverlay.classList.remove('active'); 
});

window.editStudent = function(index) {
    const student = students[index];
    clearErrors(); // Xóa lỗi cũ
    
    document.getElementById('editIndex').value = index;
    document.getElementById('studentId').value = student.studentId;
    document.getElementById('fullName').value = student.fullName;
    document.getElementById('dob').value = student.dob;
    document.getElementById('className').value = student.className;
    document.getElementById('gpa').value = student.gpa;
    document.getElementById('email').value = student.email;

    modalTitle.innerText = 'Cập nhật Sinh Viên';
    modalOverlay.classList.add('active'); 
}

window.deleteStudent = function(index) {
    if (confirm(`Bạn có chắc chắn muốn xóa sinh viên ${students[index].fullName}?`)) {
        students.splice(index, 1); 
        saveStudents(); 
        renderStudents(); 
        showNotification('Đã xóa sinh viên!');
    }
}

renderStudents();