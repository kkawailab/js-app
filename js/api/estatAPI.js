//**********************************************//
//
// e-Stat API ラッパー
//
//**********************************************//

var estatAPI = function(o){
	return new Promise(function(resolve, reject){
		var url = estatAPI.buildUrl(o);
		var api = underbar_case(o.api);
		if(o.userData != undefined)
		{
			if(o.api == estatAPI.config.GET_META_INFO)
			{
				o.userData.METADATA.GET_META_INFO.PARAMETER.STATS_DATA_ID = null
				resolve(o.userData.METADATA)
			}
			else
			{
				resolve(o.userData.STATDATA)
			}
		}
		else
		{
			$.getJSON(url).done(function(data){
				if(data[api].RESULT.STATUS !== 0)
				{
					reject({
						status: data[api].RESULT.STATUS,
						error_msg: data[api].RESULT.ERROR_MSG
					});
					return;
				}
				resolve(data);
			}).fail(function(e){
				reject(e);
			});
		}
	});

};

estatAPI.config = {
	 URL			: "https://api.e-stat.go.jp/rest/2.0/app/json/"
	,GET_STATS_LIST	:"getStatsList"
	,GET_META_INFO	: "getMetaInfo"
	,GET_STATS_DATA	: "getStatsData"
	,metaGetFlg		: 'N'
}

estatAPI.buildUrl = function(o){
	var q = {
		appId: o.appId
	};
	if (o.api === estatAPI.config.GET_STATS_LIST)
	{
		throw new Error('unimplemented');
	}
	else if (o.api === estatAPI.config.GET_META_INFO)
	{
		q.statsDataId = o.statsDataId;
	}
	else if (o.api === estatAPI.config.GET_STATS_DATA)
	{
		q.statsDataId = o.statsDataId;
		q.metaGetFlg = estatAPI.config.metaGetFlg;
		Object.keys(o.filters).filter(function(key){
			return key === "time" || key === "area" || /^cat/.test(key);
		}).forEach(function(key){
			var params = o.filters[key];
			if (typeof params === "string")
			{
				q["cd" + capitalize(key)] = params;
				return;
			}
			if (params.lv	)
			{
				q["lv" + capitalize(key)] = params.lv;
			}
			if (params.cd	)
			{
				q["cd" + capitalize(key)] = params.cd;
			}
			if (params.from	)
			{
				q["cd" + capitalize(key) + "From"] = params.from;
			}
			if (params.to	)
			{
				q["cd" + capitalize(key) + "To"] = params.to;
			}
		});
	}
	return estatAPI.config.URL + o.api + "?" + build_queries(q);
};
