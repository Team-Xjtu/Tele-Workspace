
    //����
    var scene = new THREE.Scene();
    //����
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    //��Ⱦ
    var webGLRenderer = new THREE.WebGLRenderer();

    webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 80;
    camera.lookAt(scene.position);

    var isTouch;
    var orbitControls = new THREE.OrbitControls(camera);
    var clock = new THREE.Clock();

    var spotLightF = new THREE.PointLight(0xeeeeee);
    spotLightF.position.set(0, 50, 30);
    spotLightF.intensity = 2;
    scene.add(spotLightF);

    var spotLightB = new THREE.PointLight(0xeeeeee);
    spotLightB.position.set(0, 50, -30);
    spotLightB.intensity = 2;
    scene.add(spotLightB);

    var mesh;

    var loadedMesh;

    var back;

    var canvas = document.getElementById("canvid1");

    var faceMaterial;

    //        var loader = new THREE.JSONLoader();
    //        loader.load('models/table2.js', function (geometry, mat) {
    //            var mats = [];
    //            var texture = new THREE.Texture(canvas);
    //            back = new THREE.MeshPhongMaterial();
    //            back.map = texture;
    //            mats.push(back);
    //            var faceMaterial = new THREE.MeshFaceMaterial(mat);
    //            mesh = new THREE.Mesh(geometry, faceMaterial);
    //            mesh.scale.x = 24;
    //            mesh.scale.y = 24;
    //            mesh.scale.z = 24;
    //            scene.add(mesh);
    //            loadGeometry();
    //
    //        }, 'models/');

    //var loader = new THREE.JSONLoader();
    //�����·�ģ��
    //        loader.load('models/file.js', function (geometry, mat) {
    //
    //            //mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial({ color: 0xFF34B3}));
    //
    //            var mats = [];
    //            mats.push(new THREE.MeshBasicMaterial({color: 0xFF4500}));//�ҹ�
    //
    //            mats.push(new THREE.MeshBasicMaterial({color: 0xBCEE68}));//�¼�
    //
    //            mats.push(new THREE.MeshBasicMaterial({color: 0xB03060}));//����
    //
    //            //var texture = THREE.ImageUtils.loadTexture("images/2.jpg");
    //            var texture = new THREE.Texture(canvas);
    //            back = new THREE.MeshPhongMaterial();
    //            back.map = texture;
    //            mats.push(back);
    //
    //            //mats.push(new THREE.MeshBasicMaterial({color: 0x87CEEB}));//�·�
    //
    //            var faceMaterial = new THREE.MeshFaceMaterial(mats);
    //
    //            mesh = new THREE.Mesh(geometry, faceMaterial);
    //
    //
    //            //var texture = THREE.ImageUtils.loadTexture("images/2.jpg");
    //            //
    //            ////var canvasMap = new THREE.Texture(canvas);
    //            //var a = new THREE.MeshPhongMaterial();
    //            //a.map = texture;
    //            //a.shading = THREE.FlatShading;
    //            //mesh = new THREE.Mesh(geometry, mat[0]);
    //
    //            mesh.scale.x = 40;
    //            mesh.scale.y = 40;
    //            mesh.scale.z = 40;
    //            mesh.rotation.y = -1 * Math.PI;
    //            scene.add(mesh);
    //            loadGeometry();
    //
    //        }, 'models/');

     var loader = new THREE.JSONLoader();
     loader.load('models/Iphone5.js', function (geometry) {

         var mats = [];
         //mats.push(new THREE.MeshBasicMaterial({color: 0xBCEE68}));
         var texture1 = THREE.ImageUtils.loadTexture("images/Iphone5_specular.png");
         var side = new THREE.MeshPhongMaterial();
         side.map = texture1;
         mats.push(side);

         //mats.push(new THREE.MeshBasicMaterial({color: 0xB03060}));
         var texture2 = THREE.ImageUtils.loadTexture("images/Iphone5_Screen.png");
         var front = new THREE.MeshPhongMaterial();
         front.map = texture2;
         mats.push(front);

         var texture3 = new THREE.Texture(canvas);
         back = new THREE.MeshPhongMaterial();
         back.map = texture3;
         mats.push(back);
         //mats.push(new THREE.MeshBasicMaterial({color: 0xFF0000}));
         //
         //         for (var x = 0; x < mats.length; x++) {
         //             if(mats[x].color.r == "1" && mats[x].color.g == "0" && mats[x].color.b == "0"){
         //                 //��canvas������Ϊ����
         //                 var texture = new THREE.Texture(canvas);
         //                 back = new THREE.MeshPhongMaterial();
         //                 back.map = texture;
         //                 mats[x] = back;
         //             }
         //         }
         faceMaterial = new THREE.MeshFaceMaterial(mats);
         mesh = new THREE.Mesh(geometry, faceMaterial);
         mesh.rotation.y = -1 * Math.PI;
         scene.add(mesh);
     }, 'models/');

    document.getElementById("content").appendChild(webGLRenderer.domElement);

    var isdrag = false;

    var projector = new THREE.Projector();
    //webGLRenderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
    webGLRenderer.domElement.addEventListener('touchstart', onTouchDown, false);
    webGLRenderer.domElement.addEventListener('touchmove', onTouchMove, false);

    function onTouchDown (event){
        event.preventDefault();
        console.log("touchstart");
    }

    function onTouchMove (event){
        event.preventDefault();
        console.log("touchmove");
        var vector = new THREE.Vector3(( event.touches[0].clientX / window.innerWidth ) * 2 - 1, ( event.touches[0].clientY / window.innerHeight ) * 2 + 1, 2);
        vector = vector.unproject(camera);
        text1.position.copy(vector);
    }

    render();

    function render() {

        if (mesh) {
            back.map.needsUpdate = true;
            mesh.material.needsUpdate = true;
        }
        if (isdrag && isTouch) {
            var delta = clock.getDelta();
            orbitControls.update(delta);
        }

        requestAnimationFrame(render);
        webGLRenderer.render(scene, camera);

    }

    var text = [];

    var text1;

    function add3Dfont(){

        if(text1){
            scene.remove(text1);
        }

        var controls = new function () {

            this.x = $("input[name='x']").val();
            this.y = $("input[name='y']").val();
            this.z = $("input[name='z']").val();
            this.size = $("select[name='size']").val();
            this.height = $("input[name='h']").val();
            this.font = $("select[name='font']").val();
            this.weight = "normal";

            this.asGeom = function () {

                var options = {
                    size: controls.size,
                    height: controls.height,
                    weight: controls.weight,
                    font: controls.font
                };

                text1 = createMesh(new THREE.TextGeometry($("input[name='word']").val(), options));
                text1.position.x = controls.x;
                text1.position.y = controls.y;
                text1.position.z = controls.z;
                scene.add(text1);
                text.push(text1);
            };

        };

        controls.asGeom();

        function createMesh(geom) {

            var meshMaterial = new THREE.MeshPhongMaterial({
                specular: 0xffffff,
                color: 0x00ffff,
                shininess: 100,
                metal: true
            });

            var plane = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);

            return plane;
        }
    }

    function clear3Dfont(){
        scene.remove(text1);
    }

