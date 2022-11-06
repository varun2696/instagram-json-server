

const append = (data, container) => {

    container.innerHTML = null;
    data.forEach(({caption, image_url}) => {

        let div = document.createElement('div');

    //    el =  {
    //         "id": "2",
    //         "caption": "my photo",
    //         "image_url": "https://i.ibb.co/HtqJxh8/IMG-20220330-WA0011.jpg"
    //       },
        let caption_p = document.createElement('p');
        caption_p.innerText = caption;
        
        let image = document.createElement('img');
        image.src = image_url;

        div.append(image, caption_p);
        container.append(div);
    });
};

export { append };