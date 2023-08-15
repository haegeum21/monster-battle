function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min))+min;
}

const app = Vue.createApp({
  data() {
    return {
        monsterHealth: 100,
        playerHealth: 100,
        curr: 0,
        winner: null,
        logMessages: [],
    };
  },
  watch: {
    monsterHealth(value){
        if(value <= 0 && this.playerHealth <= 0){
            this.winner = "draw";
        } else if(value <= 0){
            this.winner = "player";
        }
    },
    playerHealth(value) {
        if(value <= 0 && this.monsterHealth <= 0){
            this.winner = "draw";
        } else if(value <= 0){
            this.winner = "monster";
        }
    }
  },
  computed: {
    monsterBarStyles(){
        if (this.monsterHealth < 0){
            return {width: '0%'};
        }
        return {width: this.monsterHealth +'%'};
    },
    playerBarStyles(){
        if (this.playerHealth < 0){
            return {width: '0%'};
        }
        return {width: this.playerHealth+'%'};
    }
  },
  methods: {
    attackMonster(){
        this.curr++;
        let n = getRandomNum(7, 12);
        this.monsterHealth -= n;
        this.addLogMessage("Player", "attack", n);
        this.attackPlayer();
    },
    attackPlayer(){
        let n = getRandomNum(8, 15);
        this.playerHealth -= n;
        this.addLogMessage("Monster", "attack", n);
    },
    specialAttack(){
        this.curr++;
        let n = getRandomNum(10, 25);
        this.monsterHealth -= n;
        this.addLogMessage("Player", "attack", n);
        this.attackPlayer();
    },
    heal(){
        this.curr++;
        const healP = getRandomNum(8, 20);;
        if(this.playerHealth + healP <= 100){
            this.playerHealth += healP;
        }
        this.addLogMessage("Player", "heal", healP);
        this.attackPlayer();  
    },
    startGame(){
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.winner = null;
        this.curr = 0;
        this.logMessages = [];
    },
    surrender(){
        this.winner = "monster";
    },
    addLogMessage(who, what, value){
        this.logMessages.unshift({
            actionBy: who,
            actionType: what,
            actionVal: value
        })
    },
}
});

app.mount('#game');
