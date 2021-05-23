const feedbackBtn = document.getElementById("feedback-btn");
const modalContainer = document.getElementById("modal-container");
const closeBtn = document.getElementById("close-btn");
const feedbackForm = document.getElementById("feedback-form");

emailjs.init('user_ReH5lf2lq5p0hrFp6l6BE');

window.onload = function () {
    document.getElementById('feedback-form').addEventListener('submit', function sendEmail(event) {
        event.preventDefault();
        // generate a five digit number for the contact_number variable
        this.contact_number.value = Math.random() * 100000 || 0;
        // these IDs from the previous steps
        emailjs.sendForm('service_nf233p3', 'quiz_template', this)
            .then(function () {
                modalContainer.classList.remove("show");
                console.log('SUCCESS!');
            }, function (error) {
                console.log('FAILED...', error);
            });
    });
};

window.addEventListener("resize", function (){
    if (window.innerWidth <= 500){
        feedbackForm.classList.remove("feedback-form");
    }
    if (window.innerWidth > 500){
        feedbackForm.classList.add("feedback-form");
    }
});

feedbackBtn.addEventListener("click", function(){
    modalContainer.classList.add("show");
    if (window.innerWidth <= 500){
        feedbackForm.classList.remove("feedback-form");
    }
    if (window.innerWidth > 500){
        feedbackForm.classList.add("feedback-form");
    }
});

closeBtn.addEventListener("click", function(){
    modalContainer.classList.remove("show");
});