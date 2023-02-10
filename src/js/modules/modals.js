const modals = () => {
    let btnPressed; //отслеживание любых нажатий
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              giftTrigger = document.querySelector('.fixed-gift'),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;// значит пользователь кликнул

                if(destroy) { // удаление элемента со страницы
                    item.remove();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn'); // ссс анимация!
                });
    
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
                giftTrigger.style.right = `${(+getComputedStyle(giftTrigger).right.replace(/\D/g, '') + calcScroll())}px`;
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
            giftTrigger.style.right = '';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = ""; 
                document.body.style.marginRight = `0px`;
                giftTrigger.style.right = '';
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = "block";
                }
            });

            if (!display) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = "hidden";
                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector){
        window.addEventListener('scroll', () => { //проверка долистал ли пользователь до конца страницы
            if(!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= 
                document.documentElement.scrollHeight)) {
                    document.querySelector(selector).click(); //вызов события вручную!
                }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.styles-block a', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    showModalByTime('.popup-consultation',60000);
};

export default modals;