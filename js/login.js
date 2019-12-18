var loginController = (function() {
        // Private
    var username = document.getElementById('username'),
        nationalId = document.getElementById('nationalID'),
        password = document.getElementById('password'),
        email = document.getElementById('email'),
        loginBtn = document.getElementById('login'),
        usernameError = document.getElementById('username-error'),
        nationalIdError = document.getElementById('national-error'),
        passwordError = document.getElementById('password-error'),
        emailError = document.getElementById('email-error');

    var errors = {
        emptyUsername: 'This field is required!',
        emptyNational: 'This field is required!',
        emptyPassword: 'This field is required!',
        emptyEmail: 'This field is required!'
    };

    function preventLetters(e) {
        // by7wl el ascii le string (e.which => ascii)
        var char = String.fromCharCode(e.which);
        // mktobsh ela numbers bs
        if (!(/[0-9]/.test(char))) {
            e.preventDefault();
        }

        if (nationalId.value.length == 14) {
            e.preventDefault();
            nationalIdError.textContent = '';
            nationalId.classList.remove('error');
            delete errors.emptyNational;
            delete errors.nationalId;
        }
    }

    function handleOnChange() {
        if (username.value.length >= 4 && username.value.length < 15) {
            usernameError.textContent = '';
            username.classList.remove('error');
            delete errors.emptyUsername;
            delete errors.username;
        }

        if (password.value.length >= 7) {
            passwordError.textContent = '';
            password.classList.remove('error');
            delete errors.emptyPassword;
            delete errors.password;
        }

        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if ((email.value).match(pattern)) {
            emailError.textContent = '';
            email.classList.remove('error');
            delete errors.emptyEmail;
            delete errors.email;
        }
    }

    function handleUsername() {
        if (username.value.trim() == "") {
            usernameError.textContent = errors.emptyUsername;
            username.classList.add('error');

        } else if ((username.value.length < 5) || (username.value.length > 15)) {
            errors.username = "It must be 5 to 15 Character!";
            usernameError.textContent = errors.username;
            username.classList.add('error');
        }
    }

    function handleNationalId() {
        if (nationalId.value.trim() == "") {
            nationalIdError.textContent = errors.emptyNational;
            nationalId.classList.add('error');

        } else if (nationalId.value.length < 14) {
            errors.nationalId = 'It must be 14 letters!';
            nationalIdError.textContent = errors.nationalId;
            nationalId.classList.add('error');
        }
    }


    function handlePassword() {
        if (password.value.trim() == "") {
            passwordError.textContent = errors.emptyPassword;
            password.classList.add('error');

        } else if (password.value.length < 8) {
            errors.password = 'It must be at least 8 letters!';
            passwordError.textContent = errors.password;
            password.classList.add('error');
        }
    }

    function handleEmail() {
        var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
        
        if (email.value.trim() == "") {
            emailError.textContent = errors.emptyEmail;
            email.classList.add('error');

        } else if (!(email.value).match(pattern)) {
            errors.email = 'Invalid Email!';
            emailError.textContent = errors.email;
            email.classList.add('error');
        }
    }

    function handleEnter(e) {
        if (e.which == 13) {
            handleLogin(e);
        }
    }

    function handleLogin(e) {
        e.preventDefault();
        errorsLen = Object.keys(errors).length;

        for (var key in errors) {
            if (key == 'emptyUsername' && usernameError.textContent == "") {
                usernameError.textContent = errors[key];
                username.classList.add('error');
            }
            if (key == 'emptyNational' && nationalIdError.textContent == "") {
                nationalIdError.textContent = errors[key];
                nationalId.classList.add('error');
            }
            if (key == 'emptyPassword' && passwordError.textContent == "") {
                passwordError.textContent = errors[key];
                password.classList.add('error');
            }
            if (key == 'emptyEmail' && emailError.textContent == "") {
                emailError.textContent = errors[key];
                email.classList.add('error');
            }
        }

        if (errorsLen != 0) {
            e.preventDefault();
        } else {
            // bb3t le page el tanya el data bta3t el user
            var urlParams = new URLSearchParams( {
                "Username": username.value,
                "National ID": nationalId.value,
                "Email": email.value
            });
            var usp = urlParams.toString();

            window.location.href = 'exam.html'.concat('?' + usp);
        }
    }

        // Public
    return {
        init: function() {
            username.addEventListener('keypress', handleOnChange);
            username.addEventListener('blur', handleUsername);

            nationalId.addEventListener('keypress', preventLetters);
            nationalId.addEventListener('blur', handleNationalId);

            password.addEventListener('keypress', handleOnChange);
            password.addEventListener('blur', handlePassword);

            email.addEventListener('keypress', handleOnChange);
            email.addEventListener('blur', handleEmail);


            loginBtn.addEventListener('click', handleLogin);
            document.addEventListener('keypress', handleEnter);
        }
    }


})();


loginController.init();