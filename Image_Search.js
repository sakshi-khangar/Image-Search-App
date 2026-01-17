let page = 1;
let keyword = "";

function searchImage(){
    const input = document.getElementById("searchInput").value.trim();

    if(input === ""){
        alert("Please enter image keyword!");
        return;
    }

    document.getElementById("imageContainer").innerHTML = "";
    page = 1;
    keyword = input;
    getImages();
}

function showMoreImages(){
    page++;
    getImages();
}

function getImages(){
    const accessKey = "27oqJKAgWpOqi5OVekh9O-Nff_JNeyk5KAYFHk649pA";
    const perPage = 10;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=${perPage}`;

    fetch(url)
    .then(res => res.json())
    .then(data => { 
        const container = document.getElementById("imageContainer");

        if(data.results.length === 0 && page === 1){
            container.innerHTML = "<p>No images found</p>";
            document.getElementById("showMore").style.display = "none";
            return;
        }

        data.results.forEach(photo => {
            const card = document.createElement("div");
            card.classList.add("image-card");

            const img = document.createElement("img");
            img.src = photo.urls.small;
            img.alt = photo.alt_description || "Image";

            const desc = document.createElement("p");
            desc.textContent = photo.alt_description || "Beautiful image";

            card.appendChild(img);
            card.appendChild(desc);
            container.appendChild(card);
        });

        if(data.total_pages > page){
            document.getElementById("showMore").style.display = "block";
        } else {
            document.getElementById("showMore").style.display = "none";
        }
    })
    .catch(err => {
        console.error(err);
        alert("Error fetching images!");
    });
}