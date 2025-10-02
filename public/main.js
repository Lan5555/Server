const button = document.querySelector('.btn');
const result = document.querySelector('.result');

button.addEventListener('click', async() => {
    try{
        const res = await fetch('/api/get-hidden-item');
        const data = res.text();
        result.innerHTML = data;
    }catch(e){

    }
})