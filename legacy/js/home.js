document.getElementById('searchBtn').addEventListener('click', function() {
    const query = document.getElementById('search').value;

    fetch(`/api/search?query=${query}`)
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = ''; // Clear previous results
        data.forEach(restaurant => {
            const restaurantDiv = document.createElement('div');
            restaurantDiv.innerHTML = `
                <h3>${restaurant.name}</h3>
                <p>Rating: ${restaurant.rating}</p>
                <p>Price: ${restaurant.price}</p>
                <p>Reviews: ${restaurant.reviews}</p>
                <p>Location: ${restaurant.location}</p>
            `;
            resultsDiv.appendChild(restaurantDiv);
        });
    })
    .catch(error => console.error('Error:', error));
});