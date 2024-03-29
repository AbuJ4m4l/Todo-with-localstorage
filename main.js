const taskForm = document.getElementById('taskForm');
    const tasksList = document.getElementById('tasksList');

    // Load tasks from localStorage on page load
    document.addEventListener('DOMContentLoaded', loadTasks);

    // Add task
    taskForm.addEventListener('submit', addTask);

    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => renderTask(task));
    }

    function addTask(e) {
      e.preventDefault();

      const taskTitle = document.getElementById('taskTitle').value;
      const taskDescription = document.getElementById('taskDescription').value;

      if (taskTitle && taskDescription) {
        const task = {
          id: Date.now(),
          title: taskTitle,
          description: taskDescription
        };

        renderTask(task);
        saveTasksToLocalStorage([...getTasks(), task]);

        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDescription').value = '';
      }
    }

    function renderTask(task) {
      const taskElement = document.createElement('div');
      taskElement.classList.add('bg-white', 'shadow-md', 'rounded', 'p-4', 'mb-4', 'flex', 'items-center', 'justify-between');

      const taskInfo = document.createElement('div');

      const taskTitle = document.createElement('h2');
      taskTitle.textContent = task.title;
      taskTitle.classList.add('text-xl', 'font-bold');

      const taskDescription = document.createElement('p');
      taskDescription.textContent = task.description;
      taskDescription.classList.add('text-gray-700');

      taskInfo.appendChild(taskTitle);
      taskInfo.appendChild(taskDescription);

      const taskActions = document.createElement('div');

      const editButton = document.createElement('button');
      editButton.classList.add('text-blue-500', 'hover:text-blue-700', 'focus:outline-none');
      editButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
      `;
      editButton.addEventListener('click', () => editTask(task));

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('text-red-500', 'hover:text-red-700', 'focus:outline-none', 'ml-2');
      deleteButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      `;
      deleteButton.addEventListener('click', () => deleteTask(task.id));

      taskActions.appendChild(editButton);
      taskActions.appendChild(deleteButton);

      taskElement.appendChild(taskInfo);
      taskElement.appendChild(taskActions);

      tasksList.appendChild(taskElement);
    }

    function editTask(task) {
      const taskTitle = prompt('Edit task title', task.title);
      const taskDescription = prompt('Edit task description', task.description);

      if (taskTitle && taskDescription) {
        const updatedTask = {
          id: task.id,
          title: taskTitle,
          description: taskDescription
        };

        updateTaskInLocalStorage(updatedTask);
        reloadTasks();
      }
    }

    function deleteTask(taskId) {
      const tasks = getTasks().filter(task => task.id !== taskId);
      saveTasksToLocalStorage(tasks);
      reloadTasks();
    }

    function clearTasks() {
      localStorage.removeItem('tasks');
      reloadTasks();
    }

    function getTasks() {
      return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function saveTasksToLocalStorage(tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTaskInLocalStorage(updatedTask) {
      const tasks = getTasks().map(task => (task.id === updatedTask.id ? updatedTask : task));
      saveTasksToLocalStorage(tasks);
    }

    function reloadTasks() {
      tasksList.innerHTML = '';
      loadTasks();
    }
