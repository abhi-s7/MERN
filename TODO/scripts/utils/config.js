const BASE_PATH = 'http://127.0.0.1:5500/';
//we are specifying base path here as currently our machine is local 
//when we deploy it to the server then path becomes different
const config = {
    autoincrementstartvalue: 1000,
    url: {},
    paths: {
        images: {//these all are objects
            edit: 'images/edit.png',//key value pair
            trash: 'images/trash.png'
            // edit: `${BASE_PAth}images/edit.png`,
            // trash: `${BASE_PAth}images/trash.png`
        },
        video: {

        },
        audio: {

        }//we don't need to specify ',' for last object 
    }
}