window.showLocalCsvData = async () => {
    console.log('---');
    for ( i = 0; i < localStorage.maxCount; i++) {
      console.log(i);
      //この値をローカルストレージにcsvの配列番号そのままに代入して実行させる。
      console.log( localStorage[7+6*i],localStorage[8+6*i],localStorage[9*6*i]);
    }
  };
  
  window.localStrageDataClear = async () => {
    //ローカルストレージの初期化
    localStorage.clear();
    console.log('Localstrage is Cleared');
  };
  
  
  window.showRandomHex = async () => {
    let digestHex = await digestMessage(text+Math.random(3600));//60年 * 60周期で　3600のcharを設定
    let _Cbytes = digestHex;
    console.log(_Cbytes);
  };

//sleepでawaitを使う方法
function sleep(msec) {
    return new Promise(function(resolve) {
       setTimeout(function() {resolve()}, msec);
    })
  }

  //簡単な乱数生成用関数
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }
  
  
  async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    const hashHexZx = '0x' + hashHex ;//先頭に0xをつける
    return hashHexZx;
  }











