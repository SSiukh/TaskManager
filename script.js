function redirToLogin(){
    window.location.href = "login.html"
}
function redirToMain(){
    window.location.href = "index.html"
}
function redirToRegistration(){
    window.location.href = "registration.html"
}
function request(){
    location.href = "#main-footer"
}
function aboutUs(){
    location.href = "#first-main-h1"
}
function commandWork(){
    location.href = "#fourth-main-div"
}
function goToTg(){
    window.location.href="https://t.me/sashasiukh";
}
function goToFb(){
    window.location.href="https://www.facebook.com/?locale=uk_UA";
}
function goToInst(){
    window.location.href="https://instagram.com/sasha_siukh04?igshid=OGQ5ZDc2ODk2ZA==";
}
function redirToDashBoard(){
    window.location.href = "dashboard.html"
}
function redirToExit(){
    window.location.href = "exit.html"
}
function redirToNotifications(){
    window.location.href = "notifications.html"
}
function redirToTeam(){
    window.location.href = "team.html"
}

// Дата та час
var date = new Vue({
    el: '#dash-header-time-div',
    data: {
        date: '',
        time: ''
    },
    methods: {
        getCurrentTime: function() {
            var currentTime = new Date();
            var hours = currentTime.getHours();
            var minutes = currentTime.getMinutes();
            var seconds = currentTime.getSeconds();

            // Форматуємо час, щоб забезпечити відображення двоцифрових чисел
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;

            // Повертаємо форматований час
            return hours + ":" + minutes + ":" + seconds;
        },

        getCurrentDate: function(){
            var currentDate = new Date();
            var date = currentDate.getDate();
            var month = currentDate.getMonth() + 1;
            var years = currentDate.getFullYear();

            return date + "." + month + "." + years;
        }
    },
    mounted: function() {
        // Оновлюємо значення кожну секунду
        setInterval(() => {
            this.time = this.getCurrentTime();
            this.date = this.getCurrentDate();
        }, 1000);
    }
});

// ---------------------------------------calendar
new Vue({
    el: '#dash-calendar',
    data: {
        currentMonth: '',
        weeks: [],
        daysOfWeek: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        selectedDate: null,
        currentDate: new Date(),
    },
    mounted() {
        this.updateCalendar();
    },
    methods: {
        updateCalendar() {
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth();
            const today = new Date();

            this.currentMonth = new Date(year, month, 1).toLocaleString('default', { month: 'long', year: 'numeric' });

            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

            let dayCount = 1;
            this.weeks = [];

            for (let i = 0; i < 6; i++) {
                const week = [];

                for (let j = 0; j < 7; j++) {
                    const date = new Date(year, month, dayCount);

                    if ((i === 0 && j < firstDayOfMonth) || dayCount > lastDayOfMonth) {
                        week.push({ day: '' });
                    } else {
                        week.push({
                            day: dayCount,
                            date: date,
                            isToday: this.isSameDate(date, today),
                        });
                        dayCount++;
                    }
                }

                this.weeks.push(week);
            }
        },
        isSameDate(date1, date2) {
            return (
                date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getDate() === date2.getDate()
            );
        },
        prevMonth() {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.updateCalendar();
        },
        nextMonth() {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.updateCalendar();
        }
    },
});






// Функція для збереження даних реєстрації
function saveRegistrationData(name, email, password) {
    const registrationData = {
        name: name,
        email: email,
        password: password
    };
    localStorage.setItem('registrationData', JSON.stringify(registrationData));
}

// Функція для отримання збережених даних реєстрації
function getSavedRegistrationData() {
    const savedData = localStorage.getItem('registrationData');
    return savedData ? JSON.parse(savedData) : null;
}

// Функція для заповнення форми даними, якщо вони були збережені
function fillRegistrationForm() {
    const savedData = getSavedRegistrationData();
    if (savedData) {
        document.getElementById('registration-input-name').value = savedData.name;
        document.getElementById('registration-input-email').value = savedData.email;
        document.getElementById('registration-input-password').value = savedData.password;
    }
}

// Виклик функції для заповнення форми при завантаженні сторінки
document.addEventListener('DOMContentLoaded', fillRegistrationForm);

