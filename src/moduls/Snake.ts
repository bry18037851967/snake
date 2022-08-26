export default class Snake {
    // 蛇头元素
    head: HTMLElement;
    bodies: HTMLCollection;
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake > div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');
    }

    /**
     * 获取蛇头X坐标
     */
    get X() {
        return this.head.offsetLeft
    }

    /**
     * 获取蛇头的Y左边
     */
    get Y() {
        return this.head.offsetTop
    }

    /**
     * 设置蛇头X坐标
     */
    set X(value: number) {
        // 一定要判断执行，不然moveBody就会执行两次
        if (this.X === value) {
            return
        }

        if (value < 0 || value  > 290) {
            throw new Error("您撞墙了，游戏结束");
        }

        // if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
        //     if (value > this.X) {
        //         value = this.X - 10
        //     } else {
        //         value = this.X + 10
        //     }
        // }

        this.moveBody()
        this.head.style.left = value + 'px';
    }

    /**
     * 设置蛇头Y坐标
     */
    set Y(value: number) {
        if (this.Y === value) {
            return
        }

        // if ((this.bodies[1] as HTMLElement)?.offsetLeft === value) {
        //     return
        // }

        // 判断撞墙
        if (value < 0 || value  > 290) {
            throw new Error("您撞墙了，游戏结束");
        }
        this.moveBody()
        this.head.style.top = value + 'px';
    }

    /**
     * 增加蛇身子
     */
    addBody() {
        this.element.insertAdjacentHTML('beforeend','<div class="snake-item"></div>')
    }

    /**
     * 移动蛇身子（不包括蛇头）每块的位置后一节移动到前一节的位置，以此类推
     */
    moveBody() {
        for (let i = this.bodies.length - 1; i > 0; i--) {
            let x = (this.bodies[i - 1 ] as HTMLElement).offsetLeft;
            let y = (this.bodies[i - 1 ] as HTMLElement).offsetTop;
            (this.bodies[i] as HTMLElement).style.left = x + 'px';
            (this.bodies[i] as HTMLElement).style.top = y + 'px';
        }
    }
}