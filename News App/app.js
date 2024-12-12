const input = document.getElementById('inputField');
const cardDiv = document.getElementById('card-section');
const loader = document.getElementById('loader');

// Function to search for news
const search = () => {
    const query = input.value.trim();
    if (!query) {
        alert("Please enter a search term.");
        return;
    }

    const API_KEY = `https://newsapi.org/v2/everything?q=${query}&from=2024-11-07&sortBy=publishedAt&apiKey=c0d019045c294c61a8f4da4335fdeb28`;
    loader.style.display = 'block'; // Show the loader

    fetch(API_KEY)
        .then(response => response.json())
        .then((data) => {
            cardDiv.innerHTML = ''; // Clear previous results
            if (data.articles && data.articles.length > 0) {
                data.articles.forEach((e) => {
                    const imageUrl = e.urlToImage || 'https://via.placeholder.com/150'; // Default image if missing
                    const articleUrl = e.url || '#'; // Use the article URL or fallback to a dummy link

                    cardDiv.innerHTML += `
                                <div class="col-md-4 mb-4">
                                    <div class="card">
                                        <img src="${imageUrl}" class="card-img-top" alt="News Image">
                                        <div class="card-body">
                                            <h5 class="card-title">${e.title}</h5>
                                            <p class="card-text">${e.description || 'No description available'}</p>
                                            <a href="${articleUrl}" target="_blank" class="btn btn-primary">Read More</a>
                                        </div>
                                    </div>
                                </div>`;
                });
            } else {
                cardDiv.innerHTML = '<p class="text-center">No results found.</p>';
            }
        })
        .catch((err) => {
            console.error(err);
            cardDiv.innerHTML = '<p class="text-center text-danger">Failed to fetch news. Please try again later.</p>';
        })
        .finally(() => {
            loader.style.display = 'none'; // Hide the loader after the fetch is complete
        });
};