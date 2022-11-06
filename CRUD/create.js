import { navbar } from "./components/navbar.js";

let navbar_div = document.getElementById('navbar');
navbar_div.innerHTML = navbar();

// 987081d58d1fd9eeabf1109dfa4b3ef2 --> imgbb api key


//  add event handler to create post button
let create_btn = document.getElementById('create_btn');
create_btn.onclick = () => {
    // submiting a post to server
    createPost();
};


// event handler for delete post btn
let delete_btn = document.getElementById('delete_btn');
delete_btn.onclick = () => {
    deletePost();
};


// event handler for update post btn
let update_btn = document.getElementById('update_btn');
update_btn.onclick = () => {
    updatePost();
};


// add event handler on select file input
let input_img = document.getElementById('image');
input_img.onchange = () => {

    handleImage()
};


let image_url;

// function to get the url for local images
const handleImage = async () => {

    // where images are stored initially? --> locally
    // who can access that image? ==> only me
    // the goal is it should be accessible to --> all
    // is internet accessible to all? - yes
    // how everithing is accessible on net? --> URL
    // so we need a url for our image
    // imgbb will give us that.
    // provide the file, get back the url.

    // 1. accept the file(img)

    let img = document.getElementById('image');

    // 2. access the image data
    let actual_img = img.files[0];
    // console.log('actual_img', actual_img);

    // 3. imgbb is asking to send data in formdata object;
    let form = new FormData()

    form.append('image', actual_img);


    // lets make the post request


    let res = await fetch(`https://api.imgbb.com/1/upload?key=987081d58d1fd9eeabf1109dfa4b3ef2`, {

        method: 'POST',
        body: form,
    });

    let data = await res.json();
    console.log('data:', data)

    image_url = data.data.display_url;
    console.log('image_url', image_url)

}


const createPost = async () => {

    // 1. grab all the data

    let id = document.getElementById('id').value;
    let caption = document.getElementById('caption').value;

    // store all data to be sent in object
    let send_this_data = {
        id,
        caption,
        image_url,
    };

    //above data is accessible to whom? --> local
    // is it supposed to be accessible to everyone? --> yes
    // where above data should go? --? server [local server]

    // json-server package


    let res = await fetch('http://localhost:3000/posts', {

        method: 'POST',
        body: JSON.stringify(send_this_data),

        headers: {
            'Content-Type': 'application/json',
        },
    });


    let data = await res.json()
    console.log('data:',data);





}


// day2
const deletePost = async () => {

    let delete_id = document.getElementById('delete_id').value;

    // localhost:3000/posts/3
    let res = await fetch(`http://localhost:3000/posts/${delete_id}`, {

        method: 'DELETE',

        headers: {
            'Content-Type': 'application/json'
        }
    });

    let data = await res.json();
    console.log(data);

}

// PATCH request

const updatePost = async () => {

    try {
        let update_id = document.getElementById('updare_id').value;
        let new_caption = document.getElementById('update_caption').value;

        let send_this_data = {
           caption: new_caption
        }

        let res = await fetch(`http://localhost:3000/posts/${update_id}`, {

            method: 'PATCH',
            body: JSON.stringify(send_this_data),
            headers: {
                'Content-Type': 'application/json',
            },

        });

        let data = await res.json();
        console.log('data', data)
    }
    catch (err) {
        console.log('err:', err);
    }


}