import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const containerDiv = document.createElement("div");
  const headlineDiv = document.createElement("div");
  const authorDiv = document.createElement("div");
  const imgDiv = document.createElement("div");
  const imgContent = document.createElement("img");
  const authorName = document.createElement("span");

  containerDiv.classList.add("card");
  headlineDiv.classList.add("headline");
  authorDiv.classList.add("author");
  imgDiv.classList.add("img-container");

  headlineDiv.textContent = article.headline;
  imgContent.src = article.authorPhoto;
  authorName.textContent = `By ${article.authorName}`;

  containerDiv.appendChild(headlineDiv);
  containerDiv.appendChild(authorDiv);
  authorDiv.appendChild(imgDiv);
  imgDiv.appendChild(imgContent);
  authorDiv.appendChild(authorName);

  containerDiv.addEventListener("click", function () {
    console.log(article.headline);
  });

  return containerDiv;
};

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  const target = document.querySelector(`${selector}`);

  axios
    .get("http://localhost:5000/api/articles")
    .then(({ data }) => {
      Object.keys(data.articles).map((key) => {
        data.articles[key].map((article) => {
          const card = Card(article);
          target.appendChild(card);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export { Card, cardAppender };
