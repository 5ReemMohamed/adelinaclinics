document.addEventListener("DOMContentLoaded", function () {

  

    const header = document.getElementById("mainHeader");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileOverlay = document.getElementById("mobileOverlay");
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const mobileMenuClose = document.getElementById("mobileMenuClose");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");


    function handleScroll() {

        if (!header) return;

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();


    function openMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add("active");

        if (mobileOverlay) {
            mobileOverlay.classList.add("active");
        }

        document.body.classList.add("menu-open");


        if (mobileMenuToggle) {

            mobileMenuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            mobileMenuToggle.setAttribute(
                "aria-label",
                "إغلاق القائمة"
            );

            mobileMenuToggle.innerHTML =
                '<i class="fas fa-times"></i>';
        }
    }


    function closeMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("active");

        if (mobileOverlay) {
            mobileOverlay.classList.remove("active");
        }

        document.body.classList.remove("menu-open");


        if (mobileMenuToggle) {

            mobileMenuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenuToggle.setAttribute(
                "aria-label",
                "فتح القائمة"
            );

            mobileMenuToggle.innerHTML =
                '<i class="fas fa-bars"></i>';
        }
    }


    if (mobileMenuToggle) {

        mobileMenuToggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    mobileMenu &&
                    mobileMenu.classList.contains("active");

                if (isOpen) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            }
        );
    }


    if (mobileMenuClose) {

        mobileMenuClose.addEventListener(
            "click",
            closeMobileMenu
        );
    }


    if (mobileOverlay) {

        mobileOverlay.addEventListener(
            "click",
            closeMobileMenu
        );
    }


    mobileLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {
                closeMobileMenu();
            }
        );
    });


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                mobileMenu &&
                mobileMenu.classList.contains("active")
            ) {
                closeMobileMenu();
            }
        }
    );


    window.addEventListener(
        "resize",
        function () {

            if (
                window.innerWidth >= 992 &&
                mobileMenu &&
                mobileMenu.classList.contains("active")
            ) {
                closeMobileMenu();
            }
        }
    );


   

    const hero = document.getElementById("hero");

    if (hero) {

        const animatedItems =
            hero.querySelectorAll(".hero-animate");

        animatedItems.forEach(
            function (item, index) {

                item.style.opacity = "0";

                item.style.transform =
                    "translateY(28px)";


                setTimeout(
                    function () {

                        item.style.transition =
                            "opacity 0.8s cubic-bezier(0.25,1,0.5,1), " +
                            "transform 0.8s cubic-bezier(0.25,1,0.5,1)";

                        item.style.opacity = "1";

                        item.style.transform =
                            "translateY(0)";
                    },
                    200 + (index * 150)
                );
            }
        );
    }
 const navItems = document.querySelectorAll(".mobile-nav-item");

  navItems.forEach(function (item) {

    item.addEventListener("click", function () {

      navItems.forEach(function (nav) {
        nav.classList.remove("active");
      });

      this.classList.add("active");

      this.classList.add("clicked");

      setTimeout(() => {
        this.classList.remove("clicked");
      }, 180);

    });

  });

 

    const statisticsSection =
        document.getElementById("statistics");


    if (statisticsSection) {

        const cards =
            statisticsSection.querySelectorAll(
                ".statistics-card"
            );

        const numbers =
            statisticsSection.querySelectorAll(
                ".stat-number"
            );

        const rings =
            statisticsSection.querySelectorAll(
                ".stat-ring-progress"
            );


        function animateNumber(
            element,
            target,
            duration
        ) {

            const startTime =
                performance.now();


            function update(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );

                const eased =
                    1 - Math.pow(
                        1 - progress,
                        3
                    );

                const currentValue =
                    Math.floor(
                        eased * target
                    );

                element.textContent =
                    currentValue;


                if (progress < 1) {

                    requestAnimationFrame(
                        update
                    );

                } else {

                    element.textContent =
                        target;
                }
            }


            requestAnimationFrame(update);
        }


        function resetStatistics() {

            numbers.forEach(
                function (number) {

                    number.textContent = "0";
                }
            );


            cards.forEach(
                function (card) {

                    card.classList.remove(
                        "stat-visible"
                    );
                }
            );


            rings.forEach(
                function (ring) {

                    ring.style.setProperty(
                        "--ring-offset",
                        "1000"
                    );
                }
            );


            statisticsSection.classList.remove(
                "active"
            );
        }


        function startStatisticsAnimation() {

            resetStatistics();


            setTimeout(
                function () {

                    statisticsSection.classList.add(
                        "active"
                    );


                    cards.forEach(
                        function (card, index) {

                            setTimeout(
                                function () {

                                    card.classList.add(
                                        "stat-visible"
                                    );

                                },
                                index * 150
                            );
                        }
                    );


                    numbers.forEach(
                        function (number) {

                            const target =
                                parseInt(
                                    number.dataset.target,
                                    10
                                );


                            if (!isNaN(target)) {

                                animateNumber(
                                    number,
                                    target,
                                    1800
                                );
                            }
                        }
                    );


                    rings.forEach(
                        function (ring) {

                            const card =
                                ring.closest(
                                    ".statistics-card"
                                );

                            if (!card) return;


                            const number =
                                card.querySelector(
                                    ".stat-number"
                                );

                            if (!number) return;


                            const target =
                                parseInt(
                                    number.dataset.target,
                                    10
                                );

                            if (isNaN(target)) return;


                            const circumference =
                                2 * Math.PI * 48;


                            const offset =
                                circumference -
                                (target / 100) *
                                circumference;


                            ring.style.setProperty(
                                "--ring-offset",
                                offset
                            );
                        }
                    );

                },
                100
            );
        }


        if ("IntersectionObserver" in window) {

            const statisticsObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    startStatisticsAnimation();

                                } else {

                                    resetStatistics();
                                }
                            }
                        );
                    },
                    {
                        threshold: 0.3
                    }
                );


            statisticsObserver.observe(
                statisticsSection
            );

        } else {

            startStatisticsAnimation();
        }
    }




    const faqButtons =
        document.querySelectorAll(
            "[data-faq-toggle]"
        );


    faqButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const faqId =
                        button.getAttribute(
                            "data-faq-toggle"
                        );


                    const item =
                        button.closest(
                            ".faq-item"
                        );

                    if (!item) return;


                    const content =
                        document.getElementById(
                            "faq-answer-" + faqId
                        );

                    if (!content) return;


                    const isOpen =
                        item.classList.contains(
                            "active"
                        );


                    document
                        .querySelectorAll(
                            ".faq-item.active"
                        )
                        .forEach(
                            function (activeItem) {

                                activeItem.classList.remove(
                                    "active"
                                );


                                const activeButton =
                                    activeItem.querySelector(
                                        ".faq-question"
                                    );


                                const activeContent =
                                    activeItem.querySelector(
                                        ".faq-content"
                                    );


                                if (activeButton) {

                                    activeButton.setAttribute(
                                        "aria-expanded",
                                        "false"
                                    );
                                }


                                if (activeContent) {

                                    activeContent.classList.remove(
                                        "open"
                                    );

                                    activeContent.setAttribute(
                                        "aria-hidden",
                                        "true"
                                    );
                                }
                            }
                        );


                    if (!isOpen) {

                        item.classList.add(
                            "active"
                        );


                        button.setAttribute(
                            "aria-expanded",
                            "true"
                        );


                        content.classList.add(
                            "open"
                        );


                        content.setAttribute(
                            "aria-hidden",
                            "false"
                        );
                    }
                }
            );
        }
    );




    const section =
        document.querySelector("#contact");

    const form =
        document.querySelector("#contactForm");

    const successMessage =
        document.querySelector("#successMessage");

    const newRequestBtn =
        document.querySelector("#newRequestBtn");

    const submitBtn =
        document.querySelector("#submitBtn");

    const submitContent =
        document.querySelector("#submitContent");

    const loadingContent =
        document.querySelector("#loadingContent");


    const nameInput =
        document.querySelector("#contact-name");

    const phoneInput =
        document.querySelector("#contact-phone");

    const emailInput =
        document.querySelector("#contact-email");

    const serviceInput =
        document.querySelector("#contact-service");

    const messageInput =
        document.querySelector("#contact-message");


    const nameError =
        document.querySelector("#nameError");

    const phoneError =
        document.querySelector("#phoneError");

  
    const messageError =
        document.querySelector("#messageError");



    if (section) {

        if ("IntersectionObserver" in window) {

            const contactObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    const elements =
                                        entry.target.querySelectorAll(
                                            ".aos-fade-up, " +
                                            ".aos-reveal-left, " +
                                            ".aos-reveal-right"
                                        );


                                    elements.forEach(
                                        function (
                                            element,
                                            index
                                        ) {

                                            setTimeout(
                                                function () {

                                                    element.classList.add(
                                                        "animate"
                                                    );

                                                },
                                                index * 100
                                            );
                                        }
                                    );


                                    contactObserver.disconnect();
                                }
                            }
                        );
                    },
                    {
                        threshold: 0.1
                    }
                );


            contactObserver.observe(section);

        } else {

            const elements =
                section.querySelectorAll(
                    ".aos-fade-up, " +
                    ".aos-reveal-left, " +
                    ".aos-reveal-right"
                );

            elements.forEach(
                function (element) {

                    element.classList.add(
                        "animate"
                    );
                }
            );
        }
    }



    function setError(
        input,
        errorElement,
        message
    ) {

        if (input) {
            input.classList.add(
                "input-error"
            );
        }

        if (errorElement) {
            errorElement.textContent =
                message;
        }
    }


    function clearError(
        input,
        errorElement
    ) {

        if (input) {
            input.classList.remove(
                "input-error"
            );
        }

        if (errorElement) {
            errorElement.textContent = "";
        }
    }


    /* Contact Validation */

    function validate() {

        let valid = true;


        if (!nameInput) {
            return false;
        }


        if (
            !nameInput.value.trim()
        ) {

            setError(
                nameInput,
                nameError,
                "الاسم مطلوب"
            );

            valid = false;

        } else {

            clearError(
                nameInput,
                nameError
            );
        }


        if (!phoneInput) {
            return false;
        }


        if (
            !phoneInput.value.trim()
        ) {

            setError(
                phoneInput,
                phoneError,
                "رقم الهاتف مطلوب"
            );

            valid = false;

        } else {

            clearError(
                phoneInput,
                phoneError
            );
        }


       



        if (!serviceInput) {
            return false;
        }


        if (!serviceInput.value) {

            setError(
                serviceInput,
                serviceError,
                "يرجى اختيار نوع الخدمة"
            );

            valid = false;

        } else {

            clearError(
                serviceInput,
                serviceError
            );
        }


        if (!messageInput) {
            return false;
        }


        if (
            !messageInput.value.trim()
        ) {

            setError(
                messageInput,
                messageError,
                "الرسالة مطلوبة"
            );

            valid = false;

        } else {

            clearError(
                messageInput,
                messageError
            );
        }


        return valid;
    }



    if (
        nameInput &&
        nameError
    ) {

        nameInput.addEventListener(
            "input",
            function () {

                if (
                    this.value.trim()
                ) {

                    clearError(
                        this,
                        nameError
                    );
                }
            }
        );
    }


    if (
        phoneInput &&
        phoneError
    ) {

        phoneInput.addEventListener(
            "input",
            function () {

                if (
                    this.value.trim()
                ) {

                    clearError(
                        this,
                        phoneError
                    );
                }
            }
        );
    }


   


    if (
        serviceInput &&
        serviceError
    ) {

        serviceInput.addEventListener(
            "change",
            function () {

                if (this.value) {

                    clearError(
                        this,
                        serviceError
                    );
                }
            }
        );
    }


    if (
        messageInput &&
        messageError
    ) {

        messageInput.addEventListener(
            "input",
            function () {

                if (
                    this.value.trim()
                ) {

                    clearError(
                        this,
                        messageError
                    );
                }
            }
        );
    }



    if (form) {

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                if (!validate()) {
                    return;
                }


                if (submitBtn) {
                    submitBtn.disabled = true;
                }


                if (submitContent) {
                    submitContent.classList.add(
                        "d-none"
                    );
                }


                if (loadingContent) {
                    loadingContent.classList.remove(
                        "d-none"
                    );
                }


                setTimeout(
                    function () {

                        form.classList.add(
                            "d-none"
                        );


                        if (successMessage) {

                            successMessage.classList.remove(
                                "d-none"
                            );

                            successMessage.classList.add(
                                "animate-fade-in-scale"
                            );
                        }


                        form.reset();


                        if (submitBtn) {

                            submitBtn.disabled =
                                false;
                        }


                        if (submitContent) {

                            submitContent.classList.remove(
                                "d-none"
                            );
                        }


                        if (loadingContent) {

                            loadingContent.classList.add(
                                "d-none"
                            );
                        }

                    },
                    1500
                );
            }
        );
    }



    if (newRequestBtn) {

        newRequestBtn.addEventListener(
            "click",
            function () {

                if (successMessage) {

                    successMessage.classList.add(
                        "d-none"
                    );

                    successMessage.classList.remove(
                        "animate-fade-in-scale"
                    );
                }


                if (form) {

                    form.classList.remove(
                        "d-none"
                    );
                }
            }
        );
    }


 

 

    const casesData = [

        {
            id: 1,

            title: "نحت القوام",

            category: "جراحة التجميل",

            description:
                "نموذج من حالات نحت القوام التي تم تنفيذها باستخدام أحدث التقنيات الطبية.",

            media: [

                {
                    type: "image",
                    src: "../images/work-5.jpg",
                    alt: "حالة نحت القوام"
                },

                {
                    type: "image",
                    src: "../images/work-6.jpg",
                    alt: "حالة نحت القوام"
                },

                {
                    type: "video",
                    src: "../images/work-1.mp4"
                },

                {
                    type: "image",
                    src: "../images/work-7.jpg",
                    alt: "حالة نحت القوام"
                },

                {
                    type: "image",
                    src: "../images/work-8.jpg",
                    alt: "حالة نحت القوام"
                },

                {
                    type: "video",
                    src: "../images/work-2.mp4"
                },

                {
                    type: "image",
                    src: "../images/work-9.jpg",
                    alt: "حالة نحت القوام"
                },

                {
                    type: "image",
                    src: "../images/work-10.jpg",
                    alt: "حالة نحت القوام"
                },

                {
                    type: "video",
                    src: "../images/work-3.mp4"
                },

                {
                    type: "image",
                    src: "../images/work-11.jpg",
                    alt: "حالة نحت القوام"
                },

                {
                    type: "image",
                    src: "../images/work-12.jpg",
                    alt: "حالة نحت القوام"
                },

                {
                    type: "video",
                    src: "../images/work-4.mp4"
                },

                {
                    type: "image",
                    src: "../images/work-13.jpg",
                    alt: "حالة نحت القوام"
                },

                {
                    type: "image",
                    src: "../images/work-14.jpg",
                    alt: "حالة نحت القوام"
                },

                {
                    type: "video",
                    src: "../images/work-5.mp4"
                },

                {
                    type: "image",
                    src: "../images/work-15.jpg",
                    alt: "حالة نحت القوام"
                },

                {
                    type: "image",
                    src: "../images/work-17.jpg",
                    alt: "حالة نحت القوام"
                },

                {
                    type: "video",
                    src: "../images/work-6.mp4"
                },

                {
                    type: "video",
                    src: "../images/work-7.mp4"
                },
                {
                    type: "image",
                    src: "../images/work-21.jpg",
                    alt: "حالة نحت القوام"
                },
                {
                    type: "image",
                    src: "../images/work-22.jpg",
                    alt: "حالة نحت القوام"
                },
                {
                    type: "image",
                    src: "../images/work-23.jpg",
                    alt: "حالة نحت القوام"
                },
                {
                    type: "image",
                    src: "../images/work-24.jpg",
                    alt: "حالة نحت القوام"
                },
            ]
        },


        {
            id: 2,

            title: "فيلر الشفايف",

            category: "التجميل والحقن",

            description:
                "نموذج من حالات فيلر الشفايف للحصول على مظهر طبيعي ومتناسق.",

            media: [

                {
                    type: "image",
                    src: "../images/work-1.png",
                    alt: "فيلر الشفايف"
                },
                 {
                    type: "image",
                    src: "../images/work-19.jpg",
                    alt: "فيلر الشفايف"
                },
                 {
                    type: "video",
                    src: "../images/work-8.mp4"
                }
            ]
        },


        {
            id: 3,

            title: "تنظيف الجير",

            category: "طب الأسنان",

            description:
                "إحدى حالات تنظيف الأسنان وإزالة الجير باستخدام أحدث التقنيات.",

            media: [

                {
                    type: "image",
                    src: "../images/work-2.jpg",
                    alt: "تنظيف الجير"
                },
                 {
                    type: "image",
                    src: "../images/work-20.jpg",
                    alt: "تنظيف الجير"
                }
            ]
        },


        {
            id: 4,

            title: "تشقير",

            category: "العناية بالبشرة",

            description:
                "نموذج من حالات التشقير والعناية بالبشرة باستخدام تقنيات آمنة ومتقدمة.",

            media: [

                {
                    type: "image",
                    src: "../images/work-3.jpg",
                    alt: "حالة تشقير"
                },

                {
                    type: "image",
                    src: "../images/work-4.jpg",
                    alt: "تشقير"
                }
            ]
        },
         {
            id: 4,

            title: "بوتكس",

            category: "العناية بالبشرة",

            description:
                "نموذج من حالات البوتكس والعناية بالبشرة باستخدام تقنيات آمنة ومتقدمة.",

            media: [

                {
                    type: "image",
                    src: "../images/work-18.jpg",
                    alt: "حالة بوتكس"
                }
            ]
        }
    ];


 

    const casesWrapper =
        document.getElementById(
            "casesWrapper"
        );


    if (
        casesWrapper &&
        typeof Swiper !== "undefined"
    ) {


        casesData.forEach(
            function (
                caseItem,
                caseIndex
            ) {

                const mediaSlides =
                    caseItem.media
                        .map(
                            function (
                                media
                            ) {

                                let mediaHTML =
                                    "";



                                if (
                                    media.type ===
                                    "image"
                                ) {

                                    mediaHTML = `

                                        <div class="swiper-slide">

                                            <img
                                                src="${media.src}"
                                                alt="${media.alt || caseItem.title}"
                                                class="case-clickable-media"
                                                data-type="image"
                                                data-src="${media.src}"
                                                loading="lazy"
                                            >

                                            <span class="media-type">
                                                <i class="fa-solid fa-image"></i>
                                            </span>

                                        </div>

                                    `;
                                }



                                if (
                                    media.type ===
                                    "video"
                                ) {

                                    mediaHTML = `

                                        <div class="swiper-slide">

                                            <video
                                                class="case-video"
                                                controls
                                                playsinline
                                                preload="metadata"
                                            >

                                                <source
                                                    src="${media.src}"
                                                    type="video/mp4"
                                                >

                                                المتصفح لا يدعم تشغيل الفيديو.

                                            </video>

                                            <span class="media-type">
                                                <i class="fa-solid fa-play"></i>
                                            </span>

                                        </div>

                                    `;
                                }


                                return mediaHTML;
                            }
                        )
                        .join("");


                const cardHTML = `

                    <div class="swiper-slide">

                        <article class="case-card">

                            <div class="case-media">

                                <div
                                    class="swiper mediaSwiper mediaSwiper-${caseIndex}"
                                >

                                    <div class="swiper-wrapper">

                                        ${mediaSlides}

                                    </div>


                                    <button
                                        class="media-prev media-prev-${caseIndex}"
                                        aria-label="الصورة السابقة"
                                        type="button"
                                    >

                                        <i class="fa-solid fa-chevron-right"></i>

                                    </button>


                                    <button
                                        class="media-next media-next-${caseIndex}"
                                        aria-label="الصورة التالية"
                                        type="button"
                                    >

                                        <i class="fa-solid fa-chevron-left"></i>

                                    </button>


                                    <div
                                        class="swiper-pagination media-pagination media-pagination-${caseIndex}"
                                    ></div>


                                    <div class="media-counter">

                                        <span class="current-media">
                                            01
                                        </span>

                                        /

                                        <span>
                                            ${String(
                                                caseItem.media.length
                                            ).padStart(2, "0")}
                                        </span>

                                    </div>

                                </div>

                            </div>


                            <div class="case-content">

                                <span class="case-category">
                                    ${caseItem.category}
                                </span>


                                <h3 class="case-title">
                                    ${caseItem.title}
                                </h3>


                                <p class="case-description">
                                    ${caseItem.description}
                                </p>

                            </div>

                        </article>

                    </div>

                `;


                casesWrapper.insertAdjacentHTML(
                    "beforeend",
                    cardHTML
                );
            }
        );



        casesData.forEach(
            function (
                caseItem,
                index
            ) {

                const swiperElement =
                    document.querySelector(
                        `.mediaSwiper-${index}`
                    );


                if (!swiperElement) {
                    return;
                }


                const swiper =
                    new Swiper(
                        swiperElement,
                        {

                            slidesPerView: 1,

                            spaceBetween: 0,

                            loop:
                                caseItem.media.length >
                                1,

                            speed: 700,

                            effect: "slide",


                            pagination: {

                                el:
                                    `.media-pagination-${index}`,

                                clickable:
                                    true
                            },


                            navigation: {

                                nextEl:
                                    `.media-next-${index}`,

                                prevEl:
                                    `.media-prev-${index}`
                            },


                            on: {

                                slideChange:
                                    function () {

                                        const card =
                                            this.el.closest(
                                                ".case-card"
                                            );

                                        if (!card) {
                                            return;
                                        }


                                        const counter =
                                            card.querySelector(
                                                ".current-media"
                                            );

                                        if (!counter) {
                                            return;
                                        }


                                        const realIndex =
                                            this.realIndex +
                                            1;


                                        counter.textContent =
                                            String(
                                                realIndex
                                            ).padStart(
                                                2,
                                                "0"
                                            );
                                    }
                            }
                        }
                    );
            }
        );



        const casesSwiperElement =
            document.querySelector(
                ".casesSwiper"
            );


        if (casesSwiperElement) {

            new Swiper(
                casesSwiperElement,
                {

                    slidesPerView: 1,

                    spaceBetween: 25,

                    speed: 800,

                    grabCursor: true,

                    watchOverflow: true,


                    navigation: {

                        nextEl:
                            ".cases-next",

                        prevEl:
                            ".cases-prev"
                    },


                    pagination: {

                        el:
                            ".cases-pagination",

                        clickable:
                            true
                    },


                    breakpoints: {

                        576: {

                            slidesPerView: 1
                        },

                        768: {

                            slidesPerView: 2,

                            spaceBetween: 25
                        },

                        1200: {

                            slidesPerView: 3,

                            spaceBetween: 30
                        }
                    }
                }
            );
        }
    }
  const offersSwiperElement = document.querySelector(".offersSwiper");

