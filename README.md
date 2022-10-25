# Zapatoes
Zapatoes is an app that allows you to list and show shoes for selling and for users to contact the seller for purchasing listed shoes.

## Tech
* Typescript
* Tailwind
* CSS
* HTML
* Express
* React
* Node
* MongoDB and Mongoose

## User Stories
* As a user I want to view available shoes
* As a user I want to see if shoes are already purchased or not
* As a user I want to know the quality of the shoes
* as a user I want to have a way to contact the seller

## Sprints
* Tue, Learn Typescript Basics
* Wed, Create Server to hold shoe card info
* Thu, Create basics for Client side i.e routes, installing Tailwind
* Fri, Create forms for user and creator and update backend CRUD if needed
* Sat, Style Client side with Tailwind 
* Sun, Add any small bonus features before showcasing on monday

## MVP goals

* user has the abilty to view a full list of available shoes
* user can contact seller via email or on site for an inquiry about the shoes
* The seller can display Images and name of the shoes along with a rating system to showcase the quality of the shoes
* Seller can mark a shoe as sold to show that the shoes are no longer available
* Users can search shoes using a search bar

## Stretch Goals
* Users that have Inquiries on a specific shoe will get an update emailed to them when said shoe is sold
* Users can filter search using chips for specific brands, colors, and sizes of shoes
* Make the Site mobile friendly 

## RESTful Routes

### Shoes
| HTTP METHOD | URL    | CRUD    | Response              |
| ----------- | ------ | ------- | --------------------- |
| GET | `/Shoes` | READ | return all Shoes as json  |
| GET | `/Shoes/:ShoesId` | READ | return a specific Shoes as json  |
| POST | `/Shoes` | CREATE | create a Shoes in the database and send back as json  |
| PUT | `/Shoes/:ShoesId` | UPDATE | update a Shoes in the database and send back as json |
| DELETE | `/Shoes/:ShoesId` | DESTROY | delete a Shoes from the database  |