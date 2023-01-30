
export async function getQuote(cb) {
    var url = "https://api.quotable.io/random?limit=10";
    fetch(url, { method: "GET" }) // Call the fetch function passing the url of the API as a parameter
        .then((res) => res.json())
        .then(function (res) {
            console.log(res);
            cb(res);
            // Your code for handling the data you get from the API
        })
        .catch(function () {
            cb({ content: "Idk" });
            // This is where you run code if the server returns any errors
        });
}
