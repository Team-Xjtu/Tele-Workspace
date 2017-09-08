/**
 * 手机壳
 */
    if(document.getElementById("WebGL-output")){
        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        var webGLRenderer = new THREE.WebGLRenderer();

        webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.shadowMapEnabled = true;

        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 80;
        camera.lookAt(scene.position);

        var spotLight = new THREE.SpotLight(0xeeeeee);
        spotLight.position.set(0, 50, 30);
        spotLight.intensity = 2;
        scene.add(spotLight);

        document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

        var mesh;



        var loader = new THREE.JSONLoader();
        loader.load('models/Iphone5.js', function (geometry, materials) {
            console.log(geometry);
            console.log(materials.length);

            var mats = [];
            //mats.push(new THREE.MeshBasicMaterial({color: 0xBCEE68}));
            var texture = THREE.ImageUtils.loadTexture("images/Iphone5_specular.png");
            var side = new THREE.MeshPhongMaterial();
            side.map = texture;

            mats.push(side);
            //mats.push(new THREE.MeshBasicMaterial({color: 0xB03060}));
            var texture = THREE.ImageUtils.loadTexture("images/Iphone5_Screen.png");
            var front = new THREE.MeshPhongMaterial();
            front.map = texture;
            mats.push(front);

            mats.push(new THREE.MeshBasicMaterial({color: 0xFF0000}));
            for (var x = 0; x < mats.length; x++) {
                if(mats[x].color.r == "1" && mats[x].color.g == "0" && mats[x].color.b == "0"){

                    var canvas = document.getElementById("canvid1");

                    console.log(canvas);

                    var texture = new THREE.Texture(canvas);

                    var back = new THREE.MeshBasicMaterial();
                    back.map = texture;

                    //var texture = THREE.ImageUtils.loadTexture("images/2.jpg");
                    //var back = new THREE.MeshPhongMaterial();
                    //back.map = texture;
                    mats[x] = back;
                }
            }
            var faceMaterial = new THREE.MeshFaceMaterial(mats);
            mesh = new THREE.Mesh(geometry, faceMaterial);
            scene.add(mesh);
        }, 'models/');

        loadGeometry();

        var isdrag = false;

        webGLRenderer.domElement.addEventListener('touchend',function(){
            isdrag = false;
        });
        webGLRenderer.domElement.addEventListener('touchstart',selectmouse);
        webGLRenderer.domElement.addEventListener('touchmove',movemouse);

        function movemouse(e){
            e.preventDefault();
            if(isdrag && mesh){
                mesh.rotation.y += 0.05;
            }
        }

        function selectmouse(){
            isdrag = true;
            return false;
        }

        function loadGeometry() {
            console.log('New Model Loaded.');
        }

        render();

        function render() {

            if (mesh) {
                //mesh.rotation.y += 0.02;
                //mesh.geometry.material.map.needsUpdate = true;
            }

            requestAnimationFrame(render);
            webGLRenderer.render(scene, camera);

        }
    }
