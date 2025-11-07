//**********************************************//
//
// イベントシステム (Pub/Sub パターン)
//
//**********************************************//

function eventer(){ this._events = {}; }
eventer.prototype = {
	 on : function(nm, fn)
	{
		if (!(nm in this._events))
		{
			this._events[nm] = [];
		}
		this._events[nm].push(fn);
	}
	,off : function(nm, fn)
	{
		if (!(nm in this._events)) return;
		this._events[nm] = this._events[nm].filter(function(ev){
			return ev !== fn;
		});
	}
	,emit: function(nm)
	{
		if (!(nm in this._events)) return;
		var len = this._events[nm].length;
		var args = Array.prototype.slice.call(arguments, 1);
		for (var i = 0; i < len; i++)
		{
			this._events[nm][i].apply(this, args);
		}
	}
	,trigger : function()
	{
		return this.emit.apply(this, arguments);
	}

};
