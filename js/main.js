// Global Variables
let headerHeight = $('header').height();
let designerCardHeight = $('.designer-card').height();
let triggerHeight = designerCardHeight;
let triggerOffset = 75;
let modalOpen = false;
const behanceKey = '40CPyv6Gz9Kny0Hl2vwjYBhbGM2zdplV';
let designer = [
    {
        name: 'Hamish Cooper',
        title: 'Graphic Designer',
        bio: 'Hamish is our head graphic designer. Having been with Roam since 2014, he has a wealth of experience under his belt, producing only the best results for our clients.<br /><br />When Hamish isn\'t in the office, he loves to go hiking and explore the great outdoors, capturing some great shots on his DSLR in the process.',
        image: 'img/designer04.jpg',
        userID: 'hamishcooper'
    },
    {   
        name: 'Lena Plaksina',
        title: 'Web Designer',
        bio: 'Lena is a master of all things web design. Working closely with our other designers, Lena creates cutting edge web sites which are certain to make your brand stand out from the rest.<br /><br />Lena is a self-professed film nerd, spending her free time hosting movie marathons for all her friends.',
        image: 'img/designer01.jpg',
        userID: 'LenaPlaksina'
    },
    {
        name: 'Ata Hutchinson',
        title: 'UX Designer',
        bio: 'Having been with us since the beginning, Ata is a massive influence in all areas of our design team. He focuses mainly on UX design and the results speak for themselves, leaving our clients grinning from ear to ear.<br /><br />Ata is also a talented musician in his spare time. Playing 4 different instruments, he\'s a one man band!',
        image: 'img/designer02.jpg',
        userID: 'tunatipangcf7d'
    },
    {
        name: 'Hannah Jensen',
        title: 'Interaction Designer',
        bio: 'Hannah is the office clown, but don\'t let that fool you, her interaction design skills are second to none.<br /><br />When she\'s not hard at work, she can usually be found at the beach during Summer, or dreaming about the beach during Winter.',
        image: 'img/designer03.jpg',
        userID: 'hannahcoolcatjensen'
    },
    {   
        name: 'Boris',
        title: 'CEO',
        image: 'img/boris.jpg',
        bio: "Boris is the fat cat in charge. He sleeps all day while his team does all the hard work. There's no pussyfooting around it, he expects only the best, so don't rub him the wrong way. Get everything purrfect and he'll think you're the cat's whiskers.",
        userID: ''
    }
]

$(document).ready(function () {
    removeLoader();
});

// Remove loader
function removeLoader() {
    setTimeout(function() {
        $(window).scrollTop(0);
    }, 100);
    setTimeout(function() {
        $('.loader').addClass('hidden-opacity');
    }, 1500);
    setTimeout(function() {
        $('.loader').addClass('hidden');
        loadHero();
        loadDesigners();
    }, 2000);
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
    for (let i = 0; i < designer.length; i++) {
        $('main').append(`<div class="designer-card dc${i}">
                            <div class="designer-card-top">
                                <div class="designer-details">
                                    <h3>${designer[i].name}</h3>
                                    <h4>${designer[i].title}</h4>
                                    <p>${designer[i].bio}</p>
                                    <button class="projects-button pointer" data-index="${i}">View Projects</button>
                                </div>
                                <div class="designer-image">
                                    <img src="${designer[i].image}" alt="${designer[i].name}'s Profile Photo">
                                </div>
                            </div>
                            <div class="designer-card-bottom projects-closed dcb${i}">
                                <ul class="projects projects${i}"></ul>
                            </div>
                        </div>`);
    }
    $('.projects-button').click(function(){
        let clickedDesigner = this.dataset.index;
        let behanceUser = designer[clickedDesigner].userID;
        if (this.firstChild.nodeValue === "View Projects") {
            $('.projects-button').text('View Projects');
            this.firstChild.nodeValue = "Close Projects";
            $('.projects').empty();
            $('.designer-card-bottom').addClass('projects-closed');
            $(`.dcb${clickedDesigner}`).removeClass('projects-closed');
            $('.designer-card').removeClass('designer-card-full');
            $(`.dc${clickedDesigner}`).addClass('designer-card-full');
            document.querySelector(`.dc${clickedDesigner}`).scrollIntoView()
            loadProjects(clickedDesigner, behanceUser);
        } else {
            this.firstChild.nodeValue = "View Projects";
            $('.projects').empty();
            $('.designer-card-bottom').addClass('projects-closed');
            $('.designer-card').removeClass('designer-card-full');
        }
    })
    onResize();
}

