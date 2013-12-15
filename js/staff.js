$(function(){
    $('#sendform').submit(function(){
        $('#myModal').modal('show');
        return false;
    });
    $("#sendbtn").click(function(){
        var name=$("#inputName").val();
        var rubi=$("#inputRubi").val();
        var email=$("#inputEmail").val();
        var tel=$("#inputTel").val();
        var role=$("#inputRole").val();
        var note=$("#inputNote").val();
        console.log(name);
        console.log(rubi);
        console.log(email);
        console.log(tel);
        console.log(role);
        console.log(note);
        var posts={name:name,rubi:rubi,email:email,tel:tel,role:role,note:note};
        /*
        $.post("http://chocobread.webcrow.jp/oden/posts.php",posts,function(d){
            
        });
        */
        $("#form-panel").slideUp().html(
            '<div class="alert alert-info">ご応募ありがとうございます！ご連絡差し上げるまでしばらくお待ちください。</div>'
        ).slideDown();
        $('#myModal').modal('hide');
        //        return false;
    });
})