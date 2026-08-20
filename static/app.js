
window.addEventListener("load", () => {
  document.querySelector(".home").classList.add("show");
});

window.addEventListener("load", () => {
  document.querySelector(".about").classList.add("show");
});

//// menu toggle
const MenuIcon = document.getElementById("openbtn");
const CloseIcon = document.getElementById("closebtn");
const NavBar = document.getElementById('mobile');

MenuIcon.addEventListener("click", () =>{
  NavBar.classList.add("active");

  MenuIcon.style.display = "none";
  CloseIcon.style.display = "block";
});

CloseIcon.addEventListener("click", () =>{
  NavBar.classList.remove("active");

  CloseIcon.style.display = "none";
  MenuIcon.style.display = "block";
});
console.log(NavBar.classList)

const typingText = document.getElementById("typing-text");
const strings = ["Front-end Developer", "UI/UX Designer", "Back-end Developer"];
let currentString = 0;
let currentChar = 0;

function type() {
  if (currentChar < strings[currentString].length) {
    typingText.textContent += strings[currentString][currentChar];
    currentChar++;
    setTimeout(type, 50);
  } else {
    setTimeout(erase, 1000);
  }
}

function erase() {
  if (currentChar > 0) {
    typingText.textContent = strings[currentString].slice(0, --currentChar);
    setTimeout(erase, 50);
  } else {
    currentString = (currentString + 1) % strings.length;
    currentChar = 0;
    setTimeout(type, 1000);
  }
}
type();

function updateValue(slider) {
  slider.nextElementSibling.textContent = slider.value;
}


const typingText2 = document.getElementById("typing-text2");
const fullstackText = "Fullstack Web Developer";
let charIndex2 = 0;
let isDeleting2 = false;

function typeFullstackLoop() {
  if (!isDeleting2) {
    // typing
    typingText2.textContent = fullstackText.slice(0, charIndex2 + 1);
    charIndex2++;
    if (charIndex2 === fullstackText.length) {
      // pause at full text
      isDeleting2 = true;
      setTimeout(typeFullstackLoop, 1000);
      return;
    }
  } else {
    // deleting
    charIndex2--;
    typingText2.textContent = fullstackText.slice(0, charIndex2);
    if (charIndex2 === 0) {
      // start typing again
      isDeleting2 = false;
      setTimeout(typeFullstackLoop, 500);
      return;
    }
  }
  setTimeout(typeFullstackLoop, 100);
}

// start loop
typeFullstackLoop();



// form validation
const form = document.getElementById("myform");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const res = await fetch("https://formspree.io/f/mvzylqbw", {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" }
  });

  if (res.ok) {
    alert("Message sent!");
    form.reset();
  }
});

///// RANGE - ANIMATION
const skillSection = document.querySelector("#skill-section");
const skills = [
  { id: "html-skill", valueId: "html-value" },
  { id: "css-skill", valueId: "css-value" },
  { id: "javascript-skill", valueId: "javascript-value" },
  { id: "bootstrap-skill", valueId: "bootstrap-value" },
  { id: "python-skill", valueId: "python-value" },
  { id: "figma-skill", valueId: "figma-value" },
];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skills.forEach((skill) => {
          const input = document.getElementById(skill.id);
          const span = document.getElementById(skill.valueId);
          if (!input || !span) return;

          const target = parseInt(input.dataset.target);
          let current = 0;

          const update = () => {
            if (current <= target) {
              input.value = current;
              input.style.setProperty("--val", `${current}%`);
              span.textContent = `${current}%`;
              current++;
              setTimeout(update, 15); // 20ms delay between steps
            }
          };
          update();
        });
      } else {
        // Reset when you scroll away
        skills.forEach((skill) => {
          const input = document.getElementById(skill.id);
          const span = document.getElementById(skill.valueId);
          if (!input || !span) return;

          input.value = 0;
          input.style.setProperty("--val", "0%");
          span.textContent = "0%";
        });
      }
    });
  },
  { threshold: 0.4 }
);

observer.observe(skillSection);

//////

// MODAL
const UiUxBtn = document.getElementById("uiuxbtn");
const FrontEndBtn = document.getElementById("frontendbtn");
const BackEndBtn = document.getElementById("backendbtn");

const UiuxModal = document.getElementById("uiuxmodal");
const WebDesignModal = document.getElementById("webdesignmodal");
const WebAppModal = document.getElementById("webappmodal");

const CancelBtn = document.querySelectorAll(".cancelbtn");

UiUxBtn.addEventListener("click", () => {
  UiuxModal.style.display = "block"
});

CancelBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.style.display = "none"
    });
  });
});

FrontEndBtn.addEventListener("click", () => {
  WebDesignModal.style.display = "block"
});

BackEndBtn.addEventListener("click", () => {
  WebAppModal.style.display = "block"
});

