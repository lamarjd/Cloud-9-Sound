# SoundCloud Clone

## Database Schema Design

![soundcloud-dbdiagram]

[soundcloud-dbdiagram]: ./soundCloud_schema.png

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```
[x]
### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/session
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith"
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/session
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "token": ""
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```
[x]
### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  * Method: POST
  * URL: /api/users
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "John",
      "lastName": "Smith",
      "username": "JohnSmith",
      "email": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "username": "JohnSmith",
      "email": "john.smith@gmail.com",
      "token": ""
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## SONGS

[x]
### Get all Songs

Returns all the songs.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/songs
  * Body: none
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Songs": [
        {
          "id": 1,
          "userId": 1,
          "albumId": 1,
          "title": "Yesterday",
          "description": "A song about the past.",
          "url": "audio url",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "imageUrl": "image url"
        }
      ]
    }
    ```
[x]
### Get all Songs created by the Current User

Returns all the songs created by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/songs/current
  * Body: none
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Songs": [
        {
          "id": 1,
          "userId": 1,
          "albumId": 1,
          "title": "Yesterday",
          "description": "A song about the past.",
          "url": "audio url",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "imageUrl": "image url"
        }
      ]
    }
    ```
[x]
### Get all Songs of an Artist from an id

Returns all the songs created by the specified artist.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/artists/:artistId/songs
  * Body: none
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Songs": [
        {
          "id": 1,
          "userId": 1,
          "albumId": 1,
          "title": "Yesterday",
          "description": "A song about the past.",
          "url": "audio url",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "imageUrl": "image url"
        }
      ]
    }
    ```
[x]
* Error response: Couldn't find an Artist with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Artist couldn't be found",
      "statusCode": 404
    }
    ```
[x]
### Get details of a Song from an id

Returns the details of a song specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/songs/:songId
  * Body: none
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "albumId": 1,
      "title": "Yesterday",
      "description": "A song about the past.",
      "url": "audio url",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "imageUrl": "image url",
      "Artist": {
        "id": 1,
        "username": "JohnSmith",
        "imageUrl": "image url"
      },
      "Album": {
        "id": 1,
        "title": "Time",
        "imageUrl": "image url"
      }
    }
    ```
[x]
* Error response: Couldn't find a Song with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Song couldn't be found",
      "statusCode": 404
    }
    ```

### Create a Song

Creates and returns a new song with or without an album.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/songs
  * Headers:
    * Content-Type: application/json
    [x]
  * Body without an album:

    ```json
    {
      "title": "Yesterday",
      "description": "A song about the past.",
      "url": "audio url",
      "imageUrl": "image url",
      "albumId": null
    }
    ```
[x]
  * Body with an album:

    ```json
    {
      "title": "Tomorrow",
      "description": "A song about the future.",
      "url": "audio url",
      "imageUrl": "image url",
      "albumId": 1
    }
    ```
[x]
* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "albumId": null,
      "title": "Yesterday",
      "description": "A song about the past.",
      "url": "audio url",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "imageUrl": "image url"
    }
    ```
[x]
* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "title": "Song title is required",
        "url": "Audio is required"
      }
    }
    ```
[x]
* Error response: Couldn't find an Album with the specified albumId if albumId
  is not null
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Album couldn't be found",
      "statusCode": 404
    }
    ```
[x]
### Edit a Song

Updates and returns an existing song.

* Require Authentication: true
* Require proper authorization: Song must belong to the current user
* Request
  * Method: PUT
  * URL: /api/songs/:songId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "title": "Yesterday",
      "description": "A song about the past.",
      "url": "audio url",
      "imageUrl": "image url",
      "albumId": null
    }
    ```
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "albumId": null,
      "title": "Yesterday",
      "description": "A song about the past.",
      "url": "audio url",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 20:00:00",
      "imageUrl": "image url"
    }
    ```
[x]
* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "title": "Song title is required",
        "url": "Audio is required"
      }
    }
    ```
[x]
* Error response: Couldn't find a Song with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Song couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Song

Deletes an existing song.

* Require Authentication: true
* Require proper authorization: Song must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/songs/:songId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Song with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Song couldn't be found",
      "statusCode": 404
    }
    ```

## PLAYLISTS

[x]
### Get all Playlists of an Artist from an id

Returns all the playlists created by the specified artist.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/artists/:artistId/playlists
  * Body: none
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Playlists": [
        {
          "id": 1,
          "userId": 1,
          "name": "Current Favorites",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "imageUrl": "image url"
        }
      ]
    }
    ```
