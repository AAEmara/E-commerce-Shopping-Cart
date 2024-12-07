# Models Documentation

## Table of Contents
  - [User](#user)
  - [Product](#product)

## User
| Field       | Type        | Description            | Required | Note           |
| ----------- | ----------- | ---------------------- | -------- | -------------- |
| `_id`       | `ObjectId`  | Unique identifier      | Yes      | Auto-generated |
| `firstName` | `String`    | User's first Name      | Yes      |                |
| `lastName`  | `String`    | User's last Name       | Yes      |                |
| `username`  | `String`    | User's username        | Yes      | Credentials    |
| `email`     | `String`    | User's email           | Yes      | Credentials    |
| `password`  | `String`    | User's hashed password | Yes      | Credentials    |
| `createdAt` | `Timestamp` | User's creation date   | No       | Auto-generated |
| `updatedAt` | `Timestamp` | User's update date     | No       | Auto-generated |

## Product
| Field         | Type        | Description             | Required | Note                              |
| ------------- | ----------- | ----------------------- | -------- | --------------------------------- |
| `_id`         | `ObjectId`  | Unique identifier       | Yes      | Auto-generated                    |
| `name`        | `String`    | Product's name          | Yes      |                                   |
| `description` | `String`    | Product's description   | No       |                                   |
| `price`       | `String`    | Product's price         | Yes      |                                   |
| `imageURL`    | `String`    | Product's image URL     | No       | Defaults to generic product image |
| `category`    | `String`    | Product's category      | No       | Defaults to generic category      |
| `createdAt`   | `Timestamp` | Product's creation date | No       | Auto-generated                    |
| `updatedAt`   | `Timestamp` | Product's update date   | No       | Auto-generated                    |
