document.addEventListener('DOMContentLoaded', () => {
    const username = sessionStorage.getItem("username") || localStorage.getItem("username");
    if (!username) {
        alert("暂未登录，请先登录！");
        window.location.href = "login.html";
    } else if (username != "admin") {
        alert("无权限访问该页面！");
        window.history.go(-1);
    } else {
        document.getElementById("login-user").innerHTML = `欢迎您，${username}`;
    }
})

function detail() {
    const currentRow = event.target.parentNode.parentNode;
    const roleCode = currentRow.cells[1].innerHTML;
    if (roleCode === "admin") {
        document.getElementById("role-menu-list").innerHTML = `<li>首页</li> <li>用户管理<ul> <li>新增</li> <li>删除</li> <li>修改</li> <li>查看</li> <li>导出</li> </ul> </li> <li>角色管理<ul> <li>查看</li> </ul> </li> <li>菜单管理<ul> <li>展示｜隐藏</li> </ul> </li>`;
    }
    else if (roleCode === "user") {
        document.getElementById("role-menu-list").innerHTML = `<li>首页</li> <li>用户管理<ul> <li>查看</li> <li>导出</li> </ul> </li>`;
    }
    const modal = document.getElementById("role-menu-modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("role-menu-modal");
    modal.style.display = "none";
}

function logout() {
    if (confirm('确定要退出登录吗？')) {
        sessionStorage.removeItem("username");
        localStorage.removeItem("username");
        window.location.href = "login.html";
    }
}
