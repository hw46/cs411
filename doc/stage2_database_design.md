# UML Design
![Restaurant DB UML Design](UMLDesign.png)


# Entity Descriptions

There are six entities in total in our design: 
* User
* Restaurant
* Review
* Challenge
* Reward
* Level

### 1. User

A User interacts with our web app through account creation, favoriting and reviewing restaurants, progressing to different levels, and completing challenges to gain rewards (dining discounts and incentives).

The **User** entity consists of the following attributes:<br>
    _<span style="text-decoration:underline;">username</span>:_ Primary Key, a user-defined unique identifier for the user account.<br>
    _password:_ the user-defined password, updatable through the Account page.<br>
    _email_: a user-provided email address.


User is modeled as an entity instead of an attribute because of several reasons:

1. A User exists independent from all other entities and has its own distinct identity. 
2. A User has multiple attributes associated with and dependent on it including username, password, and email.
3. As a core concept in our web app, a User needs to be related to multiple other entities and has complex relationships with them. A User can leave and like a Review, can favorite a Restaurant, reach a certain Level, own Rewards, and complete Challenges.
4. The web app will have frequent searches and queries in the database based on usernames. On the account page, info is displayed based on the logged-in User account, including Reviews left by the User, and Restaurants favorited by the User.


Assumptions:

1. Usernames are unique across the system.
2. Emails are unique across the system.
3. Passwords are stored securely (e.g., hashed and salted).
4. Users cannot be deleted from the system (to maintain review history).

Relationships to the User entity include: **LeaveReview**, **LikeReview**, **Favorite**, **IsLevel**,**Owns**, and **HasCompleted**. See the Relationship Descriptions section for more detail.


### 2. Restaurant

The restaurant is a crucial entity that users can choose according to their preferences which include their personal favorites and their reviewing history.

The **Restaurant** entity consists of the following attributes:<br>
    _<span style="text-decoration:underline;">name</span>_: Primary Key, the name of the restaurant when they activate the account.<br>
    _<span style="text-decoration:underline;">address</span>_: Primary Key, The address of the restaurant.<br>
    _<span style="text-decoration:underline;">city</span>_: Primary Key, the city of the restaurant.<br>
    <span style="text-decoration:underline;">state</span>: Primary Key, the state of the restaurant.<br>
    _rating_: The average rating of the restaurant by the score of each customer.<br>
    _priceRange_: The range of the price each customer has eaten in the restaurant.<br>
    _cuisine_: The type of food provided by the restaurant.<br>
    _reviewCount:_ The number of reviews of this restaurant.

Assumptions:

1. “rating” is calculated automatically based on user reviews.
2. “priceRange” is represented as an integer.
3. “reviewCount” is updated automatically when a new review is added.

The restaurant is an entity instead of an attribute because:

1. Each restaurant has its own special identity from other restaurants.
2. Each restaurant has lots of characteristics including name, rating, cuisine, etc.
3. Users can choose each restaurant based on the algorithm that depends on their favorites and reviewing history.
4. In the designing of the application, the restaurant entity will have complex relationships with other entities for example, it will be marked by the user as favorite and it will also have relationships with reviews entities.
5. It will also have a large amount of queries in the database based on the name of it. It will recommend each user the best restaurant for him or her when they want to search on the Restaurant page.

Relationships to the Restaurant entity include: **ReviewFor, Favorite and** **ChallengeFor**. See the Relationship Descriptions section for more detail.


### 3. Review

This Review entity is critical to evaluating the popularity and likeability of a restaurant on our platform. It is a written response by a user to share or inform others on the platform of their experience at the restaurant. A review entity is also key to our gamification for each user as a user gets rewarded by leaving more reviews.

The Review entity consists of the following attributes:<br>
    _<span style="text-decoration:underline;">reviewID</span>:_ Primary Key, This is an identifier for each review<br>
    _totalLikes:_ The total likes on the Review<br>
    _description_: A written review of experience written by User<br>
    _rating_: The rating out of 5 stars given by a User to a Restaurant

