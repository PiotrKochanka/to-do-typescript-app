export const renderCategories = (categories, selectedCategory, saveDataLocalStorage, categoriesListElement, onCategoryChange) => {
    categories.forEach((category) => {
        const categoryElement = document.createElement("li");
        categoryElement.classList.add(category);
        const categoryLabelElement = document.createElement("label");
        categoryLabelElement.innerText = category;
        const categoryInputElement = document.createElement("input");
        categoryInputElement.type = "radio";
        categoryInputElement.name = "category";
        categoryInputElement.value = category;
        categoryInputElement.id = `category-${category}`;
        categoryInputElement.addEventListener("change", () => {
            onCategoryChange(category);
            saveDataLocalStorage();
        });
        if (selectedCategory === category) {
            categoryInputElement.checked = true;
        }
        categoryElement.appendChild(categoryLabelElement);
        categoryElement.appendChild(categoryInputElement);
        categoriesListElement.appendChild(categoryElement);
    });
};
