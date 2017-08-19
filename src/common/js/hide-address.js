//隐藏地址栏
(function(win) {
	var doc = win.document

	if (!win.navigator.standalone && !location.hash && win.addEventListener) {

		win.scrollTo(0, 1)
		var scrollTop = 1,
			getScrollTop = function() {
				return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0
			},

			//reset to 0 on bodyready, if needed
			bodycheck = setInterval(function() {
				if (doc.body) {
					clearInterval(bodycheck);
					scrollTop = getScrollTop();
					win.scrollTo(0, scrollTop === 1 ? 0 : 1);
				}
			}, 15)

		win.addEventListener("load", function() {
			setTimeout(function() {
				if (getScrollTop() < 20) {
					win.scrollTo(0, scrollTop === 1 ? 0 : 1);
				}
			}, 0)
		}, false)
	}
})(window)