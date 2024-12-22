window.onload = () => genCaptcha();

var recordCaptcha = "";
function genCaptcha() {
    const code = Math.random().toString(16).slice(2, 6);
    document.querySelector(".captcha input:nth-of-type(2)").value = code;
    recordCaptcha = code;
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const captcha = document.getElementById("captcha").value;
    const remember = document.getElementById("remember").checked;
    if (username == "" || password == "" || captcha == "") {
        alert("请填写所有必填项");
    } else if (captcha != recordCaptcha) {
        alert("验证码错误");
    } else if ((username != "admin" || password != "admin123") && (username != "chengy" || password != "chengy123")) {
        alert("用户名或密码错误");
    } else {
        remember ? localStorage.setItem("username", username) : sessionStorage.setItem("username", username);
        window.location.href = "index.html";
    }
}