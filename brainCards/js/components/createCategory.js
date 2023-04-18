import { createElement } from "../helper/createElement.js"

export const createCategory = (appElem) => {
    const category = createElement('section', {
        className: 'category section-offset',
    });

    const container = createElement('div', {
        className: 'container',
    });

    category.append(container);

    const category__list = createElement('ul', {
        className: 'category__list',
    });

    const createCategoryCard = (data) => {
        const item = createElement('li', {
            className: 'category__item',

            textContent: data.title, // убрать

        });
        item.dataset.id = data.id;

        /*
         * Написать функционал создания html карточки 
         */

        return item;
    }

    container.append(category__list);

    const mount = (data) => {
        category__list.textContent = '';
        appElem.append(category);
        const cards = data.map(createCategoryCard);
        category__list.append(...cards);
    }

    const unmount = () => {
        category.remove();
    }
    
    return { mount, unmount, category__list};
}