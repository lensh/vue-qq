/**
 * [QQ等级计算]
 * 计算规则:1个星星为1级，1个月亮为4级，1个太阳为16级，1个皇冠为64级
 * @param  {number} level [等级]
 * @return {object}   [返回包含皇冠、太阳、月亮、星星个数的对象]
 */
export default (level) => {
	level = level > 150 ? 150 : level < 1 ? 1 : level // QQ最高150级,最低1级
	const crown = ~~(level / 64) // 皇冠数
	const sun = ~~((level - crown * 64) / 16) // 太阳数
	const moon = ~~((level - crown * 64 - sun * 16) / 4) // 月亮数
	const star = ~~(level - crown * 64 - sun * 16 - moon * 4) // 星星数
	return {
		crown,
		sun,
		moon,
		star
	}
}