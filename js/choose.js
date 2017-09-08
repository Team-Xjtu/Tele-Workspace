/**
 * 选择模型
 */
    function choose () {
        var flag = document.getElementById("model").value+"";
        if(flag == "手机模型"){
            if(document.getElementById("WebGL-output2")){
                document.getElementById("WebGL-output2").remove();
                if (mesh) scene.remove(mesh);
            }
            if(document.getElementById("WebGL-output1")){
                document.getElementById("WebGL-output1").remove();
                if (mesh) scene.remove(mesh);
            }
            var oDiv = document.createElement('div');
            oDiv.id = 'WebGL-output';
            document.getElementById("content").appendChild(oDiv);
            var script = document.createElement("script");
            script.setAttribute("type","text/javascript");
            script.setAttribute("src","js/tele.js");
            document.body.appendChild(script);




        }else if(flag == "衣服模型"){
            if(document.getElementById("WebGL-output")){
                document.getElementById("WebGL-output").remove();
                if (mesh) scene.remove(mesh);
            }
            if(document.getElementById("WebGL-output1")){
                document.getElementById("WebGL-output1").remove();
                if (mesh) scene.remove(mesh);
            }
            var oDiv = document.createElement('div');
            oDiv.id = 'WebGL-output1';
            document.getElementById("content").appendChild(oDiv);
            var script = document.createElement("script");
            script.setAttribute("type","text/javascript");
            script.setAttribute("src","js/clothes.js");
            document.body.appendChild(script);
        }
        //else if(flag == "其他模型")(
        //
        //)else{
        //    alert("请选择模型");
        //}
    }
    function isNull (id){
        var index = document.getElementById(id);
        if(index){
            index.remove();
            return true;
        }else{
            return false;
        }
    }