// Функція для реєстрації
function register() {
    const name = document.getElementById('registration-input-name').value;
    const email = document.getElementById('registration-input-email').value;
    const password = document.getElementById('registration-input-password').value;

    // Збереження даних реєстрації
    saveRegistrationData(name, email, password);

    // Ваш код для реєстрації користувача на сервері або локально
    console.log('Registered:', name, email, password);
}

// Функція для збереження даних входу
function saveLoginData(email, password) {
    const loginData = {
        email: email,
        password: password
    };
    localStorage.setItem('loginData', JSON.stringify(loginData));
}

// Функція для отримання збережених даних входу
function getSavedLoginData() {
    const savedData = localStorage.getItem('loginData');
    return savedData ? JSON.parse(savedData) : null;
}

// Функція для перевірки, чи користувач ще не зареєстрований
function isUserRegistered(email, password) {
    const savedData = getSavedRegistrationData();
    return savedData && savedData.email === email && savedData.password === password;
}

// Функція для входу
function login() {
    const email = document.getElementById('login-input-email').value;
    const password = document.getElementById('login-input-password').value;

    // Перевірка, чи користувач ще не зареєстрований
    if (isUserRegistered(email, password)) {
        // Збереження даних входу
        saveLoginData(email, password);

        // Ваш код для входу користувача на сервері або локально
        console.log('Logged in:', email, password);
    } else {
        console.log('Invalid credentials. Please register first.');
    }
}

// Функція для заповнення форми даними входу, якщо вони були збережені
function fillLoginForm() {
    const savedData = getSavedLoginData();
    if (savedData) {
        document.getElementById('login-input-email').value = savedData.email;
        document.getElementById('login-input-password').value = savedData.password;
    }
}

// Виклик функції для заповнення форми при завантаженні сторінки
document.addEventListener('DOMContentLoaded', fillLoginForm);




function showModalAddTask(){
    var element = document.getElementById('modal-add-task');
     element.style.display = 'flex';
}
function closeModalAddTask(){
    var element = document.getElementById('modal-add-task');
    element.style.display = 'none';
}


// Визначте об'єкт для зберігання заміток та кольорів
var notesData = {};

function showModalNote() {
    var element = document.getElementById('modal-window-note');
    element.style.display = 'flex';
}

function closeModalNote() {
    var element = document.getElementById('modal-window-note');
    element.style.display = 'none';
}

var selectedColor = ''; // Глобальна змінна для збереження вибраного кольору

// Завантажити замітки з localStorage при завантаженні сторінки
window.onload = function () {
    // Отримати дані про замітки з localStorage
    var savedNotes = localStorage.getItem('notesData');
    
    // Перевірити, чи є дані та розпакувати їх
    if (savedNotes) {
        notesData = JSON.parse(savedNotes);
    }

    // Пройтися по заміткам та відобразити їх
    for (var i = 1; i <= 5; i++) {
        var textElement = document.getElementById('notes-text-' + i);
        var containElement = document.getElementById('container-notes-' + i);

        // Перевірити, чи є дані для цієї замітки
        if (notesData[i]) {
            textElement.innerHTML = notesData[i].text;
            containElement.style.backgroundColor = notesData[i].color;
            containElement.style.display = 'flex';
        }
    }
};

function getColorNote(color) {
    selectedColor = color;
}

function createNote() {
    var textValue = document.getElementById('note-textarea').value;

    for (var i = 1; i <= 5; i++) {
        var textElement = document.getElementById('notes-text-' + i);
        var containElement = document.getElementById('container-notes-' + i);

        if (textValue !== '' && !notesData[i]) {
            textElement.innerHTML = textValue;
            containElement.style.backgroundColor = selectedColor;
            containElement.style.display = 'flex';

            // Зберегти дані замітки
            notesData[i] = {
                text: textValue,
                color: selectedColor
            };

            // Оновити дані в localStorage
            localStorage.setItem('notesData', JSON.stringify(notesData));

            break;  // Вийти з циклу, якщо знайдено вільний контейнер
        }
    }

    var textArea = document.getElementById('note-textarea');
    textArea.value = '';
}