function sendDiyMsg(base64Data,sence){
	var form_data = new FormData();
    form_data.append("jiepingpic", base64Data);
    form_data.append("changjingxinxi", sence);
    form_data.append("beizhu", "备注test");
    form_data.append("shangpinhao", "20175412584165983572");
    form_data.append("diyname", "DIY 2");
    //alert(base64Data);
	$.ajax({
		type: "POST", // 上传文件要用POST
        url: "http://192.168.0.22:3001/adddiy",
		dataType : "json",
		crossDomain: true, // 如果用到跨域，需要后台开启CORS
		processData: false,  // 注意：不要 process data
		contentType: false,  // 注意：不设置 contentType
		data: form_data,
		success:function(datas) {alert("保存成功!!");}//JSON.stringify(datas)
    }).fail(function(msg){alert("保存失败!");}); //alert("fails!"+JSON.stringify(msg))
}

    function save() {
        console.log("save");
        var img=download();
        var exporter = new THREE.SceneExporter();
        var sceneJson = JSON.stringify(exporter.parse(scene));
        localStorage.setItem('scene', sceneJson);
        //alert(img);
        sendDiyMsg(img,sceneJson);
    }
    function load() {
        console.log("load");
        scene = new THREE.Scene();
        var changjingxinxi=$api.getStorage('changjingxinxi');
        var img=$api.getStorage('biaoshi');
        var jsonscene = (localStorage.getItem('changjingxinxi'));
        var sceneLoader = new THREE.SceneLoader();
        
        var img1=document.getElementById("img1");
        //alert(img1.src);
        img1.src=img;
        
        
        sceneLoader.parse(JSON.parse(changjingxinxi), function (e) {//JSON.parse(jsonscene)
            scene = e.scene;
        }, '.');
        scene.remove(mesh);
        loader.load('models/Iphone5.js', function (geometry) {
            var mats = [];
            var texture1 = THREE.ImageUtils.loadTexture("images/Iphone5_specular.png");
            var side = new THREE.MeshPhongMaterial();
            side.map = texture1;
            mats.push(side);
            var texture2 = THREE.ImageUtils.loadTexture("images/Iphone5_Screen.png");
            var front = new THREE.MeshPhongMaterial();
            front.map = texture2;
            mats.push(front);
            //alert(img);
            var texture3 = THREE.ImageUtils.loadTexture(img);
            var back = new THREE.MeshPhongMaterial();
            back.map = texture3;
            mats.push(back);
            //var texture3 = new THREE.Texture(canvas);
            //back = new THREE.MeshPhongMaterial();
            //back.map = texture3;
            //mats.push(back);
            faceMaterial = new THREE.MeshFaceMaterial(mats);
            mesh = new THREE.Mesh(geometry, faceMaterial);
            mesh.rotation.y = -1 * Math.PI;
            scene.add(mesh);
        }, 'models/');
    }
