const feedbackBtn = document.getElementById("feedback-btn");
const modalContainer = document.getElementById("modal-container");

emailjs.init('user_ReH5lf2lq5p0hrFp6l6BE');

window.onload = function () {
    document.getElementById('feedback-form').addEventListener('submit', function sendEmail(event) {
        event.preventDefault();
        // generate a five digit number for the contact_number variable
        this.contact_number.value = Math.random() * 100000 | 0;
        // these IDs from the previous steps
        emailjs.sendForm('service_nf233p3', 'quiz_template', this)
            .then(function () {
                modalContainer.classList.remove("show");
                console.log('SUCCESS!');
            }, function (error) {
                console.log('FAILED...', error);
            });
    });
}

feedbackBtn.addEventListener("click", function(){
    modalContainer.classList.add("show");
});