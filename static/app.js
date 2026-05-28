//const text    = new Typed('.text' , {
// string: ["Frontend developer", "UIUX Designer"],
// typeSpeed: 100,
// backSpeed: 100,
//  backDelay: 1000,
//   loop: true
//}
//);
///// typing text

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

/// about typing text

const typingText2 = document.getElementById("typing-text2");
const fullstackText = "Fullstack Developer";
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
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isvalid = true;

  
  const namevalue = document.getElementById("name").value.trim();
  const emailvalue = document.getElementById("email").value.trim();
  const subjectvalue = document.getElementById("subject").value.trim();
  const messagevalue = document.getElementById("message").value.trim();

  console.log("name:", namevalue);
  console.log("email:", emailvalue);
  console.log("subject:", subjectvalue);
  console.log("message:", messagevalue);

  
  if (namevalue === "") {
    //alert("please enter your name");
    isvalid = false;
    return;
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(emailvalue)) {
    //alert("please enter a valid email");
    isvalid = false;
    return;
  }
  if (subjectvalue === "") {
    //alert("enter a subject");
    isvalid = false;
    return;
  }
  if (messagevalue === "") {
    //alert("enter a message");
    isvalid = false;
    return;
  }

  if (isvalid) {
    alert("Thanks! Your message has been sent successfully.");
   form.reset();
 }

  
});

//// menu-toggle
const btn = document.getElementById("menu-icon");
const nav = document.getElementById("mobile");

btn.onclick = () => {
  if (nav.style.display == "block") {
    nav.style.display = "none";
    btn.setAttribute("src", "./images/icon-menu.svg");
  } else {
    nav.style.display = "block";
    btn.setAttribute("src", "./images/icon-close.svg");
  }
};

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
              setTimeout(update, 20); // 20ms delay between steps
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






































// document.addEventListener("DOMContentLoaded", () => {
//   const skills = [
//     { id: "html-skill", valueId: "html-value", value: 90 },
//     { id: "css-skill", valueId: "css-value", value: 80 },
//     { id: "javascript-skill", valueId: "javascript-value", value: 70 },
//     { id: "bootstrap-skill", valueId: "bootstrap-value", value: 75 },
//     { id: "figma-skill", valueId: "figma-value", value: 85 },
//     { id: "python-skill", valueId: "python-value", value: 65 }
//   ];

//   skills.forEach(skill => {
//     const range = document.getElementById(skill.id);
//     const text = document.getElementById(skill.valueId);

//     if (!range || !text) return; // prevent any errors

//     let current = 0;
//     const target = skill.value;
//     const interval = setInterval(() => {
//       if (current >= target) {
//         clearInterval(interval);
//       } else {
//         current++;
//         range.value = current;
//         range.style.setProperty("--val", `${current}%`);
//         text.textContent = `${current}%`;
//       }
//     }, 15); // controls animation speed
//   });
// });

// // Robust skill-range animator
// (() => {
//   // Define skills by range input id + final value
//   const skills = [
//     { id: 'html-skill', value: 0 },
//     { id: 'css-skill', value: 0 },
//     { id: 'javascript-skill', value: 0},
//     { id: 'bootstrap-skill', value: 0},
//     { id: 'python-skill', value: 0},
//     { id: 'figma-skill', value: 0}
//   ];

//   // Animation duration in ms for each bar (adjust as desired)
//   const DURATION = 800;

//   skills.forEach(skill => {
//     const rangeEl = document.getElementById(skill.id);

//     if (!rangeEl) {
//       // defensive: if the input is missing, warn and skip
//       console.warn(`Range input not found: #${skill.id} — skipping this skill.`);
//       return;
//     }

//     // Try to find the associated span that displays the percent.
//     // Priority:
//     // 1) element with id `${id.replace('-skill','')}-value` (if you gave one)
//     // 2) previousElementSibling if it's a <span> (your HTML: <label>, <span>, <input>)
//     // 3) first <span> found inside the same parent
//     const autoId = skill.id.replace('-skill', '') + '-value';
//     let valueEl = document.getElementById(autoId);

//     if (!valueEl) {
//       const prev = rangeEl.previousElementSibling;
//       if (prev && prev.tagName && prev.tagName.toLowerCase() === 'span') {
//         valueEl = prev;
//       } else if (rangeEl.parentElement) {
//         valueEl = rangeEl.parentElement.querySelector('span');
//       }
//     }

//     if (!valueEl) {
//       // not fatal — warn and create a lightweight one after the label so the user sees progress
//       console.warn(`Percent <span> not found for #${skill.id}. Creating a fallback span.`);
//       const fallback = document.createElement('span');
//       fallback.textContent = '0%';
//       // insert fallback before the range element
//       rangeEl.parentElement && rangeEl.parentElement.insertBefore(fallback, rangeEl);
//       valueEl = fallback;
//     }

//     // Ensure range starts at 0 visually
//     rangeEl.value = 0;
//     rangeEl.style.setProperty('--val', '0%');
//     valueEl.textContent = '0%';

//     // Animation using requestAnimationFrame for smoothness
//     let start = null;
//     const from = 0;
//     const to = Math.max(0, Math.min(100, skill.value | 0)); // clamp & ensure number

//     function step(timestamp) {
//       if (!start) start = timestamp;
//       const elapsed = timestamp - start;
//       const progress = Math.min(1, elapsed / DURATION); // 0..1

//       // ease-out (optional): use a simple ease function
//       const eased = 1 - Math.pow(1 - progress, 3);

//       const current = Math.round(from + (to - from) * eased);

//       // update range, css variable, and text
//       rangeEl.value = current;
//       rangeEl.style.setProperty('--val', `${current}%`);
//       valueEl.textContent = `${current}%`;

//       if (progress < 1) {
//         requestAnimationFrame(step);
//       } else {
//         // ensure final exact value
//         rangeEl.value = to;
//         rangeEl.style.setProperty('--val', `${to}%`);
//         valueEl.textContent = `${to}%`;
//       }
//     }

//     // Start animation on next frame (safer than starting immediately)
//     requestAnimationFrame(step);
//   });
// })();

// const skills = [
//   { id: "html-skill", valueId: "html-value", value: 90 },
//   { id: "css-skill", valueId: "css-value", value: 80 },
//   { id: "js-skill", valueId: "js-value", value: 20 },
//   { id: "bootstrap-skill", valueId: "bootstrap-value", value: 60 },
//   { id: "python-skill", valueId: "python-value", value: 30 },
//   { id: "figma-skill", valueId: "figma-value", value: 80 },
// ];
// skills.forEach((skill) => {
//   const range = document.getElementById(skill.id);
//   const text = document.getElementById(skill.valueId);
//   let current = 0;

//   const interval = setInterval(() => {
//     if (current >= skill.value) {
//       clearInterval(interval);
//     } else {
//       current++;
//       range.value = current;
//       range.style.setProperty('--val', `${current}%`);
//       text.content = `${current}%`;
//     }
//   }, 15); // animation speed
// });

//  const typewriter = document.getElementById('about-text');
//  const text = "Full-stack Developer"
//  let i = 0 ;
//      let isDeleting = false;

//     function type() {
//         if (!isDeleting) {
//             typewriter.innerHTML = text.substring(0, i + 1);
//             i++;
//             if (i === text.length) {
//                 isDeleting = true;
//                 setTimeout(type, 1000);
//                 return;
//             }
//         } else {
//             typewriter.innerHTML = text.substring(0, i - 1);
//             i --;
//             if (i === 0) {
//                 isDeleting = false;
//             }
//         }
//          setTimeout(type, isDeleting ? 50 : 100);
//     }
//     type();
