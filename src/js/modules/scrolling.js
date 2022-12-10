const scrolling = (upSelector) => {
    const upElem = document.querySelector(upSelector);
    window.addEventListener('scroll', () => {
        if(document.documentElement.scrollTop > 1650) { 
            //тогл будет работать немного некорректно, тк будет срабатывать на любой скролл
            upElem.classList.add('animated', 'fadeIn');
            upElem.classList.remove('fadeOut');
        } else {
            upElem.classList.add('fadeOut');
            upElem.classList.remove('fadeIn');
        }
    });

    //Scrolling with RAF
    let links = document.querySelectorAll('[href^="#"]'), //^находится в самом начале
        speed = 0.3;

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            let widthTop = document.documentElement.scrollTop,
                hash = this.hash,
                toBlock = document.querySelector(hash).getBoundingClientRect().top,
                start = null;

            requestAnimationFrame(step);

            function step(time) {
                if(start === null) {
                    start = time;
                }

                let progress = time - start,
                    r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : 
                    Math.min(widthTop + progress/speed, widthTop + toBlock));

                document.documentElement.scrollTo(0, r);

                if(r != widthTop + toBlock) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }

        });
    });
    
    //чистый js
    // const element = document.documentElement,
    //       body = document.body;

    // const calcScroll = () => { // плавный скрол к лэндингам
    //     upElem.addEventListener('click', function(event) { 
    //         let scrollTop = Math.round(body.scrollTop || element.scrollTop);

    //         if(this.hash !== '') {
    //             event.preventDefault();
    //             let hashElement = document.getElementById(this.hash.substring(1)),
    //                                         //querySelektor(this.hash)
    //                 hashElementTop = 0;

    //             while(hashElement.offsetParent){//относительно которого спозиционирован
    //                 hashElementTop += hashElement.offsetTop;
    //                 hashElement = hashElement.offsetParent;
    //             }  

    //             hashElementTop = Math.round(hashElementTop);
    //             smoothScroll(scrollTop, hashElementTop, this.hash);
    //         }
    //     });
    // }; 
};

export default scrolling;