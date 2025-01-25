window.onload = () => {
    // Get the video element
    const videoElement = document.getElementById('hack-video');

    // Listen for the 'ended' event on the video element
    videoElement.addEventListener('ended', async () => {
        // Initial animation and message setup
        document.getElementById('hack-animation').style.display = 'none';
        document.getElementById('message').classList.remove('hidden');
        typeText(document.getElementById('first-message'), 'You are hacked by Mustafa!', 100);

        // Wait for the first message animation to finish
        await delay(2000);

        // Show progress bar and fetch public IP
        document.getElementById('progress-bar-container').classList.remove('hidden');
        fetchPublicIP();

        // Wait for a second before displaying the next message
        await delay(1500);

        // Show the second message with random name
        document.getElementById('second-message').innerText = 'Your name is ' + getRandomName();
        await delay(2000); // Wait for a few seconds

        // Show the final message
        document.getElementById('final-message').innerText = 'Now I can see all your images!';
    });

    // Make the video play on page load and disable controls
    videoElement.play();
};

// Helper function to type text with delay (like a terminal typing effect)
function typeText(element, text, speed = 100) {
    let index = 0;
    const interval = setInterval(() => {
        element.innerHTML += text[index++];
        if (index === text.length) clearInterval(interval);
    }, speed);
}

// Helper function to fetch public IP using ipify API
function fetchPublicIP() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('ip-message').innerText = 'Your public IP is: ' + data.ip;
        })
        .catch(err => {
            console.error('Error fetching IP:', err);
            document.getElementById('ip-message').innerText = 'Failed to fetch IP.';
        });
}

// Helper function to generate a random name
function getRandomName() {
    const names = ['Ali'];  // List of names
    return names[Math.floor(Math.random() * names.length)];
}

// Helper function to introduce delay (for async/await)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
