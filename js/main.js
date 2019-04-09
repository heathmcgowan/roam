// Global Variables
var numberInArray = 1;
let headerHeight = $('header').height();
let designerCardHeight = $('.designer-card').height();
let triggerHeight = designerCardHeight + 75;
const behanceKey = 'SCJnOBwjJqgpwxIybOHvs0cUt0XRrydH';
// const behanceKey = '40CPyv6Gz9Kny0Hl2vwjYBhbGM2zdplV';
let designer = [
    {
        bio: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus illum suscipit dolore minima consequatur ex quasi, eveniet facere aut. Placeat minima rerum debitis eaque neque mollitia quia facere laudantium numquam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus illum suscipit dolore minima consequatur.',
        userID: 'CourtneyTyler'
    },
    {
        bio: 'Accusamus illum suscipit dolore minima consequatur ex quasi, eveniet facere aut. Placeat minima rerum debitis eaque neque mollitia quia facere laudantium numquam?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus illum suscipit dolore minima consequatur ex quasi, eveniet facere aut. Placeat minima rerum debitis eaque neque mollitia quia facere laudantium numquam?',
        userID: 'otvazhniy'
    },
    {
        bio: 'Lorem ipsum dolor sit, amet consectetur adipisiasfa sfa sfcing elit. Accusamua sfa s illum suscipit dolore ma sfinima consequatur ex quasi, eveniet facere aut. Placeat minima rerum debitis eaque neque mollitia quia facere laudantium numquam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus illum suscipit dolore minima consequatur.',
        userID: 'fatihocak'
    },
    {
        bio: 'Accusamus illum suscipitas fa dolorasf asf minima consequatur ex qu asfasi, easfa s avenieta sf facere aut. Placeat minima asf asrerum debitis eaque neque mollitia quia facere laudantium numquam?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus illum suscipit dolore minima consequatur ex quasi, eveniet facere aut. Placeat minima rerum debitis eaque neque mollitia quia facere laudantium numquam?',
        userID: 'nerokore'
    }
]
boris = {
    name: 'Boris',
    image: '../img/boris.jpg',
    title: 'CEO',
    bio: "Boris is the fat cat in charge. He sleeps all day while his team does all the hard work. There's no pussyfooting around it, he expects only the best, so don't rub him the wrong way. Get everything purrfect and he'll think you're the cat's whiskers.",
    userID: 'nerokore'
}

$(document).ready(function () {
    $(document).scrollTop(0);
    updateDesignerArray();
    designer.push(boris);
    checkArrayLoaded();
});

// Check Designer's details pulled from Behance correctly before removing loader
function checkArrayLoaded() {
    if (numberInArray < designer.length) {
        window.setTimeout(checkArrayLoaded, 100);
    } else if (numberInArray === designer.length) {
        removeLoader();
    }
}

// Remove loader
function removeLoader() {
    console.log('done');
    setTimeout(function() {
        $('.loader').addClass('hidden-opacity');
    }, 1500); // TODO: Change back to 1500
    setTimeout(function() {
        $('.loader').addClass('hidden');
        loadHero();
        loadDesigners();
    }, 2000); // TODO: Change back to 2000
}

// Show hero content
function loadHero() {
    $('.hero-content').append('<object type="image/svg+xml" id="team-illustration" data="img/teamillustration-animated.svg"></object>');
    setTimeout(function() {
        $('.background-triangle').removeClass('hidden-opacity');
    }, 200);
    setTimeout(function() {
        $('.hero-heading').removeClass('hero-heading-hidden');
    }, 600);
    setTimeout(function() {
        $('.scroll-heading').removeClass('hidden-opacity');
        $('.scroll-hero').append('<svg width="50px" height="60px" version="1.1" id="scroll-animation"><path fill="transparent" stroke="#171324" stroke-width="4" d="M 50 0 L 50 300" class="path"></path></svg>');
    }, 2200);
}

// Insert designer cards
function loadDesigners() {
    for (let i = 0; i < designer.length; i++) {  // TODO: change to handlebars
        $('main').append(`<div class="designer-card dc${i}"><div class="designer-card-top"><div class="designer-details"><h3>${designer[i].name}</h3><h4>${designer[i].title}</h4><p>${designer[i].bio}</p><button class="projects-button pointer" data-index="${i}">View Projects</button></div><div class="designer-image"><img src="${designer[i].image}" alt="${designer[i].name}'s Profile Photo"></div></div><div class="designer-card-bottom projects-closed dcb${i}"><ul class="projects projects${i}"></ul></div></div>`);
    }
    $('.projects-button').click(function(){
        $('.projects').empty();
        let clickedDesigner = this.dataset.index;
        let behanceUser = designer[clickedDesigner].userID; 
        $(`.dcb${clickedDesigner}`).toggleClass('projects-closed');
        $(`.dc${clickedDesigner}`).toggleClass('designer-card-full');
        document.querySelector(`.dc${clickedDesigner}`).scrollIntoView(); // ! FIXME: button functionality needs fixed
        if (this.firstChild.nodeValue === "View Projects") {
            this.firstChild.nodeValue = "Close Projects";
            loadProjects(clickedDesigner, behanceUser);
        } else {
            this.firstChild.nodeValue = "View Projects";
        }
    })
    onResize();
}

