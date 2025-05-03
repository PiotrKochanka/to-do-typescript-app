export const renderCategories = (categories, selectedCategory, saveDataLocalStorage, categoriesListElement) => {
    categories.forEach((category) => {
        const categoryElement = document.createElement("li");
        categoryElement.classList.add(category);
        const categoryLabelElement = document.createElement("label");
        categoryLabelElement.innerText = category;
        const categoryInputElement = document.createElement("input");
        categoryInputElement.type = "radio";
        categoryInputElement.name = "category";
        categoryInputElement.addEventListener("change", () => {
            selectedCategory = category;
            saveDataLocalStorage();
        });
        categoryElement.appendChild(categoryLabelElement);
        categoryElement.appendChild(categoryInputElement);
        categoriesListElement.appendChild(categoryElement);
    });
};
