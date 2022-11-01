const modalState = (state) => {
    const bildSize = document.querySelectorAll('#size'),
          bildMaterial = document.querySelectorAll('#material'),
          bildOptions = document.querySelectorAll('#options'),
          bildPromo = document.querySelectorAll('.promocode');


    function bindActionToElems (event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch(item.nodeName) {
                    case 'SPAN' :
                       state[prop] = i;
                        break;
                    case 'INPUT' :
                        state[prop] = item.value;
                        break;
                    case 'SELECT' :
                        state[prop] = item.value;
                        break;
                }

                console.log(state);
            });
        });
    }


   bindActionToElems('change', bildSize, 'size');
   bindActionToElems('change', bildMaterial, 'material');
   bindActionToElems('change', bildOptions, 'options');
   bindActionToElems('input', bildPromo, 'promocode');
};

export default modalState;
