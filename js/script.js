$(document).ready(function () {
    var assignedImages = [];
    var currentImageUrl; // Variable to store the current image URL

    // Unsplash API key
    const apiKey = 'XWChz20hpoJGflwDD5eaBDIyvG_tl1ZxU42R9uICSvs';
    const apiURL = `https://api.unsplash.com/photos/random?client_id=XWChz20hpoJGflwDD5eaBDIyvG_tl1ZxU42R9uICSvs`;

    // Function to fetch data from the Unsplash API
    function fetchData(url) {
        return fetch(url)
            .then(response => response.json())
            .catch(error => console.error('Could not fetch data:', error));
    }

    // Function to generate and display an image
    function generateImage(url, altText) {
        var $imageWindow = $('#imageWindow');
        $imageWindow.empty();

        var $image = $('<img>').attr('src', url).addClass('fetched-image');
        $image.appendTo($imageWindow);
    }

    // Function to fetch and display an image
    function fetchAndDisplayImage() {
        fetchData(apiURL)
            .then(data => {
                // Check if 'urls' and 'small' properties exist in the data
                if (data.urls && data.urls.small) {
                    currentImageUrl = data.urls.small;
                    generateImage(currentImageUrl, data.alt_description);
                } else {
                    console.error('Invalid image data received:', data);
                }
            });
    }

    // Event listener for finding and displaying a new image
    $('#findImageBtn').click(function () {
        fetchAndDisplayImage();
    });


    // Event listener for finding and displaying a new image
    $('#findImageBtn').click(function () {
        fetchAndDisplayImage(apiURL);
    });

    // Event listener for adding email to the dropdown
    $('#assignImageBtn').click(function () {
        var email = $('#emailInput').val();
        if (validateEmail(email)) {
            addToDropdown(email);
        } else {
            alert('Please enter a valid email address.');
        }
    });

    // Event listener for adding the current image to the imgDisplayer
    $('#btnAddImage').click(function () {
        var selectedEmail = $('#emailDropdown').val();
        if (selectedEmail !== 'Please select your email') {
            assignImageToEmail(selectedEmail);
        } else {
            alert('Please select an email first.');
        }
    });

    // Function to validate email
    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Function to assign email to dropdown and display image
    function assignImageToEmail(email) {
        var $imgDisplay = $('#imgDisplay');
        var $imageWindow = $('#imageWindow');

        var currentImageUrl = $imageWindow.find('img').attr('src');

        if (currentImageUrl) {
            var $image = $('<img>').attr('src', currentImageUrl).addClass('displayed-image');
            $imgDisplay.append($('<p>').text('Selected Email: ' + email), $image);
            assignedImages.push({ email: email, imageUrl: currentImageUrl });
        } else {
            alert('No image available. Please find and assign an image first.');
            return;
        }
    }

    // Function to add email to dropdown
    function addToDropdown(email) {
        var $emailDropdown = $('#emailDropdown');
        var $option = $('<option>').text(email).val(email);
        $emailDropdown.append($option);
        $emailDropdown.val(email);
        $('#emailInput').val('');
    }

    // Fetch and display a new image on the load of the page
    fetchAndDisplayImage(apiURL);

    // Function to display an image in the imageWindow
    function displayImageInWindow(imageUrl) {
        var $imageWindow = $('#imageWindow');
        $imageWindow.empty();
        var $image = $('<img>').attr('src', imageUrl).addClass('fetched-image');
        $image.appendTo($imageWindow);
    }
});
