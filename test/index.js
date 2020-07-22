const input = document.getElementById('name_input')

const initialValue = input.value

input.addEventListener('input', (e)=>{
    input.className = e.target.value !== initialValue ? 'red' : ''
})