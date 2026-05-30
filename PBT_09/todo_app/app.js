const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const count = document.getElementById("count");
const clearBtn = document.getElementById("clearCompleted");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let filter = "all";

function save() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateCount() {
    const left = todos.filter(t => !t.completed).length;
    count.textContent = `${left} items left`;
}

function render() {
    list.innerHTML = "";

    let filtered = todos;

    if (filter === "active") {
        filtered = todos.filter(t => !t.completed);
    }

    if (filter === "completed") {
        filtered = todos.filter(t => t.completed);
    }

    filtered.forEach(todo => {
        const li = document.createElement("li");

        if (todo.completed) {
            li.classList.add("completed");
        }

        li.dataset.id = todo.id;

        const span = document.createElement("span");
        span.className = "text";
        span.textContent = todo.text;

        const del = document.createElement("button");
        del.className = "delete";
        del.textContent = "❌";

        li.append(span, del);
        list.appendChild(li);
    });

    updateCount();
    save();
}

form.addEventListener("submit", e => {
    e.preventDefault();

    const text = input.value.trim();

    if (!text) return;

    todos.push({
        id: Date.now(),
        text,
        completed:false
    });

    input.value = "";
    render();
});

list.addEventListener("click", e => {

    const li = e.target.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);

    if (e.target.classList.contains("delete")) {
        todos = todos.filter(t => t.id !== id);
    }
    else if (e.target.classList.contains("text")) {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
    }

    render();
});

list.addEventListener("dblclick", e => {

    if (!e.target.classList.contains("text")) return;

    const li = e.target.parentElement;
    const id = Number(li.dataset.id);

    const edit = document.createElement("input");
    edit.value = e.target.textContent;

    li.replaceChild(edit, e.target);

    edit.focus();

    edit.addEventListener("keydown", ev => {

        if (ev.key === "Enter") {

            const todo = todos.find(t => t.id === id);
            todo.text = edit.value.trim();

            render();
        }
    });
});

document.querySelectorAll(".filter").forEach(btn => {

    btn.addEventListener("click", () => {
        filter = btn.dataset.filter;
        render();
    });

});

clearBtn.addEventListener("click", () => {

    todos = todos.filter(t => !t.completed);
    render();

});

render();