const formSubmitted = () => {
    let formData = {};
    formData.username = $('#username').val();
    formData.email = $('#email').val();
    formData.password = $('#password').val();
    formData.confirm_password = $('#confirm_password').val();

    console.log(formData);
    postSignup(formData);
}

function postSignup(signup){
    $.ajax({
        url:'/api/signup',
        type:'POST',
        data:signup,
        success: (result)=>{
            if (result.statusCode === 201) {
               // alert('signup post successful');
            }
    
        }
    });
    }

    const formSubmit = () => {
        let feedbackData = {};
        feedbackData.name = $('#name').val();
        feedbackData.email = $('#email').val();
        feedbackData.message = $('#message').val();
    
        console.log(feedbackData);
        postFeedback(feedbackData);
    }

    function postFeedback(feedback){
        $.ajax({
            url:'/api/feedback',
            type:'POST',
            data:feedback,
            success: (result)=>{
                if (result.statusCode === 201) {
                   // alert('feedback post successful');
                }
        
            }
        });
        }

        const formLogin = () => {
            let loginData = {};
            loginData.username = $('#username').val();
            loginData.password = $('#password').val();
        
            console.log(loginData);
            postLogin(loginData);
        }

        function postLogin(login){
            $.ajax({
                url:'/api/login',
                type:'POST',
                data:login,
                success: (result)=>{
                    if (result.statusCode === 201) {
                        //alert('Login post successful');
                    }
            
                }
            });
            }

    $(document).ready(function(){
        $('.materialboxed').materialbox();
        $('#signup').click(()=>{
            //alert('alert clicked');
            formSubmitted();
        });

        $('#submit').click(()=>{
           // alert('submit alert clicked');
            formSubmit();
        });

        $('#login').click(()=>{
            //alert('Login alert clicked');
            formLogin();
        });

        $('.modal').modal();
    });


