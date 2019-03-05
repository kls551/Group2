Group2: Enter Team Name Here:_
==============================
### Team Pizza: Pineapple


* Team Lead: Sarah Kurdoghlian
* DB Lead: Kyaw Lwin Soe
* UI Lead: Ally (Lien Quan)
* Architect: Roxanne
* Testing: Alex Quelle


Getting it running...

in terminal
run **git clone git@github.com:CSC307Winter2019/Group2.git**

cd into the Group2 directory

run `docker-compose up`

open two more terminal windows

first new terminal window

cd into Group2 directory

cd into api

run `npm install`

run `npm run dev`


second new terminal window

cd into Group2 directory

cd into client

run `npm install`

run `npm run serve`


open browser and go to http://localhost:8080/

to add admin 
- create an account
- set up a query to update isAdmin=1

to set up staff
- create an account
- set up a query to update isAdmin=0

update dev.user set isAdmin=1 where id=<insert your user id>
