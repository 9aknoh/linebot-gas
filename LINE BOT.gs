function doPost(e) {
  // LINE APIから渡されてきた情報を抽出
  const contents = e.postData.contents;
  // JSON変換
  const json = JSON.parse(contents);
  // event抽出
  const event = json.events[0];
  // 送信されたテキスト
  const text = event.message.text;
  // 返信用トークン
  const token = event.replyToken;
  
  let message;
  if (text.match(/趣味/)) {
    message = getRandomMessage();
  } else if(text.match(/大学/)){
    message=getRandomMessagecollege();
  }else if(text.match(/食べ物/)){
    message=getRandommessage("食べ物");
  }else if(text.length==1){
    message="どうしたの？"
  }else {
    message = text;
  }
  
  reply(token, message);
}

function reply(token, text) {
  // LINE Developersで発行したトークン
  const ACCESS_TOKEN = "X66P764N7iEShu9zVcNa2TBbPDH6ZC2vfNQi5QvgvBMPSAp7gPq0t8Bc9MEAtLgHl5NJXmxM8AhbTq4pomn+XAczn+8RKYGVmOQyaQ9ogOOOtcKsX2663rISygXT1HFO5UR6Mxzk9PbCU56pqkcYBwdB04t89/1O/w1cDnyilFU=";
  // APIのURL
  const url = "https://api.line.me/v2/bot/message/reply";
  // 送信データのヘッダー
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
  };
  
  // 送信データの中身(これをLINEが処理してくれる)
  var postData = {
    "replyToken" : token,
    "messages" : [
      {
        'type':'text',
        'text': text,
      }
    ]
  };
  // それぞれをURLに乗せるために固める
  var options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(postData)
  };
  
  // 送信！
  return UrlFetchApp.fetch(url, options);  
}

function getRandomMessage() {
  // スプレッドシートの読み込み
  const SpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // 趣味シートの読み込み
  const Sheet = SpreadSheet.getSheetByName("趣味");
  
  // 最終行を取得
  const lastRow = Sheet.getLastRow();
  
  // スプレッドシートのデータを取得
  const values = Sheet.getRange(1, 1, lastRow).getValues();
  
  // ランダム行目の1列目を（A列の値が設定されているセルのどれかのテキスト）を返却
  return values[Math.floor(Math.random() * lastRow)][0];+"やよ。";
}

function getRandomMessagecollege() {
  // スプレッドシートの読み込み
  const SpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // 趣味シートの読み込み
  const Sheet = SpreadSheet.getSheetByName("大学");
  
  // 最終行を取得
  const lastRow = Sheet.getLastRow();
  
  // スプレッドシートのデータを取得
  const values = Sheet.getRange(1, 1, lastRow).getValues();
  
  // ランダム行目の1列目を（A列の値が設定されているセルのどれかのテキスト）を返却
  return values[Math.floor(Math.random() * lastRow)][0]+"大学です。";
}

function getRandommessage(sheetName) {
  // スプレッドシートの読み込み
  const SpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // 趣味シートの読み込み
  const Sheet = SpreadSheet.getSheetByName(sheetName);
  
  // 最終行を取得
  const lastRow = Sheet.getLastRow();
  
  // スプレッドシートのデータを取得
  const values = Sheet.getRange(1, 1, lastRow).getValues();
  
  // ランダム行目の1列目を（A列の値が設定されているセルのどれかのテキスト）を返却
  return values[Math.floor(Math.random() * lastRow)][0]+"おいしいよね。";
}
