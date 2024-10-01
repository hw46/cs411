# Food Quest: Unlock Culinary Adventures Across Illinois

### 1. Project Summary
Our website is a comprehensive platform for reviewing and discovering restaurants in Illinois. Users can rate and review restaurants they have visited, building their personal dining history. The site features powerful search tools to find restaurants based on cuisine, price, location, number of reviews, and ratings. 

What sets our platform apart is its innovative gamification system designed to encourage authentic and detailed reviews. Users earn points for thoughtful contributions, advancing through levels from Novice to Expert. We offer level rewards, streak bonuses, and special challenges to motivate users to explore diverse cuisines and restaurants. This approach not only promotes quality content but also cultivates an engaged community of food enthusiasts.

### 2. Description
Our application addresses the challenge of restaurant discovery by simplifying the process of finding new dining experiences tailored to individual tastes. We aim to solve the problem of overwhelming choice and lack of personalized recommendations in the restaurant scene. 

Leveraging real Yelp data and user-generated content, we will create a user-friendly ecosystem for restaurant discovery and reviews. Our unique gamification system incentivizes authentic, detailed reviews, while our powerful search capabilities allow easy filtering based on cuisine, location, price range, number of reviews, and ratings. 

### 3. Creative Component
The core creative component of our platform is our advanced gamification system, which goes beyond basic ratings to make sharing dining experiences more engaging and rewarding. Here's how we plan to achieve this:

  1. **Respected Reviewer Status:** Users can earn special status by consistently providing helpful insights. We will implement an algorithm that analyzes review quality based on factors such as upvotes.

  2. **Perks System:** Top contributors will receive exclusive discounts that they can use across Illinois restaurants. 

  3. **Personalized Challenges:** We'll develop a feature that generates personalized challenges for users based on their review history and favorite restaurants, encouraging them to try new cuisines or explore different neighborhoods.

### 4. Usefulness
Unlike traditional review or restaurant recommendation sites, our application allows for users to 
explore new cuisines, restaurants, all while being able to enter contests and win prizes like redeemable discounts for their engagement in the community. Not only does this help others with deciding if a restaurant is worth eating at - but it also incentivises people to leave reviews thus also boosting restaurant business. It also caters to restaurants and cuisines through an algorithm that constantly makes sure there are new recommendations of dishes or restaurants making it very personalizable and takes the shuffle out of finding something to eat. 

A similar concept is Google reviews or Yelp, however neither allows for users to reap the rewards of leaving reviews. This gamification allows for more fun to be had while reviewing. This also fosters a community - which is much different from how Google review or Yelp work. 

### 5. Realness
 
Our database is populated with authentic data from the Yelp platform, specifically using datasets such as "USA Yelp Eats 2024: Top Dining Gems Revealed" and the "Yelp Review Dataset." These datasets provide us with genuine restaurant information, user reviews, and ratings from across the United States. While we use this real-world data as our foundation, we supplement it with additional randomly generated user profiles to protect privacy and expand our dataset for meeting requirements and testing purposes. However, the core restaurant data, including locations and user reviews, comes directly from actual Yelp users and their dining experiences.  

Our project utilizes two primary data sources to ensure a comprehensive and authentic representation of restaurant information and user reviews:

#### A. USA Yelp Eats 2024: Top Dining Gems Revealed

