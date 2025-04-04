// Create Dynamic Category Section

// fetch load & display the catagory button on html-------
const loadFunction = () => {
  //   fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.log(error));
};
// category_id: '1001',
// category: 'Music'
// create display catagory
const displayCatagories = (categories) => {
  // track all the data from the API array---
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((item) => {
    console.log(item);
    const button = document.createElement("button");

    // write classList to add class instead of class.add cause i have to add "btn" class to all my button---

    button.classList = "btn";
    button.innerText = item.category;
    // add button to category container----
    categoryContainer.append(button);
  });
};
loadFunction();