[x]
* Error response: Couldn't find an Artist with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Artist couldn't be found",
      "statusCode": 404
    }
    ```
[x]
### Create a Playlist

Creates and returns a new playlist.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/playlists
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Current Favorites",
      "imageUrl": "image url"
    }
    ```
[x]
* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "name": "Current Favorites",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "imageUrl": "image url"
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Playlist name is required"
      }
    }
    ```

[x]
### Add a Song to a Playlist based on the Playlists's id

Add a song to a playlist specified by the playlist's id.

* Require Authentication: true
* Require proper authorization: Playlist must belong to the current user
* Request
  * Method: POST
  * URL: /api/playlists/:playlistId/songs
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "songId": 1
    }
    ```
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "playlistId": 1,
      "songId": 1
    }
    ```
[x]
* Error response: Couldn't find a Playlist with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Playlist couldn't be found",
      "statusCode": 404
    }
    ```

* Error response: Couldn't find a Song with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Song couldn't be found",
      "statusCode": 404
    }
    ```
[x]
### Get details of a Playlist from an id

Returns the details of a playlist specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/playlists/:playlistId
  * Body: none
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "name": "Current Favorites",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "imageUrl": "image url",
      "Songs": [
        {
          "id": 1,
          "userId": 1,
          "albumId": 1,
          "title": "Yesterday",
          "description": "A song about the past.",
          "url": "audio url",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "imageUrl": "image url"
        }
      ]
    }
    ```
[x]
* Error response: Couldn't find a Playlist with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Playlist couldn't be found",
      "statusCode": 404
    }
    ```
[x]
### Edit a Playlist

Updates and returns an existing playlist.

* Require Authentication: true
* Require proper authorization: Playlist must belong to the current user
* Request
  * Method: PUT
  * URL: /api/playlists/:playlistId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "name": "Current Favorites",
      "imageUrl": "image url"
    }
    ```
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "name": "Current Favorites",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 20:00:00",
      "imageUrl": "image url"
    }
    ```
[x]
* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Playlist name is required"
      }
    }
    ```
[x]
* Error response: Couldn't find a Playlist with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Playlist couldn't be found",
      "statusCode": 404
    }
    ```

### Delete a Playlist

Deletes an existing playlist.

* Require Authentication: true
* Require proper authorization: Playlist must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/playlists/:playlistId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Playlist with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Playlist couldn't be found",
      "statusCode": 404
    }
    ```
[x]
### Get all Playlists created by the Current User

Returns all the playlists created by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/playlists/current
  * Body: none
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Playlists":[
        {
          "id": 1,
          "userId": 1,
          "name": "Current Favorites",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "imageUrl": "image url"
        }
      ]
    }
    ```

## COMMENTS

[x]
### Get all Comments by a Song's id

Returns all the comments that belong to a song specified by id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/songs/:songId/comments
  * Body: none

[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Comments": [
        {
          "id": 1,
          "userId": 1,
          "songId": 1,
          "body": "I love this song!",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
          "User": {
            "id": 1,
            "username": "JohnSmith"
          },
        }
      ]
    }
    ```
[x]
* Error response: Couldn't find a Song with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Song couldn't be found",
      "statusCode": 404
    }
    ```
[x]
### Create a Comment for a Song based on the Song's id

Create and return a new comment for a song specified by id.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/songs/:songId/comments
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "body": "I love this song!"
    }
    ```
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "songId": 1,
      "body": "I love this song!",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36" ,
    }
    ```
[x]
* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "body": "Comment body text is required"
      }
    }
    ```
[x]
* Error response: Couldn't find a Song with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Song couldn't be found",
      "statusCode": 404
    }
    ```
[x]
### Edit a Comment

Update and return an existing comment.

* Require Authentication: true
* Require proper authorization: Comment must belong to the current user
* Request
  * Method: PUT
  * URL: /api/comments/:commentId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "body": "I love this song!"
    }
    ```
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "songId": 1,
      "body": "I love this song!",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 20:00:00"
    }
    ```
[x]
* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "body": "Comment body text is required",
      }
    }
    ```
