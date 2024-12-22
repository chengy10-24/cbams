const username = sessionStorage.getItem("username") || localStorage.getItem("username");

window.onload = () => {
    if (!username) {
        alert("暂未登录，请先登录！");
        window.location.href = "login.html";
    }
    else if (username !== "admin") {
        document.querySelector(".sidebar ul li:nth-child(3)").style.display = "none";
        document.querySelector(".sidebar ul li:nth-child(4)").style.display = "none";
        document.querySelector(".add-btn").style.display = "none";
        users.shift();
        setTableData(users, false);
        document.querySelector(".edit-btn").style.display = "none";
        document.querySelector(".delete-btn").style.display = "none";
    }
    else
        setTableData(users, false);
}

const users = [
    { username: 'qinky', name: '秦开源', department: '开发部门', position: '项目经理', phone: '15735674776', role: "管理员", status: '启用', createdAt: '2023-06-25 12:00:00' },
    { username: 'chengy', name: '陈冠宇', department: '开发部门', position: '后端开发', phone: '14686444655', role: "普通用户", status: '启用', createdAt: '2023-06-26 00:00:00' },
];
let filteredUsers = users;

function setTableData(users, flag) {
    const tableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    if (flag) {
        tableBody.innerHTML = ''
    }
    users.forEach(user => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = user.username;
        row.insertCell(1).textContent = user.name;
        row.insertCell(2).textContent = user.department;
        row.insertCell(3).textContent = user.position;
        row.insertCell(4).textContent = user.phone;
        row.insertCell(5).textContent = user.status;
        row.insertCell(6).textContent = user.createdAt;
        row.insertCell(7).innerHTML = '<button class="edit-btn" onclick="edit(\'' + user.username + '\', \'' + user.name + '\', \'' + user.department + '\', \'' + user.position + '\', \'' + user.phone + '\', \'' + user.role + '\', \'' + user.status + '\')">修改</button> <button class="delete-btn" onclick="deleteUser(\'' + user.username + '\')">删除</button>';
    });
}

function search() {
    const username = document.getElementById("username").value.trim();
    const name = document.getElementById("name").value.trim();
    const status = document.getElementById("status").value;
    if (username.length > 0) {
        filteredUsers = filteredUsers.filter(user => user.username.includes(username));
    }
    if (name.length > 0) {
        filteredUsers = filteredUsers.filter(user => user.name.includes(name));
    }
    filteredUsers = filteredUsers.filter(user => user.status === status);
    setTableData(filteredUsers, true);
    if (username !== "admin") {
        document.querySelector(".edit-btn").style.display = "none";
        document.querySelector(".delete-btn").style.display = "none";
    }
}

function reset() {
    document.getElementById("username").value = "";
    document.getElementById("name").value = "";
    document.getElementById("status").value = "启用";
    filteredUsers = users;
    setTableData(users, true);
    if (username !== "admin") {
        document.querySelector(".edit-btn").style.display = "none";
        document.querySelector(".delete-btn").style.display = "none";
    }
}

function add() {
    document.getElementById("addUserModal").style.display = "block";
}

function closeAddUserModal() {
    document.getElementById("addUsername").value = "";
    document.getElementById("addName").value = "";
    document.getElementById("addDepartment").value = "";
    document.getElementById("addPosition").value = "";
    document.getElementById("addPhone").value = "";
    document.getElementById("addRole").value = "管理员";
    document.getElementById("addStatus").value = "启用";
    document.getElementById("addUserModal").style.display = "none";
}

function addUser() {
    const username = document.getElementById("addUsername").value;
    const name = document.getElementById("addName").value;
    const department = document.getElementById("addDepartment").value;
    const position = document.getElementById("addPosition").value;
    const phone = document.getElementById("addPhone").value;
    const role = document.getElementById("addRole").value;
    const status = document.getElementById("addStatus").value;
    if (!username || !name || !department || !position || !phone || !role || !status) {
        alert("请确保所有字段都已填写。");
        return;
    }
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert("用户名已存在，请重新输入。");
        return;
    }
    const createdAt = new Date().toLocaleString().replace(/\//g, '-');
    const newUser = { username, name, department, position, phone, role, status, createdAt };
    users.push(newUser);
    setTableData(users, true);
    closeAddUserModal();
}

function deleteUser(username) {
    if (confirm(`确认删除【${username}】用户吗？`)) {
        const index = users.findIndex(user => user.username === username);
        users.splice(index, 1);
        setTableData(users, true);
    }
}

function edit(username, name, department, position, phone, role, status) {
    document.getElementById("editUsername").value = username;
    document.getElementById("editName").value = name;
    document.getElementById("editDepartment").value = department;
    document.getElementById("editPosition").value = position;
    document.getElementById("editPhone").value = phone;
    document.getElementById("editRole").value = role;
    document.getElementById("editStatus").value = status;
    document.getElementById("editUserModal").style.display = "block";
}

function closeEditUserModal() {
    document.getElementById("editUserModal").style.display = "none";
}

function updateUser() {
    const name = document.getElementById("editName").value;
    const department = document.getElementById("editDepartment").value;
    const position = document.getElementById("editPosition").value;
    const phone = document.getElementById("editPhone").value;
    const role = document.getElementById("editRole").value;
    const status = document.getElementById("editStatus").value;
    if (!name || !department || !position || !phone || !role || !status) {
        alert("请确保所有字段都已填写。");
        return;
    }
    const username = document.getElementById("editUsername").value;
    const index = users.findIndex(user => user.username === username);
    users[index].name = name;
    users[index].department = department;
    users[index].position = position;
    users[index].phone = phone;
    users[index].role = role;
    users[index].status = status;
    users[index].createdAt = new Date().toLocaleString().replace(/\//g, '-');
    setTableData(users, true);
    closeEditUserModal();
}

function exportUser() {
    const csvContent = "data:text/csv;charset=utf-8," + filteredUsers.map(user => {
        return user.username + "," + user.name + "," + user.department + "," + user.position + "," + user.phone + "," + user.role + "," + user.status + "," + user.createdAt;
    }).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
}

function logout() {
    if (confirm('确定要退出登录吗？')) {
        sessionStorage.removeItem("username");
        localStorage.removeItem("username");
        window.location.href = "login.html";
    }
}