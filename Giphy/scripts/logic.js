//giphy query
// api.giphy.com/v1/gifs/search?api_key=vFRSFWo6g7vJ7ZAjt3DMDolU52ORTxwH&q=iron man&limit=5
window.addEventListener('load', bindEvents);

function bindEvents() {
    // document.querySelector('#loading').className = 'hide'; //i.e. we add this hide class to the gif image at loading time
    document.querySelector('#btnSearch').addEventListener('click', doAjaxUsingFetch);
}

function doAjaxUsingFetch() {
    document.querySelector('#loading').classList.toggle('hide');

    var txt = document.querySelector('#txt').value;
    var url = `http://api.giphy.com/v1/gifs/search?api_key=vFRSFWo6g7vJ7ZAjt3DMDolU52ORTxwH&q=${txt}&limit=5`;
    console.log('url is', url);

    // var obj = {id:1001, name:'Ram',salary:9999};

    if (window.fetch) {

        // const options = {
        //     method:'POST',
        //     mode:'cors',
        //     cache:'no-cache',
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify(obj) // Convert Object into JSON
        // }
        //var promise = fetch(url,options);

        var promise = fetch(url);

        // promise.then(response => {
        //     response.json().then(data => {
        //         printImages(data);
        //     }).catch(err=>console.log('Invalid JSON ',err));
        // }).catch(err=>console.log('Server Call Error ',err))
        // .finally(()=> console.log('I Will Run Always '));


        promise.then(response => response.json().then(
            data => printImages(data)
        ).catch(err => console.log('Error ', err))
        )//then of promise ends
            .catch(err => console.log('Server Call Error ', err))
            .finally(() => console.log('I run always'));
    } else {
        console.log('Fetch is Not Supported in Ur Browser');
    }
}

function doAjax() {
    //use classList.toggle('className') instead of className
    //i.e. we add this hide class to the gif image at loading time
    document.querySelector('#loading').classList.toggle('hide');

    var txt = document.querySelector('#txt').value;
    var url = `http://api.giphy.com/v1/gifs/search?api_key=vFRSFWo6g7vJ7ZAjt3DMDolU52ORTxwH&q=${txt}&limit=5`;
    console.log('url is', url);
    var http = new XMLHttpRequest();
    //bind ready state event
    http.onreadystatechange = function () {
        console.log('States are', http.readyState, ' Status is', http.status);
        if (http.readyState == 4 && http.status == 200) {
            document.querySelector('#loading').classList.toggle('hide');//this will toggle off the event
            //parsing the response coming in form of JSON to the object
            var obj = JSON.parse(http.responseText);
            console.log('Object is ', obj);
            printImages(obj);
        }
    }
    //now we have to send the request in GET
    http.open('GET', url);
    http.send();

}

function createImage(url) {
    var image = document.createElement('img');
    //creating the arrtibute of img tag
    image.src = url;
    //dynamically add class name to the img tag
    image.className = 'size';
    return image;
}

function printImages(obj) {
    var div = document.querySelector('#result');
    //now from the JSON taking the array of the image urls
    div.innerHTML = ''; //removing the previous images before printing new images
    var arr = obj.data;
    //appending the images to the div
    arr.forEach(ele =>
        div.appendChild(createImage(ele.images.original.url)));

}