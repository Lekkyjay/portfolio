const navToggler = document.querySelector('header .nav-bar .nav-toggler');
const nav = document.querySelector('header .nav-bar nav');
const header = document.querySelector('header');
const brand = document.querySelector('header .brand a');
const navLinks = document.querySelectorAll('.nav-bar nav .nav-list li a');
const projects = document.querySelector('.nav-bar nav .nav-list .projects');
const homeLink = document.querySelector('.nav-bar nav .nav-list li a.home');
const viewWork = document.querySelector('#hero .view-work');
const container = document.querySelector('#projects .projects');
const projectCategories = document.querySelectorAll('#projects .categories div');
const boxesContainer = document.querySelector('#contact .box')
const all = document.querySelector('#projects .all')

navLinks.forEach(linkItem => {
	linkItem.addEventListener('click', (e) => {
		navLinks.forEach(navLink => {
			navLink.classList.remove('current')
		})
		e.target.classList.add('current')
	})
});

viewWork.addEventListener('click', () => {
	navLinks.forEach(navLink => {
		navLink.classList.remove('current')
	})
	projects.classList.add('current')
})


navToggler.addEventListener('click', () => {
	nav.classList.toggle('nav-toggle');
	navToggler.classList.toggle('close');
});

navLinks.forEach(linkItem => {
	linkItem.addEventListener('click', () => {
		nav.classList.toggle('nav-toggle');
		navToggler.classList.toggle('close');
	})
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#00000090';
		// brand.style.color = '#03AFC2';
	} else {
		header.style.backgroundColor = 'transparent';
		// brand.style.color = '#5c2751';
	}
});

projectCategories.forEach(category => {
	category.addEventListener('click', (e) => {
		projectCategories.forEach(cat => { cat.classList.remove('active')})
		getProjects(e.target.className)
		e.target.classList.add('active')
	})
});

function getProjects(cat) {
	fetch('js/data.json')
	.then((res) => res.json())
	.then((projects) => {
		if (cat === 'all') {
			renderProjects(projects)
		} else {
			const selectedProjects = projects.filter(project => project.class === cat)
			renderProjects(selectedProjects)
		}
	})
	.catch((err) => console.log(err))
}


function renderProjects(projects) {
	let outPut = ''
	projects.forEach((project) => {
		outPut += `
		<div class="wrapper">
			<div class="img">
				<img src="${project.src}" alt="">
			</div>
			<div class="desc">
				<div class="desc-text">
					<h2 class="title">${project.title}</h2>
					<span class="spec">${project.cat}</span>
				</div>
				<div class="project-link">
					<a href="${project.url}" class="btn">View Project</a>
					<a href="${project.url}" class="btn">GitHub</a>
				</div>
			</div>
		</div>`
	})
	container.innerHTML = outPut
	// console.log(outPut);
}

const getBoxes = () => {
	let boxes = ''
	const number_of_boxes = 10
	for (let i = 0; i < number_of_boxes; i++) {
		boxes += '<div></div>'
	}
	boxesContainer.innerHTML = boxes
}

window.addEventListener('DOMContentLoaded', (event) => {
	getProjects('all')
	all.classList.add('active')
	homeLink.classList.add('current')
	getBoxes()
});


//Add current class to sections on page scroll
const sections = document.querySelectorAll("section");

onscroll = function () {
  const scrollPosition = document.documentElement.scrollTop;

  sections.forEach((section) => {
    if (
      scrollPosition >= section.offsetTop - section.offsetHeight * 0.25 &&
      scrollPosition <
        section.offsetTop + section.offsetHeight - section.offsetHeight * 0.25
    ) {
      const currentId = section.attributes.id.value;
      removeAllActiveClasses();
      addActiveClass(currentId);
    }
  });
};

const removeAllActiveClasses = function () {
  navLinks.forEach((el) => {
    el.classList.remove("current");
  });
};

const addActiveClass = function (id) {
  // console.log(id);
  const selector = `nav a[href="#${id}"]`;
  document.querySelector(selector).classList.add("current");
};