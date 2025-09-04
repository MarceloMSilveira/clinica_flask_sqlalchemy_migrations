function getPreviosName(id) {
    console.log(id)
    const  h2Elemt = document.querySelector(`#${id}>h2`)
    const h2Text = h2Elemt.textContent
    const name = h2Text.slice(15,h2Text.length)
    return name
}

async function handleUpdateProf(nomeAnterior, novoNome) {
    console.log('test')
    const formData = new FormData();
    formData.append('name', nomeAnterior)
    formData.append('novoNome', novoNome)
    const result = await axios.post('/profissional/update',formData)
    window.location.reload()
}

async function handleClickProfissional(evt) {
    const clickedElmt = evt.target;
    const divProfissional = clickedElmt.parentElement.parentElement
    const id = divProfissional.getAttribute('id')
    const nomeAnterior = getPreviosName(id)

    if (clickedElmt.textContent === 'Apagar') {
        const formData = new FormData();
        const pureId = id.slice(6)
        formData.append('id', pureId)
        const result = await axios.post('/profissional/delete',formData)
        window.location.reload()
    } else if (clickedElmt.textContent === 'Editar') {
        divProfissional.removeEventListener('click', handleClickProfissional)
        divProfissional.innerHTML = `
        <form>
        <label for='newName'>Nome: </label>
        <input type='text' id='newName' placeholder="${nomeAnterior}" name='name' value='${nomeAnterior}'>
        <input type='submit' id='updateName'>
        </form>
        `
        document.querySelector('#updateName').addEventListener('click',async (evt) => {
            evt.preventDefault()
            console.log('test2')
            const novoNome = document.querySelector('#newName').value;
            await handleUpdateProf(nomeAnterior, novoNome);
        })
    }
}

function handleAdd(savedContent) {
    allDiv.innerHTML = savedContent;
    const newBtn = document.querySelector('button.new')
    newBtn.addEventListener('click',handleAddNewProfissional)
}

function handleAddNewProfissional() {
    
    const allDivSavedContent = allDiv.innerHTML

    const addNewProfForm = 
    `<form action='/profissionais' class='new-prof' method='post'>
        <label for='prof-name'>Nome: </label>
        <input type='text' id='prof-name' name='name' placeholder='Nome do profissional' required>
        <br>
        <label for='prof-email'>Email: </label>
        <input type='text' id='prof-email' name='email' placeholder='Email do profissional'>
        <div class='new-prof-btns'>
            <input type='submit' value='submit' />
            <input type='reset' value='reset' />
            <input type='button' value='cancel' />
        </div>
    </form>`
    allDiv.innerHTML = addNewProfForm

    const cancelBtn = document.querySelector("div.new-prof-btns>input[value='cancel']")
    cancelBtn.addEventListener('click', ()=>handleAdd(allDivSavedContent))
}

const allDiv = document.querySelector('div.all')
const newBtn = document.querySelector('button.new')
newBtn.addEventListener('click',handleAddNewProfissional)

const profDivs = document.querySelectorAll('div.profissional')
profDivs.forEach( div => div.addEventListener('click',handleClickProfissional))
