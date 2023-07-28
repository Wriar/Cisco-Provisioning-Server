//Detect if the screen is mobile or not
function isMobile() {
    return window.innerWidth <= 800;
}


function sizeRefresh() {
    if(isMobile()) {
        document.getElementById('main').style.marginLeft = '40px';
        document.getElementById('mobile-sidebar').style.display = 'block';
        document.getElementById('sidebar').style.display = 'none';

    } else {
        document.getElementById('main').style.marginLeft = '180px';
        document.getElementById('mobile-sidebar').style.display = 'none';
        document.getElementById('sidebar').style.display = 'block';
    }
}

window.addEventListener('resize', sizeRefresh);