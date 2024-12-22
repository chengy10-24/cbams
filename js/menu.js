window.onload = () => {
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
}

let subMenuStates = {
    0: false,
    1: false,
    2: false
};

function showOrHideSubMenu(num, row) {
    let subMenus = [];
    switch (num) {
        case 0:
            subMenus = [
                { name: '新增', permission: 'cbams:user:add' },
                { name: '删除', permission: 'cbams:user:delete' },
                { name: '修改', permission: 'cbams:user:update' },
                { name: '查看', permission: 'cbams:user:list' }
            ];
            break;
        case 1:
            subMenus = [
                { name: '查看', permission: 'cbams:role:get' }
            ];
            break;
        case 2:
            subMenus = [
                { name: '展示｜隐藏', permission: 'cbams:menu:show:hide' }
            ];
            break;
    }
    subMenuStates[num] = toggleSubMenus(subMenuStates[num], subMenus, row);
}

function toggleSubMenus(visible, subMenus, row) {
    if (!visible) {
        subMenus.forEach(subMenu => {
            const newRow = document.createElement('tr');
            newRow.classList.add('submenu'); // 添加子菜单行的类名
            newRow.innerHTML = `
                <td>${subMenu.name}</td>
                <td>按钮</td>
                <td>显示</td>
                <td>${subMenu.permission}</td>
                <td></td>
                <td></td>
            `;
            row.parentNode.insertBefore(newRow, row.nextSibling);
        });
        return true;
    } else {
        let nextRow = row.nextElementSibling;
        while (nextRow && nextRow.classList.contains('submenu')) {
            const tempRow = nextRow;
            nextRow = nextRow.nextElementSibling;
            row.parentNode.removeChild(tempRow);
        }
        return false;
    }
}

function logout() {
    if (confirm('确定要退出登录吗？')) {
        sessionStorage.removeItem("token");
        localStorage.removeItem("token");
        window.location.href = "login.html";
    }
}