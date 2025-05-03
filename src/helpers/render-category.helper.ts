import { Category } from '../types/types.js';

export const renderCategories = (categories: Category[], selectedCategory: Category,  saveDataLocalStorage: Function, categoriesListElement: HTMLElement) => {
    categories.forEach((category) => {
        const categoryElement: HTMLElement = document.createElement("li");
        categoryElement.classList.add(category);

        const categoryLabelElement: HTMLLabelElement = document.createElement("label");
        categoryLabelElement.innerText = category;

        const categoryInputElement: HTMLInputElement = document.createElement("input");
        categoryInputElement.type = "radio";
        categoryInputElement.name = "category";

        categoryInputElement.addEventListener("change", () => {
            selectedCategory = category;
            saveDataLocalStorage();
        })

        categoryElement.appendChild(categoryLabelElement);
        categoryElement.appendChild(categoryInputElement);

        categoriesListElement.appendChild(categoryElement);
    });
}