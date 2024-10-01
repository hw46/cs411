const express = require('express');
const router = express.Router();
const connection = require('./dbConnection');

// Serve the login page
router.get('/', (req, res) => {
    res.render('index', { title: 'Search Restaurants' });
});

// Serve the login form page
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// User sign-up page
router.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

// Handle login POST request
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM User9 WHERE userName = ? AND Password = ?';
    connection.query(sql, [username, password], (err, results) => {
        if (err) {
            return res.status(500).send({ message: 'Database error', error: err });
        }
        if (results.length > 0) {
            req.session.user = results[0];  // Store user info in session
            res.redirect('/profile');
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});

// Serve the main page
router.get('/main', (req, res) => {
    if (req.session.user) {
        // Check if the user is an admin
        if (req.session.user.levelName === 'admin') {
            // Redirect to manage accounts page
            res.redirect('/manage-account');
        } else {
            // Render user search page
            res.render('index', { title: 'Search Restaurants', user: req.session.user });
        }
    } else {
        res.redirect('/');
    }
});

// Render user profile
router.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const userName = req.session.user.userName;

    // Fetch the latest user info
    const getUserQuery = 'SELECT * FROM User9 WHERE userName = ?';
    connection.query(getUserQuery, [userName], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send('Error fetching user data');
        }

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        const user = results[0];
        // Fetch the user's reviews
        const getUserReviewsQuery = 'SELECT * FROM Review9 WHERE userName = ?';
        connection.query(getUserReviewsQuery, [userName], (err, reviews) => {
            if (err) {
                console.error('Error fetching reviews:', err);
                return res.status(500).send('Error fetching reviews');
            }

            res.render('profile', { user, reviews });
        });
    });
});


// profile review
router.post('/update-review', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const { reviewID, rating, description } = req.body;

    const editReviewQuery = `UPDATE Review9 SET rating = ?, description = ? WHERE reviewID = ? AND userName = ?`;
    connection.query(editReviewQuery, [rating, description, reviewID, req.session.user.userName], (err, result) => {
        if (err) {
            console.error('Error editing review:', err);
            return res.status(500).send('Error editing review');
        }
        res.redirect('/profile');
    });
});

// Delete a review
router.post('/delete-review', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const { reviewID } = req.body;

    const deleteReviewQuery = `DELETE FROM Review9 WHERE reviewID = ? AND userName = ?`;
    connection.query(deleteReviewQuery, [reviewID, req.session.user.userName], (err, result) => {
        if (err) {
            console.error('Error deleting review:', err);
            return res.status(500).send('Error deleting review');
        }
        res.redirect('/profile');
    });
});

// Handle profile update
router.post('/profile', (req, res) => {
    if (req.session.user) {
        const { Email, Password } = req.body;
        const sql = `UPDATE User9 SET Email = ?, Password = ? WHERE userName = ?`;
        connection.query(sql, [Email, Password, req.session.user.userName], (err, result) => {
            if (err) {
                return res.status(500).send({ message: 'Error updating profile', error: err });
            }
            // Update the session user info
            req.session.user.Email = Email;
            req.session.user.Password = Password;
            res.redirect('/profile');
        });
    } else {
        res.redirect('/');
    }
});

// Handle logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/login');
    });
});

// Handle account deletion
router.post('/delete-account', (req, res) => {
    if (req.session.user) {
        const sql = 'DELETE FROM User9 WHERE userName = ?';
        connection.query(sql, [req.session.user.userName], (err, result) => {
            if (err) {
                return res.status(500).send({ message: 'Error deleting account', error: err });
            }
            // The trigger in the database will take care of deleting the associated reviews
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).send('Error logging out');
                }
                res.redirect('/');
            });
        });
    } else {
        res.redirect('/');
    }
});

// Serve the manage accounts page
router.get('/manage-account', (req, res) => {
    if (req.session.user && req.session.user.levelName === 'admin') {
        const sql = 'SELECT * FROM User9';
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching user data:', err);
                return res.status(500).send({ message: 'Error fetching user data', error: err });
            }
            res.render('manage-account', { title: 'Manage Accounts', users: results });
        });
    } else {
        res.redirect('/main');
    }
});

