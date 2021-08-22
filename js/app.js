/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

// Section class which will contain all funtcions we will use for each section

//start section class

class Section {
  sectionId = 0;

  addSection() {
    this.sectionId += 1;
    const main = document.querySelector("main");
    const sectionData = `
    <section id="section${this.sectionId}" data-navbar="Section ${this.sectionId}" class="your-active-class">
      <div class="landing__container">
        <h2>Section ${this.sectionId}</h2>
        <p>This is the content of the section</p>
      </div>
    </section>`;
    main.insertAdjacentHTML("beforeend", sectionData);
  }
  getID() {
    return this.sectionId;
  }
}

//end section class

//Navbar class which will build the navbar area
// Start Class Navbar

class Navbar {
  navbarElement = document.getElementById("navbar__list");

  createNavbar(id) {
    let navbarItems = [];
    const navbarItem = document.getElementById(`section${id}`);
    const navbarContent = `<li>
        <a class="menu__link" href="#${navbarItem.id}" data-section-id="${navbarItem.id}">
        ${navbarItem.dataset.navbar}
        </a>
      </li>`;
    navbarItems.push(navbarContent);
    this.navbarElement.insertAdjacentHTML("beforeend", navbarItems);

    this.navbarElement.addEventListener("click", function (event) {
      event.preventDefault();

      // Scroll to anchor ID using scrollTO event
      document
        .getElementById(event.target.dataset.sectionId)
        .scrollIntoView({ behavior: "smooth" });

      // Add class 'active' to section

      addActiveClassStyle(event.target.dataset.sectionId);
    });
  }
}

/**
 * Define Global Variables
 *
 */
const section = new Section();
const navbar = new Navbar();

/**
 * End Global Variables

* Start Helper Functions
 *
 */

//add new section to the page
function addNewSection() {
  let id = 0;
  section.addSection();
  id = section.getID();
  // build the nav
  navbar.createNavbar(id);
}

// function to Add class 'active' to section
function addActiveClassStyle(currentID) {
  document.querySelector(".active-class")?.classList.remove("active-class");
  document
    .querySelector(`[href="#${currentID}"]`)
    .classList.add("active-class");
  document
    .querySelector(".your-active-class")
    ?.classList.remove("your-active-class");
  document.querySelector(`#${currentID}`).classList.add("your-active-class");
}

function whichSectionOnScreen(element) {
  //get the position of element
  const bound = element.getBoundingClientRect();

  //check the element in viewport
  if (
    bound.top >= -100 &&
    bound.left >= -100 &&
    bound.right <=
      (window.innerWidth || document.documentElement.clientWidth) - -100 &&
    bound.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) - -100
  ) {
    return true;
  }
}
/**
 * End Helper Functions
 * start main functions

*/
addNewSection();
addNewSection();
addNewSection();
addNewSection();

/**
 * End Main Functions
 *
 */

//add active class to current section on scroll

window.addEventListener("scroll", () => {
  document.querySelectorAll("section").forEach((element) => {
    if (whichSectionOnScreen(element)) {
      addActiveClassStyle(element.id);
    }
  });
});
