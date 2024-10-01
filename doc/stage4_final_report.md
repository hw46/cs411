# Final Report 

## Schema Sashimi Restaurant Review Web App

### _Please list out **changes in the directions** of your project if the final project is different from your original proposal (based on your stage 1 proposal submission)._

In addition to the leaderboard of top users, we additionally added a leaderboard to indicate the most reviewed restaurants. Each of these display the top 15. 

Our UI is slightly different from our mockups - without the graphics and search bar as UI elements. Overall, we achieved a slightly more bare bones UI than we first thought of in our mockups - in the end it still serves the same purpose we were aiming for. 


### _Discuss what you think your application achieved or failed to achieve regarding its **usefulness**._

Overall - our application serves the main purpose we were aiming for from the beginning - gamify rating and reviewing restaurants! We included levels a user can achieve based off of the number of reviews they have submitted, as well as a leaderboard for users to aim towards being on. We achieved an overall complete application and included one fun part for users to aim towards achieving.

However, we failed at including any rewards and challenges that users could participate in. By removing these components from our final application we removed the really fun parts which the users could have interacted with more. With these utilities not being included in our final design we did decrease the more important parts of our application of which it was built upon. 

In terms of the data - our datasets did fail to include some cities and restaurants. This kind of incomplete data does decrease the usefulness of our application slightly as some users may find they are unable to review a restaurant they wanted to. One example we found is that no Champaign, IL restaurants were present in the Yelp database we based our data on. 


### _Discuss if you **change** the **schema** or **source** of the data for your application_

No schema was changed in our application, except that we only used three tables to achieve what 7+ tables should do as suggested in our original plan.

In terms of data, We import CSV files for the Restaurant and Review tables, while the User table entries are manually inserted for CRUD demonstration. Additionally, we updated the reviewID attribute to a fixed-length CHAR(22) to match Yelp's specifications.


### _Discuss what you **change** to your **ER diagram** and/or your **table** implementations. What are some differences between the original design and the final design? Why? What do you think is a more suitable design?_

Several relations including Challenge, Reward and LikeReview are implemented in the database but not integrated in our demo due to the development time constraint and the lack of cardinality in those relations. We have decided to instead focus more on the backend and frontend integrations with entities that have readily available real-life data that we have gathered from our stage 1 deliverables.


### _Discuss what **functionalities** you added or removed. Why?_

We added in a leaderboard on our front page using transactions to better show users who goals and help them find fellow power users of our application. These power users can serve as curators for restaurant recommendations that average users can try out.

In order to focus more on implementations related to the database, i.e. restaurant keyword search and sorting, we decided to remove the functionality for liking reviews, adding favorite reviews and restaurants, as well as challenges and rewards. As these features demonstrate less on the database design and implementation, with a lack of time due to the deadlines, we have decided to deprioritize them in our UX. Although they are all successfully implemented in the database we host on GCP, removing these features will allow for more UI placements for complex stored procedures and transactions related to restaurant sorting and review aggregations.


### _Explain how you think your **advanced database programs** complement your application._

Our advanced database programs complemented our application well because they display who are the most active users and most trending restaurants. By displaying the top 15 reviewers and reviewed restaurant, users for our application get insight into who uses our application the most and what restaurants they have all been to.

#### Stored Procedures
For Stored procedures, they both are about getting top review counts for the leaderboard. GetUserReviewCountsTop10 retrieves the top users based on the number of reviews they have submitted. GetTopReviewedRestaurants gets the top 15 restaurants based on the number of reviews they have received. Full code is imported to the db database in Google Cloud and you can see the exact code in StoredPrecedure.sql in myproj. 


#### Transactions
For Transactions, there are two implemented in routes.js, the original full code is at Transaction.sql in myproj.

Transaction 1: Update Review Count and Average Rating for a Restaurant
To update a restaurant's review count and average rating, we use a transaction with the SERIALIZABLE isolation level. This transaction involves three atomic operations: inserting a new review, updating the restaurant's review count, and recalculating the restaurant's average rating. The choice of SERIALIZABLE isolation is crucial because it prevents dirty reads, non-repeatable reads, and phantom reads, ensuring data consistency. This isolation level is necessary since we are performing read and write operations that must be consistent with each other to maintain the integrity of our review system. Although using SERIALIZABLE can impact performance in high-concurrency scenarios, the need for accurate and reliable data justifies the trade-off. To handle the limitation of most MySQL libraries for Node.js, which do not support sending multiple SQL statements as a single query, we split the operations into separate queries.

Transaction 2: Calculate the Average Rating Per Cuisine Type.
This query calculates the average rating for each cuisine type by joining the Restaurant9 and Review9 tables, filtering for restaurants with more than 500 reviews, and aggregating the data. We use the READ COMMITTED isolation level to ensure data consistency while maintaining good performance. READ COMMITTED prevents dirty reads by ensuring that only committed data is read, which is sufficient for this read-only operation. Although it does not prevent phantom reads, this is acceptable for our aggregate query since new rows appearing mid-query would not significantly affect the overall results. By filtering for restaurants with over 500 reviews before aggregation, we maintain consistency and ensure that our analysis reflects a reliable point-in-time snapshot of the data. This approach balances the need for accurate analysis with performance considerations.