The Review is an entity instead of an attribute because:

1. Each review has its own specific attributes such as description, rating, etc.
2. Reviews are subject to edits by its author
3. A review has relationships with User and the Restaurant
4. Reviews are subject to sorting based on totalLikes
5. Computing the average rating and number of Reviews for a Restaurant is easier when Review is a standalone entity

Assumptions:

1. Reviews cannot be deleted, only edited by the original author.
2. TotalLikes is updated automatically when a user likes a review.
3. Rating is limited to a scale .

Relationships for a Review entity include: **LeaveReview** , **LikeReview** and **ReviewFor**. See the Relationship Descriptions section for more detail.


### 4. Challenge 

A Challenge is a themed task designed to encourage culinary exploration and user engagement in our web app. Challenges prompt users to try new cuisines rewarding them with rewards upon completion.

The Challenge entity consists of the following attributes: <br>
    _<span style="text-decoration:underline;">challengeName</span>:_ A short, descriptive name for the challenge (e.g., "Cuisine Explorer", "Neighborhood Foodie").<br>
    _description:_ A detailed explanation of the challenge requirements (e.g., "Try 5 different cuisine types this month", "Review restaurants in 3 different neighborhoods").

Challenge is modeled as an entity for several reasons:

1. A Challenge exists independently of other entities and has its own distinct identity.
2. It has multiple attributes associated with and dependent on it, including name, description.
3. Challenges are a core concept in our gamification system and have complex relationships with other entities such as Users and Rewards.

Assumptions:

1. Challenges have a start and end date (reflected in the challengeFor relationship between Challenges and Restaurants).
2. Challenges can be recurring or one-time events.
3. ChallengeNames are unique across the database system.

Relationships to the Challenge entity include: **HasCompleted**, **ChallengeFor** and **HasReward**. See the Relationship Descriptions section for more detail.


### 5. Reward

A Reward is an incentive given to users for their engagement and achievements. Rewards are primarily earned through completing challenges and leveling up, and they typically come in the form of discounts or gift cards for dining experiences.

The Reward entity consists of the following attributes:<br>
 _<span style="text-decoration:underline;">rewardName</span>:_ A short, descriptive name for the reward.<br>
 _description_:_ A detailed explanation of the reward and how it can be used.<br>
 _state_: Foreign key to Restaurant.state, the state of the restaurant.

Reward is modeled as an entity for several reasons:

1. A Reward has its own distinct identity and exists independently of other entities.
2. It has multiple attributes associated with and dependent on it, such as name and description.
3. Rewards are a core component of our gamification system and have complex relationships with other entities such as Users, Challenges, and Levels.
4. The application will frequently query the database for available rewards and user-owned rewards.

Assumptions:

1. RewardNames are unique across the system.
2. Rewards can be limited in quantity.

Relationships to the Reward entity include: **Owns**, **HasReward** and **AssociatedWith**. See the Relationship Descriptions section for more detail.


### 6. Level

A Level is an indication of where a user stands in terms of their culinary experiences and reviews. Levels drive user engagement by rewarding them with certain rewards specific to their level. 

The Level entity consists of the following attributes:<br>
 _<span style="text-decoration:underline;">levelName</span>:_ A short, descriptive name for the level (e.g., "L1_Novice", "L3_Expert").<br>
 _description:_ A detailed explanation of the level requirements (e.g., points threshold, rewards provided).

Level is modeled as an entity for several reasons:

1. A Level exists independently of other entities and has its own distinct identity, but it is based on the number of reviews a user contributes as well as the number of upvotes they receive.
2. It has multiple attributes associated with and dependent on it, including rewards id, number of rewards, and number of upvotes.
3. Levels are a core concept in our gamification system and have complex relationships with other entities such as Users and Rewards.

Assumptions:

1. LevelNames are sorted and users progress through them in order.
2. Each level has specific requirements for achievement (e.g., number of reviews, total likes received). 

Relationships to the Challenge entity include: **IsLevel** and **AssociatedWith**. See the Relationship Descriptions section for more detail.