[x]
* Error response: Couldn't find a Comment with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Comment couldn't be found",
      "statusCode": 404
    }
    ```
[x]
### Delete a Comment

Delete an existing comment.

* Require Authentication: true
* Require proper authorization: Comment must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/comments/:commentId
  * Body: none
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```
[x]
* Error response: Couldn't find a Comment with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Comment couldn't be found",
      "statusCode": 404
    }
    ```

## ALBUMS

[x]
### Get all Albums

Returns all the Albums.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/albums
  * Body: none
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Albums": [
        {
          "id": 1,
          "userId": 1,
          "title": "Time",
          "description": "An album about time.",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "imageUrl": "image url"
        }
      ]
    }
    ```
[x]
### Get all Albums created by the Current User

Returns all the Albums created by the current user.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/albums/current
  * Body: none
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Albums":[
        {
          "id": 1,
          "userId": 1,
          "title": "Time",
          "description": "An album about time.",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "imageUrl": "image url"
        }
      ]
    }
    ```

### Get all Albums of an Artist from an id

Returns all the albums created by the specified artist.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/artists/:artistId/albums
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Albums": [
        {
          "id": 1,
          "userId": 1,
          "title": "Time",
          "description": "An album about time.",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "imageUrl": "image url"
        }
      ]
    }
    ```

* Error response: Couldn't find an Artist with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Artist couldn't be found",
      "statusCode": 404
    }
    ```
[x]
### Get details of an Album from an id

Returns the details of an album specified by its id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/albums/:albumId
  * Body: none
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "title": "Time",
      "description": "An album about time.",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "imageUrl": "image url",
      "Artist": {
        "id": 1,
        "username": "JohnSmith",
        "imageUrl": "image url"
      },
      "Songs": [
        {
          "id": 1,
          "userId": 1,
          "albumId": 1,
          "title": "Tomorrow",
          "description": "A song about the future.",
          "url": "audio url",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "imageUrl": "image url"
        }
      ]
    }
    ```
[x]
* Error response: Couldn't find an Album with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Album couldn't be found",
      "statusCode": 404
    }
    ```
[x]
### Create an Album

Creates and returns a new album.

* Require Authentication: true
* Request
  * Method: POST
  * URL: /api/albums
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "title": "Time",
      "description": "An album about time.",
      "imageUrl": "image url"
    }
    ```
[x]
* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "title": "Time",
      "description": "An album about time.",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "imageUrl": "image url"
    }
    ```
[x]
* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "title": "Album title is required"
      }
    }
    ```
[x]
### Edit an Album

Updates and returns an existing album.

* Require Authentication: true
* Require proper authorization: Album must belong to the current user
* Request
  * Method: PUT
  * URL: /api/albums/:albumId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "title": "Time",
      "description": "An album about time.",
      "imageUrl": "image url"
    }
    ```
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "title": "Time",
      "description": "An album about time.",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-20 20:00:00",
      "imageUrl": "image url"
    }
    ```
[x]
* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "title": "Album title is required"
      }
    }
    ```
[x]
* Error response: Couldn't find an Album with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Album couldn't be found",
      "statusCode": 404
    }
    ```
[x]
### Delete an Album

Deletes an existing album.

* Require Authentication: true
* Require proper authorization: Album must belong to the current user
* Request
  * Method: DELETE
  * URL: /api/albums/:albumId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find an Album with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Album couldn't be found",
      "statusCode": 404
    }
    ```

## ARTISTS

[x]
### Get details of an Artist from an id

Returns the details of an artist specified by their id.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/artists/:artistId
  * Body: none
[x]
* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "username": "JohnSmith",
      "totalSongs": 10,
      "totalAlbums": 2,
      "imageUrl": "image url"
    }
    ```

* Error response: Couldn't find an Artists with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Artist couldn't be found",
      "statusCode": 404
    }
    ```
[x]
### Add Query Filters to Get All Songs

Return songs filtered by query parameters.

* Require Authentication: false
* Request
  * Method: GET
  * URL: /api/songs
  * Query Parameters
    * page: integer, minimum: 1, maximum: 10, default: 1
    * size: integer, minimum: 1, maximum: 20, default: 20
    * title: string, optional
    * createdAt: string, optional
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Songs":[
        {
          "id": 1,
          "userId": 1,
          "albumId": 1,
          "title": "Yesterday",
          "description": "A song about the past.",
          "url": "audio url",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
          "imageUrl": "image url"
        }
      ],
      "page": 2,
      "size": 25
    }
    ```

* Error Response: Query parameter validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "page": "Page must be greater than or equal to 0",
        "size": "Size must be greater than or equal to 0",
        "createdAt": "CreatedAt is invalid"
      }
    }
    ```
