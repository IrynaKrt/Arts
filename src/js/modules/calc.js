import { getResource } from "../services/request";

const calc = (state) => {
    const sizeBlock = document.querySelector('#size'),
	 materialBlock = document.querySelector('#material'),
	 optionsBlock = document.querySelector('#options'),
	 resultBlock = document.querySelector('.calc-price'),
	 promocodeBlock = document.querySelector('.promocode'),
     headBlock = document.querySelector('.calc-form'),
     uploadBtn = document.querySelectorAll('[name="upload"]');


    let sum = 0;
    
    const calcFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value == '' || materialBlock.value == '') {
            resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
        } else if (promocodeBlock.value === 'IWANTPOPART') {
            resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
        }
    };

    const allPromocode = {
        promo : 'IWANTPOPART'
    };

    promocodeBlock.addEventListener('input', () => {
       if (promocodeBlock.value === allPromocode.promo) {
        state.promo = allPromocode.promo;
       } else {
        state.promo = promocodeBlock.value;
       }
    });
       
        headBlock.addEventListener('click', (e)=>{
            const event = e.target;               
            switch(event.id) {
                case 'size':
                    if(+sizeBlock.value == 500) {
                        state.size = '40x50';
                    }
                    if(+sizeBlock.value == 1000) {
                        state.size = '50x70';
                    }
                    if(+sizeBlock.value == 1500) {
                        state.size = '70x70';
                    }
                    if(+sizeBlock.value == 2000) {
                        state.size = '70x100';
                    }
                    state.totalPrice = sum;
                    break;
 
                case 'material':
                    if(+materialBlock.value == 1) {
                        state.material = 'Холст из волокна';
                    }
                    if(+materialBlock.value == 1.2) {
                        state.material = 'Льняной холст';
                    }
                    if(+materialBlock.value == 1.5) {
                        state.material = 'Холст из натурального хлопка';
                    }
                    state.totalPrice = sum;
                    break;
                case 'options':
                    if(+optionsBlock.value == 0) {
                        state.options = '';
                    }
                    if(+optionsBlock.value == 1000) {
                        state.options = 'Покрытие арт-гелем';
                    }
                    if(+optionsBlock.value == 2000) {
                        state.options = 'Экспресс-изготовление';
                    }
                    if(+optionsBlock.value == 500) {
                        state.options = 'Доставка готовых работ';
                    }
                    state.totalPrice = sum;
                    break;
            }
        });
    const cleareInputs = () => {
        sizeBlock.value = 'Выберите размер картины';
        materialBlock.value = 'Выберите материал картины';
        optionsBlock.value = 'Выберите материал картины';
        promocodeBlock.value = '';
    };
      
    sizeBlock.addEventListener('change', calcFunc);
    materialBlock.addEventListener('change', calcFunc);
    optionsBlock.addEventListener('change', calcFunc);
    promocodeBlock.addEventListener('input',  calcFunc);

    uploadBtn.forEach(item => {
        item.addEventListener('submit', cleareInputs);
    });
};

export default calc;