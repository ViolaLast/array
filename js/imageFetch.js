$(document).ready(function () {
    $('#findImageBtn').click(function () {
        fetchAndDisplayImage();
    });

    function fetchAndDisplayImage() {
        var image = new Image();
        image.onload = function () {
            displayImageInWindow(image.src);
        };
        image.onerror = function () {
            console.error('Error loading image.');
        };
        image.src = 'https://source.unsplash.com/random';
    }

    function displayImageInWindow(imageUrl) {
        var $imageWindow = $('#imageWindow');
        $imageWindow.empty();
        var $image = $('<img>').attr('src', imageUrl).addClass('fetched-image');
        $image.appendTo($imageWindow);
    }
});
