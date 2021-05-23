//Variable for the feeback button
const feedbackBtn = document.getElementById("feedback-btn");
//Variable for the feeback modal
const modalContainer = document.getElementById("modal-container");
//Variable for the modal close button
const closeBtn = document.getElementById("close-btn");
//Variable for the feedback form
const feedbackForm = document.getElementById("feedback-form");

//Code from the emailJS documentation that I've edited a bit to fit the sites needs
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

// A couple of evenlisteners to control the look of the modal when resizing and opening it from a small viewport
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

// Function to close the feedback modal
closeBtn.addEventListener("click", function(){
    modalContainer.classList.remove("show");
});