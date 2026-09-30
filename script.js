/* =========================================
   SETTINGS
========================================= */

const totalVideos = 30;

let poppedCount = 0;
let currentVideoIndex = 1;
let birthdayMusicStarted = false;


/* =========================================
   VIDEO ROTATION SETTINGS
========================================= */

/*
   -90 degrees:
   1, 2, 4, 5, 7, 9, 10, 12, 13, 14,
   16, 17, 19, 20, 22, 23, 24, 25, 26,
   28, 29, 30

   +90 degrees:
   8, 11, 15

   Normal:
   3, 6, 18, 21, 27
*/

const rotateMinus90 = new Set([
    1, 2, 4, 5, 7,
    9, 10, 12, 13, 14,
    16, 17, 19, 20, 22,
    23, 24, 25, 26,
    28, 29, 30
]);

const rotatePlus90 = new Set([
    8, 11, 15
]);


/* =========================================
   ELEMENTS
========================================= */

const startButton =
    document.getElementById("startButton");

const welcome =
    document.getElementById("welcome");

const balloonScreen =
    document.getElementById("balloonScreen");

const birthdayScreen =
    document.getElementById("birthdayScreen");

const memoryScreen =
    document.getElementById("memoryScreen");

const letterScreen =
    document.getElementById("letterScreen");

const onceAgainScreen =
    document.getElementById("onceAgainScreen");

const birthdaySecondScreen =
    document.getElementById("birthdaySecondScreen");

const finalScreen =
    document.getElementById("finalScreen");

const memoryVideo =
    document.getElementById("memoryVideo");

const videoSource =
    document.getElementById("videoSource");

const currentVideo =
    document.getElementById("currentVideo");

const balloonMessage =
    document.getElementById("balloonMessage");

const heartProgress =
    document.getElementById("heartProgress");

const letterButton =
    document.getElementById("letterButton");

const onceAgainButton =
    document.getElementById("onceAgainButton");

const secondBirthdayButton =
    document.getElementById("secondBirthdayButton");

const envelopeContainer =
    document.getElementById("envelopeContainer");

const openLetterText =
    document.getElementById("openLetterText");

const birthdaySong =
    document.getElementById("birthdaySong");


/* =========================================
   BIRTHDAY MUSIC SETTINGS
========================================= */

if (birthdaySong) {

    birthdaySong.volume = 1.0;

    birthdaySong.loop = true;

}


/* =========================================
   START BIRTHDAY MUSIC
========================================= */

function startBirthdayMusic() {

    if (!birthdaySong) {

        console.warn(
            "Birthday song element was not found."
        );

        return;

    }


    if (birthdayMusicStarted) {

        return;

    }


    birthdayMusicStarted = true;


    birthdaySong.currentTime = 0;

    birthdaySong.volume = 1.0;

    birthdaySong.loop = true;


    const musicPromise =
        birthdaySong.play();


    if (musicPromise !== undefined) {

        musicPromise
            .then(function () {

                console.log(
                    "Birthday music started after fourth balloon."
                );

            })
            .catch(function (error) {

                console.log(
                    "Music autoplay was blocked:",
                    error
                );

                /*
                   If the browser still blocks it,
                   the next user interaction can try
                   playing it again.
                */

                birthdayMusicStarted = false;

            });

    }

}


/* =========================================
   TRY MUSIC AGAIN IF REQUIRED
========================================= */

function ensureBirthdayMusic() {

    if (!birthdaySong) {

        return;

    }


    if (
        birthdaySong.paused &&
        !birthdayMusicStarted
    ) {

        startBirthdayMusic();

    }

}


/* =========================================
   STOP MUSIC WHEN PAGE IS LEFT
========================================= */

window.addEventListener(
    "pagehide",
    function () {

        if (birthdaySong) {

            birthdaySong.pause();

            birthdaySong.currentTime = 0;

        }

    }
);


window.addEventListener(
    "beforeunload",
    function () {

        if (birthdaySong) {

            birthdaySong.pause();

            birthdaySong.currentTime = 0;

        }

    }
);


/* =========================================
   VIDEO ALWAYS MUTED
========================================= */

if (memoryVideo) {

    memoryVideo.muted = true;

}


/* =========================================
   CREATE 30 HEART PROGRESS INDICATORS
========================================= */

