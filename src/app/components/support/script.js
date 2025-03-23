$(document).ready(function() {
    const faqs = document.querySelectorAll("[unique-script-id='w-w-dm-id'] .faq .faq-question-container");
  
    faqs.forEach(function(faq) {
      faq.addEventListener("click", function() {
        $(faq).closest(".faq").toggleClass("active");
      });
    });
  })