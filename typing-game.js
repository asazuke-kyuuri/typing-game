let resultFinArea=document.getElementById('resultFin');
let miss=0;
let game={
    words:['red','blue','yellow','green','cucumber',],//タイピングする単語
    currentWord:'',//今表示されている単語
    matchedIndex:0,//入力しているのは何文字目か
    startTime:null,//開始時刻
    isPlaying:false,//ゲームしてるかしてないか
    mainArea:document.getElementById('main'),
    TOF:document.getElementById('tof'),
    resultArea:document.getElementById('result'),
    finArea:document.getElementById('fin'),
    missType:document.getElementById('miss'),
    //resultFinArea:document.getElementById('resultFin'),
    //タイピングゲーム
    //開始時の時間取得
    start:function(){
        game.isPlaying=true;
        game.startTime=Date.now();
        game.setWord();
    },
    //単語を表示
    setWord:function(){
        game.currentWord=game.words.shift()||'';//wordsから要素を持ってくる(持ってこられたら消滅する　存在抹消するからlengthも減っていく)
        game.matchedIndex=0;
        game.displayWord();
    },
    //消した文字を_に変換
    displayWord:function(){
        game.mainArea.innerText='_'.repeat(game.matchedIndex)+game.currentWord.substring(game.matchedIndex);//matchedIndex回分currentWardを_に変換する関数　repeat
    },
    //単語毎終了時にかかった時間を表示
    isFinished:function(){
        return game.displayWord.length===0;
    },
    displayResult:function(){
        const currentTime=Date.now();//終了時刻
        const elapsedTime=formattedSeconds(currentTime-game.startTime);//かかった時間
        if(game.words.length===0){
            game.resultArea.innerText='';
            game.finArea.innerText=`Finish!\n↓合計時間`;
            setInterval(ghorst,20);
            resultFinArea.innerText=`${elapsedTime}秒`;
            //game.resultFinArea.innerText=`${elapsedTime}秒`;
            game.missType.innerText=`ミスタイプ：${miss}回`;
        }
        else{
            game.resultArea.innerText=`経過時間：${elapsedTime}秒`;
            game.missType.innerText=`ミスタイプ：${miss}回`;
        }
        game.isPlaying=false;
    },
};
//クリック時に単語表示
document.onclick=()=>{
    if(game.isPlaying===false){
        game.start();
    }
};
//エンターでも動くようにしたい
//一致時に文字消す
document.onkeydown=(event)=>{
    game.TOF.innerText='';
    //不一致時
    if(event.key!==game.currentWord[game.matchedIndex]){
        game.TOF.innerText=`miss!`;
        miss++;
        return;
    }
    //一致時
    game.matchedIndex++;
    game.displayWord();
    //単語全一致時に次の単語表示　もしくは終了
    if(game.matchedIndex===game.currentWord.length){
        if(game.isFinished()){
            game.displayResult();
        }
        game.setWord();
    }
};
//かかった時間　ミリ秒
function formattedSeconds(ms){
    return (ms/1000).toFixed(2);
}

//動き付け
//多分CSSに関連付けられていない　14講座目参照
let opa=0;
function ghorst(){
    if(opa<=1){
        opa+=0.01;
    }
}