// Recalculate heights on window resize
function onResize() {
    headerHeight = $('header').height();
    designerCardHeight = $('.designer-card').height();
    triggerHeight = designerCardHeight + 75;
}

$(window).on('resize', function () {
    onResize();
});

// Add/Remove classes on scroll
$(window).scroll(function () {
    if ($(this).scrollTop() > headerHeight / 5) {
        $('#main').removeClass('dark-background');
        $('.background-triangle').addClass('hidden-opacity');
        $('.scroll-hero').addClass('hidden-opacity');
    } else {
        $('#main').addClass('dark-background');
        $('.background-triangle').removeClass('hidden-opacity');
        $('.scroll-hero').removeClass('hidden-opacity');
    }
    // TODO: Update loop with array details
    for (let i = 0; i < designer.length; i++) {
        if ($(this).scrollTop() > ((headerHeight / 2) + triggerHeight * i)) {
            $(`.dc${i}`).addClass('on-screen');
        } else {
            $(`.dc${i}`).removeClass('on-screen')
        }
    }
});

// Behance API - Get Designers' Details
function updateDesignerArray() {
    for (let i = 0; i < designer.length; i++) {
        let urlProjects = `https://api.behance.net/v2/users/${designer[i].userID}?client_id=${behanceKey}`;
        let currentUser = i;
        $.ajax({
            url: urlProjects,
            dataType: 'jsonp',
            success: function(res) { // eslint-disable-line
                designer[currentUser].name = `${res.user.first_name} ${res.user.last_name}`;
                designer[currentUser].image = res.user.images['276'];
                designer[currentUser].title = res.user.occupation;
                numberInArray ++;
            }
        });
    }
}


// Behance API - List Designer's Projects
function loadProjects(i, behanceUser) {
    let urlProjects = `https://api.behance.net/v2/users/${behanceUser}/projects?client_id=${behanceKey}&per_page=12`;
    $.ajax({
        url: urlProjects,
        dataType: 'jsonp',
        // Ajax request loading
        beforeSend: function(res) { // eslint-disable-line
            $('<div class="pre-loader"><object type="image/svg+xml" data="img/loader.svg"></object></div>').prependTo(`ul.projects${i}`);
        },
        // Ajax request complete
        success: function(res) { // eslint-disable-line
            console.log(res);
            setTimeout(function() {
                $('.pre-loader').detach();
                $('.projects').empty();
                var projects = res.projects;
                if (res.projects.length > 0) {
                    projects.forEach(function(project) {
                        $(`<li><div class="image-container"><img class="project-thumbnail" src="${project.covers['404']}"><div class="thumbnail-overlay"><h5 class="thumbnail-title">${project.name}</h5><h5 class="thumbnail-appreciations"><i class="fas fa-thumbs-up"></i> ${project.stats.appreciations}</h5><h5 class="thumbnail-views">${project.stats.views} <i class="fas fa-eye"></i></h5></div></div></li>`).appendTo(`ul.projects${i}`);
                    });
                } else {
                    $('<div class="no-results"><p>No matching projects.<br>Please adjust your search filters and try again.</p>').prependTo('.projects');
                }
            }, 1200);  
        }
    }); // END ajax request
}



// Load designers data
// $.getJSON('js/designers.json', function(data) {
//     for (let i = 0; i < data.designer.length; i++) {  // TODO: change to handlebars
//         $('main').append(`<div class="designer-card dc${i}"><div class="designer-card-top"><div class="designer-details"><h3>${data.designer[i].name}</h3><h4>${data.designer[i].title}</h4><p>${data.designer[i].bio}</p><button class="projects-button pointer" data-index="${i}">View Projects</button></div><div class="designer-image"><img src="${data.designer[i].image}" alt="${data.designer[i].name}'s Profile Photo"></div></div><div class="designer-card-bottom projects-closed dcb${i}"><ul class="projects projects${i}"></ul></div></div>`);
//     }
//     $('.projects-button').click(function(){
//         $('.projects').empty();
//         let clickedDesigner = this.dataset.index;
//         let behanceUser = data.designer[clickedDesigner].userID; 
//         $(`.dcb${clickedDesigner}`).toggleClass('projects-closed');
//         $(`.dc${clickedDesigner}`).toggleClass('designer-card-full');
//         document.querySelector(`.dc${clickedDesigner}`).scrollIntoView(); // ! FIXME: button functionality needs fixed
//         if (this.firstChild.nodeValue === "View Projects") {
//             this.firstChild.nodeValue = "Close Projects";
//             loadProjects(clickedDesigner, behanceUser);
//         } else {
//             this.firstChild.nodeValue = "View Projects";
//         }
//     })
//     headerHeight = $('header').height();
//     designerCardHeight = $('.designer-card').height();
//     triggerHeight = designerCardHeight + 75;
// });

