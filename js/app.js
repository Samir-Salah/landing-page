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
  get getSectionContent() {
    return `
    <section id="section${this.sectionId}" data-navbar="Section ${this.sectionId}" class="your-active-class">
      <div class="landing__container">
        <h2>Section ${this.sectionId}</h2>
        <p>This is the content of the section</p>
      </div>
    </section>`;
  }

  addSection() {
    this.sectionId += 1;
    document
      .getElementsByTagName("main")[0]
      .insertAdjacentHTML("beforeend", this.getSectionContent);
  }
}

//end section class

//Navbar class which will build the navbar area
// Start Class Navbar

class Navbar {
  navbarElement = document.getElementById("navbar__list");

  createNavbar() {
    // var node = document.createElement("li");
    // var textnode = document.createTextNode(`Section ${secionId}`);
    // node.appendChild(textnode);
    // document.getElementById("navbar__list").appendChild(node);

    this.navbarElement.innerHTML = "";
    document.querySelectorAll("section").forEach((element) => {
      this.navbarElement.insertAdjacentHTML(
        "beforeend",
        `
      <li>
        <a class="menu__link" href="#${element.id}" data-section-id="${element.id}">
        ${element.dataset.navbar}
        </a>
      </li>`
      );
    });

    this.navbarElement.addEventListener("click", function (event) {
      event.preventDefault();

      // Scroll to anchor ID using scrollTO event
      document
        .getElementById(event.target.dataset.sectionId)
        .scrollIntoView({ behavior: "smooth" });

      // Add class 'active' to section
      document.querySelector(".active-class")?.classList.remove("active-class");
      document
        .querySelector(`[href="#${event.target.dataset.sectionId}"]`)
        .classList.add("active-class");
      document
        .querySelector(".your-active-class")
        ?.classList.remove("your-active-class");
      document
        .querySelector(`#${event.target.dataset.sectionId}`)
        .classList.add("your-active-class");
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
  section.addSection();

  // build the nav
  navbar.createNavbar();
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

// Scroll to section on link click


