import { postData } from "../services/request";

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = "5px solid pink";
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .4)";
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = "none";
        if (item.closest('.calc-form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else if('.begin'){
            item.closest('.file_upload').style.backgroundColor = "#f7e7e6";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    const clearInputs = () => {
            fileInputs.forEach(item => {
                item.value = '';
            });
            fileInputs.forEach(item => {
                item.previousElementSibling.textContent = "Файл не выбран";
            });
        };

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            const arr = input.files[0].name.split('.');

            if(arr[0].length > 6) {
                dots = "...";
            } else {
                dots = '.';
            } 
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;

            if(input.closest('.main')){
                
                const formData = new FormData();
                formData.append('file', input.files[0]);

                postData('assets/server.php', formData)
                    .then(result => {
                        console.log(result);
                    })
                    .catch(() => {
                        console.log('Error');
                    })
                    .finally(() => {
                        setTimeout(clearInputs(), 2000);
                        
                    });
            }
        });
    });

};

export default drop;