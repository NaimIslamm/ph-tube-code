// Create Dynamic Category Section

// fetch load & display the catagory button on html-------
const loadCatagories = () => {
  //   fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.log(error));
};

// load video-----
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
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

// -------------------------------------------

const cardDemo = {
  category_id: "1003",
  video_id: "aaai",
  thumbnail: "https://i.ibb.co/kc8CCFs/30-rock.png",
  title: "30 Rock",
  authors: [
    {
      profile_picture: "https://i.ibb.co/YZN9rQZ/tina.jpg",
      profile_name: "Tina Fey",
      verified: false,
    },
  ],
  others: {
    views: "4.5K",
    posted_date: "14800",
  },
  description:
    "'30 Rock,' led by Tina Fey, is a comedy series that has garnered 4.5K views. The show is a witty and humorous take on the behind-the-scenes antics of a fictional live comedy show. With its sharp writing and unforgettable characters, '30 Rock' is perfect for fans of smart, satirical humor and engaging storylines.",
};

// ----------------------------------------

const displayVideos = (videos) => {
  const videosContainer = document.getElementById("video-container");
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact w-88";
    card.innerHTML = `<figure class="h-[200px]">
    <img class="w-full h=full object-center object-cover"
      src=${video.thumbnail} />
  </figure >
  <div class="px-0 py-5 flex gap-2">
    <div> <img class="w-10 h-10 rounded-full object-cover object-center" 
      src=${video.authors[0].profile_picture} /></div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-2"><p>${video.authors[0].profile_name}</p>
    <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png"/></div>
    
    <p>${video.others.views}</p>
    </div>
  </div>`;
    videosContainer.append(card);
  });
};
loadCatagories();
loadVideos();
