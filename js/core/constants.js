//**********************************************//
//
// 定数定義
//
//**********************************************//

// チャート種別
var CHART_TYPE = {
	BAR_CHART: 0,
	LINE_CHART: 1,
	SCATTER_PLOT: 2,
	MAP: 3
};

// チャートマージン設定
var CHART_MARGINS = {
	DEFAULT: { top: 20, right: 20, bottom: 30, left: 100 }
};

// アニメーション設定
var ANIMATION = {
	TOOLTIP_FADE_OUT: 500,
	TOOLTIP_FADE_IN: 200,
	ERROR_DISPLAY_DURATION: 5000,
	ERROR_FADE_DURATION: 300
};

// ローカルストレージキー
var STORAGE_KEYS = {
	APP_ID: 'estat-appid',
	USER_DATA: 'userData'
};

// Cookie設定
var COOKIE_CONFIG = {
	MAX_AGE: 31536000, // 1年（秒単位）
	PATH: '/'
};
