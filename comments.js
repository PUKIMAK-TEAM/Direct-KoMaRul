// comments.js - Contains the comment data for videos

// Comments data structure
const commentsData = [{
        userName: "Mescudi",
        timePosted: "Just now",
        profilePhoto: "https://media.timeout.com/images/105653190/image.jpg",
        comment: "It's a Akrapovic exhaust!!! Follow them for info 😎"
    },
    {
        userName: "Wes",
        timePosted: "3 mins ago",
        profilePhoto: "https://yeezymafia.com/content/images/2019/08/Kanye-West-adidas-Yeezy-Basketball-Shoe-YZY-BSKTBL.png",
        comment: "Love the color, whats the color code!"
    },
    {
        userName: "traviScott",
        timePosted: "48 mins ago",
        profilePhoto: "https://pbs.twimg.com/profile_images/634514155261833216/czgYrPLQ.jpg",
        comment: "💘💗💚💕🖤"
    },
    {
        userName: "mr305",
        timePosted: "2hrs ago",
        profilePhoto: "https://www.extremecustoms.com/inc.store/images/gallery/2008-gmc-sierra-2500-hd-with-leveling-kit-gear-alloy-big-block-726mb-22x12--44-offset-22-by-12-inch-wide-wheel-toyo-proxes-st-305-40r22-tire-pic4.jpg",
        comment: "I need one right now"
    },
    {
        userName: "its50",
        timePosted: "Just now",
        profilePhoto: "https://media.npr.org/assets/music/sotd/2009/11/50cent-606653ff4067b3c2488559211d4adddf497a103b-s800-c85.jpg",
        comment: "What wheels are those?"
    },
    {
        userName: "ciciFlores",
        timePosted: "12 mins ago",
        profilePhoto: "https://post.healthline.com/wp-content/uploads/2021/06/1336289-The-10-Best-Self-Help-Books-for-Women-in-2021-732x549-Feature.jpg",
        comment: "WOW love the wheel set up"
    },
    {
        userName: "boldJet",
        timePosted: "1 day ago",
        profilePhoto: "https://worldarchery.sport/sites/default/files/styles/header_desktop/https/photos.smugmug.com/OLYMPIC-GAMES/TOKYO-2020/23-JULY-QUALIFICATION/i-K2L7PfT/0/125fcb9f/X3/X21_7255-X3.jpg?h=2e8ccfe0&itok=fkr_S58k",
        comment: "Nice !!!"
    },
    {
        userName: "nikeHead32",
        timePosted: "3 mins ago",
        profilePhoto: "https://static.nike.com/a/images/f_auto/dpr_3.0/h_500,c_limit/a95ae79b-df88-4b50-86d2-a1c046a81033/nike-air-max-air-max-day-2020.jpg",
        comment: "Omw! 🤐😅"
    },
    {
        userName: "kidCudi",
        timePosted: "Just now",
        profilePhoto: "https://media.pitchfork.com/photos/5dbb9348892ad400095d279c/4:3/w_1912,h_1434,c_limit/Kid-Cudi.jpg",
        comment: "Buyn one tomorrow for my show!"
    },
    {
        userName: "KanyeW213",
        timePosted: "8/13/21",
        profilePhoto: "https://cdn.vox-cdn.com/thumbor/db1ZWaAzB_kNVvTzFFkSGlC7t3k=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/20055434/kanye_west_kid_cudi_kids_see_ghosts_review.jpg",
        comment: "Thats crazy quick."
    },
    {
        userName: "houseOf4382",
        timePosted: "7hrs ago",
        profilePhoto: "https://upload.wikimedia.org/wikipedia/commons/9/9c/House_of_Highlights_logo.png",
        comment: "What model porsche is that"
    },
    {
        userName: "_1995till",
        timePosted: "55 mins ago",
        profilePhoto: "https://pbs.twimg.com/media/Ec08188XgAE-Xux.jpg",
        comment: "🔥🔥"
    },
    {
        userName: "omgGT3_992",
        timePosted: "Just now",
        profilePhoto: "https://i.ytimg.com/vi/cLBVGqeEHLo/maxresdefault.jpg",
        comment: "hahahah twins 😎"
    },
    {
        userName: "F80_WES",
        timePosted: "6 mins ago",
        profilePhoto: "https://solomotorsports.net/wp-content/uploads/DSC_1102-1.jpg",
        comment: "F80 M3 > GT3"
    },
    {
        userName: "codewithWes",
        timePosted: "1 min ago",
        profilePhoto: "https://www.minimaldesksetups.com/wp-content/uploads/2020/09/Featureimage.jpg",
        comment: "Dream car !!!"
    }
];

// Function to get random comments for a video
function getRandomComments(count = 8) {
    // Shuffle the comments array
    const shuffled = [...commentsData].sort(() => 0.5 - Math.random());

    // Get random number of comments between count/2 and count
    const randomCount = Math.floor(Math.random() * (count / 2)) + Math.floor(count / 2);

    // Return the first randomCount comments
    return shuffled.slice(0, randomCount);
}

// Create a map of video IDs to comments
const videoComments = {};

// Populate comments for each video
videos.forEach(video => {
    videoComments[video.id] = getRandomComments();
});