if (heartProgress) {

    for (
        let i = 1;
        i <= totalVideos;
        i++
    ) {

        const heart =
            document.createElement("span");

        heart.className =
            "progress-heart empty";

        heart.textContent = "♥";

        heart.dataset.number = i;

        heartProgress.appendChild(
            heart
        );

    }

}


/* =========================================
   START BUTTON
========================================= */

if (startButton) {

    startButton.addEventListener(
        "click",
        function () {

            if (welcome) {

                welcome.classList.add(
                    "hidden"
                );

            }


            if (balloonScreen) {

                balloonScreen.classList.remove(
                    "hidden"
                );

            }

        }
    );

}


/* =========================================
   BALLOONS
========================================= */

const balloons =
    document.querySelectorAll(
        ".balloon"
    );


/* =========================================
   POP EFFECT
========================================= */

function createPopEffect(balloon) {

    const colors = [

        "#ff4778",
        "#ff668d",
        "#ff91ad",
        "#ffc928",
        "#9c63ff",
        "#72caff",
        "#ffffff",
        "#ff8c42"

    ];


    const burstLayer =
        document.querySelector(
            ".pop-burst-layer"
        );


    if (!burstLayer) {

        return;

    }


    const containerRect =
        burstLayer.getBoundingClientRect();


    const balloonRect =
        balloon.getBoundingClientRect();


    const centerX =
        balloonRect.left +
        balloonRect.width / 2 -
        containerRect.left;


    const centerY =
        balloonRect.top +
        balloonRect.height / 2 -
        containerRect.top;


    /* =====================================
       PAPER PIECES
    ====================================== */

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const piece =
            document.createElement(
                "span"
            );

        piece.className =
            "popper-piece";

        piece.style.left =
            `${centerX}px`;

        piece.style.top =
            `${centerY}px`;

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            120 +
            Math.random() *
            220;


        piece.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        piece.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );

        piece.style.setProperty(
            "--start-x",
            `${Math.cos(angle) * 15}px`
        );

        piece.style.setProperty(
            "--start-y",
            `${Math.sin(angle) * 15}px`
        );


        piece.style.width =
            `${5 + Math.random() * 7}px`;

        piece.style.height =
            `${14 + Math.random() * 18}px`;

        piece.style.animationDelay =
            `${Math.random() * 0.08}s`;


        burstLayer.appendChild(
            piece
        );


        setTimeout(
            function () {

                piece.remove();

            },
            1600
        );

    }


    /* =====================================
       ROUND PARTICLES
    ====================================== */

    for (
        let i = 0;
        i < 30;
        i++
    ) {

        const dot =
            document.createElement(
                "span"
            );

        dot.className =
            "pop-burst-dot";

        dot.style.left =
            `${centerX}px`;

        dot.style.top =
            `${centerY}px`;

        dot.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            80 +
            Math.random() *
            190;


        dot.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        dot.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );


        burstLayer.appendChild(
            dot
        );


        setTimeout(
            function () {

                dot.remove();

            },
            1200
        );

    }


    /* =====================================
       LONG STRIPS
    ====================================== */

    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const strip =
            document.createElement(
                "span"
            );

        strip.className =
            "pop-strip";

        strip.style.left =
            `${centerX}px`;

        strip.style.top =
            `${centerY}px`;

        strip.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            130 +
            Math.random() *
            180;


        strip.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        strip.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );


        burstLayer.appendChild(
            strip
        );


        setTimeout(
            function () {

                strip.remove();

            },
            1700
        );

    }

}


/* =========================================
   BALLOON CLICK
========================================= */

