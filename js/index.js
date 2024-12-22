window.onload = () => {
    const username = sessionStorage.getItem("username") || localStorage.getItem("username");
    if (!username) {
        alert("暂未登录，请先登录！");
        window.location.href = "login.html";
    } else if (username !== "admin") {
        document.querySelector(".sidebar ul li:nth-child(3)").style.display = "none";
        document.querySelector(".sidebar ul li:nth-child(4)").style.display = "none";
    }
    document.getElementById("login-user").innerHTML = `欢迎您，${username}`;
}

function logout() {
    if (confirm('确定要退出登录吗？')) {
        sessionStorage.removeItem("username");
        localStorage.removeItem("username");
        window.location.href = "login.html";
    }
}