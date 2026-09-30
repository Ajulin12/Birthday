/* =========================================
   SETTINGS
========================================= */

const totalVideos = 30;

let poppedCount = 0;
let currentVideoIndex = 1;

let birthdayMusicStarted = false;
let musicUnlocked = false;


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
   CHECK REQUIRED ELEMENTS
========================================= */

console.log(
    "Website script loaded successfully."
);


if (!startButton) {

    console.error(
        "ERROR: startButton not found."
    );

}


if (!balloonScreen) {

    console.error(
        "ERROR: balloonScreen not found."
    );

}


if (!birthdayScreen) {

    console.error(
        "ERROR: birthdayScreen not found."
    );

}


if (!birthdaySong) {

    console.error(
        "ERROR: birthdaySong not found."
    );

}


/* =========================================
   BIRTHDAY MUSIC SETTINGS
========================================= */

if (birthdaySong) {

    birthdaySong.volume = 1.0;

    birthdaySong.loop = true;

    birthdaySong.preload = "auto";

}


/* =========================================
   UNLOCK BIRTHDAY MUSIC
========================================= */

/*
   The 4th balloon click is a real user action.

   We use that click to unlock audio permission
   in the browser.

   The song is immediately paused after the
   browser accepts playback.

   The actual music starts when the first
   birthday screen appears.
*/

function unlockBirthdayMusic() {

    if (!birthdaySong) {
        return;
    }


    if (musicUnlocked) {
        return;
    }


    try {

        birthdaySong.currentTime = 0;

        birthdaySong.volume = 1.0;

        birthdaySong.loop = true;


        const unlockPromise =
            birthdaySong.play();


        if (
            unlockPromise !== undefined
        ) {

            unlockPromise
                .then(function () {

                    musicUnlocked = true;

                    birthdaySong.pause();

                    birthdaySong.currentTime = 0;

                    console.log(
                        "Birthday music unlocked."
                    );

                })
                .catch(function (error) {

                    console.log(
                        "Music unlock was blocked:",
                        error
                    );

                });

        }

    }
    catch (error) {

        console.log(
            "Music unlock error:",
            error
        );

    }

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


    birthdaySong.currentTime = 0;

    birthdaySong.volume = 1.0;

    birthdaySong.loop = true;


    const musicPromise =
        birthdaySong.play();


    if (
        musicPromise !== undefined
    ) {

        musicPromise
            .then(function () {

                birthdayMusicStarted = true;

                console.log(
                    "Birthday music started successfully."
                );

            })
            .catch(function (error) {

                console.log(
                    "Music playback was blocked:",
                    error
                );

                /*
                   If the browser still blocks it,
                   we do not stop the website.
                */

                birthdayMusicStarted = false;

            });

    }
    else {

        birthdayMusicStarted = true;

    }

}


/* =========================================
   KEEP MUSIC PLAYING
========================================= */

function ensureBirthdayMusic() {

    if (!birthdaySong) {
        return;
    }


    if (
        birthdaySong.paused &&
        birthdayMusicStarted
    ) {

        birthdaySong.play()
            .catch(function () {

                console.log(
                    "Music playback needs user permission."
                );

            });

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


        heart.textContent =
            "♥";


        heart.dataset.number =
            i;


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

            console.log(
                "Start button clicked."
            );


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
                   On the 4th balloon click,
                   unlock the audio while this
                   click still has user activation.
                */

                if (
                    poppedCount === 4
                ) {

                    unlockBirthdayMusic();

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

                                    /* HIDE BALLOONS */

                                    if (balloonScreen) {

                                        balloonScreen.classList.add(
                                            "hidden"
                                        );

                                    }


                                    /* SHOW BIRTHDAY */

                                    if (birthdayScreen) {

                                        birthdayScreen.classList.remove(
                                            "hidden"
                                        );

                                    }


                                    /* START SONG */

                                    startBirthdayMusic();


                                    /* =================================
                                       BIRTHDAY SCREEN FOR 5 SECONDS
                                    ================================= */

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


    videoSource.src =
        videoPath;


    if (currentVideo) {

        currentVideo.textContent =
            currentVideoIndex;

    }


    memoryVideo.load();


    updateHeartProgress();


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

                memoryVideo.muted =
                    true;

                updateVideo();

            }

            else {

                currentVideoIndex =
                    totalVideos;

                memoryVideo.muted =
                    true;

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
               Keep the birthday music playing.
               Only the memory video is paused.
            */

            ensureBirthdayMusic();


            if (memoryVideo) {

                memoryVideo.pause();

                memoryVideo.muted =
                    true;

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