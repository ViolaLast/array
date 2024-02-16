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

        // Create an img element with src and alt attributes
        var $image = $('<img>').attr('src', url).attr('alt', altText).addClass('fetched-image');

        // Append the image to the imageWindow
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

    // Event listener for adding email to the dropdown
    $('#assignImageBtn').click(function () {
        var email = $('#emailInput').val();
        if (validateEmail(email)) {
            addToDropdown(email);
        } else {
            alert('Please enter a valid email address.');
        }
    });

    // Event listener for dropdown change
    $('#emailDropdown').change(function () {
        var selectedEmail = $(this).val();
        updateAssignedImagesDisplay(selectedEmail);
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

        var currentAltText = $imageWindow.find('img').attr('alt');

        // Check if the email is already present in the assignedImages list
        if (!assignedImages.some(item => item.email === email)) {
            // Check if the image with the same URL is already assigned to the email
            if (!assignedImages.some(item => item.email === email && item.imageUrl === currentImageUrl)) {
                if (currentImageUrl) {
                    var $image = $('<img>').attr('src', currentImageUrl).attr('alt', currentAltText).addClass('displayed-image');
                    $imgDisplay.append($('<p>').text('Selected Email: ' + email), $image);
                    assignedImages.push({ email: email, imageUrl: currentImageUrl });
                } else {
                    alert('No image available. Please find and assign an image first.');
                }
            } else {
                alert('Image already assigned to this email.');
            }
        } else {
            // If it's the same email, just add the image without displaying the email text
            if (currentImageUrl) {
                if (!assignedImages.some(item => item.email === email && item.imageUrl === currentImageUrl)) {
                    var $image = $('<img>').attr('src', currentImageUrl).attr('alt', currentAltText).addClass('displayed-image');
                    $imgDisplay.append($image);
                    assignedImages.push({ email: email, imageUrl: currentImageUrl });
                } else {
                    alert('Image already assigned to this email.');
                }
            } else {
                alert('No image available. Please find and assign an image first.');
            }
        }
    }

    // Function to update assigned images display
    function updateAssignedImagesDisplay(selectedEmail) {
        var $imgDisplay = $('#imgDisplay');
        $imgDisplay.empty();

        // Filter assigned images based on the selected email
        var filteredImages = assignedImages.filter(function (item) {
            return item.email === selectedEmail;
        });

        // Display the filtered images
        filteredImages.forEach(function (item) {
            var $image = $('<img>').attr('src', item.imageUrl).attr('alt', item.altText).addClass('displayed-image');
            $imgDisplay.append($('<p>').text('Selected Email: ' + selectedEmail), $image);
        });
    }

    // Function to add email to dropdown
    function addToDropdown(email) {
        var $emailDropdown = $('#emailDropdown');

        // Check if the email is already in the dropdown
        if ($emailDropdown.find('option[value="' + email + '"]').length === 0) {
            var $option = $('<option>').text(email).val(email);
            $emailDropdown.append($option);
            $emailDropdown.val(email);
            $('#emailInput').val('');
        } else {
            alert('Email address already selected.');
        }
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
