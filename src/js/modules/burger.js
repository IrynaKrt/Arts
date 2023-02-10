const burger = (menuSelector, burgerSelector, linksSelector) => {
    const menuElement = document.querySelector(menuSelector),
          burgerElement = document.querySelector(burgerSelector),
          links = document.querySelectorAll(linksSelector);
    
    menuElement.style.display = 'none';

    window.addEventListener('resize', () => {
        if (window.screen.width >= 991){
            menuElement.classList.remove('active');
            menuElement.style.display = 'none';
        }
    })

    burgerElement.addEventListener('click', () => {
        menuElement.classList.toggle('active');
        if(menuElement.classList.contains('active')) {
            menuElement.style.display = 'block';
        } else {
            menuElement.style.display = 'none';
        }
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            menuElement.classList.remove('active');
            menuElement.style.display = 'none';


        if(document.scrollHeight !== document.offsetHeight) {
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
        }
        })
    });

};

export default burger;