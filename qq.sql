-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 08 月 19 日 10:27
-- 服务器版本: 5.6.12-log
-- PHP 版本: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `qq`
--
CREATE DATABASE IF NOT EXISTS `qq` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_mysql500_ci;
USE `qq`;

-- --------------------------------------------------------

--
-- 表的结构 `chat`
--

CREATE TABLE IF NOT EXISTS `chat` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(9) NOT NULL COMMENT '一个用户的id',
  `other_user_id` mediumint(9) NOT NULL COMMENT '另一个用户的id',
  `is_enter_chat` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否进入了对方的聊天页面(0不是 1是)',
  `is_pingbi` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否屏蔽了对方的聊天（1是 0不是）',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`,`other_user_id`,`is_pingbi`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_general_mysql500_ci COMMENT='聊天设置表' AUTO_INCREMENT=13 ;

--
-- 转存表中的数据 `chat`
--

INSERT INTO `chat` (`id`, `user_id`, `other_user_id`, `is_enter_chat`, `is_pingbi`) VALUES
(1, 1, 2, 1, 0),
(2, 1, 3, 0, 0),
(3, 1, 4, 0, 0),
(4, 1, 5, 0, 0),
(5, 1, 6, 0, 0),
(6, 1, 7, 0, 0),
(7, 1, 8, 0, 0),
(8, 1, 9, 0, 0),
(9, 2, 1, 0, 0),
(10, 2, 3, 0, 0),
(12, 3, 2, 0, 0),
(11, 3, 1, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `fenzu`
--

CREATE TABLE IF NOT EXISTS `fenzu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分组id',
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `zu_name` char(30) NOT NULL COMMENT '分组名称',
  `zu_member` varchar(400) NOT NULL COMMENT '分组内的成员的id',
  `is_default` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否是默认分组(1是 0不是)',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `is_defaul` (`is_default`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='好友分组表' AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `fenzu`
--

INSERT INTO `fenzu` (`id`, `user_id`, `zu_name`, `zu_member`, `is_default`) VALUES
(1, 1, '晓风残月', '6,7,8,9', 1),
(2, 2, '江南烟雨', '3', 1),
(3, 3, '柳岸花名', '2', 1),
(4, 4, '我的好友', '', 0),
(5, 1, '特别关心', '3,4,5,2', 0),
(6, 2, '特别关心', '1', 0),
(7, 3, '特别关心', '1', 0),
(8, 10, '特别关心', '', 0),
(9, 10, '我的好友', '', 1);

-- --------------------------------------------------------

--
-- 表的结构 `friend`
--

CREATE TABLE IF NOT EXISTS `friend` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `user_id` mediumint(9) NOT NULL COMMENT '用户甲的id',
  `other_user_id` mediumint(9) NOT NULL COMMENT '用户乙的id',
  `beizhu` char(10) NOT NULL COMMENT '甲对乙的备注',
  `time` int(11) NOT NULL COMMENT '成为好友的时间',
  `is_friend` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否已经成为了好友,1 是 0 不是',
  `special` tinyint(1) NOT NULL DEFAULT '0' COMMENT '乙是否是甲的特别关心',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `other_user_id` (`other_user_id`),
  KEY `is_friend` (`is_friend`),
  KEY `special` (`special`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='好友关系表' AUTO_INCREMENT=19 ;

--
-- 转存表中的数据 `friend`
--

INSERT INTO `friend` (`id`, `user_id`, `other_user_id`, `beizhu`, `time`, `is_friend`, `special`) VALUES
(1, 1, 2, '楚乔', 1500035790, 1, 1),
(2, 1, 3, '马哲涵', 1500000000, 1, 1),
(3, 1, 4, '魏明', 1500000000, 1, 0),
(4, 1, 5, '程文宇', 1500000000, 1, 0),
(5, 1, 6, '许易', 1500000000, 1, 0),
(6, 1, 7, '张扬扬', 1500000000, 1, 0),
(7, 1, 8, '许志荣', 1500000002, 1, 0),
(8, 1, 9, '李萌', 1500000101, 1, 0),
(9, 2, 1, '宇文玥', 1500035790, 1, 0),
(10, 2, 3, '马哲涵', 1500000000, 1, 0),
(11, 3, 1, '宇文玥', 1500050000, 1, 0),
(12, 4, 1, '宇文玥', 1500050000, 1, 0),
(13, 5, 1, '宇文玥', 1500050000, 1, 0),
(14, 6, 1, '宇文玥', 1500050000, 1, 0),
(15, 7, 1, '宇文玥', 1500000000, 1, 0),
(16, 8, 1, '宇文玥', 1500000000, 1, 0),
(17, 9, 1, '宇文玥', 1500000000, 1, 0),
(18, 3, 2, '楚乔', 1500000000, 1, 0);

-- --------------------------------------------------------

--
-- 表的结构 `friend_apply`
--

CREATE TABLE IF NOT EXISTS `friend_apply` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `from_user` mediumint(9) NOT NULL COMMENT '申请方用户id',
  `to_user` mediumint(9) NOT NULL COMMENT '接受方用户id',
  `status` tinyint(1) NOT NULL COMMENT '状态(1 待处理  2 已同意 3 已拒绝)',
  `time` int(11) NOT NULL COMMENT '申请时间',
  `apply_message` char(20) NOT NULL COMMENT '附加消息',
  `reply` char(20) NOT NULL COMMENT '回复消息',
  `source` char(20) NOT NULL COMMENT '来源',
  PRIMARY KEY (`id`),
  KEY `to_user` (`to_user`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='好友申请表' AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `friend_apply`
--

INSERT INTO `friend_apply` (`id`, `from_user`, `to_user`, `status`, `time`, `apply_message`, `reply`, `source`) VALUES
(1, 2, 1, 2, 1500022110, '大哥,想请教一个问题', '', 'QQ群-ThinkPHP技术交流中心'),
(2, 3, 1, 2, 1500022120, '大哥,想请教一个问题', '', 'QQ号查找'),
(3, 4, 1, 2, 1500022130, '向大神学习', '', 'QQ群-牛客网IT笔试面试交流群'),
(4, 5, 1, 2, 1500022140, '你是诸葛亮?', '', '临时会话'),
(5, 1, 6, 1, 1500022150, '请求加为好友', '', '临时会话'),
(6, 7, 1, 2, 1500020000, '请求加为好友', '', 'QQ号查找'),
(7, 9, 1, 2, 1500023000, '请求加为好友', '', 'QQ群-心理电影周日8-9W7306');

-- --------------------------------------------------------

--
-- 表的结构 `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `group_name` char(15) NOT NULL COMMENT '群名称',
  `group_intro` char(30) NOT NULL COMMENT '群介绍',
  `group_avator` char(40) NOT NULL DEFAULT '/static/icon/4/fac.png' COMMENT '群头像',
  `who_created` mediumint(9) NOT NULL COMMENT '群主id',
  `time` int(11) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='群表' AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `groups`
--

INSERT INTO `groups` (`id`, `group_name`, `group_intro`, `group_avator`, `who_created`, `time`) VALUES
(1, '英语四六级自动查询', '', '/static/user/face/11.jpg', 1, 1500000010),
(2, 'ThinkPHP技术交流中心', '', '/static/user/face/2.jpg', 1, 1500001000),
(3, '工作室招新群', '', '/static/user/face/12.jpg', 2, 1500000010),
(4, '心率手表', '', '/static/user/face/13.jpg', 2, 1500001000),
(5, '心理电影赏析', '', '/static/user/face/14.jpg', 2, 1500000010),
(6, '牛客网IT笔试面试交流群', '', '/static/user/face/1.jpg', 2, 1500001000),
(7, '14级网络工程2班', '', '/static/user/face/3.jpg', 3, 1500000010),
(8, '心理电影周日8-9W7306', '', '/static/user/face/8.jpg', 3, 1500001000),
(9, '计算机网络学习交流', '', '/static/user/face/15.jpg', 3, 1500000010);

-- --------------------------------------------------------

--
-- 表的结构 `group_user`
--

CREATE TABLE IF NOT EXISTS `group_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `group_id` mediumint(9) NOT NULL COMMENT '群id',
  `user_id` mediumint(9) NOT NULL COMMENT '用户id',
  `role` tinyint(3) NOT NULL DEFAULT '2' COMMENT '角色(0群主,1管理员,2普通成员)',
  `add_time` int(11) NOT NULL COMMENT '加入该群的时间',
  `unread` tinyint(3) NOT NULL DEFAULT '0' COMMENT '未读消息的条数',
  `is_enter` tinyint(1) NOT NULL DEFAULT '0' COMMENT '用户是否进入了该群的聊天页面（1是 0否）',
  `nick_name` varchar(20) NOT NULL COMMENT '群昵称',
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`),
  KEY `user_id` (`user_id`),
  KEY `role` (`role`),
  KEY `unread` (`unread`),
  KEY `is_enter` (`is_enter`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='群-用户关系表' AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `group_user`
--

INSERT INTO `group_user` (`id`, `group_id`, `user_id`, `role`, `add_time`, `unread`, `is_enter`, `nick_name`) VALUES
(1, 1, 1, 0, 1478887710, 0, 0, '宇文玥'),
(2, 2, 1, 0, 1478887720, 0, 0, '宇文玥'),
(3, 3, 1, 1, 1478887730, 0, 0, '宇文玥'),
(4, 4, 1, 1, 1478887740, 0, 0, '宇文玥'),
(5, 5, 1, 1, 1478887750, 0, 0, '宇文玥'),
(6, 6, 1, 2, 1478887760, 0, 0, '宇文玥'),
(7, 7, 1, 2, 1478887770, 0, 0, '宇文玥'),
(8, 8, 1, 2, 1478887780, 0, 0, '宇文玥'),
(9, 9, 1, 2, 1478887790, 0, 0, '宇文玥'),
(10, 6, 2, 0, 1500000000, 0, 0, '楚乔'),
(11, 6, 3, 2, 1500000000, 46, 0, '马哲涵'),
(12, 7, 3, 0, 1500200000, 1, 0, '马哲涵'),
(13, 2, 2, 2, 1500070000, 0, 1, '楚乔');

-- --------------------------------------------------------

--
-- 表的结构 `message_group`
--

CREATE TABLE IF NOT EXISTS `message_group` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `from_user` int(11) NOT NULL COMMENT '谁发的',
  `to_group` int(11) NOT NULL COMMENT '发给哪个群,值为群id',
  `message` varchar(500) NOT NULL COMMENT '内容',
  `time` int(11) NOT NULL COMMENT '发送时间',
  PRIMARY KEY (`id`),
  KEY `to_group` (`to_group`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='消息表(群聊)' AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `message_group`
--

INSERT INTO `message_group` (`id`, `from_user`, `to_group`, `message`, `time`) VALUES
(1, 2, 6, '楚乔:电商项目中发模板邮件这种业务有谁了解吗', 1500007000),
(2, 3, 6, '马哲涵:邮件是html格式', 1500008000),
(3, 2, 6, '楚乔:嗯，那个能实现。老板给两张表就不管了，我不太清楚具体的业务流程之类', 1500010000),
(4, 2, 2, '楚乔:有谁会nodejs的吗', 1500122660),
(5, 3, 7, '马哲涵:男生的材料我现在看不到,你们走心...', 1500197438),
(6, 2, 6, '楚乔:还是不太明白啊', 1500902861),
(7, 1, 6, '宇文玥:哪里不明白？', 1501229199);

-- --------------------------------------------------------

--
-- 表的结构 `message_user`
--

CREATE TABLE IF NOT EXISTS `message_user` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `from_user` mediumint(11) NOT NULL COMMENT '谁发的,值为用户id',
  `to_user` mediumint(11) NOT NULL COMMENT '发给谁,值为用户id',
  `message` varchar(500) NOT NULL COMMENT '消息内容',
  `time` int(11) NOT NULL COMMENT '发送时间',
  `is_read` tinyint(1) NOT NULL DEFAULT '0' COMMENT '接收者是否已读,0未读,1已读',
  PRIMARY KEY (`id`),
  KEY `from_user` (`from_user`),
  KEY `to_user` (`to_user`),
  KEY `is_read` (`is_read`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='消息表(私聊)' AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `message_user`
--

INSERT INTO `message_user` (`id`, `from_user`, `to_user`, `message`, `time`, `is_read`) VALUES
(1, 2, 1, '燕洵他遭受得太多了，没有人在他身边，他是需要我的', 1500520300, 1),
(2, 3, 1, '技术栈会更多一点', 1500390000, 1),
(3, 3, 1, '哈哈哈', 1500520313, 1),
(4, 1, 2, '我也需要你', 1500520400, 1),
(5, 2, 1, '别这样，不然待会屏蔽你了', 1500520500, 1),
(6, 1, 2, '你试试', 1501229571, 1);

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `qq` char(15) NOT NULL COMMENT 'qq号',
  `pwd` char(30) NOT NULL DEFAULT '53f6ff462b54af4141e76372436663' COMMENT '密码',
  `phone` char(11) NOT NULL COMMENT '手机号',
  `email` char(50) NOT NULL COMMENT '邮箱',
  `time` int(11) NOT NULL COMMENT '注册时间',
  `last_login` int(11) NOT NULL COMMENT '最后登陆时间',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '在线状态,0离线,1在线,2隐身',
  `device` tinyint(1) NOT NULL DEFAULT '0' COMMENT '设备状态（0离线，1手机在线，2 3G在线,3 4G在线，4 wifi在线，5 电脑在线）',
  `socketid` char(20) NOT NULL COMMENT '登陆时的socketid',
  PRIMARY KEY (`id`),
  UNIQUE KEY `qq` (`qq`),
  UNIQUE KEY `phone` (`phone`),
  KEY `socketid` (`socketid`),
  KEY `email` (`email`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='用户表' AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `qq`, `pwd`, `phone`, `email`, `time`, `last_login`, `status`, `device`, `socketid`) VALUES
(1, '986992484', '53f6ff462b54af4141e76372436663', '18296764976', '', 1497695436, 1503135667, 1, 2, 'SnmgCAOavO3EJbz3AAAE'),
(2, '986992483', '53f6ff462b54af4141e76372436663', '18296764975', '', 1499853636, 1503111556, 0, 0, ''),
(3, '986992482', '53f6ff462b54af4141e76372436663', '18296764974', '', 1499978760, 1501561709, 1, 1, ''),
(4, '986992481', '53f6ff462b54af4141e76372436663', '18296764973', '', 1499978760, 1501123985, 1, 3, ''),
(5, '986992480', '53f6ff462b54af4141e76372436663', '18296764972', '', 1499978760, 1501080517, 0, 0, ''),
(6, '986992479', '53f6ff462b54af4141e76372436663', '18296764971', '', 1499978760, 1500000000, 1, 0, ''),
(7, '986992478', '53f6ff462b54af4141e76372436663', '18296764970', '', 1499978760, 1500000000, 1, 5, ''),
(8, '986992477', '53f6ff462b54af4141e76372436663', '18296764969', '', 1499978760, 1500000000, 0, 0, ''),
(9, '986992476', '53f6ff462b54af4141e76372436663', '18296764968', '', 1499978710, 1500000000, 1, 2, ''),
(10, '471848752', '53f6ff462b54af4141e76372436663', '18786766676', '', 1501302351, 1501302385, 0, 0, 'VedhfvJ9a5rptvEwAAAA');

-- --------------------------------------------------------

--
-- 表的结构 `user_detail`
--

CREATE TABLE IF NOT EXISTS `user_detail` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `user_id` mediumint(9) NOT NULL COMMENT '用户id',
  `nick_name` char(30) NOT NULL COMMENT '用户昵称',
  `signature` char(60) NOT NULL COMMENT '用户签名',
  `face` char(100) NOT NULL DEFAULT '/static/user/face/default.png' COMMENT '头像',
  `sex` char(2) NOT NULL DEFAULT '男' COMMENT '性别',
  `age` smallint(4) NOT NULL DEFAULT '0' COMMENT '年龄',
  `xingzuo` char(10) NOT NULL COMMENT '星座',
  `place` char(40) NOT NULL DEFAULT '江西' COMMENT '地方',
  `favor` char(30) NOT NULL COMMENT '爱好',
  `level` smallint(6) NOT NULL DEFAULT '1' COMMENT 'QQ等级',
  `profile_bg` char(30) NOT NULL DEFAULT '/static/user/bg/default.jpg' COMMENT '个人名片背景',
  `login_day` smallint(10) NOT NULL DEFAULT '0' COMMENT '登陆天数',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='用户信息详情' AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `user_detail`
--

INSERT INTO `user_detail` (`id`, `user_id`, `nick_name`, `signature`, `face`, `sex`, `age`, `xingzuo`, `place`, `favor`, `level`, `profile_bg`, `login_day`) VALUES
(1, 1, '莫知我哀', '楚乔传', '/static/user/face/0.jpg', '男', 21, '处女座', '江西', '娱乐/艺术/表演', 50, '/static/user/bg/2.jpeg', 1045),
(2, 2, '浅唱低吟', '路漫漫其修远兮', '/static/user/face/4.jpg', '女', 19, '天蝎座', '江西', '娱乐/艺术/表演', 30, '/static/user/bg/3.jpg', 0),
(3, 3, '一花一世界', '人生路漫漫', '/static/user/face/5.jpg', '男', 0, '巨蟹座', '江西', '', 1, '/static/user/bg/default.jpg', 0),
(4, 4, '云端之上', '最近真的太开心了', '/static/user/face/6.jpg', '男', 20, '白羊座', '江西', '', 1, '/static/user/bg/default.jpg', 0),
(5, 5, '心有芊芊结', '月下问归人东篱黄昏约，是是非非', '/static/user/face/7.jpg', '女', 21, '金牛座', '江西', '', 1, '/static/user/bg/default.jpg', 0),
(6, 6, '缥缈孤鸿影', '西风醉，几度痴人泪', '/static/user/face/8.jpg', '男', 18, '白羊座', '江西', '', 1, '/static/user/bg/default.jpg', 0),
(7, 7, '古今如梦', '孤灯点，青丝雪，只怨情已怯', '/static/user/face/9.jpg', '女', 19, '白羊座', '江西', '', 1, '/static/user/bg/default.jpg', 0),
(8, 8, '羽逸之光', '青春、若有张不老的脸', '/static/user/face/10.jpg', '女', 21, '白羊座', '江西', '', 1, '/static/user/bg/default.jpg', 0),
(9, 9, '斜阳云云美', '掩面叹息、泪落红妆残', '/static/user/face/11.jpg', '男', 20, '白羊座', '江西', '', 1, '/static/user/bg/default.jpg', 0),
(10, 10, '青青子衿', '', '/static/user/face/default.png', '男', 0, '', '江西', '', 1, '/static/user/bg/default.jpg', 0);

-- --------------------------------------------------------

--
-- 表的结构 `vip`
--

CREATE TABLE IF NOT EXISTS `vip` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `user_id` mediumint(9) NOT NULL COMMENT '用户的id',
  `vip_type` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'vip类型(0 非VIP,1 VIP,2 SVIP)',
  `accert` char(15) NOT NULL DEFAULT '慢速中' COMMENT '加速',
  `vip_level` tinyint(2) NOT NULL COMMENT 'vip级别,如VIP1,VIP2',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='会员表' AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `vip`
--

INSERT INTO `vip` (`id`, `user_id`, `vip_type`, `accert`, `vip_level`) VALUES
(1, 1, 2, '1.4倍加速中', 2),
(2, 2, 2, '1.4倍加速中', 2),
(3, 3, 1, '1.2倍加速中', 1),
(4, 4, 2, '1.4倍加速中', 2),
(5, 5, 0, '慢速中', 0),
(6, 6, 2, '1.4倍加速中', 2),
(7, 7, 2, '1.4倍加速中', 2),
(8, 8, 1, '1.2倍加速中', 1),
(9, 9, 0, '慢速中', 0),
(10, 10, 0, '慢速中', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