#### Constraints
For constraints, we use PRIMARY KEY, FOREIGN KEY, NOT NULL, and UNIQUE constraints when creating tables, similar to what we did in stage 3.


#### Triggers
For Trigger we implemented three in the db database on Google Cloud SQL and the code is in the Triggers.sql in myproj.

Trigger delete_reviews_on_user_delete, is executed after a user is deleted from the User9 table. Since our Review table is not a weak entity, we need a clean up. This trigger ensures that all reviews associated with the deleted user are also removed from the Review9 table. This automatic cleanup prevents orphaned reviews and maintains the integrity of our data, ensuring that no reviews exist without a corresponding user.

Trigger update_restaurant_on_review_delete, updates a restaurant's review statistics when a review is deleted from the Review9 table. After a review is deleted, this trigger adjusts the review count and recalculates the average rating for the associated restaurant in the Restaurant9 table. This process ensures that the restaurant's data accurately reflects the current state of its reviews.

Trigger update_user_level, runs after a new review is inserted into the Review9 table. It calculates the total number of reviews by the user and updates the user's level in the User9 table based on predefined thresholds. Users progress through levels such as 'L2_Entrée_Explorer', 'L3_Flavor_Virtuoso', 'L4_Cuisine_Conqueror', and 'L5_Michelin_Maestro' as they contribute more reviews. Originally we have another Level entity and a relationship to track user’s levels, but this Trigger simplified a lot. 


### _**Each** team member should describe **one technical challenge **that the team encountered.  This should be sufficiently detailed such that another future team could use this as helpful advice if they were to start a similar project or where to maintain your project._

Josh: One technical challenge that we faced was working with node.js and connecting frontend to the database overall. This was a challenge because there was a learning curve in regard to understanding node and how routing would work. Overall, I believe that making it a point to understand how node.js work and RESTful  APIs work beforehand can make stage 4 development much more efficient, even if it is just background information.

Haotian: One technical challenge that we faced was relating to github update on the features we implemented on the server end. This requires us to familiarize ourselves with more git skills and we also need to check carefully that whether our web link is correct or not. Thus, I think there should be more instructions on teaching git variations such as push and commit to avoid errors.

Caroline: One technical challenge that we faced was figuring out development as a whole. The TA video only got us so far with how to develop in the VM, and figuring out how to SSH into the VM from out preferred local code editors was a struggle to figure out. It did hamper our development and my recommendation anyone in the same boat would be to reading through google cloud development documentation and familiarizing themselves about how the VM works prior to starting on stage 4. It would have made development much faster if this was known from the start. 

Tian: One major challenge was the lack of comprehensive guides on web development for beginners. While the TA's videos were helpful, they didn't cover all the necessary aspects. Additionally, we struggled with setting up local environments. Although the guidance provided focused on setting up on Google Cloud, which was optional, there was no equivalent guidance for local setups. Future teams would benefit greatly from detailed instructions for both cloud and local environment setups to avoid these issues.

Wanli: Working with GCP and setting up a shared cloud working environment was challenging. We pulled separate copies from our github repo to our respective cloud user directories, which wasn’t the best way to utilize cloud storage. Additionally, juggling between cloud git copies and local copies can be a little confusing. If there can be a way to utilize our local repos for GCP that would be great.


### _Are there **other things** that **changed** comparing the final application with the original proposal?_

Apart from the all the items mentioned above, nothing else was changed in our final application as compared to the original proposal. 


### _Describe **future work** that you think, other than the interface, that the application can improve on._

For future work, we can add more AI techniques such as recommendation systems or neural networks to assist our database to find the best cuisine for a customer. Additionally, something small we can add on are Yelp labels to indicate what reviews are from Yelp and what reviews are from users on our application.


### _Describe the final **division of labor **and how well you managed teamwork._

Product Requirement Document: Tianxiao Yang; Wanli Zhou; Caroline Stoklosinski

Ul design: Wanli Zhou; Caroline Stoklosinski

Frontend: Tianxiao Yang; Wanli Zhou

Backend: Tianxiao Yang; Joshua Neela

Data sourcing and cleaning: Tianxiao Yang; Joshua Neela; Haotian Wang; Caroline Stoklosinski

DB design and implementation: Wanli Zhou; Tianxiao Yang; Caroline Stoklosinski; Joshua Neela; Haotian Wang

QA: Tianxiao Yang; Caroline Stoklosinski; Wanli Zhou; Joshua Neela; Haotian Wang

Teamwork for our restaurant review web app is actively communicated on Discord and through calls. We had a new member Haotian join the team in the middle of the semester, which required close communication on how tasks should be split and assigned to ensure effective learning for everyone. With frequent internal discussions on Discord and active communication with Charles on project requirements and suggestions, we have been successfully meeting timelines and completing milestones with learnings not only on the course content, but also on project management and prioritization.


**Disclosure: Parts of our front-end code were written via ChatGPT. No SQL code (queries, triggers, stored procedures, etc.) or database related code was written using ChatGPT or any other generative AI tools. We also referenced TA's example and used Bootstrap & jQuery as our frontend tech stacks, and Node.js with Express framework and MySQL lib for the backend.**