// Recalculate heights on window resize
function onResize() {
    headerHeight = $('header').height();
    designerCardHeight = $('.designer-card').height();
    triggerHeight = designerCardHeight + triggerOffset;
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
    for (let i = 0; i < designer.length; i++) {
        if ($(this).scrollTop() > ((headerHeight / 2) + triggerHeight * i)) {
            $(`.dc${i}`).addClass('on-screen');
        } else {
            $(`.dc${i}`).removeClass('on-screen')
        }
    }
});

// Behance API - List Designer's Projects
function loadProjects(i, behanceUser) {
    let urlProjects = `https://api.behance.net/v2/users/${behanceUser}/projects?client_id=${behanceKey}&per_page=12`;
    $.ajax({
        url: urlProjects,
        dataType: 'jsonp',
        // Ajax request loading
        beforeSend: function(res) { 
            $('<div class="pre-loader"><object type="image/svg+xml" data="img/loader.svg"></object></div>').prependTo(`ul.projects${i}`);
        },
        // Ajax request complete
        success: function(res) { 
            setTimeout(function() {
                $('.pre-loader').detach();
                $('.projects').empty();
                let projects = res.projects;
                if (res.projects.length > 0) {
                    projects.forEach(function(project) {
                        $(` <li class="project-container" data-projectid="${project.id}">
                                <div class="image-container">
                                    <img class="project-thumbnail" src="${project.covers['404']}">
                                    <div class="thumbnail-overlay"${project.id}">
                                        <h5 class="thumbnail-title">${project.name}</h5>
                                        <h5 class="thumbnail-appreciations"><i class="fas fa-thumbs-up"></i> ${project.stats.appreciations}</h5>
                                        <h5 class="thumbnail-views">${project.stats.views} <i class="fas fa-eye"></i></h5>
                                    </div>
                                </div>
                            </li>`).appendTo(`ul.projects${i}`);
                    });
                    $('.project-container').click(function(){
                        let clickedProject = this.dataset.projectid;
                        if (modalOpen === false) {
                            modalOpen = true;
                            openModal(clickedProject);
                        }
                    })
                } else {
                    $('<div class="no-results"><p>No matching projects.<br>Please adjust your search filters and try again.</p>').prependTo('.projects');
                }
            }, 1200);  
        }
    }); // END ajax request
}

// Behance API - Open clicked project
function openModal(clickedProject) {
    $('.project-modal').removeClass('modal-closed');
    $('.modal-bottom-container').removeClass('hidden');
    $('.modal-footer').removeClass('hidden');
    $('body').css('overflow', 'hidden');
    $('html').css('overflow', 'hidden');
    fillModal(clickedProject);
}

