// Global Variables
let headerHeight = $('header').height();
let designerCardHeight = $('.designer-card').height();
let triggerHeight = designerCardHeight + 75;
const behanceKey = '40CPyv6Gz9Kny0Hl2vwjYBhbGM2zdplV';


// Loader
$(document).ready(function () {
    $(document).ready(function(){
        $(this).scrollTop(0);
    });
    setTimeout(function() {
        $('.loader').addClass('hidden-opacity');
    }, 1500); // TODO: Change back to 1500
    setTimeout(function() {
        $('.loader').addClass('hidden');
        loadHero();
    }, 2000); // TODO: Change back to 2000
});

// Load hero content
function loadHero() {
    $('.hero-content').append('<object type="image/svg+xml" data="img/teamillustration-animated.svg"></object>');
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

// Load designers data
$.getJSON('js/designers.json', function(data) {
    for (let i = 0; i < data.designer.length; i++) {  // TODO: change to handlebars
        $('main').append(`<div class="designer-card dc${i}"><div class="designer-card-top"><div class="designer-details"><h3>${data.designer[i].name}</h3><h4>${data.designer[i].title}</h4><p>${data.designer[i].bio}</p><button class="projects-button pointer" data-index="${i}">View Projects</button></div><div class="designer-image"><img src="${data.designer[i].image}" alt="${data.designer[i].name}'s Profile Photo"></div></div><div class="designer-card-bottom projects-closed dcb${i}"><ul class="projects projects${i}"></ul></div></div>`);
    }
    $('.projects-button').click(function(){
        $('.projects').empty();
        let clickedDesigner = this.dataset.index;
        let behanceUser = data.designer[clickedDesigner].userID; 
        $(`.dcb${clickedDesigner}`).toggleClass('projects-closed');
        $(`.dc${clickedDesigner}`).toggleClass('designer-card-full');
        document.querySelector(`.dc${clickedDesigner}`).scrollIntoView();
        if (this.firstChild.nodeValue === "View Projects") {
            this.firstChild.nodeValue = "Close Projects";
            loadProjects(clickedDesigner, behanceUser);
        } else {
            this.firstChild.nodeValue = "View Projects";
        }
    })
    headerHeight = $('header').height();
    designerCardHeight = $('.designer-card').height();
    triggerHeight = designerCardHeight + 75;
});



// Scroll functions
// Recalculate heights on window resize
var onResize = function () {
    headerHeight = $('header').height();
    let designerCardHeight = $('.designer-card').height();
    triggerHeight = designerCardHeight + 75;
};

$(document).ready(function () {
    onResize();
    $(window).on('resize', function () {
        onResize();
    });
})

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
    for (let i = 0; i < 4; i++) {
        if ($(this).scrollTop() > ((headerHeight / 2) + triggerHeight * i)) {
            $(`.dc${i}`).addClass('on-screen');
        } else {
            $(`.dc${i}`).removeClass('on-screen')
        }
    }
});

//Behance API
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
    
    
            // Remove preloader
            setTimeout(function() {
                $('.pre-loader').detach();
                $('.projects').empty();
                var projects = res.projects;
        
                if (res.projects.length > 0) {
                    projects.forEach(function(project) {
                        $(`<li><div class="image-container"><img class="project-thumbnail" src="${project.covers.original}"></div></li>`).appendTo(`ul.projects${i}`);
                    });
                } else {
                    $('<div class="no-results"><p>No matching projects.<br>Please adjust your search filters and try again.</p>').prependTo('.projects');
                }
            }, 1200);
            
    
            
            
        },
    
        // if the ajax request fails do these things as a fallback
        error: function(res) { // eslint-disable-line
            $('<h1> Error!! </h1>').appendTo('body');
        }
    
    }); // END ajax request
}