# Relationship Descriptions  
1. LeaveReview

    is a <span style="text-decoration:underline;">one-to-many</span> relationship between **User** and **Review** to model the action of a User leaving a review for a Restaurant. Assumptions: It is a one-to-many relationship: as there’s no account deletion features in our design, a Review will always be dependent on a User, so a Review should be left by exactly one user; at the same time, a User can leave zero to infinite Reviews.

2. LikeReview

    is also a <span style="text-decoration:underline;">many-to-many</span> relationship between **Review** and **User** to model the action of a User liking a review from another User. Assumptions: a  User can like zero to multiple Reviews, and a Review can be liked by zero to multiple Users.

3. Favorite

    is a <span style="text-decoration:underline;">many-to-many</span> relationship between **User** and **Restaurant** to model the action of a User adding Restaurant(s) to their favorites. Assumptions: It is a many-to-many relationship. A User can favorite zero to multiple Restaurants, and a Restaurant can be favorited by zero to multiple Users.

4. IsLevel

    is a <span style="text-decoration:underline;">many-to-one</span> relationship between **User** and **Level** to model the progression of a user’s journey in our web app. Assumptions: A User is assigned exactly one Level, and a Level can be assigned to zero to multiple Users.

5. Owns

    is a <span style="text-decoration:underline;">many-to-many</span> relationship between **User** and **Reward** to model Users’ ownership of dining incentives and discounts. Assumptions: A User can own zero to multiple rewards, and a Reward can be owned by zero to multiple Users.

6. HasCompleted

    is a <span style="text-decoration:underline;">many-to-many</span> relationship between **User** and **Challenge** to model a User’s completion status for challenges. Assumptions: There is one attribute for this relationship-completeTime: the time of completion of a Challenge. To avoid reentrancy of a challenge, unless completeTime is set to null or 0, a user won’t be able to complete a challenge.

7. ReviewFor

    is a <span style="text-decoration:underline;">one-to-many</span> relationship between **Restaurant** and **Review** to model the review for a restaurant. Assumptions: It is a one-to-many relationship: as there’s no account deletion features in our design, a Review will always target a Restaurant, so a Review should be left for exactly one Restaurant; at the same time, a Restaurant can have zero to infinite Reviews. 

8. ChallengeFor

    is a <span style="text-decoration:underline;">many-to-many</span> relationship between **Restaurant** and **Challenge** to model the time and type of challenge for a single restaurant. Assumptions: It’s a many-to-many relationship because each challenge can be targeted to multiple restaurants and one restaurant can have many challenges which may be accomplished by multiple users. It has two attributes: startTime - the time the challenge is configured to start; endTime - the time the challenge is configured to end.

9. HasReward

    is a <span style="text-decoration:underline;">many-to-many</span> relationship between **Challenge** and **Reward**. Assumptions: Each Challenge has one or multiple Rewards, but each Reward is associated with  0 or more Challenges, as there can be Rewards for Levels only.

10. AssociatedWith

    is a <span style="text-decoration:underline;">many-to-many</span> relationship between **Reward** and **Level** to link rewards with the user levels that unlock them. Assumptions: It is a many-to-many relationship:  each Level has one or multiple Rewards, and each Reward is associated with zero or more Levels. Some rewards are Challenge-specific rewards and they are associated with 0 levels.


<br>

# 3NF Normalization


## Entity 1 - User


```
Original Relation:
User(
    username: VARCHAR(30) [PK], 
    password: VARCHAR(30), 
    email: VARCHAR(30),
    levelName: VARCHAR(30) [FK to Level.levelName]
)
-----------------------------------
FDs: 
username->password, email
username->levelName

-----------------------------------
Compute Minimal Basis:
1. Only singleton in RHS
username->password
username->email
username->levelName

2. Remove unnecessary att. from LHS  
3. Remove FDs that can be inferred from the rest  

-----------------------------------
New Decomposition: 
User ( 
    username: VARCHAR(30) [PK], 
    password: VARCHAR(30),
    email: VARCHAR(30),
    levelName: VARCHAR(30) [FK to Level.levelName]
)

*Bundling the RHS of the minimal basis FDs into one table as the attributes password, email and levelName can be associated with each other.

```



