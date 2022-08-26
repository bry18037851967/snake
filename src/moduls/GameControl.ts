import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";


export default class GameControl {
    time: NodeJS.Timeout | null = null;
    snake: Snake;
    food: Food;
    /**
     * 计分牌
     */
    scorePanel: ScorePanel;

    /**
     * 当前点击的方向键
     */
    direction: string = 'ArrowRight';

    /**
     * 游戏是否结束
     */
    isLive: boolean = true;
    constructor() {
        this.food = new Food();
        this.snake = new Snake();
        this.scorePanel = new ScorePanel(10, 3);
    }
    /**
     * 游戏开始
     */
    init() {
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        this.run()
    }

    keydownHandler(e: KeyboardEvent) {
        this.direction = e.key;
        this.run()
    }

    /**
     * 控制蛇移动的方法
     */
    run() {
        console.log('点了')
        let x = this.snake.X;
        let y = this.snake.Y;

        clearTimeout(this.time as NodeJS.Timeout)
        switch (this.direction) {
            // 向上走
            case "ArrowUp":
                y -= 10;
                break;
            case "ArrowDown":
                y += 10;
                break;
            case "ArrowLeft":
                x -= 10;
                break;
            case "ArrowRight":
                x += 10;
                break;
            default: 
        }
        if (x < 0 || x  > 290 || y < 0 || y  > 290) {
            alert('您撞墙了，游戏结束');
            return
        }

        /**
         * 这里要注意，必须先判断吃到食物
         * 若吃到则 添加一个蛇身子
         * 然后再设置每一块的位置，否则后添加的身子没有设置位置
         */
        this.check(x, y);
        
        try {
            this.snake.X = x;
            this.snake.Y = y;
        } catch (error) {
            alert(error);
            this.isLive = false;
        }
        this.isLive && (this.time = setTimeout(this.run.bind(this), 500 - (this.scorePanel.level - 1) * 50));
    }

    /**
     * 检测是否吃到食物
     */
    check(x: number, y: number) {
        if (this.food.X === x && this.food.Y === y) {
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    }
}