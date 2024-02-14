$(document).ready(function () {
    var assignedImages = [];
    var currentImageUrl; // Variable to store the current image URL

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

    // Event listener for adding the current image to the imgDisplayer
    $('#btnAddImage').click(function () {
        var selectedEmail = $('#emailDropdown').val();
        if (selectedEmail !== 'Please select your email') {
            assignImageToEmail(selectedEmail);
            // Fetch and display a new image in imageWindow
            fetchAndDisplayImage();
        } else {
            alert('Please select an email first.');
        }
    });

    // Function to validate email
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
// Function to assign email to dropdown and display image
function assignImageToEmail(email) {
    var $imgDisplay = $('#imgDisplay');
    var $imageWindow = $('#imageWindow');

    // Get the current image URL from imageWindow
    var currentImageUrl = $imageWindow.find('img').attr('src');

    if (currentImageUrl) {
        var $image = $('<img>').attr('src', currentImageUrl).addClass('displayed-image');
        $imgDisplay.append($('<p>').text('Selected Email: ' + email), $image);
        assignedImages.push({ email: email, imageUrl: currentImageUrl });
    } else {
        alert('No image available. Please find and assign an image first.');
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

    // Function to fetch and display an image
    function fetchAndDisplayImage() {
        var image = new Image();
        image.onload = function () {
            currentImageUrl = image.src; // Store the current image URL
            displayImageInWindow(currentImageUrl);
        };
        image.onerror = function () {
            console.error('Error loading image.');
        };
        image.src = 'https://source.unsplash.com/random';
    }

    // Function to display an image in the imageWindow
    function displayImageInWindow(imageUrl) {
        var $imageWindow = $('#imageWindow');
        $imageWindow.empty();
        var $image = $('<img>').attr('src', imageUrl).addClass('fetched-image');
        $image.appendTo($imageWindow);
    }

    // Fetch and display a new image on the load of the page
    fetchAndDisplayImage();
});
