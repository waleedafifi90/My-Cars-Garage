'use strict';

var table = document.getElementById('resultTable');
var mainForm = document.getElementById('mainForm');
var manufacurerList = document.getElementById('manufacurerList');
table.addEventListener('click', removeFromCar);

Car.allCars = [];

var car = new Car([]);

function Car(model, year, price, manufacturer) {
    this.model = model;
    this.year = year;
    this.price = price;
    this.manufacturer = manufacturer;
    Car.allCars.push(this);
}

Car.prototype.removeItem = function(item) {
    this.splice(item, 1);
};

function generateRandomePrice(min, max) {
    return Math.floor(Math.random() * max - min + 1) + min;
}


function papulateCarsModel() {
    var carModelArray = ['Germany', 'korea', 'Japan', 'France', 'USA'];

    for(var i = 0; i < carModelArray.length; i++) {
        var option = document.createElement('option');
        option.textContent = carModelArray[i];
        option.setAttribute('value', carModelArray[i]);
        manufacurerList.appendChild(option);
    }
}


function renderCars() {
    
    var carsArray = JSON.parse(localStorage.getItem('cars'));

    for(var i = 0; i < carsArray.length; i++) {
        var tr = document.createElement('tr');

        var xTD = document.createElement('td');
        xTD.classList.add('remover');
        xTD.textContent = 'x';
        xTD.id = i;
        tr.appendChild(xTD);

        var mTD = document.createElement('td');
        mTD.textContent = carsArray[i].model;
        tr.appendChild(mTD);

        var yTD = document.createElement('td');
        yTD.textContent = carsArray[i].year;
        tr.appendChild(yTD);
        
        var pTD = document.createElement('td');
        pTD.textContent = carsArray[i].price;
        tr.appendChild(pTD);

        var manTD = document.createElement('td');
        manTD.textContent = carsArray[i].manufacturer;
        tr.appendChild(manTD);

        table.appendChild(tr);
    }
}

function renderTableHead() {
    var thead = document.createElement('thead');
    table.appendChild(thead);

    var tr = document.createElement('tr');
    thead.appendChild(tr);

    var removerTH = document.createElement('th');
    tr.appendChild(removerTH);

    var modelTH = document.createElement('th');
    modelTH.textContent = 'Car Model';
    tr.appendChild(modelTH);

    var yearTH = document.createElement('th');
    yearTH.textContent = 'Model Year';
    tr.appendChild(yearTH);

    var priceTH = document.createElement('th');
    priceTH.textContent = 'Price';
    tr.appendChild(priceTH);

    var manufactrurTH = document.createElement('th');
    manufactrurTH.textContent = 'Car Manufatrur';
    tr.appendChild(manufactrurTH);
}

mainForm.addEventListener('submit', handelSubmit);
function handelSubmit(event) {
    event.preventDefault();
    var model = document.getElementById('carModel').value;
    var year = document.getElementById('carYear').value;
    var manufacturer = document.getElementById('manufacurerList').value;

    var price = generateRandomePrice(70000, 100000);
    new Car(model, year, price, manufacturer);
    localStorage.setItem('cars', JSON.stringify(Car.allCars));

    renderCars();
}

function removeFromCar(event) {
    if (event.target.classList.contains('remover')) {
        car.removeItem(parseInt(event.target.id));
    }
}

papulateCarsModel()
renderTableHead();
renderCars();