/**
 * 自定义字体
 */
    function a(){
    //var e = window.event;
        //触屏结束标记
        var isDragging = false;
        function stopDragging(e) {
            isDragging = false;
            e.preventDefault();
            e.stopPropagation();
        }

        //在某个范围内生成随机数
        function randomFromTo(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        }

        var previousSelectedCircle;

        function canvasClick(e) {
            // 取得画布上被单击的点
            var clickX = e.touches[0].pageX - canvas.offsetLeft;
            var clickY = e.touches[0].pageY - canvas.offsetTop;
            for (var i = texts.length - 1; i >= 0; i--) {
                var text = texts[i];
                if(clickX - text.x <= text.size && clickY - text.y <= text.size){
                    // 清除之前选择的字体
                    if (previousSelectedCircle != null) previousSelectedCircle.isSelected = false;
                    previousSelectedCircle = text;
                    //选择新字体
                    text.isSelected = true;
                    //使字体允许拖拽
                    isDragging = true;
                    //更新显示
                    drawTexts();
                    //停止搜索
                    return;
                }
            }
        }

        function dragCircle(e) {
            e.preventDefault();
            // 判断字体是否开始拖拽
            if (isDragging == true) {
                // 判断拖拽对象是否存在
                if (previousSelectedCircle != null) {
                    // 取得鼠标位置
                    var x = e.touches[0].pageX - canvas.offsetLeft;
                    var y = e.touches[0].pageY - canvas.offsetTop;
                    // 将字体移动到鼠标位置
                    previousSelectedCircle.x = x;
                    previousSelectedCircle.y = y;
                    // 更新画布
                    //drawTexts();
                }
            }
        }

        //字体对象
        function Text(text, x, y, font, size, color) {
            this.text = text;
            this.x = x;
            this.y = y;
            this.font = font;
            this.size = size;
            this.color = color;
            this.isSelected = false;
        }

        //数组记录字体个数
        var texts = [];
        var canvas = document.getElementById("canvid1");
        var context;
        context = canvas.getContext("2d");
        //canvas.addEventListener("touchstart",canvasClick);
        //canvas.addEventListener("touchend",stopDragging(e));
        //canvas.addEventListener("touchmove",dragCircle);
        var word = $("input[name='word']").val();
        var x = canvas.width/2;
        var y = canvas.height/2;
        var font = $("select[name='font']").val();
        var size = $("select[name='size']").val();
        var colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
        var color = colors[randomFromTo(0, 8)];
        var text = new Text(word, x, y, font, size, color);
        context.font = "bold " + text.size + "px " + text.font;
        context.fillStyle = text.color;
        context.fillText(text.text, text.x, text.y);
        if (text.isSelected) {
        }
        else {
        }
        context.fill();
        context.stroke();

        function addText() {
            var word = $("input[name='word']").val();
            var x = canvas.width/2;
            var y = canvas.height/2;
            var font = $("select[name='font']").val();
            var size = $("select[name='size']").val();
            var colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
            var color = colors[randomFromTo(0, 8)];
            var text = new Text(word, x, y, font, size, color);
            context.font = "bold " + text.size + "px " + text.font;
            context.fillStyle = text.color;
            context.fillText(text.text, text.x, text.y);
            if (text.isSelected) {
            }
            else {
            }
            context.fill();
            context.stroke();
            //texts.push(text);
            //drawTexts();
        }

        function clearCanvas() {
            texts = [];
            drawTexts();
        }

        function drawTexts() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            // 遍历所有字体
            for(var i = 0; i < texts.length; i++) {
                var text = texts[i];
                // 绘制字体
                context.font = "bold " + text.size + "px " + text.font;
                context.fillStyle = text.color;
                context.rotate(Math.PI);
                context.fillText(text.text, text.x, text.y);
                if (text.isSelected) {
                }
                else {
                }
                context.fill();
                context.stroke();
            }
        }

        //addText();

        }




