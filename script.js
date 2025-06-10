let addTaskBtn = document.getElementById("addTask");

addTaskBtn.addEventListener('click', function () {
    let inputContiner = document.getElementById("inputContiner");
    inputContiner.classList.remove("hidden");
    inputContiner.classList.add("flex");
});

let taskInput = document.getElementById("taskInput");
let confirmAddTask = document.getElementById("confirmAddTask");
let taskContainer = document.getElementById("taskContainer");

// دالة لإضافة مهمة إلى localStorage
function addTaskToLS(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// دالة لحذف مهمة من localStorage حسب النص (taskText)
function deleteTaskFromLS(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // حذف المهمة بناءً على النص (يمكن تعديلها لو تريد حذف حسب فهرس)
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// دالة لعرض المهام المحفوظة عند تحميل الصفحة
function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskContainer.innerHTML = '';

    tasks.forEach(taskText => {
        let taskItem = document.createElement('div');
        taskItem.className = "flex justify-between items-center gap-5 p-4 rounded-md border border-slate-950 dark:border-gray-700 bg-white dark:bg-gray-400 transition-all duration-[1s]";

        let checkbox = document.createElement('input');
        checkbox.type = "checkbox";

        let taskTitle = document.createElement('p');
        taskTitle.textContent = taskText;
        taskTitle.classList.add("text-blue-900", "text-lg", "font-medium",);

        checkbox.addEventListener('change', function () {
            taskTitle.style.textDecoration = this.checked ? 'line-through' : 'none';
            taskTitle.style.color = this.checked ? 'gray' : '#1e3a8a';
        });

        let deleteTaskBtn = document.createElement('button');
        deleteTaskBtn.textContent = "X";
        deleteTaskBtn.className = 'bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700';

        deleteTaskBtn.addEventListener("click", function () {
            taskItem.remove();
            deleteTaskFromLS(taskText);
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskTitle);
        taskItem.appendChild(deleteTaskBtn);

        taskContainer.appendChild(taskItem);
    });
}

confirmAddTask.addEventListener("click", function () {
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    // إضافة المهمة إلى localStorage
    addTaskToLS(taskText);

    // إعادة عرض المهام بعد الإضافة (حتى تظهر المهمة الجديدة)
    displayTasks();

    taskInput.value = "";
});

// عند تحميل الصفحة نعرض المهام المخزنة
window.addEventListener('load', displayTasks);

// Darkmode Button
let darkModeBtn = document.getElementById('darkModeBtn');

darkModeBtn.addEventListener('click', function () {
    darkModeBtn.innerText = " ";
    darkModeBtn.innerText = "🌙";
    darkModeBtn.style.backgroundColor = '#1f2937'
    
    document.documentElement.classList.toggle('dark');
    
    if (document.documentElement.classList.contains('dark')) {
        darkModeBtn.innerText = " ";
        darkModeBtn.innerText = "☀️";
        darkModeBtn.style.backgroundColor = '#ef4444'
    }
})


