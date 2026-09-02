document.addEventListener("DOMContentLoaded", function () {

    const categoryButtons = document.querySelectorAll(".category-btn");
    const blogItems = document.querySelectorAll(".blog-item");
    const searchInput = document.getElementById("blogSearch");
    const noResults = document.getElementById("noResults");


    let activeCategory = "all";


    function filterBlogs() {

        const searchValue = searchInput.value
            .trim()
            .toLowerCase();

        let visibleCount = 0;


        blogItems.forEach(function (item) {

            const category = item.dataset.category;
            const title = item.dataset.title.toLowerCase();

            const categoryMatch =
                activeCategory === "all" ||
                category === activeCategory;

            const searchMatch =
                title.includes(searchValue);


            if (categoryMatch && searchMatch) {

                item.classList.remove("d-none");

                item.style.animation = "none";

                void item.offsetWidth;

                item.style.animation =
                    "blogReveal .7s ease forwards";

                visibleCount++;

            } else {

                item.classList.add("d-none");

            }

        });


        if (visibleCount === 0) {
            noResults.classList.remove("d-none");
        } else {
            noResults.classList.add("d-none");
        }

    }



    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            activeCategory = this.dataset.category;

            filterBlogs();

        });

    });



    searchInput.addEventListener("input", function () {
        filterBlogs();
    });


});