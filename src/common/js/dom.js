/**
 * [getTarget 得到事件对象的目标节点]
 */
export function getTarget(e){
    let target=e.target||e.srcElement
    return target
}

/**
 * [getTargetClass 得到事件对象的目标节点的类名]
 */
export function getTargetClass(e){
	let target=e.target||e.srcElement
    return target.className
}