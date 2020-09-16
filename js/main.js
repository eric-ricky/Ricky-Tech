
$(window).ready(function() {
    $('a').on('click', function(event) {
        if(this.hash !== '') {
            event.preventDefault;
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function() {
                window.location.hash = hash;
            });
        } //End if
    });


    //SLIDE ANIMATION
    $(window).scroll(function() {
        $('.slideanim').each(function() {
            var pos = $(this).offset().top;
            var winTop = $(window).scrollTop();

            if(pos < winTop + 600) {
                $(this).addClass('slide');
            }
        });
    });

    // Remove logo for small screen on scroll
    var logoItem = document.getElementsByClassName("navbar-brand");
    $(window).scroll(function() {
        if ($(document).scrollTop() > 100){
            // console.log(logoItem);
            $(".navbar-brand").addClass("remove-brand");
        }else {
            $(".navbar-brand").removeClass("remove-brand");
        }            
    });

    // FORM SUBMITTED TOAST
    $('#myBtn').click(function() {
        $('.toast').toast(show);
    });

    // Animate loader off screen
	$(".se-pre-con").fadeOut("slow");
    
})



class TypeWriter {
    constructor(txtElement,words,wait=300) {
        this.txtElement = txtElement;
        this.words = words;
        this.wordIndex = 0;
        this.txt = '';
        this.wait = parseInt(wait, 10);
        this.isDeleting= false;
        this.type();
    }

    type() {
        const currentIndex = this.wordIndex % this.words.length;
        const fullWord = this.words[currentIndex];

        if(this.isDeleting) {
            //remove char
            this.txt = fullWord.substring(0, this.txt.length - 1);
        } else {
            //add char
            this.txt = fullWord.substring(0, this.txt.length + 1);
        }

        // output text into the element
        this.txtElement.innerHTML = `<span class='txt'>${this.txt}</span>`;

        // type speed
        let typeSpeed = 300;
        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        if(!this.isDeleting && this.txt === fullWord) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

//Initialize the app
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.mytxt');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement,words,wait);
}