## Entity 2 - Restaurant


```
Original Relation:
Restaurant ( 
    name: VARCHAR(50) [PK],
    address: VARCHAR(100) [PK], 
    city: VARCHAR(30) [PK], 
    state: VARCHAR(30) [PK],
    rating: DECIMAL(1,1), 
    priceRange: VARCHAR(50) , 
    cuisine: VARCHAR(30), 
    reviewCount: INT
)
-----------------------------------

FDs: 
name, address, city, state -> rating, priceRange, cuisine, reviewCount
-----------------------------------

Compute Minimal Basis:
1. Only singleton in RHS
name, address, city, state -> rating
name, address, city, state -> priceRange
name, address, city, state -> cuisine
name, address, city, state -> reviewCount

2. Remove unnecessary att. from LHS  
3. Remove FDs that can be inferred from the rest  

-----------------------------------
New Decomposition:
RestaurantRating(
    name: VARCHAR(50) [PK], 
    address: VARCHAR(100) [PK], 
    city: VARCHAR(30) [PK], 
    state: VARCHAR(30) [PK], 
    rating: DECIMAL(1,1)
)

RestaurantPriceRange(
    name: VARCHAR(50) [PK] [FK to RestaurantRating.name], 
    address: VARCHAR(100) [PK] [FK to RestaurantRating.address], 
    city: VARCHAR(30) [PK] [FK to RestaurantRating.city], 
    state: VARCHAR(30) [PK] [FK to RestaurantRating.state], 
    priceRange: VARCHAR(50)
)

RestaurantCuisine(
    name: VARCHAR(50) [PK] [FK to RestaurantRating.name], 
    address: VARCHAR(100) [PK] [FK to RestaurantRating.address], 
    city: VARCHAR(30) [PK] [FK to RestaurantRating.city], 
    state: VARCHAR(30) [PK] [FK to RestaurantRating.state],
    cuisine: VARCHAR(30)
)

RestaurantReviewCount(
    name: VARCHAR(50) [PK] [FK to RestaurantRating.name], 
    address: VARCHAR(100) [PK] [FK to RestaurantRating.address], 
    city: VARCHAR(30) [PK] [FK to RestaurantRating.city], 
    state: VARCHAR(30) [PK] [FK to RestaurantRating.state],
    reviewCount: INT
)

*Adding restaurantID as an attribute to connect with the Review.
Final version avoid degeneracy:
Restaurant(
    name: VARCHAR(50) [PK],
    address: VARCHAR(100) [PK],
    city: VARCHAR(30) [PK],
    state: VARCHAR(30) [PK],
    restaurantID: VARCHAR(30),
    rating: DECIMAL(2,1),
    reviewCount: INT,
    cuisine: VARCHAR(30),
    priceRange: VARCHAR(50)
)

```



## Entity 3 - Review


