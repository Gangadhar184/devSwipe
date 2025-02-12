# DevSwipe API's

## authRouter

- POST /signup
- POST /login
- POST /logout

## ProfileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requesetId

## userRouter

- GET /user/connections
- GET /user/requests/received (getting all connection requests)
- GET /user/feed - gets you the profiles of other users in the platform.

## Status : ignore(left swipe), interested(right swipe), accepted, rejected
