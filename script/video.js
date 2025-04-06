// Create Dynamic Category Section

// fetch load & display the catagory button on html------------------------
const loadCatagories = () => {
  //   fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.log(error));
};

// load video---------------------------------------------------------------
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};
// load video by clicking categories---------------
const loadCatagoriesVideo = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // shbar active class remove kro
      removeActiveClass();
      // loadCatagoriesVideo() click hole id class k active koro
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

// load details------------------------------------------------------------
const loadDetails = async (videoData) => {
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoData}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
};
const displayDetails = (detailsData) => {
  const detailContainer = document.getElementById("modal-content");
  detailContainer.innerHTML = `
  <img src="${detailsData.thumbnail}"/>
  <p>${detailsData.description}</p>`;
  // way-1
  document.getElementById("showModalData").click();
};
// display the time---------------------------------------------------------

function getTime(time) {
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  let minute = parseInt(remainingSecond % 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hour ${minute}minute ${remainingSecond} second ago`;
}
// display the time--------------------------------------------------------

// remove active class-----------------------------------------------------
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  console.log(buttons);
  for (const btn of buttons) {
    btn.classList.remove("active");
  }
};
// remove active class-----------------------------------------------------

// category_id: '1001',
// category: 'Music'

// create display catagory-------------------------------------------------

const displayCatagories = (categories) => {
  // track all the data from the API array---
  const categoryContainer = document.getElementById("category-container");

  // loop-----
  categories.forEach((item) => {
    console.log(item);
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCatagoriesVideo(${item.category_id})" class="btn category-btn">${item.category}</button>`;
    categoryContainer.append(buttonContainer);
    // ekhane jehetu btn click hobe tai ekhane onclick dewar jnno button banate hbe...eivabe dewa jaccena tai Comment-out korlam...

    // const button = document.createElement("button");

    // // write classList to add class instead of class.add cause i have to add "btn" class to all my button---

    // button.classList = "btn";
    // button.innerText = item.category;
    // // add button to category container----
    // categoryContainer.append(button);
  });
};

// -----------------------------------------------------------------------

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
  // eta""dewar ane hcce empty kore dewa holo/empty video, clear kore debe,click hole oi related video show korbe by id--
  videosContainer.innerHTML = "";

  // ekhn j khane click korle API theke kono data pabena sei click a no content command show korte hbe-----

  if (videos.length === 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `<div class="min-h-[300px] flex flex-col gap-5 justify-center items-center"><img src="assets/icon.png" /><h2 class="text-center text-xl font-bold">No Content here in this Category</h2></div>`;
  } else {
    videosContainer.classList.add("grid");
  }
  // loop---
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact w-88";
    card.innerHTML = `<figure class="h-[200px] relative">
    <img class="w-full h=full object-center object-cover"
      src=${video.thumbnail} />
      ${
        video.others.posted_date?.length === 0
          ? ""
          : ` <span class="absolute right-2 bottom-2 bg-black text-xs text-white rounded p-1"> ${getTime(
              video.others.posted_date
            )}    </span>`
      }
     </figure >
  
    <div class="px-0 py-5 flex gap-2">
    <div> <img class="w-10 h-10 rounded-full object-cover object-center" 
      src=${video.authors[0].profile_picture} />
      </div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-2"><p>${video.authors[0].profile_name}</p>
   ${
     video.authors[0].verified === true
       ? `<img
         class="w-5"
         src='https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png'
       />`
       : ""
   }</div>
    
    <p>${video.others.views}</p>
    <p><button onclick="loadDetails('${
      video.video_id
    }')" class="btn btn-sm btn-error">Details</button></p>
  
    </div>
  </div>`;
    videosContainer.append(card);
  });
};
loadCatagories();
loadVideos();
