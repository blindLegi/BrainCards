import { createCategory } from "./components/createCategory.js";
import { createEditCategory } from "./components/createEditCategory.js";
import { createHeader } from "./components/createHeader.js";
import { createElement } from "./helper/createElement.js";
import { fetchCards, fetchCategories } from "./service/api.service.js";

const initApp = async () => {
    const headerParent = document.querySelector('.header');
    const appElem = document.querySelector('#app');

    const headerObj = createHeader(headerParent);
    const categoryObj = createCategory(appElem);
    const editCategoryObj = createEditCategory(appElem);
    
    const allSectionUnmount = () => {
        [categoryObj, editCategoryObj].forEach(obj => obj.unmount());
    };

    const renderIndex = async e => {
        e?.preventDefault();
        allSectionUnmount();
        const categories = await fetchCategories();
        if (categories.error) {
            appElem.append(createElement('p', {
                className: 'server-error',
                textContent: 'Ошибка сервера, попробуйте зайти позже',
            }));
            return;
        };
    
        categoryObj.mount(categories);
    };

    renderIndex();

    headerObj.headerLogoLink.addEventListener('click', renderIndex);

    headerObj.headerBtn.addEventListener('click', () => {
        allSectionUnmount();
        headerObj.updateHeaderTitle('Новая категория');
        editCategoryObj.mount();
    });

    categoryObj.category__list.addEventListener('click', async ({ target }) => {
        const categoryItem = target.closest('.category__item'); 

        if (target.closest('.category__edit')) {
            const dataCards = await fetchCards(categoryItem.dataset.id);
            allSectionUnmount();
            headerObj.updateHeaderTitle('Редактирование');
            editCategoryObj.mount(dataCards);
            return;
        };
    });
};

initApp();