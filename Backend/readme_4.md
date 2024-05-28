# React Chat Backend

This is your first pair/group coding project!

You will be creating a piece of full stack software: a chat application.

You will be utilize the full MERN stack to do so: M(ongoose/MongoDB), E(xpress), R(eact), and N(ode).

The React part of the project will be completed next week once you're done learning framework fundamentals. Right now, we will focus on making sure our back end performs all necessary logic to support the front end.

Clone the following repository to your projects folder, then `cd` into `server` folder and run `npm i` to install all of the dependencies.

## Message Schema

Your message document in your `messages` collection should resemble the following:

```json
{
  "when": "2018-07-15T20:00:47.696Z",
  "user": "John",
  "room": "Main",
  "body": "I really want to attend NASA's DEVELOP program this summer!"
}

```

## User Schema

Your user document in your `users` collection should resemble the following:

```json

{
  "firstName": "John",
  "lastName": "Wick",
  "email": "jwick@puppyfinder.com",
  "password": "focusCommitment1979"
}

```

## Room Schema

Your room document in your `rooms` collection should resemble the following:

```json
{
  "name": "Continental",
  "description": "No business conducted",
  "addedUsers": ["John Wick", "Winston", "Ms. Perkins"]
}
```

> HINT
> `user`, `room`, and `addedUsers` refer to connection between users and their room and messages.
> It's usually a good idea to utilize \_id's to reference those.


## Stories

### Users

- [ ] Create user endpoint -John
- [ ] Login user endpoint -John

### Rooms

- [ ] Create endpoint - John
- [ ] Display all rooms endpoint -John

### Messages

- [ ] Display all messages within a room endpoint -Jason
- [ ] Create a message within a room endpoint -Jasion
- [ ] Update a message within a room endpoint -Jason
- [ ] Delete a message within a room endpoint -Jason

## Icebox

As this is a group project, it would be much easier to work on it if everyone had access to the same data. For that reason:

- [ ] Setup MongoDB Atlas cluster and utilize it to CRUD your database for this project. You must utilize .dotenv in this project to hide your username, password, and your connection string away from prying eyes of other GitHub users.

- [ ] Add `update` and `delete` endpoints to your `rooms` controller
- [ ] Add `update` and `delete` endpoints to your `users` controller

> HINT
> Allowing updates on users means that collection associations need to be based on things user **CANNOT** change.


- [ ] Add isAdmin to your user collection and build middleware that only allows admins to update and delete rooms and messages.
