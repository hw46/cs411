-- Change the delimiter to //
DELIMITER //

-- Create the first stored procedure
CREATE PROCEDURE GetUserReviewCountsTop10()
BEGIN
    SELECT
        u.userName,
        COUNT(rv.reviewID) AS total_reviews
    FROM
        User9 u
    LEFT JOIN
        Review9 rv ON u.userName = rv.userName
    GROUP BY
        u.userName
    ORDER BY
        total_reviews DESC
    LIMIT 15;
END //

-- Create the second stored procedure
CREATE PROCEDURE GetTopReviewedRestaurants()
BEGIN
    SELECT
        rest.name,
        COUNT(rev.reviewID) AS total_reviews
    FROM
        Restaurant9 rest
    LEFT JOIN
        Review9 rev ON rest.restaurantID = rev.restaurantID
    GROUP BY
        rest.restaurantID, rest.name
    ORDER BY
        total_reviews DESC
    LIMIT 15;
END //

-- Change the delimiter back to ;
DELIMITER ;