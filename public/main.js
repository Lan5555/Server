const button = document.querySelector('.btn');
const result = document.querySelector('.result');

button.addEventListener('click', async() => {
    try{
        const res = await fetch('https://server-production-52fc.up.railway.app/');
        const data = await res.text();
        result.innerHTML = data;
    }catch(e){

    }
})