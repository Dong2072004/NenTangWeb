/* ================= JAVASCRIPT XỬ LÝ (DOM & SỰ KIỆN) ================= */

// 1. Mảng dữ liệu đọc từ localStorage [cite: 163-164]
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 2. Lấy các phần tử DOM [cite: 146-153]
const taskListContainer = document.getElementById('taskList');
const modalOverlay = document.getElementById('modalOverlay');
const taskForm = document.getElementById('taskForm');
const modalTitle = document.getElementById('modalTitle');
const notification = document.getElementById('notification');

// DOM Thống kê
const elTotalTasks = document.getElementById('totalTasks');
const elCompletedTasks = document.getElementById('completedTasks');
const elPendingTasks = document.getElementById('pendingTasks');

// DOM Nút bấm
const btnOpenAddForm = document.getElementById('btnOpenAddForm');
const btnCloseForm = document.getElementById('btnCloseForm');


// 3. Hàm hiển thị danh sách (Render) [cite: 165-166]
function renderTasks() {
    taskListContainer.innerHTML = '';

    // Trạng thái rỗng
    if (tasks.length === 0) {
        taskListContainer.innerHTML = '<div class="empty-message">Hiện chưa có công việc nào. Hãy thêm mới!</div>';
        updateTaskSummary();
        return;
    }

    tasks.forEach((task, index) => {
        // Kiểm tra trạng thái hoàn thành để thêm class tương ứng
        const isCompleted = task.status === 'completed';
        const cardClass = isCompleted ? 'task-card completed' : 'task-card';
        const checkedAttr = isCompleted ? 'checked' : '';

        const card = document.createElement('div');
        card.className = cardClass;
        
        card.innerHTML = `
            <div class="task-info">
                <h3 class="task-title">${task.title}</h3>
                <p class="task-meta">
                    <span>Hạn: ${task.deadline}</span>
                    <span>Ưu tiên: ${task.priority}</span>
                </p>
                ${task.desc ? `<p style="font-size: 14px; color: #666; margin: 8px 0 0 0;">${task.desc}</p>` : ''}
            </div>
            
            <div class="task-actions">
                <label class="checkbox-container">
                    <input type="checkbox" onchange="toggleStatus(${index})" ${checkedAttr}>
                    ${isCompleted ? 'Đã xong' : 'Xong?'}
                </label>
                
                <button class="btn-edit" onclick="editTask(${index})">Sửa</button>
                <button class="btn-delete" onclick="deleteTask(${index})">Xóa</button>
            </div>
        `;
        taskListContainer.appendChild(card);
    });

    updateTaskSummary(); // Cập nhật thống kê
}

// 4. Hàm cập nhật thống kê [cite: 195, 200]
function updateTaskSummary() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = total - completed;

    elTotalTasks.innerText = total;
    elCompletedTasks.innerText = completed;
    elPendingTasks.innerText = pending;
}

// 5. Lưu dữ liệu [cite: 172]
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 6. Hiển thị thông báo
function showMessage(msg) {
    notification.innerText = msg;
    notification.className = 'notify-success';
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// ================= CÁC SỰ KIỆN TƯƠNG TÁC ================= 

// Mở form thêm mới [cite: 155]
btnOpenAddForm.addEventListener('click', () => {
    taskForm.reset();
    document.getElementById('editIndex').value = '-1';
    modalTitle.innerText = 'Thêm Công Việc Mới';
    modalOverlay.classList.add('active');
});

// Đóng form [cite: 156]
btnCloseForm.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

// Submit Form (Thêm/Sửa) [cite: 157]
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editIndex = parseInt(document.getElementById('editIndex').value);
    
    // Tạo object công việc
    const newTask = {
        title: document.getElementById('taskTitle').value.trim(),
        desc: document.getElementById('taskDesc').value.trim(),
        deadline: document.getElementById('taskDeadline').value,
        priority: document.getElementById('taskPriority').value,
        status: 'pending' // Mặc định khi mới tạo là chưa hoàn thành
    };

    if (editIndex === -1) {
        // Thêm mới
        tasks.push(newTask);
        showMessage('Thêm công việc thành công!');
    } else {
        // Cập nhật
        // Giữ nguyên trạng thái hoàn thành cũ khi sửa thông tin
        newTask.status = tasks[editIndex].status; 
        tasks[editIndex] = newTask;
        showMessage('Cập nhật công việc thành công!');
    }

    saveTasks();
    renderTasks();
    modalOverlay.classList.remove('active');
});

// Sửa công việc [cite: 158]
window.editTask = function(index) {
    const task = tasks[index];
    
    document.getElementById('editIndex').value = index;
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDesc').value = task.desc;
    document.getElementById('taskDeadline').value = task.deadline;
    document.getElementById('taskPriority').value = task.priority;

    modalTitle.innerText = 'Cập nhật Công Việc';
    modalOverlay.classList.add('active');
}

// Xóa công việc [cite: 159, 184-189]
window.deleteTask = function(index) {
    const isConfirm = confirm(`Bạn có muốn xóa công việc "${tasks[index].title}"?`);
    if (isConfirm) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
        showMessage('Đã xóa công việc!');
    }
}

// Đổi trạng thái hoàn thành / chưa hoàn thành [cite: 160, 190-195]
window.toggleStatus = function(index) {
    if (tasks[index].status === 'completed') {
        tasks[index].status = 'pending';
    } else {
        tasks[index].status = 'completed';
    }
    
    saveTasks();
    renderTasks(); // Giao diện sẽ tự động gạch ngang tiêu đề theo class
}

// Render dữ liệu khi mới tải trang
renderTasks();