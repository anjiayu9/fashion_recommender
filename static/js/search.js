document.getElementById('searchForm').addEventListener('submit', function(event){
    event.preventDefault();

    let cloth = document.getElementById('cloth').value;
    let color = document.getElementById('color').value;
    let brand = document.getElementById('brand').value;

    let query = `${cloth} ${color} ${brand}`;

    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCfTIJgyraAPohYyzkSnPJakFlNEXzD2cE&cx=1148ff606ea12418a&q=${query}&num=10`)
    .then(response => response.json())
    .then(data => {
        // Save data to localStorage
        localStorage.setItem('results', JSON.stringify(data.items));
        // Redirect to display.html
        window.location.href = './display.html';
    })
    .catch(error => console.error('Error:', error));
});
