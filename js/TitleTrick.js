//TitleTrick
export function TitleTrick(titlename) {
    function blur() {
        document.title = '╭(°A°`)╮ 页面崩溃啦 ~ | 你快回来！';
    }

    function focus() {
        document.title = '(ฅ>ω<*ฅ) 噫又好了~ ' + titlename
        setTimeout(() => document.title = titlename, 2000)
    }

    window.addEventListener('blur', blur)
    window.addEventListener('focus', focus)
}