const quotes = [
    {content: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt"},
    {content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt"},
    {content: "Do not wait to strike till the iron is hot, but make it hot by striking.", author: "William Butler Yeats"},
    {content: "The best way to predict the future is to create it.", author: "Peter Drucker"},  
    {content: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
         author: "Albert Schweitzer"},
    {content: "The only way to do great work is to love what you do.", author: "Steve Jobs"},
    {content: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau"},
];

async function fetchQuote() {
    const quoteText = document.querySelector('.quote-text');
    const quoteAuthor = document.querySelector('.quote-author');

    quoteText.textContent = 'Loading';
    quoteAuthor.textContent = '';

    try {
        const quote = await new Promise((resolve) => {
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                resolve(quotes[randomIndex]);
            }, 1000); 
        });
        quoteText.textContent = quote.content;
        quoteAuthor.textContent = quote.author;

    }    catch (error) {
            console.error(error);
            quoteText.innerHTML`<span style="color: red;">An error occured while fetching the quote.</span>`;
        };

    }
document.getElementById('fetchQuoteButton').addEventListener('click', fetchQuote);
