window.onload = function() {
    let results = JSON.parse(localStorage.getItem('results'));
    let resultDiv = document.getElementById('results');

    results.forEach(result => {
        let card = document.createElement('div');
        card.className = 'card';

        let img = document.createElement('img');
        img.src = result.pagemap.cse_image ? result.pagemap.cse_image[0].src : '';
        img.alt = result.title;
        card.appendChild(img);

        let title = document.createElement('h2');
        title.textContent = result.title;
        card.appendChild(title);

        let description = document.createElement('p');
        description.textContent = `Description: ${result.snippet}`;
        card.appendChild(description);

        let link = document.createElement('a');  // Create new anchor element
        link.href = result.link;  // Set href attribute to the result's link
        link.textContent = 'View More';  // Set the anchor text
        link.target = "_blank";   // Open in new tab
        card.appendChild(link);  // Append the anchor element to the card

        resultDiv.appendChild(card);
    });
}

document.getElementById('searchForm').addEventListener('submit', function(event){
    event.preventDefault();

    let cloth = document.getElementById('cloth').value;
    let color = document.getElementById('color').value;
    let brand = document.getElementById('brand').value; // added brand

    let query = `${cloth} ${color} ${brand}`; // added brand to the query

    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyCfTIJgyraAPohYyzkSnPJakFlNEXzD2cE&cx=1148ff606ea12418a&q=${query}&num=10`)
    .then(response => response.json())
    .then(data => {
        // Save data to localStorage
        localStorage.setItem('results', JSON.stringify(data.items));
        // Refresh the page to display new results
        location.reload();
    })
    .catch(error => console.error('Error:', error));
});
