let gridEl;
let grid;
const col = 5;
const row = 2;
let randomSymbols;
let fCard = [];

const symbols = ['android', 'eco', 'favorite', 'grade', 'thumb_up'];

const init = () => {

    console.log('Started');
    gridEl = document.querySelector('#grid');

    randomSymbols = generateSymbols();
    grid = getGrid(col, row);


    console.table(grid);

    gridEl.addEventListener('click', ({ target }) => {
        const colIndex = parseInt(target.getAttribute('col-index'));
        const rowIndex = parseInt(target.getAttribute('row-index'));
        if (target.matches('.card-paired')) {
            return;
        }
        cardClicked(colIndex, rowIndex);
    });

    renderGrid();

};

const generateSymbols = () => {
    const doubledSymbols = [];
    symbols.forEach((symbol) => {
        doubledSymbols.push(symbol, symbol);
    });

    const shuffledSymbols = shuffle(doubledSymbols);
    console.log(shuffledSymbols);
    return shuffledSymbols;
};

const cardClicked = (colIndex, rowIndex) => {
    grid[rowIndex][colIndex].isVisible = true;
    fCard.push({r: rowIndex, c: colIndex});

    // Check if paired
    if (fCard.length === 2) {
        if (
            grid[fCard[0].r][fCard[0].c].symbol ===
            grid[fCard[1].r][fCard[1].c].symbol
        ) {
            grid[fCard[0].r][fCard[0].c].isPaired = true;
            grid[fCard[1].r][fCard[1].c].isPaired = true;
            fCard.splice(0, 2);
        }
        
    }
    // Re flipped if not paired
    if (fCard.length === 3) {
        grid[fCard[0].r][fCard[0].c].isVisible = false;
        grid[fCard[1].r][fCard[1].c].isVisible = false;
        fCard.splice(0, 2);
    }

    renderGrid();
};

const renderGrid = () => {
    console.log('renderGrid');
    let isWinning = true;

    const cardEls = [];
    for (let rowIndex = 0; rowIndex < row; rowIndex++) {
        for (let colIndex = 0; colIndex < col; colIndex++) {
            // console.log('obj', grid[rowIndex][colIndex]);
            if (grid[rowIndex][colIndex].isPaired === false) {
                isWinning = false;
            }
            const cardEl = createCard(grid[rowIndex][colIndex], colIndex, rowIndex);
            cardEls.push(cardEl);
        }
    }
    ;
    var divs = gridEl.querySelectorAll('.card');

    [].forEach.call(divs, function(div) {
        div.remove();
    });
    cardEls.forEach((c) => gridEl.append(c));
    if (isWinning === true) {
        document.querySelector('.play').style.display = 'block';
    
   
    }
};

const createCard = ({ isVisible, isPaired, symbol }, colIndex, rowIndex) => {
    const cardEl = document.createElement('div');
    cardEl.setAttribute('col-index', colIndex);
    cardEl.setAttribute('row-index', rowIndex);
    let cardClasses = 'card ';
    if (isVisible) {
        cardClasses += 'card-visible';
    } else {
        cardClasses += 'card-hidden';
    }
    if (isPaired) {
        cardClasses += ' card-paired';
    }
    cardEl.setAttribute('class', cardClasses);

    if (isVisible || isPaired) {
        const iconEl = document.createElement('span');
        iconEl.setAttribute('class', 'material-icons');
        iconEl.innerHTML = symbol;
        cardEl.append(iconEl);
    }
    
    return cardEl;
};

const getGrid = (col = 5, row = 2) => {
    let index = 0;
    const grid = [];
    
    for (let rowIndex = 0; rowIndex < row; rowIndex++) {
        grid[rowIndex] = [];
        for (let colIndex = 0; colIndex < col; colIndex++) {
            grid[rowIndex][colIndex] = {
                isVisible: false,
                isPaired: false,
                symbol: randomSymbols[index]
            };
            index++;
        }
    }
    return grid;
};


const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

window.onload = init;