// API to get all users (admin-only)
router.get('/api/users', (req, res) => {
    if (req.session.user && req.session.user.levelName === 'admin') {
        const sql = 'SELECT * FROM User9';
        connection.query(sql, (err, results) => {
            if (err) {
                res.status(500).send({ message: 'Error fetching user data', error: err });
                return;
            }
            res.json(results);
        });
    } else {
        res.status(403).send({ message: 'Access denied' });
    }
});

// Insert new user from admin
router.post('/api/users', (req, res) => {
    const { userName, Email, Password, levelName } = req.body;
    const sql = `INSERT INTO User9 (userName, Email, Password, levelName) VALUES (?, ?, ?, ?)`;
    connection.query(sql, [userName, Email, Password, levelName], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).send('Error adding user');
        }
        res.redirect('/login');
    });
});

// API to update a user
router.put('/api/users/:userName', (req, res) => {
    const userName = req.params.userName;
    const { Email, Password, levelName } = req.body;
    const sql = `UPDATE User9 SET Email = ?, Password = ?, levelName = ? WHERE userName = ?`;
    connection.query(sql, [Email, Password, levelName, userName], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error updating user', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.send({ message: 'User updated successfully' });
        }
    });
});

// API to delete a user
router.delete('/api/users/:userName', (req, res) => {
    const userName = req.params.userName;
    const sql = 'DELETE FROM User9 WHERE userName = ?';
    connection.query(sql, [userName], (err, result) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting user', error: err });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.send({ message: 'User deleted successfully' });
        }
    });
});



// Search restaurants
router.get('/search', (req, res) => {
    const { name, address, city, state, rating, reviewCount, cuisine, priceRange } = req.query;

    let sql = 'SELECT * FROM Restaurant9 WHERE 1=1';
    const params = [];

    if (name) {
        sql += ' AND name LIKE ?';
        params.push(`%${name}%`);
    }
    if (address) {
        sql += ' AND address LIKE ?';
        params.push(`%${address}%`);
    }
    if (city) {
        sql += ' AND city LIKE ?';
        params.push(`%${city}%`);
    }
    if (state) {
        sql += ' AND state = ?';
        params.push(state);
    }
    if (rating) {
        sql += ' AND rating = ?';
        params.push(rating);
    }
    if (reviewCount === 'top10') {
        sql += ' AND reviewCount >= 200';
    } else if (reviewCount === 'moreThanAverage') {
        sql += ' AND reviewCount > 95';
    }
    if (cuisine) {
        sql += ' AND cuisine = ?';
        params.push(cuisine);
    }
    if (priceRange) {
        sql += ' AND priceRange = ?';
        params.push(priceRange);
    }

    connection.query(sql, params, (err, results) => {
        if (err) {
            console.error('Error fetching search results:', err);
            return res.status(500).send({ message: 'Error fetching search results', error: err });
        }
        res.render('search-results', { title: 'Search Results', restaurants: results });
    });
});


// Serve the restaurant detail page
router.get('/restaurant/:restaurantID', (req, res) => {
    const restaurantID = req.params.restaurantID;

    const restaurantQuery = `SELECT * FROM Restaurant9 WHERE restaurantID = ?`;
    const reviewsQuery = `SELECT * FROM Review9 WHERE restaurantID = ?`;

    connection.query(restaurantQuery, [restaurantID], (err, restaurantResults) => {
        if (err) {
            console.error('Error fetching restaurant data:', err);
            return res.status(500).send({ message: 'Error fetching restaurant data', error: err });
        }
        connection.query(reviewsQuery, [restaurantID], (err, reviewResults) => {
            if (err) {
                console.error('Error fetching reviews:', err);
                return res.status(500).send({ message: 'Error fetching reviews', error: err });
            }
            res.render('restaurant-detail', {
                title: restaurantResults[0].name,
                restaurant: restaurantResults[0],
                reviews: reviewResults,
                user: req.session.user // Pass the logged-in user to the template
            });
        });
    });
});


