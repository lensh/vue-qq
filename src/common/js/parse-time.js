import 'babel-polyfill'

/**
 * [将时间戳转换成指定格式]
 * 转换规则:
 * 今天之内 12:34  1.23
 * 昨天  昨天
 * 前天  前天
 * 7天之内 星期一
 * 其它  2017-02-06
 * @param  {[int]} old_time [消息的时间戳]
 * @return {[string]}          [转换后的格式]
 */
export default (old_time) => {
	const now = new Date(),
		old = new Date(old_time * 1000),
		now_year = now.getFullYear(),
		old_year = old.getFullYear(),
		now_month = now.getMonth() + 1,
		old_month = old.getMonth() + 1,
		now_date = now.getDate(),
		old_date = old.getDate(),
		format_month = old_month.toString().padStart(2, '0'),
		format_date = old_date.toString().padStart(2, '0'),
		format_minutes = old.getMinutes().toString().padStart(2, '0'),
		dayArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

	if (now_year == old_year && now_month == old_month && now_date - old_date < 7) {
		if (now_date == old_date) {
			return `${old.getHours()}:${format_minutes}`
		} else if (now_date == old_date + 1) {
			return '昨天'
		} else if (now_date == old_date + 2) {
			return '前天'
		} else {
			return dayArr[old.getDay()]
		}
	} else {
		return `${old_year}-${format_month}-${format_date}`
	}
}