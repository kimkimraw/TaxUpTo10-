
let numElem = document.getElementById('value');
let taxElem = document.getElementById('tax');
let btn = document.getElementById('btn');
let itemElem = document.getElementById('item');
let paymentElem = document.getElementById('payment');
let cashbackElem = document.getElementById('cashback');
let resultElem = document.getElementById('calcResult');
let noCalcElem = document.getElementById('noCalc');

let errorMsg = document.getElementById('errorText');
let error_1 = '税抜金額は半角数字のみで入力してください。';
let error_2 = '購入品・支払い方法が選択されていません。';

// インプットテキストにオートフォーカス
numElem.focus();

// 金額欄にフォーカスが当たったら、入力内容をクリアする
numElem.addEventListener('focus', function(){
	numElem.value = '';
})

// ボタンクリックでイベント発火
btn.addEventListener('click',function(){
// エラーメッセージのクリア
	errorMsg.innerHTML = '';

// 入力された数値を取得
	let value = numElem.value;

// //入力された数値が空白か判定
// 	if(value == ''){
// 		errorMsg.innerHTML = '金額を入力して下さい。';
// 	} 

// 10進数の整数を返す
	value = parseInt(value,10);

// 入力された数値かどうか真偽値で返す
	let isNum = isNumber(value);

	if(isNum == false){
		errorMsg.innerHTML = '税抜金額は半角数字のみで入力してください。';
		return false;
	}

// 購入品の値を判定
	let resultItem = getItem(itemElem,error_2);
// 支払い方法の値を判定
	let resultPayment = getPaymentItem(paymentElem,error_2);
// 消費税取得
	let tax = getTaxRate(resultItem);
// キャッシュバック金額を計算
	let resultCashback = getCashBack(tax,resultPayment,value);
// 税込価格を計算
	let resultValue = addTax(value,tax);

//HTMLに表示する内容
	let resultTax = tax * 100;


// HTMLに出力する
	noCalcElem.innerHTML = `${value}円`;
	resultElem.innerHTML = `${resultValue}円`;
	taxElem.innerHTML = `${resultTax}％`;
	cashbackElem.innerHTML = `${resultCashback}円分`;	


});

// 入力された数値の判定
function isNumber(value){
  // チェック条件パターン
  let pattern = /^([1-9]\d*|0)(\.\d+)?$/;
  // 数値チェック
  return pattern.test(value);
}


// 購入品判定
function getItem(itemElem,error_2) {
	
	 itemElem = itemElem.value;

	// 「選択してください」ならエラー
	if(itemElem == 'empty'){
		errorMsg.innerHTML = error_2;
		return false;
	}
	// 「選択してください」以外ならOK
	if(itemElem != 'empty'){
		return itemElem;
	}
}
// 支払い方法判定
function getPaymentItem(paymentElem,error_2){
	 paymentElem = paymentElem.value; 

	// 「選択してください」ならエラー
	if(paymentElem == 'empty'){
		errorMsg.innerHTML = error_2;
		return false;
	}
	//「選択してください」以外ならOK 
	return paymentElem;
}

// 消費税取得用関数
function getTaxRate(itemElem){
	// itemElem が食品の処理
	if(itemElem == 'food'){
		return 0.08;
	}
	// itemElem がその他の処理
	if(itemElem == 'other'){
		return 0.1;
	}
}

// キャッシュバック取得用関数
function getCashBack(tax,paymentElem,value){
	// 消費税10％かつ支払いがクレジットの処理
	if(tax == 0.1 && paymentElem == 'credit'){
		return value * 0.02;
	}
	// 該当なしの処理
	else{
		return 0;
	}
}

// 税込価格計算用関数
function addTax(value,tax){
	let calc = Math.floor(Math.floor(value * tax) + value);
	return calc;
}


