-- 1. updates the review count and average rating for a specific restaurant after a new review is added
-- implemented in  router.post('/add-review', (req, res).

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;

INSERT INTO Review9 (reviewID, userName, restaurantID, totalLikes, rating, description)
VALUES ('NEW_REVIEW_ID', 'USER_NAME', 'RESTAURANT_ID', 0, 4.5, 'Great experience!');

UPDATE Restaurant9
SET reviewCount = reviewCount + 1,
    rating = (
        SELECT AVG(rating)
        FROM Review9
        WHERE restaurantID = 'RESTAURANT_ID'
    )
WHERE restaurantID = 'RESTAURANT_ID';

COMMIT;


-- 2 Calculate the Average Rating Per Cuisine Type
-- with reviewCount > 500
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN;

SELECT cuisine, AVG(rating) AS average_rating
FROM (
    SELECT r.cuisine, rv.rating, r.reviewCount
    FROM Restaurant9 r
    JOIN Review9 rv ON r.restaurantID = rv.restaurantID
    WHERE r.reviewCount > 500
) AS filtered_restaurants
GROUP BY cuisine
ORDER BY average_rating DESC
LIMIT 10;

COMMIT;

