
const observer = new IntersectionObserver((entries) => {
    entries.forEach((element) => {
        if (element.isIntersecting) {
            element.target.classList.add('animate');
            element.target.classList.add('show-left');
            element.target.classList.add('show-right');
        }
    });
});

export { observer };