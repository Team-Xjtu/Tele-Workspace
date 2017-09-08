/**
 * Created by xungong on 2017/7/16.
 */
    var scene;
    var camera;
    var webGLRenderer;

    var orbitControls;
    var clock;

    var canvas = document.getElementById("canvid1");
    var content = document.getElementById("content");
    var back;
    var faceMaterial;
    var mesh;
    var isPhotoDiy = false;
    var isMove;

    function createThree(fileUrl,id,imageUrl) {
        threeStart();
        loadModel(fileUrl,imageUrl);
        initThree(id);
        render();
    }

    function threeStart() {
        initScene();
        initCamera();
        initLight();
    }

    function initScene() {
        scene = new THREE.Scene();
    }
    
    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 80;
        camera.lookAt(scene.position);
        orbitControls = new THREE.OrbitControls(camera);
        clock = new THREE.Clock();
    }

    function initThree(id) {
        webGLRenderer = new THREE.WebGLRenderer();
        webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.shadowMap.enabled = true;
        document.getElementById(id).appendChild(webGLRenderer.domElement);
    }

    function initLight() {
        var spotLightFront = new THREE.PointLight(0xeeeeee);
        spotLightFront.position.set(0, 150, 130);
        spotLightFront.intensity = 2;
        scene.add(spotLightFront);
        var spotLightBack= new THREE.PointLight(0xeeeeee);
        spotLightBack.position.set(0, 150, -130);
        spotLightBack.intensity = 2;
        scene.add(spotLightBack);
    }

    function loadModel(fileUrl,imageUrl) {
        var loader = new THREE.JSONLoader();
        loader.load(fileUrl, function (geometry) {
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

            var texture3;
            //mats.push(new THREE.MeshBasicMaterial({color: 0xB03060}));
            if(imageUrl == ""){
                texture3 = new THREE.Texture(canvas);
            }else{
                texture3 = THREE.ImageUtils.loadTexture(imageUrl);
            }
            back = new THREE.MeshPhongMaterial();
            back.map = texture3;
            mats.push(back);
            //mats.push(new THREE.MeshBasicMaterial({color: 0xFF0000}));
            //
            //         for (var x = 0; x < mats.length; x++) {
            //             if(mats[x].color.r == "1" && mats[x].color.g == "0" && mats[x].color.b == "0"){
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
    }

    function render() {

        if (mesh) {
            back.map.needsUpdate = true;
            mesh.material.needsUpdate = true;
        }
        if (!isPhotoDiy && !isMove) {
            var delta = clock.getDelta();
            orbitControls.update(delta);
        }

        requestAnimationFrame(render);
        webGLRenderer.render(scene, camera);

    }

    function save() {
        var img=download();//pan.zhou
        sendDiyMsg(img,"sence");
    }
    function download() {
        var type = 'png';
        var imgdata = canvas.toDataURL(type);
        //将mime-type改为image/octet-stream,强制让浏览器下载
        var fixtype = function (type) {
            type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
            var r = type.match(/png|jpeg|bmp|gif/)[0];
            return 'image/' + r;
        };
        imgdata = imgdata.replace(fixtype(type), 'image/octet-stream');
        //将图片保存到本地
        var saveFile = function (data, filename) {
            var link = document.createElement('a');
            link.href = data;
            link.download = filename;
            var event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            link.dispatchEvent(event);
        };
        var filename = 'a.' + type;
        saveFile(imgdata, filename);
        return imgdata;//pan.zhou
    }

    function addFont() {
        var content = $("input[name='text']").val();
        var size = $("input[name='sizeVal']").val();
        var height = $("input[name='heightVal']").val();
        var font = $("select[name='font']").val();
        if(content == ""){
            console.log("a");
        }
        add3Dfont(scene,content,size,height,font);
    }

    function clearFont(){
        scene.remove(text);
    }