```
Original Relation:
Review (
    reviewID: VARCHAR(30) [PK], 
    totalLikes: INT, 
    description: VARCHAR(1250), 
    rating: DECIMAL(1, 1),
    username: VARCHAR(30) [FK to User.username],
    restaurantName: VARCHAR(50) [FK to RestaurantRating.name], 
    restaurantAddress: VARCHAR(100) [FK to RestaurantRating.address], 
    restaurantCity: VARCHAR(30) [FK to RestaurantRating.city], 
    restaurantState: VARCHAR(30) [FK to RestaurantRating.state]
)
-----------------------------------

FDs: 
reviewID -> totalLikes, description, rating
reviewID -> username
reviewID -> restaurantName, restaurantAddress, restaurantCity, restaurantState
-----------------------------------

Compute Minimal Basis:
1. Only singleton in RHS
reviewID -> totalLikes
reviewID -> description
reviewID -> rating
reviewID -> username
             reviewID -> restaurantName
             reviewID -> restaurantAddress
             reviewID -> restaurantCity
             reviewID -> restaurantState
2. Remove unnecessary att. from LHS  
3. Remove FDs that can be inferred from the rest  
-----------------------------------

New Decomposition:
ReviewTotalLikes(
    reviewID: VARCHAR(30) [PK], 
    totalLikes: INT
)

ReviewDescription(
    reviewID: VARCHAR(30) [PK] [FK to ReviewTotalLikes.reviewID], 
    description:VARCHAR(1250)
)

ReviewRating(
    reviewID: VARCHAR(30) [PK] [FK to ReviewTotalLikes.reviewID], 
    rating: DECIMAL(1, 1)
)

ReviewUsername(
    reviewID: VARCHAR(30) [PK] [FK to ReviewTotalLikes.reviewID], 
    username: VARCHAR(30) [FK to User.username]
)

ReviewRestaurant(
    reviewID: VARCHAR(30) [PK] [FK to ReviewTotalLikes.reviewID], 
    restaurantName: VARCHAR(50) [FK to RestaurantRating.name], 
    restaurantAddress: VARCHAR(100) [FK to RestaurantRating.address], 
    restaurantCity: VARCHAR(30) [FK to RestaurantRating.city], 
    restaurantState: VARCHAR(30) [FK to RestaurantRating.state]
)

Final version avoid degeneracy:
Review (
    reviewID: VARCHAR(30) [PK], 
    username: VARCHAR(30) [FK to User.username],
    restaurantID: VARCHAR(30) [FK to Restaurant.restaurantID], 
    totalLikes: INT, 
    rating: DECIMAL(2, 1),
    description: VARCHAR(1250)
)
```



## Entity 4 - Challenge


```
Original Relation:
Challenge(
    challengeName: VARCHAR(100) [PK],
    description: VARCHAR(4000)
)
-----------------------------------

FDs: 
challengeName -> description
-----------------------------------

A relation consisting of only two attributes is always in 3NF, so no change on the original relation.
```



## Entity 5 - Reward  


```
Original Relation:
Reward(
    rewardName: VARCHAR(100) [PK], 
    description:  VARCHAR(4000),
    state: VARCHAR(30) [FK to RestaurantRating.state],
)
-----------------------------------

FDs: 
rewardName-> description, state
-----------------------------------

Compute Minimal Basis:
1. Only singleton in RHS
rewardName -> description, 
rewardName -> state,
2. Remove unnecessary att. from LHS 
3. Remove FDs that can be inferred from the rest 
-----------------------------------

New Decomposition:
Reward(
    rewardName: VARCHAR(100) [PK],
    description:  VARCHAR(4000)
)

RewardState(
    rewardName: VARCHAR(100) [PK] [FK to Reward.rewardName],
    state: VARCHAR(30) [FK to RestaurantRating.state]
)

Final version avoid degeneracy:
Reward (
    rewardName: VARCHAR(100) [PK],
    description:  VARCHAR(4000),
    state: VARCHAR(30) [FK to Restaurant.state]
)
```



## Entity 6 - Level


```
Original Relation:
Level (
    levelName: VARCHAR(30) [PK], 
    description: VARCHAR(250) 
)
-----------------------------------

FDs: 
levelName -> description 
-----------------------------------

A relation consisting of only two attributes is always in 3NF, so no change on the original relation.
```



## Relationship 1 - LikeReview (many-to-many between User and Review)


```
Original Relation:
LikeReview(
    reviewID: VARCHAR(30) [PK] [FK to Review.reviewID], 
    username: VARCHAR(30) [PK] [FK to User.username]
)
-----------------------------------

A relation consisting of only two attributes is always in 3NF, so no change on the original relation.
```



## Relationship 2 - Favorite (many-to-many between User and Restaurant)


