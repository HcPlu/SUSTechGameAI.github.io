
$(document).ready(function () {
    var task_id = WebUploader.Base.guid();        //产生task_id
    var uploader = WebUploader.create({           //创建上传控件
        // swf: '/static/img/Uploader.swf', //swf位置，这个可能与flash有关
        server: 'uploadfile',                 //接收每一个分片的服务器地址
        pick: '#picker',                          //填上传按钮的id选择器值
        auto: false,                             //选择文件后，是否自动上传
        chunked: true,                            //是否分片
        chunkSize: 2 * 1024 * 1024,              //每个分片的大小，这里为2M
        chunkRetry: 3,                            //某分片若上传失败，重试次数
        fileNumLimit: 1,
        threads: 1,                               //线程数量，考虑到服务器，这里就选了1
        duplicate: true,                          //分片是否自动去重
        formData: {                               //每次上传分片，一起携带的数据
            task_id: task_id,
        },
    });

    // var $list = $("#thelist");
    uploader.on('beforeFileQueued', function (file) {
        uploader.reset();
        document.getElementById("time").innerHTML = "";
    });

    uploader.on('fileQueued', function (file) {
        document.getElementById("selected_file").innerHTML = file.name
        var data = {'teamname': $("#id_username").val(), 'teamemail': $("#id_teamemail").val(), 'filename':file.name};
        console.log(data)
        $.getJSON('userverify',data, function(ret) {
            console.log(ret)
            if (ret.new_user == true) {                    
                if (confirm("Make sure your name and email address!")) {
                    data.sure = 1                      
                } else {
                    data.sure = 0
                }
                $.get("doublecheck", data)
            }
            delete ret.new_user
            $.each(ret, function(key, value){
                if (key == "check"){
                    if (value == false){
                        $("#ctlBtn").attr("disabled", true);
                    }
                    else {                        
                        $("#ctlBtn").attr("disabled", false);
                    }                
                }
                else if (key == "info_filename") {
                    if (value == "check"){
                        info = '<div id="' + file.id + '" class="item">' +
                            '<h4 class="info">' + file.name + ' is waiting to upload ... </h4>' +
                            '</div>' 
                        document.getElementById(key).innerHTML = '<i class="icon-check" style="color: green;"></i>';
                    }
                    else{
                        info = '<div id="' + file.id + '" class="item">' +
                            '<h4 class="info"> Please obey the naming policy </h4>' +
                            '</div>' 
                    }
                    document.getElementById("thelist").innerHTML = info;
                }
                else if(key == "info_uploadtime"){
                    alert(value)
                }
                else{
                    console.log(key)
                    document.getElementById(key).innerHTML = value;
                }                
            })
            
        });          //ajax携带用户名向url发请求判断 user, email 和 naming policy
    });

    $("#ctlBtn").on('click', function () {
        uploader.upload();
    });

    uploader.on('startUpload', function () {       //开始上传时，调用该方法
        $('.progress-bar').css('width', '0%');
        $('.progress-bar').text('0%');
    });

    uploader.on('uploadProgress', function (file, percentage) { //一个分片上传成功后，调用该方法
        $('.progress-bar').css('width', percentage * 100 - 1 + '%');
        $('.progress-bar').text(Math.floor(percentage * 100 - 1) + '%');
    });

    uploader.on('uploadSuccess', function (file) { //整个文件的所有分片都上传成功，调用该方法
        //上传的信息（文件唯一标识符，文件名）
        $('.progress-bar').css('width', '100%');
        $('.progress-bar').text('Success');
        var data = { 'task_id': task_id, 'filename': file.source['name'], 'username':$("#id_username").val(), 'teamemail': $("#id_teamemail").val()};
        $.get('uploadfile/complete', data, function(data){
            alert(data)
        });          //ajax携带data向该url发请求
        
        setTimeout("window.location.reload()", 7000);
        var i = 5;
        var intervalid;
        function fun() {
            if (i == 0) {
                clearInterval(intervalid);
            }
            document.getElementById("time").innerHTML = "Refresh after " + i + " seconds";
            i--;
        }
        intervalid = setInterval(fun, 1000);



    });

    uploader.on('uploadError', function (file) {   //上传过程中发生异常，调用该方法
        alert("Sorry, some wrong things happen. please upload again. Thank you!")
        $('.progress-bar').css('width', '100%');
        $('.progress-bar').text('Failure');
    });

    uploader.on('uploadComplete', function (file) {//上传结束，无论文件最终是否上传成功，该方法都会被调用
        $('.progress-bar').removeClass('active progress-bar-striped');
    });

});