function closeNote(index) {
    var contain = document.getElementById('container-notes-' + index);
    contain.style.display = 'none';
    var text = document.getElementById('notes-text-' + index);
    text.innerHTML = '';

    // Очистити дані про замітку
    delete notesData[index];

    // Оновити дані в localStorage
    localStorage.setItem('notesData', JSON.stringify(notesData));
}



function addtasks() {
    var title = document.getElementById('modal-add-task-text-1').value;
    var description = document.getElementById('modal-add-task-text-2').value;
    var date = document.getElementById('calendarInput-modal-add-task').value;

    // Create a unique identifier for the task and modal
    var taskId = 'task_' + Date.now();
    var modalId = 'modal_more_task_' + taskId;

    // Create an object to represent the task
    var task = {
        id: taskId,
        title: title,
        description: description,
        date: date
    };

    // Retrieve existing tasks from local storage or initialize an empty array
    var existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add the new task to the array
    existingTasks.push(task);

    // Save the updated tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(existingTasks));

    // Create HTML for the task and modal
    var htmlString = `
    <div  class="new-task" id="${taskId}">
        <div id="modal-edit-task">
                <img onclick="closeModalEditTask()" id="modal-edit-task-close" src="img/login-close.png" alt="close">
            <h2 id="h-modal-edit-task">Редагувати</h2>
            <input id="modal-edit-task-text-1" type="text" placeholder="Заголовок завдання">
            <input id="modal-edit-task-text-2" type="text" placeholder="Опис завдання">
            <div id="modal-edit-task-div-buttons">
                <button id="modal-edit-task-editors">Виконавці</button>
                <input type="date" id="calendarInput-modal-edit-task">
            </div>
            <button onclick="edittasks('${taskId}')" id="modal-edit-task-add-button"><span id="modal-add-task-add-button-text">Редагувати</span></button>
        </div>
        <div class="modal-more-task" id="${modalId}" style="display: none;">
            <p class="modal-more-task-item" onclick="moveTaskToCompleted('${taskId}')">Виконано</p>
            <p class="modal-more-task-item" onclick="showEditTask('${taskId}')">Редагувати</p>
            <p class="modal-more-task-item" onclick="deleteTask('${taskId}')">Видалити</p>
        </div>
        <div class="new-task-title-div-high">
            <div class="new-task-title-div">
                <div class="new-task-inform">
                    <h2 class="new-task-title">${title}</h2>
                    <p class="task-descr">${description}</p>
                    <p class="new-task-date">${date}</p>
                </div>
                <img onclick="showMoreTask('${modalId}')" class="img-new-task-title" src="img/More.svg" alt="more">
            </div>
            <div class="down-img-task">
                <img onclick="modalShowtask('${taskId}')" class="img-down-new-task" src="img/user-photo.png" alt="user">
                <img id="img-circle-task" class="img-down-new-task" src="img/red-circle.svg" alt="circle">
            </div>
            <div class="button-show-task-div">
                <button class="show-task-btn-delete" onclick="deleteTask('${taskId}')">Видалити</button>
                <button class="show-task-btn-edit" onclick="showEditTask('${taskId}')">Редагувати</button>
            </div>
        </div>
    </div>
`;

    // Create a new element and append it to the container
    var newElement = document.createElement('div');
    newElement.innerHTML = htmlString;
    var container = document.getElementById('new-task');
    container.appendChild(newElement);

    var completeButton = newElement.querySelector('.modal-more-task-item');
    completeButton.addEventListener('click', function() {
        moveTaskToCompleted(taskId);
    });

    document.getElementById('modal-add-task-text-1').value = "";
    document.getElementById('modal-add-task-text-2').value = "";
}

