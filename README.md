# - the.times.pilot - 📰
### NY Times Top-Stories Aggregator coupled with a daily email of user-picked topics.
---
#### Features:
* Upon signing up, users can add topics to their account. Every morning, if the day's news intersects with these topics, they'll receive an email with relevant articles.
* Having an account also allows users to bookmark articles they wish to read later.
* User can tailor their experience by selecting preferred sections. If the user only wants to see Science, Technology, and Automobile sections—they can personalize it as such.

#### Developing Niceties:
* Handling dynamic content flowing through a CSS grid can lead to insufficient content to fill the grid. CSS Grid provides us a way to flow and fill content in documents, but you end up sacrificing the rigidity the grid provides. To combat this we can calculate the number of orphaned articles; then by knowing the possible grid-widths we can make a number of those double-wide. The worst case scenario is 4 double-wide cells on a page — So, we find 4 articles with the most [headline/summary] content and apply the style to them as needed.

* One of the main goals when creating the Daily Email feature is to limit the number of calls to the NY Times API. To do this first find out what topics everyone has, remove duplicates and make our API call(s). We then match the retrieved articles with the users personal selection, which gets passed to our Twilio email API.

* On mobile devices, where screen real estate is limited, optimizing space is crucial. We've re-imagined the bookmarking feature to suit this environment: instead of using a button as on larger screens, users can bookmark articles through a swipe-and-tap interaction. A bookmarked article is subtly marked with a small, animated bookmark flag, conserving space while enhancing the user experience.