balloons.forEach(
    function (balloon) {

        balloon.addEventListener(
            "click",
            function () {

                if (
                    balloon.classList.contains(
                        "popping"
                    ) ||
                    balloon.classList.contains(
                        "popped"
                    )
                ) {

                    return;

                }


                balloon.classList.add(
                    "popping"
                );


                createPopEffect(
                    balloon
                );


                poppedCount++;


                /*
                   =================================
                   FOURTH BALLOON
                   START SONG IMMEDIATELY
                   =================================

                   This is intentionally called
                   directly from the balloon click.

                   This gives the browser the user's
                   click/tap permission to play audio.
                */

                if (
                    poppedCount === 4
                ) {

                    startBirthdayMusic();

                }


                setTimeout(
                    function () {

                        balloon.classList.add(
                            "popped"
                        );

                    },
                    650
                );


                /* =================================
                   ALL 4 BALLOONS POPPED
                ================================= */

                if (
                    poppedCount === 4
                ) {

                    setTimeout(
                        function () {

                            if (balloonMessage) {

                                balloonMessage.textContent =
                                    "You popped them all! ❤️";

                                balloonMessage.classList.add(
                                    "balloon-success"
                                );

                            }


                            setTimeout(
                                function () {

                                    if (balloonScreen) {

                                        balloonScreen.classList.add(
                                            "hidden"
                                        );

                                    }


                                    if (birthdayScreen) {

                                        birthdayScreen.classList.remove(
                                            "hidden"
                                        );

                                    }


                                    /*
                                       DO NOT START THE SONG HERE.

                                       It has already started
                                       immediately after the
                                       fourth balloon click.
                                    */


                                    setTimeout(
                                        function () {

                                            if (birthdayScreen) {

                                                birthdayScreen.classList.add(
                                                    "hidden"
                                                );

                                            }


                                            if (memoryScreen) {

                                                memoryScreen.classList.remove(
                                                    "hidden"
                                                );

                                            }


                                            startMemories();

                                        },
                                        5000
                                    );

                                },
                                800
                            );

                        },
                        750
                    );

                }

            }
        );

    }
);


/* =========================================
   START MEMORIES
========================================= */

function startMemories() {

    currentVideoIndex = 1;


    if (memoryVideo) {

        memoryVideo.muted = true;

    }


    updateVideo();

}


/* =========================================
   GET VIDEO ROTATION
========================================= */

function getVideoRotation() {

    if (
        rotateMinus90.has(
            currentVideoIndex
        )
    ) {

        return -90;

    }


    if (
        rotatePlus90.has(
            currentVideoIndex
        )
    ) {

        return 90;

    }


    return 0;

}


/* =========================================
   FIT ROTATED VIDEO INSIDE FRAME
========================================= */

function fitRotatedVideo() {

    if (!memoryVideo) {

        return;

    }


    const videoFrame =
        memoryVideo.closest(
            ".video-frame"
        );


    if (!videoFrame) {

        return;

    }


    const rotation =
        getVideoRotation();


    /* =====================================
       NORMAL VIDEO
    ====================================== */

    if (
        rotation === 0
    ) {

        memoryVideo.style.transform =
            "rotate(0deg) scale(1)";

        memoryVideo.style.width =
            "100%";

        memoryVideo.style.height =
            "100%";

        return;

    }


    const frameWidth =
        videoFrame.clientWidth;

    const frameHeight =
        videoFrame.clientHeight;


    if (
        frameWidth <= 0 ||
        frameHeight <= 0
    ) {

        return;

    }


    const videoWidth =
        memoryVideo.videoWidth;

    const videoHeight =
        memoryVideo.videoHeight;


    if (
        videoWidth <= 0 ||
        videoHeight <= 0
    ) {

        return;

    }


    const videoRatio =
        videoWidth /
        videoHeight;

    const frameRatio =
        frameWidth /
        frameHeight;


    let displayedWidth;

    let displayedHeight;


    if (
        videoRatio >
        frameRatio
    ) {

        displayedWidth =
            frameWidth;

        displayedHeight =
            frameWidth /
            videoRatio;

    }

    else {

        displayedHeight =
            frameHeight;

        displayedWidth =
            frameHeight *
            videoRatio;

    }


    /*
       Rotation swaps width and height.
    */

    const rotatedWidth =
        displayedHeight;

    const rotatedHeight =
        displayedWidth;


    const scaleX =
        frameWidth /
        rotatedWidth;

    const scaleY =
        frameHeight /
        rotatedHeight;


    /*
       Slightly smaller than the maximum
       so the video stays comfortably
       inside the frame.
    */

    const scale =
        Math.min(
            scaleX,
            scaleY
        ) * 0.98;


    memoryVideo.style.width =
        "100%";

    memoryVideo.style.height =
        "100%";


    memoryVideo.style.transform =
        `rotate(${rotation}deg) scale(${scale})`;

}


/* =========================================
   UPDATE VIDEO
========================================= */