window.addEventListener('load', function () {
    var existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    existingTasks.forEach(function (task) {
        var taskId = task.id;

        // Check if the task element with this taskId already exists
        if (!document.getElementById(taskId)) {
            var modalId = 'modal_more_task_' + taskId;
            var title = task.title || '';
            var description = task.description || '';
            var date = task.date || '';

            var htmlString = `
                <div class="new-task" id="${taskId}">
                    <div id="modal-edit-task">
                        <img onclick="closeModalEditTask()" id="modal-edit-task-close" src="img/login-close.png" alt="close">
                        <h2 id="h-modal-edit-task">Редагувати</h2>
                        <input id="modal-edit-task-text-1" type="text" placeholder="Заголовок завдання">
                        <input id="modal-edit-task-text-2" type="text" placeholder="Опис завдання">
                        <div id="modal-edit-task-div-buttons">
                            <button id="modal-edit-task-editors">Виконавці</button>
                            <input type="date" id="calendarInput-modal-edit-task">
                        </div>
                        <button onclick="edittasks('${taskId}')" id="modal-edit-task-add-button"><span id="modal-add-task-add-button-text">Редагувати</span></button>
                    </div>
                    <div class="modal-more-task" id="${modalId}" style="display: none;">
                        <p class="modal-more-task-item" onclick="moveTaskToCompleted('${taskId}')">Виконано</p>
                        <p class="modal-more-task-item" onclick="showEditTask('${taskId}')">Редагувати</p>
                        <p class="modal-more-task-item" onclick="deleteTask('${taskId}')">Видалити</p>
                    </div>
                    <div class="new-task-title-div-high">
                        <div class="new-task-title-div">
                            <div class="new-task-inform">
                                <h2 class="new-task-title">${title}</h2>
                                <p class="task-descr">${description}</p>
                                <p class="new-task-date">${date}</p>
                            </div>
                            <img onclick="showMoreTask('${modalId}')" class="img-new-task-title" src="img/More.svg" alt="more">
                        </div>
                        <div class="down-img-task">
                            <img onclick="modalShowtask('${taskId}')" class="img-down-new-task" src="img/user-photo.png" alt="user">
                            <img id="img-circle-task" class="img-down-new-task" src="img/red-circle.svg" alt="circle">
                        </div>
                        <div class="button-show-task-div">
                            <button class="show-task-btn-delete" onclick="deleteTask('${taskId}')">Видалити</button>
                            <button class="show-task-btn-edit" onclick="showEditTask('${taskId}')">Редагувати</button>
                        </div>
                    </div>
                </div>
            `;

            // Create a new element and append it to the container
            var newElement = document.createElement('div');
            newElement.innerHTML = htmlString;
            var container = document.getElementById('new-task');
            container.appendChild(newElement);

            var completeButton = newElement.querySelector('.modal-more-task-item');
            completeButton.addEventListener('click', function () {
                moveTaskToCompleted(taskId);
            });
        }
    });
});





function edittasks(taskId) {
    console.log("Editing task with ID:", taskId);
    var taskElement = document.getElementById(taskId);
    var title = document.getElementById('modal-edit-task-text-1').value;
    var descr = document.getElementById('modal-edit-task-text-2').value;
    var date = document.getElementById('calendarInput-modal-edit-task').value;

    // Update the task element content
    var titleElement = taskElement.querySelector('.new-task-title');
    var descrElement = taskElement.querySelector('.task-descr');
    var dateElement = taskElement.querySelector('.new-task-date');

    if (titleElement && descrElement && dateElement) {
        titleElement.textContent = title;
        descrElement.textContent = descr;
        dateElement.textContent = date;

        // Close the edit modal
        closeModalEditTask();
    } else {
        console.error("Error: Task elements not found.");
    }
}




function deleteTask(taskId) {
    // Remove the task from the local storage
    var existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var updatedTasks = existingTasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Remove the task element from the DOM
    var taskElement = document.getElementById(taskId);
    taskElement.remove();
}


function showEditTask(taskId){
    var taskElement = document.getElementById(taskId);
    var title = document.getElementById('modal-edit-task-text-1');
    var descr = document.getElementById('modal-edit-task-text-2');
    var date = document.getElementById('calendarInput-modal-edit-task');
    element = document.getElementById('modal-edit-task');
    element.style.display = 'flex';
    var currentTitle = taskElement.querySelector('.new-task-title').textContent;
    var currentDescr = taskElement.querySelector('.task-descr').textContent;
    var currentDate = taskElement.querySelector('.new-task-date').textContent;
    title.value = currentTitle;
    descr.value = currentDescr;
    date.value = currentDate;
}
function closeModalEditTask(){
    var element = document.getElementById('modal-edit-task');
    element.style.display = 'none';
}

