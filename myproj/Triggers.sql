-- 1. Delete User Reviews When a User is Deleted:

DELIMITER //
CREATE TRIGGER delete_reviews_on_user_delete
AFTER DELETE ON User9
FOR EACH ROW
BEGIN
    DELETE FROM Review9
    WHERE userName = OLD.userName;
END //
DELIMITER ;



-- 2. update_restaurant_on_review_delete
DELIMITER //
CREATE TRIGGER update_restaurant_on_review_delete
AFTER DELETE ON Review9
FOR EACH ROW
BEGIN
    UPDATE Restaurant9
    SET reviewCount = reviewCount - 1,
        rating = (
            SELECT AVG(rating)
            FROM Review9
            WHERE restaurantID = OLD.restaurantID
        )
    WHERE restaurantID = OLD.restaurantID;
END //
DELIMITER ;



-- 3. Trigger to Update User Level Based on Number of Reviews
DELIMITER //
CREATE TRIGGER update_user_level
AFTER INSERT ON Review9
FOR EACH ROW
BEGIN
    DECLARE review_count INT;
    SELECT COUNT(*) INTO review_count FROM Review9 WHERE userName = NEW.userName;
    IF review_count >= 1 AND review_count < 5 THEN
        UPDATE User9 SET levelName = 'L2_Entrée_Explorer' WHERE userName = NEW.userName;
    ELSEIF review_count >= 5 AND review_count < 15 THEN
        UPDATE User9 SET levelName = 'L3_Flavor_Virtuoso' WHERE userName = NEW.userName;
    ELSEIF review_count >= 15 AND review_count < 30 THEN
        UPDATE User9 SET levelName = 'L4_Cuisine_Conqueror' WHERE userName = NEW.userName;
    ELSEIF review_count >= 30 THEN
        UPDATE User9 SET levelName = 'L5_Michelin_Maestro' WHERE userName = NEW.userName;
    END IF;
END//
DELIMITER ;