```
Original Relation:
Favorite(
    Username: VARCHAR(30) [PK] [FK to User.username],
    restaurantName: VARCHAR(50) [PK] [FK to RestaurantRating.name], 
    restaurantAddress: VARCHAR(100) [PK] [FK to RestaurantRating.address], 
    restaurantCity: VARCHAR(30) [PK] [FK to RestaurantRating.city], 
    restaurantState: VARCHAR(30) [PK] [FK to RestaurantRating.state]
)
-----------------------------------

The original relation itself is in 3NF as all attributes combined are a primary key.

Final version avoid degeneracy:
Favorite(
    Username: VARCHAR(30) [PK] [FK to User.username],
    restaurantID: VARCHAR(30) [PK] [FK to Restaurant.restaurantID]
)
```



## Relationship 3 - Owns (many-to-many between User and Reward)


```
Original Relation:
Owns(
    username: VARCHAR(30) [PK] [FK to User.username],
    rewardName: VARCHAR(100) [PK] [FK to Reward.rewardName]
)
-----------------------------------

A relation consisting of only two attributes is always in 3NF, so no change on the original relation.
```



## Relationship 4 - HasCompleted (many-to-many between User and Challenge)


```
Original Relation:
HasCompleted(
    username: VARCHAR(30) [PK] [FK to User.username], 
    challengeName: VARCHAR(100) [PK] [FK to Challenge.challengeName], 
    completeTime: TIME
)
-----------------------------------

FDs: 
username, challengeName -> completeTime
-----------------------------------

Compute Minimal Basis:
1. Only singleton in RHS ☑️
2. Remove unnecessary att. from LHS ☑️
3. Remove FDs that can be inferred from the rest ☑️
-----------------------------------

New Decomposition:
ChallengeCompleteTime(
    username: VARCHAR(30) [PK] [FK to User.username], 
    challengeName: VARCHAR(100) [PK] [FK to Challenge.challengeName], 
    completeTime: TIME
)
```



## Relationship 5 - ChallengeFor (many-to-many between Restaurant and Challenge)  <span style="text-decoration:underline;"> </span>


```
Original Relation:
ChallengeFor(
    challengeName: VARCHAR(100) [PK] [FK to Challenge.challengeName],
    restaurantName: VARCHAR(50) [PK] [FK to RestaurantRating.name], 
    restaurantAddress: VARCHAR(100) [PK] [FK to RestaurantRating.address], 
    restaurantCity: VARCHAR(30) [PK] [FK to RestaurantRating.city], 
    restaurantState: VARCHAR(30) [PK] [FK to RestaurantRating.state],
    startTime: TIME,
    endTime: TIME
)
-----------------------------------

FDs:
challengeName, restaurantName, restaurantAddress, restaurantCity, restaurantState -> startTime, endTime
-----------------------------------

Compute Minimal Basis:
1. Only singleton in RHS
challengeName, restaurantName, restaurantAddress, restaurantCity, restaurantState -> startTime

challengeName, restaurantName, restaurantAddress, restaurantCity, restaurantState -> endTime
2. Remove unnecessary att. from LHS ☑️
3. Remove FDs that can be inferred from the rest ☑️
-----------------------------------

New Decomposition:
ChallengeFor(
    challengeName: VARCHAR(100) [PK] [FK to Challenge.challengeName],
    restaurantName: VARCHAR(50) [PK] [FK to RestaurantRating.name], 
    restaurantAddress: VARCHAR(100) [PK] [FK to RestaurantRating.address], 
    restaurantCity: VARCHAR(30) [PK] [FK to RestaurantRating.city], 
    restaurantState: VARCHAR(30) [PK] [FK to RestaurantRating.state],
    startTime: TIME,
    endTime: TIME
)

Final version avoid degeneracy:
ChallengeFor(
    challengeName: VARCHAR(100) [PK] [FK to Challenge.challengeName],
    restaurantID: VARCHAR(30) [PK] [FK to Restaurant.restaurantID],
    startTime: TIME,
    endTime: TIME
)
```



## Relationship 6 - Relationship HasReward (many-to-many between Challenge and Reward) 


```
Original Relation:
HasReward (
    rewardName: VARCHAR(100) [PK] [FK to Reward.rewardName]
    challengeName: VARCHAR(100) [PK] [FK to Challenge.challengeName]
)
-----------------------------------

A relation consisting of only two attributes is always in 3NF.
```



