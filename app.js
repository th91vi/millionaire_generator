const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// pega usuario aleatorio e adiciona dinheiro
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    // construtor de usuarios
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

// dobra dinheiro de usuários
function doubleMoney(){
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
};

// adiciona novo objeto ao array data
function addData(obj){
    data.push(obj);

    updateDOM();
}

// atualiza o DOM
function updateDOM(providedData = data){
    // limpa div main
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}

//formata numero como dinheiro
function formatMoney(number) {
    // return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}

// event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);