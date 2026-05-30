const form = document.getElementById("form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
const phoneInput = document.getElementById("phone");

const submitBtn = document.getElementById("submitBtn");

let valid = {
    name:false,
    email:false,
    password:false,
    confirm:false,
    phone:false
};

function checkForm(){
    submitBtn.disabled =
        !Object.values(valid).every(v=>v);
}

nameInput.addEventListener("input",()=>{

    const ok =
        nameInput.value.trim().length >= 2 &&
        nameInput.value.trim().length <= 50;

    valid.name = ok;

    document.getElementById("nameMsg")
        .textContent = ok ? "✅ Valid" : "❌ 2-50 ký tự";

    checkForm();
});

emailInput.addEventListener("input",()=>{

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    valid.email =
        regex.test(emailInput.value);

    document.getElementById("emailMsg")
        .textContent = valid.email
        ? ""
        : "Email không hợp lệ";

    checkForm();
});

passInput.addEventListener("input",()=>{

    const p = passInput.value;

    const bar = document.getElementById("bar");
    const msg = document.getElementById("passMsg");

    if(p.length < 8){
        bar.style.width="33%";
        bar.style.background="red";
        msg.textContent="Yếu";
        valid.password=false;
    }
    else if(
        /[a-zA-Z]/.test(p) &&
        /\d/.test(p) &&
        !/[!@#$%^&*]/.test(p)
    ){
        bar.style.width="66%";
        bar.style.background="orange";
        msg.textContent="Trung bình";
        valid.password=true;
    }
    else if(
        /[a-z]/.test(p) &&
        /[A-Z]/.test(p) &&
        /\d/.test(p) &&
        /[!@#$%^&*]/.test(p)
    ){
        bar.style.width="100%";
        bar.style.background="green";
        msg.textContent="Mạnh";
        valid.password=true;
    }

    confirmInput.dispatchEvent(
        new Event("input")
    );

    checkForm();
});

confirmInput.addEventListener("input",()=>{

    valid.confirm =
        confirmInput.value === passInput.value &&
        confirmInput.value !== "";

    document.getElementById("confirmMsg")
        .textContent = valid.confirm
        ? "✅ Khớp"
        : "❌ Không khớp";

    checkForm();
});

phoneInput.addEventListener("input",()=>{

    let value =
        phoneInput.value.replace(/\D/g,"");

    value = value.substring(0,10);

    if(value.length > 4){
        value =
            value.slice(0,4) +
            "-" +
            value.slice(4);
    }

    if(value.length > 8){
        value =
            value.slice(0,8) +
            "-" +
            value.slice(8);
    }

    phoneInput.value = value;

    valid.phone =
        value.replace(/-/g,"").length === 10;

    document.getElementById("phoneMsg")
        .textContent = valid.phone
        ? "✅"
        : "❌ 10 số";

    checkForm();
});

form.addEventListener("submit",e=>{

    e.preventDefault();

    const modal =
    document.createElement("div");

    modal.className="modal";

    modal.innerHTML=`
    <div class="modal-content">
        <h2>Đăng ký thành công!</h2>
        <p>Tên: ${nameInput.value}</p>
        <p>Email: ${emailInput.value}</p>
        <p>Phone: ${phoneInput.value}</p>
        <button onclick="this.closest('.modal').remove()">
            Close
        </button>
    </div>
    `;

    document.body.appendChild(modal);
});