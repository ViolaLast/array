// Event listener for finding and displaying a new image
$('#findImageBtn').click(function () {
    fetchAndDisplayImage();
});

// Event listener for adding email to the dropdown
$('#assignImageBtn').click(function () {
    var email = $('#emailInput').val();
    if (validateEmail(email)) {
        assignImageToEmail(email);
    } else {
        alert('Please enter a valid email address.');
    }
});

// Function to validate email
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Function to assign email to dropdown
function assignImageToEmail(email) {
    // Add the validated email to the selection list
    var $emailDropdown = $('#emailDropdown');
    var $option = $('<option>').text(email).val(email);
    $emailDropdown.append($option);

    // Optional: Select the newly added email for convenience
    $emailDropdown.val(email);

    // Clear the input field for the next email
    $('#emailInput').val('');
}

// Event listener for adding the current image to the imgDisplayer
$('#btnAddImage').click(function () {
    var selectedEmail = $('#emailDropdown').val();
    if (selectedEmail !== 'Please select your email') {
        addImageToDisplay(selectedEmail);
    } else {
        alert('Please select an email first.');
    }
});

// Function to add the current image to the imgDisplayer
function addImageToDisplay(selectedEmail) {
    var $imgDisplay = $('#imgDisplay');
    var $imageWindow = $('#imageWindow');

    var currentImageUrl = $imageWindow.find('img').attr('src');

    if (currentImageUrl) {
        var $image = $('<img>').attr('src', currentImageUrl).addClass('displayed-image');
        $imgDisplay.append($('<p>').text('Selected Email: ' + selectedEmail), $image);
    } else {
        alert('No image available. Please find and assign an image first.');
    }
}

// Fetch and display a new image on the load of the page
fetchAndDisplayImage();

// Function to fetch and display an image
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

// Function to display an image in the imageWindow
function displayImageInWindow(imageUrl) {
    var $imageWindow = $('#imageWindow');
    $imageWindow.empty();
    var $image = $('<img>').attr('src', imageUrl).addClass('fetched-image');
    $image.appendTo($imageWindow);
}
