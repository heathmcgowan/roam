// Global Variables
let headerHeight = $('header').height();
let designerCardHeight = $('.designer-card').height();
let triggerHeight = designerCardHeight + 75;

// Load designers data
$.getJSON('js/designers.json', function(data) {
    for (i = 0; i < data.designer.length; i++) {
        $('main').append(`<div class="designer-card dc${i}"><div class="designer-details"><h3>${data.designer[i].name}</h3><h4>${data.designer[i].title}</h4><p>${data.designer[i].bio}</p><button class="pointer">View Projects</button></div><div class="designer-image"><img src="${data.designer[i].image}" alt="${data.designer[i].name}'s Profile Photo"></div></div>`)
    }
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
    } else {
        $('#main').addClass('dark-background');
        $('.background-triangle').removeClass('hidden-opacity');
    }
    // TODO: Update loop with array details
    for (i = 0; i < 4; i++) {
        if ($(this).scrollTop() > ((headerHeight / 2) + triggerHeight * i)) { //TODO: replace "5" with number of array objects
            $('.dc' + i).addClass('on-screen');
        } else {
            $('.dc' + i).removeClass('on-screen')
        }
    }
});