function updateVideo() {

    if (
        !memoryVideo ||
        !videoSource
    ) {

        return;

    }


    const number =
        String(
            currentVideoIndex
        ).padStart(
            2,
            "0"
        );


    const videoPath =
        "videos/video" +
        number +
        ".mp4";


    memoryVideo.pause();

    memoryVideo.muted = true;


    memoryVideo.style.transform =
        "rotate(0deg) scale(1)";


    videoSource.src =
        videoPath;


    if (currentVideo) {

        currentVideo.textContent =
            currentVideoIndex;

    }


    memoryVideo.load();


    updateHeartProgress();


    memoryVideo.onloadedmetadata =
        function () {

            fitRotatedVideo();

        };


    const playPromise =
        memoryVideo.play();


    if (
        playPromise !== undefined
    ) {

        playPromise.catch(
            function () {

                memoryVideo.muted =
                    true;

                memoryVideo.play()
                    .catch(
                        function () {

                            console.log(
                                "Video autoplay was blocked."
                            );

                        }
                    );

            }
        );

    }

}


/* =========================================
   REFIT VIDEO WHEN WINDOW RESIZES
========================================= */

window.addEventListener(
    "resize",
    function () {

        fitRotatedVideo();

    }
);


/* =========================================
   VIDEO ENDED
========================================= */

if (memoryVideo) {

    memoryVideo.addEventListener(
        "ended",
        function () {

            if (
                currentVideoIndex <
                totalVideos
            ) {

                currentVideoIndex++;

                memoryVideo.muted = true;

                updateVideo();

            }

            else {

                currentVideoIndex =
                    totalVideos;

                memoryVideo.muted = true;

                updateHeartProgress();

            }

        }
    );

}


/* =========================================
   HEART PROGRESS
========================================= */

function updateHeartProgress() {

    const hearts =
        document.querySelectorAll(
            ".progress-heart"
        );


    hearts.forEach(
        function (heart) {

            const number =
                Number(
                    heart.dataset.number
                );


            if (
                number <=
                currentVideoIndex
            ) {

                heart.classList.remove(
                    "empty"
                );

                heart.classList.add(
                    "active"
                );

            }

            else {

                heart.classList.add(
                    "empty"
                );

                heart.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =========================================
   MEMORY → LETTER
========================================= */

if (letterButton) {

    letterButton.addEventListener(
        "click",
        function () {

            /*
               Make sure the song continues.
            */

            ensureBirthdayMusic();


            if (memoryVideo) {

                memoryVideo.pause();

                memoryVideo.muted = true;

            }


            memoryScreen.classList.add(
                "hidden"
            );


            letterScreen.classList.remove(
                "hidden"
            );


            envelopeContainer.classList.remove(
                "open"
            );


            envelopeContainer.classList.remove(
                "letter-revealed"
            );


            openLetterText.textContent =
                "A little letter for you 💌";


            onceAgainButton.classList.add(
                "hidden"
            );


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });


            /* OPEN FLAP */

            setTimeout(
                function () {

                    envelopeContainer.classList.add(
                        "open"
                    );

                },
                900
            );


            /* LETTER COMES OUT */

            setTimeout(
                function () {

                    envelopeContainer.classList.add(
                        "letter-revealed"
                    );

                },
                2100
            );


            /* MESSAGE */

            setTimeout(
                function () {

                    openLetterText.textContent =
                        "With all my heart... ❤️";

                },
                3500
            );


            /* CONTINUE BUTTON */

            setTimeout(
                function () {

                    onceAgainButton.classList.remove(
                        "hidden"
                    );

                },
                4400
            );

        }
    );

}


/* =========================================
   LETTER → ONCE AGAIN
========================================= */

if (onceAgainButton) {

    onceAgainButton.addEventListener(
        "click",
        function () {

            ensureBirthdayMusic();


            letterScreen.classList.add(
                "hidden"
            );


            onceAgainScreen.classList.remove(
                "hidden"
            );


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });


            setTimeout(
                function () {

                    onceAgainScreen.classList.add(
                        "hidden"
                    );


                    birthdaySecondScreen.classList.remove(
                        "hidden"
                    );


                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                },
                3000
            );

        }
    );

}


/* =========================================
   SECOND BIRTHDAY → FINAL
========================================= */

if (secondBirthdayButton) {

    secondBirthdayButton.addEventListener(
        "click",
        function () {

            ensureBirthdayMusic();


            birthdaySecondScreen.classList.add(
                "hidden"
            );


            finalScreen.classList.remove(
                "hidden"
            );


            window.scrollTo({
                top: 0,
                behavior: "smooth"
        });

        }
    );

}


/* =========================================
   FINISHED
========================================= */

console.log(
    "Birthday website JavaScript is ready."
);