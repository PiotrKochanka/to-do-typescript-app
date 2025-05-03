import { Task, Category } from './types/types.js';
import { renderCategories } from './helpers/render-category.helper.js';
import { renderTasks } from './helpers/render-tasks.helper.js';

const tasksListElement: HTMLElement = document.querySelector(".todo_tasks");
const categoriesListElement: HTMLElement = document.querySelector(".todo_categories");
const taskButtonElement: HTMLButtonElement = document.querySelector(".todo_add_button");
const taskNameInputELement: HTMLInputElement = document.querySelector("#add_input");

let selectedCategory: Category;

const categories: Category[] = [
    Category.GENERAL,
    Category.WORK,
    Category.HOBBY,
    Category.SPORT,
    Category.GYM,
    Category.SCHOOL
]

let tasks: Task[] = [];

const saveDataLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const loadDataFromLocalStorage = () => {
    const tasksFromStorage = localStorage.getItem("tasks");
    const categoryFromStorage = localStorage.getItem("selectedCategory");

    if (tasksFromStorage) {
        tasks = JSON.parse(tasksFromStorage);

        // Dla każdego zadania sprawdź, czy ma przypisaną kategorię
        tasks.forEach(task => {
            if (!task.category) {
                task.category = Category.GENERAL;  // Przypisz kategorię domyślną, jeśli brak
            }
        });
    }

    if (categoryFromStorage) {
        selectedCategory = categoryFromStorage as Category;
    } else {
        selectedCategory = Category.GENERAL;  // Domyślna kategoria, jeśli brak
    }

    console.log("Załadowana kategoria:", selectedCategory);
};

const addTask = (task: Task) => {
    tasks.push(task);
    saveDataLocalStorage();
}

taskButtonElement.addEventListener("click", (event: Event) => {
    event.preventDefault();

    const taskName = taskNameInputELement.value.trim();

    if (!taskName) {
        alert("Wpisz nazwę zadania!");
        return;
    }

    const newTask: Task = {
        name: taskNameInputELement.value,
        done: false,
        category: selectedCategory || Category.GENERAL
    };

    addTask(newTask);

    taskNameInputELement.value = "";
    renderTasks(tasksListElement, tasks, saveDataLocalStorage);
});

loadDataFromLocalStorage();
renderCategories(categories, selectedCategory, saveDataLocalStorage, categoriesListElement);
renderTasks(tasksListElement, tasks, saveDataLocalStorage);