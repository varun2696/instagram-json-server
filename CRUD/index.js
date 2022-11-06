import { navbar } from "./components/navbar.js";

let navbar_div = document.getElementById('navbar');
navbar_div.innerHTML = navbar();

import { append } from "./scripts/append.js";


let posts_div = document.getElementById('posts');

const getData = async () => {

    let res = await fetch('http://localhost:3000/posts')

    let data = await res.json()

    // append(data, posts_div);
    createButton(data.length, 2);
};

getData();

let buttons_div = document.getElementById('buttons');

const createButton = (total_images, images_per_page) =>{

    const buttons = Math.ceil(total_images / images_per_page);
     
    for(let i=1; i<=buttons; i++)
    {
       let btn = document.createElement('button');
       
    //    we need to know which button user clicked

    // identity
    btn.id= i;

    // naming
    btn.innerText = i;

    btn.onclick = () =>{
        console.log(i);
    };

    buttons_div.append(btn);


    }
}

const getPaginatedData = async (clicked_btn, limit) => {

    let res = await fetch(``);

    let data = await res.json();

    append(data, posts_div);
}


// https://powerful-depths-64564.herokuapp.com/posts