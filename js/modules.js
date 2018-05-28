/**
 * Created by bernardodeoliveirasantos on 26/05/2018.
 */
var isGoingDown = true;
var actualPosition = 0;
window.addEventListener("scroll", function (event) {
    var headerClasses = document.getElementById("mainHeader").classList;
    var top = this.scrollY;

    isGoingDown = (actualPosition < top) && (top > 55);
    actualPosition = top;

    if (isGoingDown) {
        headerClasses.add("headerOut");
    } else if (top > 55 && !isGoingDown) {
        headerClasses.remove("headerOut");
    } else {
        headerClasses.remove("headerOut");
    }
}, false);


// Swipe Controller
document.addEventListener("DOMContentLoaded", function (event) {
    // Swipe events register
    (function (d) {
        var ce = function (e, n) {
            var a = document.createEvent("CustomEvent");
            a.initCustomEvent(n, true, true, e.target); e.target.dispatchEvent(a); a = null; return false
        }, nm = true, sp = { x: 0, y: 0 }, ep = { x: 0, y: 0 }, touch = {
            touchstart: function (e) { sp = { x: e.touches[0].pageX, y: e.touches[0].pageY } },
            touchmove: function (e) { nm = false; ep = { x: e.touches[0].pageX, y: e.touches[0].pageY } },
            touchend: function (e) { if (nm) { ce(e, 'fc') } else { var x = ep.x - sp.x, xr = Math.abs(x), y = ep.y - sp.y, yr = Math.abs(y); if (Math.max(xr, yr) > 20) { ce(e, (xr > yr ? (x < 0 ? 'swl' : 'swr') : (y < 0 ? 'swu' : 'swd'))) } }; nm = true },
            touchcancel: function (e) { nm = false }
        };
        for (var a in touch) {
            d.addEventListener(a, touch[a], false);
        }
    })(document);

    // Moudeles Swipe affects
    var swipeContainer = document.getElementById("rui-swipe-container");
    var backButton = document.getElementsByClassName("back-button")[0];
    var appContent = document.getElementById('applicationBody');
    var actionButtuns = document.getElementById('actions');

    // Swipe events funtions
    var openSwipe = function () {
        swipeContainer.classList.add('opened-swipe');

        var newSwipe = document.createElement('section');
        newSwipe.classList.add('rui-swipe');
        newSwipe.innerHTML = this.innerHTML;

        swipeContainer.getElementsByClassName("rui-swipe-content-container")[0].appendChild(newSwipe);

        appContent.classList.add('content-opened-swipe');
        backButton.classList.add('show-arrow-back');
    };
    var closeSwipe = function () {
        var swipeContentContainer = document.getElementsByClassName("rui-swipe-content-container")[0];
        var openedSwipeList = swipeContentContainer.childNodes;
        swipeContentContainer.removeChild(openedSwipeList[openedSwipeList.length - 1]);
        appContent.classList.remove('content-opened-swipe');
        backButton.classList.remove('show-arrow-back');
        swipeContainer.classList.remove('opened-swipe');
    };
    var closeWithAnimation = function (approved) {
        var swipeContentContainer = document.getElementsByClassName("rui-swipe-content-container")[0];
        var curOpenedSwipe = swipeContentContainer.children[0];

        var approvedStatus = approved ? 'approval' : 'reproval';
        swipeContainer.classList.add(approvedStatus+'-animation-preparation');
        swipeContentContainer.innerHTML = '';

        setTimeout(function () {
            swipeContainer.classList.add(approvedStatus+'-animation-starts');
            setTimeout(function () {
                appContent.classList.remove('content-opened-swipe');
                backButton.classList.remove('show-arrow-back');
                swipeContainer.classList.remove('opened-swipe');
                swipeContainer.classList.remove(approvedStatus+'-animation-preparation');
                swipeContainer.classList.remove(approvedStatus+'-animation-starts');
            }, 2000);
        }, 500);
    };

    var approveAnimation = function (event) {
        var actionClicked = event.target;
        var status = actionClicked.id === "approved";
        closeWithAnimation(status);
    };

    // Add event listener to Cards
    var ruiCards = document.getElementsByClassName("rui-cards");
    if (ruiCards && ruiCards.length > 0) {
        for (var i = 0; i < ruiCards.length; i++) {
            ruiCards[i].addEventListener('click', openSwipe, false);
        }
    }

    // Callback to close swipe with button
    backButton.addEventListener("click", closeSwipe, false);
    swipeContainer.addEventListener('swr', closeSwipe, false);

    actionButtuns.addEventListener('click', approveAnimation, true);

});
