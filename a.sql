SELECT a.id, a.time,b.face AS imgUrl, (

			SELECT COUNT( * ) 
			FROM message_user c
			WHERE c.is_read =0
			AND c.to_user = a.to_user
			AND c.from_user = a.from_user
			) AS unread, (

			SELECT d.message  
			FROM message_user d
			WHERE d.to_user = a.to_user
			AND d.from_user = a.from_user
			ORDER BY TIME DESC 
			LIMIT 1
			) AS message,(
    		select beizhu from friend e
            where e.other_user_id=a.from_user
			) AS from_user

			FROM message_user a
			LEFT JOIN user_detail b ON a.from_user = b.user_id
			AND a.to_user =1
		    GROUP BY from_user;



SELECT a.id, a.unread, c.group_name AS from_user, c.group_avator AS imgUrl, (

SELECT d.message
FROM message_group d
WHERE d.to_group = a.group_id
ORDER BY TIME DESC 
LIMIT 1
) AS message, (

SELECT e.time
FROM message_group e
WHERE e.to_group = a.group_id
ORDER BY TIME DESC 
LIMIT 1
) AS time
FROM group_user a
RIGHT JOIN message_group b ON b.to_group = a.group_id
AND a.user_id =1
LEFT JOIN groups c ON c.id = a.group_id
GROUP BY a.group_id







SELECT a.id, a.unread, c.group_name AS from_user, c.group_avator AS imgUrl, (

SELECT d.message,d.time
FROM message_group d
WHERE d.to_group = a.group_id
ORDER BY TIME DESC 
LIMIT 1
) as message time,
FROM group_user a
RIGHT JOIN message_group b ON b.to_group = a.group_id
AND a.user_id =1
LEFT JOIN groups c ON c.id = a.group_id
GROUP BY a.group_id
