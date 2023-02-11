const filter = () => {
    const  menu = document.querySelector('.portfolio-menu'),
           items = menu.querySelectorAll('li'),
           wrapper = document.querySelector('.portfolio-wrapper'),
           markAll = wrapper.querySelectorAll('.all'),
           no = document.querySelector('.portfolio-no');

    const typeFilter = (markType) => {
        markAll.forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        });

        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');
        
        if(markType) {
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        }
    };



    menu.addEventListener('click', (e) => { 
        let target = e.target;
        let classSelect = target.classList[0];
        let allElems = wrapper.querySelectorAll(`.${classSelect}`);
        typeFilter(allElems);

        if(target && target.tagName == "LI") {//делегирование и назначение класса активности
            items.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
        }

        if(target.classList.contains('grandmother') || target.classList.contains('granddad')) {
            no.style.display = 'block';
            no.classList.remove('animated', 'fadeIn');
        } else {
            no.style.display = 'none';
            no.classList.remove('animated', 'fadeIn');
        }
    });
};

export default filter;