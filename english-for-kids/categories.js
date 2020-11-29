// const categories = [1, 2, 3, 4, 5, 6, 7, 8]

const categories = [
    {
        id: 'actionA',
        title: 'Action (set A)',
        image: 'assets/images/cards/actionA.jpg'
    },

    {
        id: 'actionB',
        title: 'Action (set B)',
        image: 'assets/images/cards/actionA.jpg'
    },

    {
        id: 'actionC',
        title: 'Action (set C)',
        image: 'assets/images/cards/actionA.jpg'
    },

    {
        id: 'adjective',
        title: 'Adjective',
        image: 'assets/images/cards/actionA.jpg'
    },

    {
        id: 'animalA',
        title: 'Animal (set A)',
        image: 'assets/images/cards/actionA.jpg'
    },

    {
        id: 'animalB',
        title: 'Animal (set B)',
        image: 'assets/images/cards/actionA.jpg'
    },

    {
        id: 'clothes',
        title: 'Clothes',
        image: 'assets/images/cards/actionA.jpg'
    },

    {
        id: 'emotions',
        title: 'Emotions',
        image: 'assets/images/cards/actionA.jpg'
    }
]

const container = document.getElementById('container');
console.log(container)
const newArr = [];
 categories.map(item => {
     console.log(item)
    const categoryElement = document.createElement('div');
    console.log(categoryElement)
    categoryElement.className = 'categories';
    categoryElement.id = item.id;
    categoryElement.innerHTML = item.title;
    newArr.push(categoryElement)
    console.log(newArr);

    container.appendChild(categoryElement);
    
    
})

console.log(container)