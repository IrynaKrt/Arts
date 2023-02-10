import { getResource } from "../services/request";

const showMoreStyles = (trigger, wrapper) => {
    const btn = document.querySelector(trigger);

    // cards.forEach(card => { //простой вариант, когда есть все в верстке
    //     card.classList.add('animated', 'fadeInUp');
    // });

    // btn.addEventListener('click', () => {
    //     cards.forEach(card => {
    //         card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
    //         card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    //     });
    //     btn.remove();
    // });

    btn.addEventListener('click', function() {
        getResource('assets/db.json')
            .then(res => createCards(res.styles))
            .catch(() => {
                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                statusMessage.textContent = 'Что-то пошло не так';
                statusMessage.style.cssText = 'text-align: center; font-size: 250%, color:blue';
                document.querySelector(wrapper).appendChild(statusMessage);
            });

        this.remove();
    });

    function createCards(response) {
        response.forEach(({src, title}) => {
            let card = document.createElement('div');

            card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        
            card.innerHTML = `
                <div class="styles-block">
                    <img src=${src} alt="style">
                    <h4>${title}</h4>
                    <a href='#promo'>Подробнее</a>
                </div>
            `;

            document.querySelector(wrapper).appendChild(card);
        });
    }
};

export default showMoreStyles;