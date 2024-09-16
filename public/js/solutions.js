// SOLUTIONS PAGE
( function () {
    // functions to alter text and image in secondary page hero
    const HeroImage = document.getElementById('HeroImage');
    const HeroTitle = document.getElementById('HeroTitle');
    const HeroSubtitle = document.getElementById('HeroSubtitle');

    HeroImage.src = "../images/backgrounds/hero-bg-1.png"; // new background image
    HeroTitle.innerText = "Industrial automation solutions"; //new title text
    HeroSubtitle.innerText = "Partex offers comprehensive solutions for marking machines, robotic stations, control cabinets and panels, and pneumatic components."; //new subtitle text
})();