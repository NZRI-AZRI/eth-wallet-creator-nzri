

let web3;//web3
let account;

var nonceCount; //nonnce (global var)
var gasPri;
var gasLim;

let conInstance; // contractinstance
let qrcodeCount1 = 0 ;
let qrcodeCount2 = 0 ;

/**/
//init　web3 初期化
//async function initApp() {
  window.initApp = async () => {
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/39a7b8b9d7924f8398627a6fccb53bab"));
    //インフラ(infra.io)のキーは各自インフラに登録して手に入れてください。
    
    document.getElementById("initResult").innerText = '初期化しました';
  };

  window.createWalletRnHex = async () => {
    
    //秘密鍵生成
    let ethAccount = web3.eth.accounts.create( web3.utils.randomHex(32) );
    console.log('Created privateKey is' , ethAccount);
    document.getElementById("priKey").innerText = ethAccount.privateKey;

    //QRコードで出力
    let el = document.getElementById('qrcode1key');
    let text1 = ethAccount.privateKey; //アドレス-トークンID-OTPの順にQRコードに書き出し。 '-'は区切り文字。
    console.log(text1);
    if (qrcodeCount1 < 1){
      qrcode1 = new QRCode(el, text1);	
    }else if (qrcodeCount1 >= 1){
      qrcode1.makeCode(text1); // make another code.
    }
    qrcodeCount1 = qrcodeCount1 + 1 ;
    document.getElementById("qrcode1time").innerText = 'Private Key' ;	
    console.log(qrcodeCount1);
  };


  window.setPrivateKeyToWallet = async () => {
    privateKey = document.getElementById("privateKey1").value;
    if (!privateKey){
      return window.alert("key is empty")
    }
    console.log('privateKey saved')

    // privateKeyをインポート
    account = web3.eth.accounts.privateKeyToAccount(privateKey);
    //アドレスを表示
    myAccountAdr = account.address;
    console.log('myAccount' , myAccountAdr );
    document.getElementById("key2adr").innerText = myAccountAdr;




    //QRコードで出力
    let el = document.getElementById('qrcode2adr');
    let text1 = ethAccount.privateKey; //アドレス-トークンID-OTPの順にQRコードに書き出し。 '-'は区切り文字。
    console.log(text1);
    if (qrcodeCount2 < 1){
      qrcode1 = new QRCode(el, text1);	
    }else if (qrcodeCount2 >= 1){
      qrcode2.makeCode(text1); // make another code.
    }
    qrcodeCount2 = qrcodeCount2 + 1 ;
    document.getElementById("qrcode2adrtime").innerText = 'Account Address' ;	
    console.log(qrcodeCount2);


};


window.mint = async (adr,nftid,nfturi) => {

  console.log('argument is' ,adr,nftid,nfturi); 

  // メソッドのABIをエンコード
  let encodedABI = await conInstance.methods.mint(adr,nftid, nfturi).encodeABI();
  console.log('encodeABI is ', encodedABI);
  
  // gas量を計算
  let gasAmount = await conInstance.methods.mint(adr,nftid, nfturi).estimateGas({from:account.address}) + 5000;
  console.log('gasAmount is ', gasAmount);


  // 宛先にコントラクトのアドレス、データにエンコードしたABIをセットしたトランザクションを作成
  let tx = { to: mintInstance.options.address, data: encodedABI, gas: gasAmount };
  console.log('tx is ', tx);

  // トランザクションに署名して、そのままnodeに送付実行

  let signedTx = await account.signTransaction(tx);
  let res = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log('re is ', res);

};




// reloadを禁止する方法
// F5キーによるreloadを禁止する方法
document.addEventListener("keydown", function (e) {
  if ((e.which || e.keyCode) == 116 ) {
      e.preventDefault();
  }
});

// reloadを禁止する方法
// ページ離脱時alertを出す方法
window.addEventListener('beforeunload', function (e) {
  // メッセージを表示する
  e.returnValue = '本当にページ移動しますか？';
});

window.addEventListener('load', async function() {
  // ページ表示完了した1h=3600秒後にリロード
  //setTimeout(doReload, 1000*3600);
});



/*
//------------------------------------------------
//Author
//1.Code by NZRI.
//2020-06-15
//------------------------------------------------
*/

/*
//code 参考元
web3 js
https://cdn.jsdelivr.net/gh/ethereum/web3.js/dist/web3.min.js
https://web3js.readthedocs.io/en/v1.2.0/
https://web3js.readthedocs.io/en/v1.2.0/web3-eth-accounts.html

*/
//THANKS! 