function modalShowtask(taskId) {
    var taskElement = document.getElementById(taskId);
    var descr = taskElement.querySelector('.task-descr');
    var btns = taskElement.querySelector('.button-show-task-div');
    var hideImg = taskElement.querySelector('.img-new-task-title');
    if (descr.style.display === 'block') {
        // Revert changes
        descr.style.display = 'none';
        btns.style.display = 'none';
        hideImg.style.display = 'block';
    } else {
        // Apply changes
        descr.style.display = 'block';
        btns.style.display = 'flex';
        hideImg.style.display = 'none';
    }
}

function moveTaskToCompleted(taskId) {
    // Знаходження елемента завдання за його ідентифікатором
    var taskElement = document.getElementById(taskId);

    // Знаходження блока "Завершені"
    var completedTasksContainer = document.getElementById('end-task');

    // Переміщення елемента завдання до блока "Завершені"
    completedTasksContainer.appendChild(taskElement);

    var image = document.getElementById('img-circle-task');
    image.src = "img/green-circle.svg"
    // Зміна стилю, щоб сховати опції "More"
    var modalId = 'modal_more_task_' + taskId;
    var moreOptions = document.getElementById(modalId);
    moreOptions.style.display = 'none';
}



function showMoreTask(modalId) {
    var element = document.getElementById(modalId);
    element.style.display = (element.style.display === 'none' || element.style.display === '') ? 'block' : 'none';
}

function loginDataforName() {
    var email = document.getElementById('login-input-email').value;
    var password = document.getElementById('login-input-password').value;
    var error = document.getElementById('login-error');
    
    if (email === 'siukhsasha@gmail.com' && password === '0000') {
        // Збереження ім'я в local storage
        localStorage.setItem('username', email);
        redirToDashBoard();
    } else {
        error.style.display = 'flex';
    }
    
    // Завантаження ім'я з local storage при кожному виклику функції
    document.getElementById('username').innerHTML = localStorage.getItem('username');
}

// Виклик функції при завантаженні сторінки
window.onload = loginDataforName;



function showModalMeeting(){
    var element = document.getElementById('modal-add-meeting');
    element.style.display = 'flex';
}
function closeModalAddMeeting(){
    var element = document.getElementById('modal-add-meeting');
    element.style.display = 'none';
}


function addmeetings() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var meetingTheme = document.getElementById('modal-add-task-text-1').value;
    var meetingDetails = document.getElementById('modal-add-task-text-2').value;
    var meetingDate = document.getElementById('calendarInput-modal-add-task').value;

    // Loop through the notifications
    for (var i = 1; i <= 5; i++) {
        var notification = document.getElementById(`notifications-${i}`);

        // Check if the display property is set to 'none'
        if (notification.style.display === 'none' || getComputedStyle(notification).display === 'none') {
            // Update the content of the hidden notification
            notification.querySelector('.notify-event').textContent = "Призначено мітинг";
            notification.querySelector('.notify-date').textContent = `${day}.${month}.${year}`;

            // Set the display property to 'flex' to make it visible
            notification.style.display = 'flex';

            // Save meeting details to localStorage
            localStorage.setItem('meetingTheme-' + i, meetingTheme);
            localStorage.setItem('meetingDetails-' + i, meetingDetails);
            localStorage.setItem('meetingDate-' + i, meetingDate);

            // Exit the loop after updating the first hidden notification
            break;
        }
    }
}




// Функція для закриття сповіщення
function closeNotification(index) {
    var notification = document.getElementById(`notifications-${index}`);
    notification.style.display = 'none';

    // Clear meeting details from localStorage when closing the notification
    localStorage.removeItem('meetingTheme-' + index);
    localStorage.removeItem('meetingDetails-' + index);
    localStorage.removeItem('meetingDate-' + index);
}



function showInfoNotify(notificationIndex) {
    var meetingTheme = localStorage.getItem('meetingTheme-' + notificationIndex);
    var meetingDetails = localStorage.getItem('meetingDetails-' + notificationIndex);
    var meetingDate = localStorage.getItem('meetingDate-' + notificationIndex);

    // Add your logic to display the detailed information (you can replace alert with your custom UI logic)
    alert(`Meeting Theme: ${meetingTheme}\nMeeting Details: ${meetingDetails}\nMeeting Date: ${meetingDate}`);
}

