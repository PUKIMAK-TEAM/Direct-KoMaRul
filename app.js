// app.js - Main application logic

document.addEventListener('DOMContentLoaded', function() {
    // DOM References
    const appContainer = document.getElementById('app');
    const videoTemplate = document.getElementById('video-template');
    const welcomeOverlay = document.getElementById('welcome-overlay');

    // Current video index
    let currentVideoIndex = 0;

    // First time user check
    // const isFirstTime = !localStorage.getItem('hasVisitedBefore');
    const isFirstTime = true;
    if (!isFirstTime) {
        welcomeOverlay.style.display = 'none';
    }

    // Close welcome overlay
    document.querySelector('.howto-close').addEventListener('click', function() {
        welcomeOverlay.style.display = 'none';
        localStorage.setItem('hasVisitedBefore', 'true');

        // Start playing the video after tutorial is closed
        const video = document.querySelector('.video');
        if (video) video.play();
    });

    // Initialize the app
    initializeApp();

    /**
     * Initialize the video player application
     */
    function initializeApp() {
        // Load the first video
        loadVideo(currentVideoIndex);

        // Set up swipe detection for mobile
        setupSwipeDetection();

        // Add navigation buttons for desktop
        addNavigationButtons();

        // Add keyboard navigation
        setupKeyboardNavigation();
    }

    /**
     * Load a video by index
     * @param {number} index - The index of the video to load
     */
    function loadVideo(index) {
        // Clear existing content
        appContainer.innerHTML = '';

        // Get the video data
        const videoData = videos[index];

        // Clone the template
        const videoElement = videoTemplate.content.cloneNode(true);

        // Set video source
        const video = videoElement.querySelector('.video');
        video.src = videoData.videoSrc;

        // Set likes and shares count
        const likesElement = videoElement.querySelector('.likes');
        const sharesElement = videoElement.querySelector('.shares');

        likesElement.textContent = formatCount(videoData.likes);
        likesElement.dataset.likes = videoData.likes;
        sharesElement.textContent = videoData.shares;

        // Get comments for this video
        const comments = videoComments[videoData.id];
        const commentsCountElement = videoElement.querySelector('.comments');
        commentsCountElement.textContent = comments.length;

        // Append to container
        appContainer.appendChild(videoElement);

        // Setup event listeners for the new video
        setupVideoEventListeners(videoData.id);
    }

    /**
     * Format a count for display (e.g., 1000 -> 1K)
     * @param {number} count - The count to format
     * @return {string} - The formatted count
     */
    function formatCount(count) {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1) + 'M';
        } else if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K';
        } else {
            return count.toString();
        }
    }

    /**
     * Set up event listeners for video playback and controls
     * @param {number} videoId - The ID of the current video
     */
    function setupVideoEventListeners(videoId) {
        const video = document.querySelector('.video');
        const duration = document.querySelector('.progress-duration');
        const range = document.querySelector('.progress-range');
        const bar = document.querySelector('.progress-bar');
        const commentsIcon = document.querySelector('.comments-icon');
        const commentsContainer = document.querySelector('.comments-container');
        const closeComments = document.querySelector('.comments-head-close');
        const likesIcon = document.querySelector('.likes-icon');
        const likes = document.querySelector('.likes');

        // Load comments for this video
        loadComments(videoId);

        // Video time update
        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('canplay', updateProgress);

        // Progress bar click
        range.addEventListener('click', setProgress);

        // Comments toggle
        commentsIcon.addEventListener('click', function() {
            activateComments();
        });

        // Close comments
        closeComments.addEventListener('click', function() {
            deactivateComments();
        });

        // Video click (close comments)
        video.addEventListener('click', function() {
            if (commentsContainer.classList.contains('comments-active')) {
                deactivateComments();
            } else {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            }
        });

        // Like video
        likesIcon.addEventListener('click', function() {
            updateLikes(likes);
        });

        // Autoplay if not first time user
        if (!isFirstTime) {
            video.play();
        }
    }

    /**
     * Display formatted time for video progress
     * @param {number} time - Time in seconds
     * @return {string} - Formatted time string (MM:SS)
     */
    function displayTime(time) {
        const mins = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        seconds = seconds <= 9 ? `0${seconds}` : seconds;
        return `${mins}:${seconds}`;
    }

    /**
     * Update video progress bar
     */
    function updateProgress() {
        const video = document.querySelector('.video');
        const bar = document.querySelector('.progress-bar');
        const duration = document.querySelector('.progress-duration');

        if (!video || !bar || !duration) return;

        bar.style.width = `${(video.currentTime / video.duration) * 100}%`;
        duration.textContent = `${displayTime(video.currentTime)} : ${displayTime(video.duration)}`;
    }

    /**
     * Set video progress when progress bar is clicked
     * @param {Event} e - Click event
     */
    function setProgress(e) {
        const video = document.querySelector('.video');
        const range = document.querySelector('.progress-range');
        const bar = document.querySelector('.progress-bar');

        const time = e.offsetX / range.offsetWidth;
        bar.style.width = `${time * 100}%`;
        video.currentTime = time * video.duration;
    }

    /**
     * Show comments panel
     */
    function activateComments() {
        const commentsContainer = document.querySelector('.comments-container');
        const video = document.querySelector('.video');

        commentsContainer.classList.add('comments-active');
        video.pause();
        if (video.paused) {
            video.style.cursor = 'pointer';
        }
    }

    /**
     * Hide comments panel
     */
    function deactivateComments() {
        const commentsContainer = document.querySelector('.comments-container');
        const video = document.querySelector('.video');

        commentsContainer.classList.remove('comments-active');
        video.play();
        video.style.cursor = 'default';
    }

    /**
     * Load comments for a specific video
     * @param {number} videoId - The ID of the video
     */
    function loadComments(videoId) {
        const commentsList = document.querySelector('.comments-list');
        const commentsCount = document.querySelector('.comments-head-label');
        const videoCommentsList = videoComments[videoId];

        // Clear existing comments
        commentsList.innerHTML = '';

        // Set comments count
        commentsCount.textContent = `${videoCommentsList.length} comments`;

        // Add each comment to the list
        videoCommentsList.forEach(comment => {
            const html = `
                <div class="comments-item">
                    <span class="comment-top">
                        <span class="comment-top-logo" style="background-image:url(${comment.profilePhoto})"></span>
                        <span class="comment-top-details">
                            <span class="user-name">${comment.userName}</span>
                            <span class="user-time">${comment.timePosted}</span>
                            <span class="user-comment">${comment.comment}</span>
                        </span>
                    </span>
                </div>
            `;
            commentsList.insertAdjacentHTML('afterbegin', html);
        });
    }

    /**
     * Update likes count
     * @param {HTMLElement} likesElement - The likes element
     */
    function updateLikes(likesElement) {
        const likesIcon = document.querySelector('.likes-icon');
        let likesAmount = parseInt(likesElement.dataset.likes, 10);

        if (likesIcon.dataset.liked === 'true') {
            // Unlike the video
            likesAmount -= 1;
            likesIcon.src = 'https://assets.codepen.io/2629920/heart.png';
            likesIcon.dataset.liked = 'false';
        } else {
            // Like the video
            likesAmount += 1;
            likesIcon.src = 'https://assets.codepen.io/2629920/heart+%281%29.png';
            likesIcon.dataset.liked = 'true';
        }

        likesElement.dataset.likes = likesAmount;
        likesElement.textContent = formatCount(likesAmount);
    }

    /**
     * Add navigation buttons for desktop view
     */
    function addNavigationButtons() {
        const navButtons = document.createElement('div');
        navButtons.className = 'nav-buttons';
        navButtons.innerHTML = `
            <button class="nav-button prev-button">&lt;</button>
            <button class="nav-button next-button">&gt;</button>
        `;
        document.body.appendChild(navButtons);

        // Next button
        document.querySelector('.next-button').addEventListener('click', function() {
            navigateToNextVideo();
        });

        // Previous button
        document.querySelector('.prev-button').addEventListener('click', function() {
            navigateToPrevVideo();
        });
    }

    /**
     * Navigate to the next video
     */
    function navigateToNextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        loadVideo(currentVideoIndex);
    }

    /**
     * Navigate to the previous video
     */
    function navigateToPrevVideo() {
        currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
        loadVideo(currentVideoIndex);
    }

    /**
     * Set up swipe detection for mobile devices
     */
    function setupSwipeDetection() {
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', function(e) {
            touchStartY = e.changedTouches[0].screenY;
        }, false);

        document.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, false);

        function handleSwipe() {
            const swipeDistance = touchStartY - touchEndY;
            const minSwipeDistance = 50;

            if (swipeDistance > minSwipeDistance) {
                // Swipe up - next video
                navigateToNextVideo();
            } else if (swipeDistance < -minSwipeDistance) {
                // Swipe down - previous video
                navigateToPrevVideo();
            }
        }
    }

    /**
     * Set up keyboard navigation
     */
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            switch (e.key) {
                case 'ArrowUp':
                    navigateToPrevVideo();
                    break;
                case 'ArrowDown':
                    navigateToNextVideo();
                    break;
                case ' ':
                    // Space bar to play/pause
                    const video = document.querySelector('.video');
                    if (video.paused) {
                        video.play();
                    } else {
                        video.pause();
                    }
                    break;
            }
        });
    }
});