export default class ScorePanel {
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    /**
     * 最大等级
     */
    maxLevel: number;
    
    /**
     * 多少分升级
     */
    upScore:number;


    constructor(maxLevel: number = 10,upScore: number = 10) {
        this.levelEle = document.querySelector('.right')!;
        this.scoreEle = document.querySelector('.left')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    addScore() {
        this.scoreEle.innerHTML = ++this.score + '';
        
        // 提升等级
        if (this.score % this.upScore === 0) {
            this.levelUp()
        }
    }

    levelUp() {
        if(this.level >= this.maxLevel ) return
        this.levelEle.innerHTML = ++this.level + '' ;
    }
}


const score = new ScorePanel()