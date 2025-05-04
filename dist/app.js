import { Category } from './types/types.js';
import { renderCategories } from './helpers/render-category.helper.js';
import { renderTasks } from './helpers/render-tasks.helper.js';
const tasksListElement = document.querySelector(".todo_tasks");
const categoriesListElement = document.querySelector(".todo_categories");
const taskButtonElement = document.querySelector(".todo_add_button");
const taskNameInputELement = document.querySelector("#add_input");
let selectedCategory;
const categories = [
    Category.GENERAL,
    Category.WORK,
    Category.HOBBY,
    Category.SPORT,
    Category.GYM,
    Category.SCHOOL
];
let tasks = [];
const saveDataLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("selectedCategory", selectedCategory || Category.GENERAL);
};
const loadDataFromLocalStorage = () => {
    const tasksFromStorage = localStorage.getItem("tasks");
    const categoryFromStorage = localStorage.getItem("selectedCategory");
    if (tasksFromStorage) {
        tasks = JSON.parse(tasksFromStorage);
    }
    if (categoryFromStorage) {
        selectedCategory = categoryFromStorage;
    }
};
const addTask = (task) => {
    tasks.push(task);
    saveDataLocalStorage();
};
taskButtonElement.addEventListener("click", (event) => {
    event.preventDefault();
    const taskName = taskNameInputELement.value.trim();
    if (!taskName) {
        alert("Wpisz nazwę zadania!");
        return;
    }
    addTask({
        name: taskNameInputELement.value,
        done: false,
        category: selectedCategory || Category.GENERAL
    });
    taskNameInputELement.value = "";
    renderTasks(tasksListElement, tasks, saveDataLocalStorage);
});
loadDataFromLocalStorage();
renderCategories(categories, selectedCategory, saveDataLocalStorage, categoriesListElement, (category) => {
    selectedCategory = category;
});
renderTasks(tasksListElement, tasks, saveDataLocalStorage);
