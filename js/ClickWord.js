//↓↓↓↓↓↓↓↓↓↓↓↓鼠标点击弹出文字↓↓↓↓↓↓↓↓↓↓↓↓

export function Clickword(element, fontsize = 25, array = null) {
    var a_idx = 0;
    element.onclick = function (event) {
        var a = array || ["❤富强❤", "❤民主❤", "❤文明❤", "❤和谐❤", "❤自由❤", "❤平等❤", "❤公正❤", "❤法治❤", "❤爱国❤",
            "❤敬业❤", "❤诚信❤", "❤友善❤"];

        var heart = document.createElement("div"); //创建div元素
        heart.onselectstart = new Function('event.returnValue=false'); //防止拖动

        element.appendChild(heart).innerHTML = a[a_idx]; //将div元素添加到页面上
        a_idx = (a_idx + 1) % a.length;
        heart.style.cssText = "position: fixed;left:-100%;"; //给p元素设置样式

        var fontSize = fontsize, // 字体大小
            x = event.clientX - fontSize / 2, // 横坐标
            y = event.clientY - fontSize, // 纵坐标
            c = randomColor(), // 随机颜色
            opacity = 1, // 透明度
            scale = 1.2; // 放大缩小

        var timer = setInterval(function () { //添加定时器
            if (opacity <= 0) {
                element.removeChild(heart);
                clearInterval(timer);
            } else {
                heart.style.cssText = "font-size:" + fontSize + "px;cursor: default;position: fixed;color:" +
                    c + ";left:" + x + "px;top:" + y + "px;opacity:" + opacity + ";transform:scale(" +
                    scale + ");";

                y--;
                opacity -= 0.016;
                scale += 0.002;
            }
        }, 15)

    }
    // 随机颜色
    function randomColor() {

        return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math
            .random() * 255)) + ")";

    }
};

//↑↑↑↑↑↑↑↑↑↑↑↑鼠标点击弹出文字↑↑↑↑↑↑↑↑↑↑↑↑