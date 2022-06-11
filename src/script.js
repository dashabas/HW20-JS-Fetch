async function getAlbums() {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums');
    if (response.ok) {
        return response.json();
    } else {
        console.log('Error');
    }
}

async function getPhotos(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
    if (response.ok) {
        return response.json();
    } else {
        console.log('Error');
    }
}

const listAlbums = document.querySelector('.albums');
const listPhotos = document.querySelector('.photos');

function renderAlbums(albums) {
    listAlbums.innerHTML = albums.map(album =>
        `<li class="album_item" data-id="${album.id}">${album.id}. "${album.title}"</li>`).join('');
}

function renderGallery(photos) {
    listPhotos.innerHTML = photos.map(photo =>
        `<li class="photo_item" data-id="${photo.id}"><img src="${photo.url}" alt="col"></li>`).join('');
}

getAlbums()
    .then((albums) => renderAlbums(albums))
    .then(() => getPhotos(1)
        .then((photos) => renderGallery(photos)));

listAlbums.addEventListener('click', (event) => {
    getPhotos(event.target.dataset.id)
        .then((photos) => renderGallery(photos));
});