// add-review, Transaction 1
router.post('/add-review', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const { restaurantID, rating, description } = req.body;
    const userName = req.session.user.userName;

    const reviewID = generateReviewID(userName, restaurantID);

    // Transaction 1. updates the review count and average rating for a specific restaurant after a new review is added
    // have to split it up since Node.JS doesn't support. See Transaction.sql for the original version.
    const addReviewQuery = `INSERT INTO Review9 (reviewID, userName, restaurantID, totalLikes, rating, description) VALUES (?, ?, ?, 0, ?, ?)`;
    const updateRestaurantQuery = `
        UPDATE Restaurant9
        SET reviewCount = reviewCount + 1,
            rating = (
                SELECT AVG(rating)
                FROM Review9
                WHERE restaurantID = ?
            )
        WHERE restaurantID = ?
    `;

    connection.beginTransaction(err => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.status(500).send('Error starting transaction');
        }
        connection.query(addReviewQuery, [reviewID, userName, restaurantID, rating, description], (err, result) => {
            if (err) {
                return connection.rollback(() => {
                    console.error('Error adding review:', err);
                    return res.status(500).send('Error adding review');
                });
            }
            connection.query(updateRestaurantQuery, [restaurantID, restaurantID], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('Error updating restaurant:', err);
                        return res.status(500).send('Error updating restaurant');
                    });
                }
                connection.commit(err => {
                    if (err) {
                        return connection.rollback(() => {
                            console.error('Error committing transaction:', err);
                            return res.status(500).send('Error committing transaction');
                        });
                    }
                    res.redirect(`/restaurant/${restaurantID}`);
                });
            });
        });
    });
});


// Function to generate a unique 22-digit reviewID
function generateReviewID(userName, restaurantID) {
    const timestamp = Date.now().toString();
    const baseID = `${userName}${restaurantID}${timestamp}`;
    let hash = 0;
    for (let i = 0; i < baseID.length; i++) {
        const char = baseID.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
    }
    const reviewID = ('00000000000000000000' + Math.abs(hash)).slice(-22);
    return reviewID;
}

// Route to display the leaderboard
router.get('/leaderboard', (req, res) => {
    const topUsersQuery = `CALL GetUserReviewCountsTop10()`;
    const topRestaurantsQuery = `CALL GetTopReviewedRestaurants()`;

    connection.query(topUsersQuery, (err, topUsersResults) => {
        if (err) {
            console.error('Error fetching top users:', err);
            return res.status(500).send('Error fetching top users');
        }
        connection.query(topRestaurantsQuery, (err, topRestaurantsResults) => {
            if (err) {
                console.error('Error fetching top restaurants:', err);
                return res.status(500).send('Error fetching top restaurants');
            }

            res.render('leaderboard', {
                title: 'Leaderboard',
                topUsers: topUsersResults[0],
                topRestaurants: topRestaurantsResults[0]
            });
        });
    });
});


// Transaction No2 calculates the average rating for each cuisine type with review count > 500
router.get('/cuisine-suggestions', (req, res) => {
    const getCuisineSuggestionsQuery = `
        SELECT cuisine, AVG(rating) AS average_rating
        FROM (
            SELECT r.cuisine, rv.rating, r.reviewCount
            FROM Restaurant9 r
            JOIN Review9 rv ON r.restaurantID = rv.restaurantID
            WHERE r.reviewCount > 500
        ) AS filtered_restaurants
        GROUP BY cuisine
        ORDER BY average_rating DESC
        LIMIT 10`;

    connection.beginTransaction(err => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.status(500).send('Error starting transaction');
        }

        connection.query(getCuisineSuggestionsQuery, (err, results) => {
            if (err) {
                return connection.rollback(() => {
                    console.error('Error fetching cuisine suggestions:', err);
                    return res.status(500).send('Error fetching cuisine suggestions');
                });
            }
            connection.commit(err => {
                if (err) {
                    return connection.rollback(() => {
                        console.error('Error committing transaction:', err);
                        return res.status(500).send('Error committing transaction');
                    });
                }

                res.json(results);
            });
        });
    });
});



module.exports = router;
