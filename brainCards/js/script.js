import { createCategory } from "./components/createCategory.js";
import { createHeader } from "./components/createHeader.js";
import { createElement } from "./helper/createElement.js";
import { fetchCategories } from "./service/api.service.js";

const initApp = async () => {
    const headerParent = document.querySelector('.header');
    const appElem = document.querySelector('#app');

    const headerObj = createHeader(headerParent);
    const categoryObj = createCategory(appElem);
    
    
    

    const renderIndex = async e => {
        e?.preventDefault();
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
        headerObj.updateHeaderTitle('Новая категория');
    });
};

initApp();