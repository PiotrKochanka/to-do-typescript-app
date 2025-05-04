import { Category } from '../types/types.js';

export const renderCategories = (
    categories: Category[], 
    selectedCategory: Category,  
    saveDataLocalStorage: Function, 
    categoriesListElement: HTMLElement, 
    onCategoryChange: (category: Category) => void
) => {
    categories.forEach((category) => {
        const categoryElement: HTMLElement = document.createElement("li");
        categoryElement.classList.add(category);

        const categoryLabelElement: HTMLLabelElement = document.createElement("label");
        categoryLabelElement.innerText = category;

        const categoryInputElement: HTMLInputElement = document.createElement("input");
        categoryInputElement.type = "radio";
        categoryInputElement.name = "category";
        categoryInputElement.value = category;
        categoryInputElement.id = `category-${category}`;

        categoryInputElement.addEventListener("change", () => {
            onCategoryChange(category);
            saveDataLocalStorage();
        })

        if (selectedCategory === category) {
            categoryInputElement.checked = true;
        }

        categoryElement.appendChild(categoryLabelElement);
        categoryLabelElement.appendChild(categoryInputElement);

        categoriesListElement.appendChild(categoryElement);
    });
}