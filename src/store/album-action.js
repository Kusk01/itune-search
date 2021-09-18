import { albumActions } from "./album-slice";


var keys = {
    name: "im:name",
    image:"im:image",
    itemCount:"im:itemCount",
    price:"im:price",
    contentType:"im:contentType",
    right:"rights",
    title:"title",
    link:"link",
    id:"id",
    imId:"im:id",
    artist:"im:artist",
    category:"category",
    releaseDate:"im:releaseDate",
}

const category = [{type: "All", id: "All"}];

const setAlbumName = (nameObject, albumSet) => {
    albumSet.name = nameObject.label;
};

const setAlbumImages = (imageArray, albumSet) => {
    albumSet.images = []
    imageArray.forEach(oneImage => {
        if(oneImage.attributes.height === "55") {
            albumSet.images.push({
                smallImage: {
                    imageUrl: oneImage.label,
                    height: oneImage.attributes.height,
                    type: 'smallImage'
                }
            })
        }
        if(oneImage.attributes.height === "60") {
            albumSet.images.push({
                mediumImage: {
                    imageUrl: oneImage.label,
                    height: oneImage.attributes.height,
                    type: 'mediumImage'
                }
            })
        }
        if(oneImage.attributes.height === "170") {
            albumSet.images.push({
                largeImage: {
                    imageUrl: oneImage.label,
                    height: oneImage.attributes.height,
                    type: 'largeImage'
                }
            })
        }
    })
}

const setAlbumPrice = (priceObject, albumSet) => {
    albumSet.price = {
        amount: priceObject.attributes.amount,
        currency: priceObject.attributes.currency,
        label: priceObject.label
    }
}

const setAlbumTitle = (titleObject, albumSet) => {
    albumSet.title = titleObject.label;
}

const setAlbumReleaseDate = (dateObject, albumSet) => {
    albumSet.releaseDate = {
        calenderDate : dateObject.attributes.label,
        date: dateObject.label
    };
}

const setAlbumArtist = (artistObject, albumSet) => {
    albumSet.artist = {
        url: artistObject.attributes && artistObject.attributes.href ? artistObject.attributes.href : "",
        name: artistObject.label
    }
}

const setAlbumId = (idObject, albumSet) => {
    albumSet.id = {
        id: idObject.attributes[keys.imId],
        url: idObject.label
    }
}

const setCatergoryList = (categoryItem) => {

    let isPresentAlready;
    if (category.length > 0 ) {
        isPresentAlready = category.findIndex(item => item.id === categoryItem.id);
    }
    
    if(isPresentAlready > -1) {
        return;
    }  else {
        category.push({
            type: categoryItem.type,
            id: categoryItem.id
        });
    }
    
}

const setCatergory = (categoryObject, albumSet) => {
    albumSet.category = {
        type: categoryObject.attributes ? categoryObject.attributes.label : "",
        id: categoryObject.attributes? categoryObject.attributes[keys.imId]: "",
        term: categoryObject.attributes? categoryObject.attributes?.term: ""
    }

    setCatergoryList(albumSet.category);
}



const setUiData = (data) => {
    const albumList = data.feed.entry;
    const modifiedAlbumList = [];
    for(let i=0; i<albumList.length; i++) {
        const individualAlbum = albumList[i];
        var albumSet = {}
        for(const key in individualAlbum) {
            const oneAlbumInformation = individualAlbum[key];
            switch(key) {
                case keys.name: 
                    setAlbumName(individualAlbum[key], albumSet);
                break;
                case keys.image: 
                    setAlbumImages(individualAlbum[key], albumSet);
    
                break;
                case keys.itemCount: 
                break;
                case keys.price: 
                    setAlbumPrice(individualAlbum[key], albumSet);
                break;
                case keys.contentType: 
                break;
                case keys.title: 

                    setAlbumTitle(individualAlbum[key], albumSet);
                break;
                case keys.id: 
                    setAlbumId(individualAlbum[key], albumSet);
                break;
                case keys.artist: 
                    setAlbumArtist(individualAlbum[key], albumSet)
                break;
                case keys.releaseDate: 
                    setAlbumReleaseDate(individualAlbum[key], albumSet);
                break;
                case keys.category:
                    setCatergory(individualAlbum[key], albumSet);
            }  
        }
        albumSet.isFavorite = false;
        modifiedAlbumList.push(albumSet);
    }

    return modifiedAlbumList;
}

export const fetchAlbumData = () => {
    return async (dispatch) => {

        const fetchAlbumList = async() => {
            const response = await fetch("https://itunes.apple.com/us/rss/topalbums/limit=50/json");

            if(!response.ok) {
                throw new Error('Failed to fetch album data');
            }

            const albumData = await response.json();
            return albumData;
        }

        try {
            const data = await fetchAlbumList();
            const modifiedAlbumList = setUiData(data);
            dispatch(albumActions.setAlbumData(modifiedAlbumList));
            dispatch(albumActions.setCategoyList(category));
            dispatch(albumActions.setAuthorInformation(data));
        } catch(error) {
            console.log(error.message);
        }
    }
}