window.onload = function() {
    for (var i = 1; i <= 5; i++) {
        initializeNotification(i);
    }
};

function initializeNotification(index) {
    var notification = document.getElementById(`notifications-${index}`);
    var savedTheme = localStorage.getItem('meetingTheme-' + index);
    var savedDetails = localStorage.getItem('meetingDetails-' + index);
    var savedDate = localStorage.getItem('meetingDate-' + index);

    if (savedTheme && savedDetails && savedDate) {
        notification.querySelector('.notify-event').textContent = savedTheme;
        notification.querySelector('.notify-date').textContent = savedDate;

        // Set the display property to 'flex' to make it visible
        notification.style.display = 'flex';
    }
    showHeadNotify();
}

function showHeadNotify() {
    var head = document.getElementById('dash-header-third-text');
    var element = document.getElementById('notifications-1');
    
    // Use class selectors with a dot (.) to select elements by class name
    var event = element.querySelector('.notify-event').textContent;
    var date = element.querySelector('.notify-date').textContent;

    head.innerHTML = `${event} - ${date}`;
}


// //////////////////////////////////////////////////////////////////////////////
function showModalAddMember() {
    var element = document.getElementById('modal-add-member');
    element.style.display = 'inline-flex';
}

function closeModalAddMember() {
    var element = document.getElementById('modal-add-member');
    element.style.display = 'none';
}

function addMember() {
    // Retrieve input values
    var email = document.getElementById('modal-add-member-text-1').value;
    var name = document.getElementById('modal-add-member-text-2').value;

    // Create a new user-member-team element
    var newUserElement = document.createElement('div');
    newUserElement.className = 'user-member-team';

    newUserElement.innerHTML = `
        <div class="team-member-user">
            <img src="img/user-photo.png" alt="img">
            <div class="team-member-user-inform">
                <p class="team-member-user-inform-name">${name}</p>
                <p class="team-member-user-inform-email">${email}</p>
            </div>
        </div>
        <div class="assign-task-member">
            <p class="assign-task-member-count"></p>
        </div>
        <div class="done-task-member">
            <p class="done-task-member-count"></p>
        </div>
        <button class="assign-button-member">Додати до завдання</button>
        <img src="img/login-close.png" alt="close">
    `;

    // Append the new element to the team-div
    document.getElementById('team-div').appendChild(newUserElement);

    // Save data to localStorage
    saveDataToLocalStorage(email, name);

    // Close the modal after adding a member
    closeModalAddMember();
}

function saveDataToLocalStorage(email, name) {
    // Check if localStorage is supported
    if (typeof Storage !== 'undefined') {
        // Retrieve existing data or initialize an empty array
        var storedData = JSON.parse(localStorage.getItem('teamData')) || [];

        // Add the new member data
        storedData.push({ email: email, name: name });

        // Save the updated data back to localStorage
        localStorage.setItem('teamData', JSON.stringify(storedData));
    } else {
        console.error('LocalStorage is not supported');
    }
}

// Load data from localStorage on page load
function loadDataFromLocalStorage() {
    if (typeof Storage !== 'undefined') {
        var storedData = JSON.parse(localStorage.getItem('teamData')) || [];

        // Loop through the stored data and add members
        storedData.forEach(function (member) {
            addMemberFromStorage(member.email, member.name);
        });
    }
}

// Function to add members loaded from storage
function addMemberFromStorage(email, name) {
    var newUserElement = document.createElement('div');
    newUserElement.className = 'user-member-team';

    newUserElement.innerHTML = `
        <div class="team-member-user">
            <img src="img/user-photo.png" alt="img">
            <div class="team-member-user-inform">
                <p class="team-member-user-inform-name">${name}</p>
                <p class="team-member-user-inform-email">${email}</p>
            </div>
        </div>
        <div class="assign-task-member">
            <p class="assign-task-member-count">7</p>
        </div>
        <div class="done-task-member">
            <p class="done-task-member-count">9/7</p>
        </div>
        <button class="assign-button-member">Додати до завдання</button>
        <img src="img/login-close.png" alt="close">
    `;

    // Append the new element to the team-div
    document.getElementById('team-div').appendChild(newUserElement);
}

// Load data from localStorage on page load
loadDataFromLocalStorage();