## Relationship 7 - AssociatedWith (many-to-many between Level and Reward) <span style="text-decoration:underline;">  </span>


```
Original Relation:
AssociatedWith (
    rewardName: VARCHAR(100) [PK] [FK to Reward.rewardName],
    levelName: VARCHAR(30) [PK] [FK to Level.levelName]
)
-----------------------------------

A relation consisting of only two attributes is always in 3NF.
```


<br>

# Final Logical Design(Relational Schema)
### updated for stage3 

## Entities

**Entity 1 - User**

```
User(
    username: VARCHAR(30) [PK],
    password: VARCHAR(30),
    email: VARCHAR(30),
    levelName: VARCHAR(30) [FK to Level.levelName]
)
```

**Entity 2 - Restaurant**

```
Restaurant(
    restaurantID: VARCHAR(30),
    name: VARCHAR(50) [PK],
    address: VARCHAR(100) [PK],
    city: VARCHAR(30) [PK],
    state: VARCHAR(30) [PK],
    rating: DECIMAL(2,1),
    reviewCount: INT,
    cuisine: VARCHAR(30),
    priceRange: VARCHAR(50)
)
```

**Entity 3 - Review**

```
Review (
    reviewID: VARCHAR(30) [PK], 
    username: VARCHAR(30) [FK to User.username],
    restaurantID: VARCHAR(30) [FK to Restaurant.restaurantID], 
    totalLikes: INT, 
    rating: DECIMAL(2, 1),
    description: VARCHAR(1250)
)
```

**Entity 4 - Challenge**

```
Challenge(
    challengeName: VARCHAR(100) [PK],
    description: VARCHAR(4000)
)
```

**Entity 5 - Reward**

```
Reward (
    rewardName: VARCHAR(100) [PK],
    description:  VARCHAR(4000),
    state: VARCHAR(30)  
)
```

**Entity 6 - Level**

```
Level (
    levelName: VARCHAR(30) [PK],
    description: VARCHAR(250)
)
```
 

## Relationships

**Relationship 1 - LikeReview** (many-to-many between User and Review)

```
LikeReview(
    reviewID: VARCHAR(30) [PK] [FK to Review.reviewID],
    username: VARCHAR(30) [PK] [FK to User.username]
)
```
 

**Relationship 2 - Favorite** (many-to-many between User and Restaurant)

```
Favorite(
    Username: VARCHAR(30) [PK] [FK to User.username],
    restaurantID: VARCHAR(30) [PK] [FK to Restaurant.restaurantID]
)
```

**Relationship 3 - Owns** (many-to-many between User and Reward)

```
Owns(
    username: VARCHAR(30) [PK] [FK to User.username],
    rewardName: VARCHAR(100) [PK] [FK to Reward.rewardName]
)
```

**Relationship 4 - HasCompleted** (many-to-many between User and Challenge)

```
ChallengeCompleteTime(
    username: VARCHAR(30) [PK] [FK to User.username],
    challengeName: VARCHAR(100) [PK] [FK to Challenge.challengeName],
    completeTime: TIME
)
```

**Relationship 5 - ChallengeFor** (many-to-many between Restaurant and Challenge)

```
ChallengeFor(
    challengeName: VARCHAR(100) [PK] [FK to Challenge.challengeName],
    restaurantID: VARCHAR(30) [PK] [FK to Restaurant.restaurantID],
    startTime: TIME,
    endTime: TIME
)
```

**Relationship 6 - Relationship HasReward** (many-to-many between Challenge and Reward)

```
HasReward (
    rewardName: VARCHAR(100) [PK] [FK to Reward.rewardName]
    challengeName: VARCHAR(100) [PK] [FK to Challenge.challengeName]
)
```

**Relationship 7 - AssociatedWith** (many-to-many between Level and Reward)

```
AssociatedWith (
    rewardName: VARCHAR(100) [PK] [FK to Reward.rewardName],
    levelName: VARCHAR(30) [PK] [FK to Level.levelName]
)
```