- **Source**: Kaggle (https://www.kaggle.com/datasets/kanchana1990/usa-yelp-eats-2024-top-dining-gems-revealed) 
- **Format**: CSV 
- **Size**: 241 rows x 8 columns (cardinality = 241, degree = 8, in yelp_restaurants_illinois)
- **Information**: This dataset aggregates restaurant listings and reviews from Yelp across seven key states in the USA (Hawaii, Illinois, Michigan, Texas, Nevada, California, and New York), but we are just going to use the data from Illinois. It captures diverse aspects of the American culinary scene, providing a focused subset of high-quality restaurant data.

##### Attributes:

| Attribute         | Data Type     |
|-------------------|---------------|
| name              | VARCHAR(255)  |
| establishment type| VARCHAR(255)  |
| price range       | VARCHAR(255)  |
| cuisine           | VARCHAR(255)  |
| aggregated rating | FLOAT         |
| review count      | INT           |
| Yelp page URL     | VARCHAR(255)  |
| website URL       | VARCHAR(255)  |

The "Name" column has the restaurant names. "Type" specifies the establishment, like Restaurant or Nightlife. "PriceRange" indicates the cost tier, usually in dollar signs. "Cuisine" describes the food type. The "AggregatedRating" column shows the average customer rating from 1 to 5. "ReviewCount" is the number of reviews. "DirectUrl" links to the Yelp page, and "Website" has the official URL.

**Example**: 
```
"The Whale Chicago","Restaurants","$11-30","New American","4.2","948","https://www.yelp.com/biz/the-whale-chicago-chicago","http://www.thewhalechicago.com"
```

#### B. Yelp Review Dataset

- **Source**: Yelp (https://www.yelp.com/dataset) 
- **Format**: JSON 
- **Size**: 6,990,280 reviews, 150,346 businesses, 8.65GB uncompressed 
- **Information**: This comprehensive dataset is a subset of Yelp's businesses, reviews, and user data. It covers 11 metropolitan areas and provides in-depth information on user reviews, business details, and user profiles.

#### Entities:

##### Business
- **Cardinality**: 150347
- **Degree**: 14
- **Attributes**:

| Attribute    | Data Type |
|--------------|-----------|
| business_id  | STRING 22 |
| name         | STRING    |
| address      | STRING    |
| city         | STRING    |
| state        | STRING    |
| postal code  | STRING    |
| latitude     | FLOAT     |
| longitude    | FLOAT     |
| stars        | FLOAT     |
| review_count | INT       |
| is_open      | BOOLEAN   |
| attributes   | DICT      |
| categories   | LIST      |
| hours        | DICT      |

##### Review
- **Cardinality**: 6990280
- **Degree**: 9
- **Attributes**:

| Attribute   | Data Type |
|-------------|-----------|
| review_id   | STRING    |
| user_id     | STRING    |
| business_id | STRING    |
| stars       | INT       |
| date        | STRING    |
| text        | STRING    |
| useful      | INT       |
| funny       | INT       |
| cool        | INT       |


##### User
- **Cardinality**: 1987897
- **Degree**: 21
- **Attributes**:

| Attribute           | Data Type                 |
|---------------------|---------------------------|
| user_id             | STRING 22                 |
| name                | STRING                    |
| review_count        | INT                       |
| yelping_since       | STRING (YYYY-MM-DD)       |
| friends             | ARRAY OF STRING 22        |
| useful              | INT                       |
| funny               | INT                       |
| cool                | INT                       |
| fans                | INT                       |
| elite               | ARRAY OF INT              |
| average_stars       | FLOAT                     |
| compliment_hot      | INT                       |
| compliment_more     | INT                       |
| compliment_profile  | INT                       |
| compliment_cute     | INT                       |
| compliment_list     | INT                       |
| compliment_note     | INT                       |
| compliment_plain    | INT                       |
| compliment_cool     | INT                       |
| compliment_funny    | INT                       |
| compliment_writer   | INT                       |
| compliment_photos   | INT                       |

##### Checkin
- **Cardinality**: 131930
- **Degree**: 2
- **Attributes**: 

| Attribute   | Data Type |
|-------------|-----------|
| Business_id | STRING 22 |
| Date        | STRING    |

##### Tip
- **Cardinality**: 908915
- **Degree**: 5
- **Attributes**: 

| Attribute        | Data Type           |
|------------------|--------------------|
| text             | STRING              |
| Date             | STRING (YYYY-MM-DD) |
| Compliment_count | INT                 |
| Business_id      | STRING 22           |
| User_id          | STRING 22           |

 

### 6. Functionality
 
### Core features:
- **Account:** account creation, password update, and user profile display.
  - **DB Entity:** User
  - **Webpages:**
    - *Account Creation:* registration;
    - *User Profile:* displays user’s review history, favorite restaurants,   engagement level based on reviews created and upvotes, and discounts available; 

- **Search:** search and sort restaurants based on cuisine, location, price, number of reviews, and ratings.
  - **DB Entity:** Restaurant
  - **Webpages:**
    - *Home Page:* allows searching and sorting restaurants; by default displays restaurant recommendations based on the user’s review history and favorite restaurants.

- **Restaurant page:** Displays the restaurant's details, including:
  - **DB Entity:** Restaurant, Review, Image (Optional)
  - **Webpages:**
    - *Restaurant Page:*
      - Restaurant name, address, cuisine type, price range, average rating, number of reviews.

- **Review:** users can create, update, and delete reviews for a restaurant. Additionally, users can upvote a review.
  - **DB Entity:** Review
  - **Webpages:**
    - *Restaurant Page:* a user will be able to manage their own reviews on the review section of a Restaurant Page.
    - *User Profile:* a user will be able to manage their reviews on the review section of the User Profile page.

- **Level up:** users will level up based on their number of reviews and upvotes received. Rewards in the form of discounts and gift cards will be sent to the user account when they reach certain levels.
  - **DB Entity:** Level, Reward
  - **Webpages:**
    - *User Profile:* level displayed on this page;
    - *Restaurant Page:* level displayed to user

- **Challenge:** themed challenges to encourage culinary exploration ("Try 5 different cuisine types this month", "Review restaurants in 3 different neighborhoods"). Completing challenges earns bonus rewards.
  - **DB Entity:** Challenge, Reward

### Add Ons - Time Dependent
- **Streak Bonuses:** Encourage consistent participation by offering bonuses for users who review regularly (weekly or monthly streaks).
- **Leaderboard:** Display user rankings based on level, upvotes, and number of reviews.
- **Interactive Map:** Visualize restaurant locations and filter by various criteria on an interactive map.
- **ML-based Recommendations:** Implement a machine learning-based recommendation system that analyzes reviews factoring ratings and content, and upvotes to suggest possible restaurants tailored to individual tastes.

### 7. Low Fidelity UI Mockup

![alt text](https://github.com/cs411-alawini/su24-cs411-team014-Schema_Sashimi/blob/main/stage1mockups/account_creation.png?raw=true)
![alt text](https://github.com/cs411-alawini/su24-cs411-team014-Schema_Sashimi/blob/main/stage1mockups/restaurant_page.png?raw=true)
![alt text](https://github.com/cs411-alawini/su24-cs411-team014-Schema_Sashimi/blob/main/stage1mockups/search_homepage.png?raw=true)
![alt text](https://github.com/cs411-alawini/su24-cs411-team014-Schema_Sashimi/blob/main/stage1mockups/user_profile.png?raw=true)

### 8. Work Distribution

<img width="776" alt="schema_sashimi_team" src="https://github.com/cs411-alawini/su24-cs411-team014-Schema_Sashimi/assets/69228661/725241c9-9eeb-4fbb-bf17-add5cdc42fad">