function fillModal(clickedProject) {
    let urlProjects = `https://www.behance.net/v2/projects/${clickedProject}?api_key=${behanceKey}`;
    let urlProjectsComments = `https://api.behance.net/v2/projects/${clickedProject}/comments?client_id=${behanceKey}`
    $.ajax({
        url: urlProjects,
        dataType: 'jsonp',
        // Ajax request loading
        beforeSend: function(res) {
            $('<div class="modal-pre-loader"><object class="loader-svg" type="image/svg+xml" data="img/loader.svg"></object></div>').appendTo('.project-modal');
        },
        // Ajax request complete
        success: function(res) { 
            let designer = res.project.owners[0];
            let project = res.project;
            let designerName = designer.display_name;
            let designerImage = `${designer.images['276']}`;
            let designerCity = designer.city;
            let designerCountry = designer.country;
            let designerFollowers = designer.stats.followers;
            let designerAppreciations = designer.stats.appreciations;
            let designerViews = designer.stats.views;
            let designerURL = designer.url;
            let projectTitle = project.name;
            let projectImage = `${project.covers['202']}`;
            let projectDescription = project.description;
            let projectDate = convertTimestamp(project.published_on);
            let projectViews = project.stats.views;
            let projectAppreciations = project.stats.appreciations;
            let projectComments = project.stats.comments;
            let projectTags = project.tags;
            let projectURL = project.url;

            // Fill top of modal with title, designer details, views, appreciations
            $('.view-on-behance').attr('href', projectURL);
            $(`<h1 class="project-title">${projectTitle}</h1>`).appendTo('.modal-top');
            $('.modal-top').append(`<div class="description">
                                        <h5 class="views"><i class="fas fa-eye"></i> ${projectViews}</h5>
                                        <p>${projectDescription}</p>
                                        <h5 class="appreciations">${projectAppreciations} <i class="fas fa-thumbs-up"></i></h5>
                                    </div>`);

            // Fill middle of modal with project images and videos
            let modules = res.project.modules;
            let numberOfModules = modules.length;
            for (let i = 0; i < numberOfModules; i++) {
                if (modules[i].type === 'image' && modules[i].sizes.max_1920 != undefined) {
                    $(`<img src="${modules[i].sizes.max_1920}">`).appendTo('.modal-middle');
                } else if (modules[i].type === 'image' && modules[i].sizes.max_1240 != undefined) {
                    $(`<img src="${modules[i].sizes.max_1240}">`).appendTo('.modal-middle');
                } else if (modules[i].type === 'image' && modules[i].sizes.original != undefined) {
                    $(`<img src="${modules[i].sizes.original}">`).appendTo('.modal-middle');
                } else if (modules[i].type === 'embed') {
                    $(`${modules[i].embed}`).appendTo('.modal-middle');
                }
            }

            // Fill bottom of modal with details/stats
            $('.designer-info-container').append(`  <div class="designer-info-top">
                                                        <div class="info-left">
                                                            <a class="designer-link" href="${designerURL}" target="_blank"><img src="${designerImage}" alt="designer profile image" /></a>
                                                        </div>
                                                        <div class="info-right">
                                                            <a class="designer-link" href="${designerURL}" target="_blank">${designerName}</a>
                                                            <p class="designer-location">${designerCity}, ${designerCountry}</p>
                                                            <div class="designer-stats">
                                                                <span class="designer-appreciations"><i class="fas fa-thumbs-up"></i> ${designerAppreciations}</span>
                                                                <span class="designer-views"><i class="fas fa-eye"></i> ${designerViews}</span>
                                                                <span class="designer-followers"><i class="fas fa-user-friends"></i> ${designerFollowers}</span>
                                                                </div>
                                                        </div>
                                                    </div>`);
            $('.project-info-container').append(`   <div class="project-info-top">
                                                        <div class="info-left">
                                                            <a class="designer-link" href="${projectURL}" target="_blank"><img src="${projectImage}" alt="project image" /></a>
                                                        </div>
                                                        <div class="info-right">
                                                            <a class="designer-link" href="${projectURL}" target="_blank"><h4>${projectTitle}</h4></a>
                                                            <p class="project-date">${projectDate}</p>
                                                            <p>${projectDescription}</p>
                                                            <div class="project-stats">
                                                                <span class="project-appreciations"><i class="fas fa-thumbs-up"></i> ${projectAppreciations}</span>
                                                                <span class="project-views"><i class="fas fa-eye"></i> ${projectViews}</span>
                                                                <span class="project-comments"><i class="fas fa-comment"></i> ${projectComments}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ul class="project-tags">
                                                    </ul>`);

            if (projectTags.length > 0) {
                for (let i = 0; i < projectTags.length; i ++) {
                    $('.project-tags').append(`<li class="project-tag"><a href="https://www.behance.net/search?search=${projectTags[i]}" target="_blank">${projectTags[i]}</a></li>`);
                }
            }
            
            // Remove pre-loader
            setTimeout(function() {
                $('.modal-nav').removeClass('hidden');
                $('.modal-top').removeClass('hidden');
                $('.modal-pre-loader').detach();
            }, 2200);
        }
    }); // END ajax request

    // Fill comments section
    $.ajax({
        url: urlProjectsComments,
        dataType: 'jsonp',
        // Ajax request complete
        success: function(res) { 
            let comment = res.comments;
            if (comment.length > 0) {
                comment.forEach(function(comment) {
                    let elapsedTime = convertTimestamp(comment.created_on);
                    $('.comments-list').append(`<div class="comment">
                                                    <div class="comment-left">
                                                        <img src="${comment.user.images['115']}" alt="${comment.user.display_name}'s profile image" />
                                                    </div>
                                                    <div class="comment-right">
                                                        <a class="comment-user" href="${comment.user.url}" target="_blank">${comment.user.display_name}</a>
                                                        <p class="comment-content">${comment.comment}</p>
                                                        <p class="comment-date">${elapsedTime}</p>
                                                    </div>
                                                </div>`);
                });
            } else {
                $('.comments-list').append(`<p class="no-comments">No comments</p>`);
            }
        }
    }); // END ajax request
}

// Close modal 
$('.close-modal').click(function() {
    modalOpen = false;
    $('.modal-nav').addClass('hidden');
    $('.modal-top').empty();
    $('.modal-top').addClass('hidden');
    $('.modal-middle').empty();
    $('.modal-bottom-container').addClass('hidden');
    $('.modal-footer').addClass('hidden');
    $('.comments-list').empty();
    $('.designer-info-container').empty();
    $('.project-info-container').empty();
    $('.project-modal').addClass('modal-closed');
    $('body').css('overflow', 'auto');
    $('html').css('overflow', 'auto');
});

// Convert timestamp to elapsed time
function convertTimestamp(timestamp) {
    let timestampMS = timestamp * 1000;
    var current = (new Date).getTime();
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - timestampMS;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    } else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    } else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    } else if (Math.round(elapsed/msPerYear) === 1) {
        return Math.round(elapsed/msPerYear ) + ' year ago';   
    } else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}