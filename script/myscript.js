//<script src="http://www.jq22.com/jquery/jquery-1.10.2.js"></script>引用的页面要引入JQuery
function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
        var dataURL = canvas.toDataURL("image/"+ext);
        return dataURL;
}

function sendDiyMsg(base64Data, sence, jieshao, shangpinhao, name){
	var form_data = new FormData();
    form_data.append("jiepingpic", base64Data);
    form_data.append("changjingxinxi", sence);
    form_data.append("beizhu", jieshao);
    form_data.append("shangpinhao", shangpinhao);
    form_data.append("diyname", name);
    $.ajax({
		type: "POST", // 上传文件要用POST
        url: "http://47.95.209.24:3001/adddiy",
		dataType : "json",
		crossDomain: true, // 如果用到跨域，需要后台开启CORS
		processData: false,  // 注意：不要 process data
		contentType: false,  // 注意：不设置 contentType
		data: form_data,
		success: function(datas) {
            alert("保存成功!");
            //openOrderdetail();
        }//JSON.stringify(datas)
    }).fail(function(msg){
            alert("保存失败!"+JSON.stringify(msg));
    }); //alert("fails!"+JSON.stringify(msg))
}
