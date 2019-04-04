let title = document.getElementById('title'),
    job = document.getElementById('job'),
    work = document.getElementById('work'),
    hobbies = document.getElementById('hobbies'),
    unorderList = document.getElementById('unorderList'),
    hobbiesLi = document.getElementsByClassName('hobby'),
    halfOfScreen = window.innerWidth / 2;

let arr = [title, job, work, hobbies, unorderList]
let delay = 1;

for (let ob in arr) {
    TweenLite.from(arr[ob], 1, {
        autoAlpha: 0,
        x: halfOfScreen,
        delay: delay,
        ease: Power1.easeInOut
    })

    delay += 0.25;
}

//
for (let item in hobbiesLi) {
    if (item < hobbiesLi.length) {
        TweenLite.to(hobbiesLi[item], 0, {
            css: {
                marginBottom: -21,
                opacity: 0
            }
        })
    }
}

//unorderList
TweenLite.to(unorderList, 1, {
    css: {
        marginTop: 10
    },
    autoAlpha: 0,
    marginTop: 50,
    delay: 1.8,
    ease: Power1.easeInOut,
    onComplete: () => {
        for (let item in hobbiesLi) {
            if (item < hobbiesLi.length) {
                TweenLite.to(hobbiesLi[item], 0.5, {
                    autoAlpha: 1,
                    y: item * 25,
                    delay: .2 * (item / 5),
                    ease: Circ.easeOut,
                })
            }
        }
    },
})

// let images = ['1.JPG', '2.JPG', '3.JPG', '4.JPG'];
console.log(images)
let imagesContainer = document.getElementById("imagesContainer");
for (let img in images) {
    imagesContainer.innerHTML += '<img src="/images/' + images[img] + '" style="right:-501px" />';
}

let currentIndex = 0;
let allowAnimation = true

tweenImage = (delay, operater, isInit) => {

    if (!allowAnimation) return;
    allowAnimation = false;
    let preIndex = currentIndex,
        cssObj,
        ease = Power4.easeInOut;

    switch (operater) {
        case 'next':
            cssObj = { right: 500 }
            // ease = Circ.easeIn;
            currentIndex = currentIndex++ >= images.length ? images.length : currentIndex++;
            currentIndex = (currentIndex >= images.length) ? images.length - 1 : currentIndex
            break;
        case 'previouse':
            // ease = Circ.easeIn;
            cssObj = { right: -500 }
            currentIndex = currentIndex-- < 0 ? -1 : currentIndex--;
            currentIndex = (currentIndex < 0) ? 0 : currentIndex
            break;
    }

    if (!isInit) {
        TweenLite.to(imagesContainer.children[preIndex], 1, {
            autoAlpha: 0,
            css: cssObj,
            delay: 0,
            ease: ease
        })
    }

    TweenLite.to(imagesContainer.children[currentIndex], 1, {
        autoAlpha: 0,
        css: { right: 0 },
        delay: delay,
        ease: ease,
        onComplete: () => {
            allowAnimation = true;
        }
    })
}

previousImage = () => {
    tweenImage(0, 'previouse', false)
}

nextImage = () => {
    tweenImage(0, 'next', false)
}

tweenImage(3, 'null', true)
