console.log('Desde Public js')



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const mess1 = document.querySelector('#mess-1')
const mess2 = document.querySelector('#mess-2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = searchElement.value
    mess1.textContent = 'Loading...'
    mess2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((Response) => {
        Response.json().then((data) => {
            if  (data.error) {
                mess1.textContent =  'Error de datos'
                mess2.textContent = ''
            } else {
                mess1.textContent = data.location
                mess2.textContent = data.forecast
            }
        })
    })

})
