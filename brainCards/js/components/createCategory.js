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
        });
        item.dataset.id = data.id;

        /*
         * Написать функционал создания html карточки
         */

        const cardBtn = createElement('button', {
            className: 'category__card',
        });

        const cardTitle = createElement('span', {
            className: 'category__title',
            textContent: data.title,
        });

        const cardPairs = createElement('span', {
            className: 'category__pairs',
            textContent: data.length,
        });

        cardBtn.append(cardTitle, cardPairs);

        const cardBtnEdit = createElement ('button', {
            className: 'category__btn category__edit',
            ariaLabel: 'редактировать',
            //alt: 'редактировать',//
        });

        const cardBtnDel = createElement ('button', {
            className: 'category__btn category__del',
            //alt: 'удалить',//
        });

        item.append(cardBtn, cardBtnEdit, cardBtnDel);

        //до сюда

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