if (
    offersSwiperElement &&
    typeof Swiper !== "undefined"
) {

    new Swiper(offersSwiperElement, {

        slidesPerView: 1,
        centeredSlides: true,

        spaceBetween: 15,

        loop: true,
        speed: 700,

        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },

        grabCursor: true,

        /* Navigation */
        navigation: {
            nextEl: ".offers-next",
            prevEl: ".offers-prev"
        },

        pagination: {
            el: ".offers-pagination",
            clickable: true
        },

        breakpoints: {

            576: {
                slidesPerView: 1.5,
                spaceBetween: 18,
                centeredSlides: true
            },

            768: {
                slidesPerView: 2,
                spaceBetween: 22,
                centeredSlides: true
            },

            992: {
                slidesPerView: 3,
                spaceBetween: 25,
                centeredSlides: true
            },

            1200: {
                slidesPerView: 3,
                spaceBetween: 30,
                centeredSlides: true
            }
        }

    });
}
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const modalVideoSource = document.getElementById("modalVideoSource");

if (videoModal && modalVideo && modalVideoSource) {

    videoModal.addEventListener("show.bs.modal", function (event) {

        const button = event.relatedTarget;

        if (!button) return;

        const videoSrc = button.getAttribute("data-video");

        if (videoSrc) {
            modalVideoSource.src = videoSrc;
            modalVideo.load();
        }
    });

    videoModal.addEventListener("shown.bs.modal", function () {
        modalVideo.play().catch(() => {});
    });

    videoModal.addEventListener("hidden.bs.modal", function () {

        modalVideo.pause();

        modalVideoSource.src = "";

        modalVideo.load();
    });
}


const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");

if (imageModal && modalImage) {

    imageModal.addEventListener("show.bs.modal", function (event) {

        const button = event.relatedTarget;

        if (!button) return;

        const imageSrc = button.getAttribute("data-image");

        if (imageSrc) {
            modalImage.src = imageSrc;
        }
    });


    imageModal.addEventListener("hidden.bs.modal", function () {

        modalImage.src = "";

    });

}




    if (
        typeof AOS !== "undefined"
    ) {

        AOS.init({

            duration: 900,

            easing: "ease-out-cubic",

            once: false,

            offset: 100,

            delay: 0
        });
    }

});

