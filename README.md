Group2: Enter Team Name Here:_
==============================
### Team Pizza: Pineapple


* Team Lead: Sarah Kurdoghlian
* DB Lead: Kyaw Lwin Soe
* UI Lead: Ally (Lien Quan)
* Architect: Roxanne
* Testing: Alex Quelle

# Project Documents
* [Wireframe](https://github.com/CSC307Winter2019/Group2/blob/master/Documents/Flow_Chart_and_Wireframe.pdf)
* [Requirement document](https://docs.google.com/document/d/1S1_Ed3_8V1CKbl6DgIsHrXw_iAHTTp-VIkBs_Eb8o3Y/edit?usp=sharing)
* [Acceptance document](https://docs.google.com/spreadsheets/d/1F6GsC59ohIOi7bILhus72_ViUraa0Stw86vjsejLJFM/edit?usp=sharing)
* [Database schema](https://app.sqldbm.com/MySQL/Share/xvRP5NF28w0S85sWkNUghkGFrngIE8md_DYjF4jNYw0)
* [API document](https://docs.google.com/document/d/11vsN7vSGXqhrBo1z6LZIPY8Uv73Pml7CJhFJCh8KZnU/edit?usp=sharing)

# Running Instructions
- in terminal run `git clone git@github.com:CSC307Winter2019/Group2.git`
- cd into the Group2 directory
- run `docker-compose up`
- open two more terminal windows

## Api side
- first new terminal window
- cd into Group2 directory
- cd into api
- run `npm install`
- run `npm run dev`

## Client side
- second new terminal window
- cd into Group2 directory
- cd into client
- run `npm install`
- run `npm run serve`

open browser and go to http://localhost:8080/

## Database Queries
- To setup bare minimum database
- Run Api side before running these queries
- [Setup](api/Database/init.sql)

#### To add admin Home
- create an account
- set up a query to update isAdmin=1
```
update dev.user set isAdmin=1 where email="<email here>"`
```
#### To set up staff
- create an account
- set up a query to update isAdmin=0
```
update dev.user set isAdmin=0 where firstName="<email here>"`
```

## To setup About page initially
- create this query
```
insert into about values
(1, "313 Madonna Road, San Luis Obispo, CA 93401", "foxcycle@cycle.come",
"415-344-2134", "", "10AM-8PM", "10AM-8PM","10AM-8PM","10AM-8PM","10AM-8PM","10AM-8PM","10AM-8PM")
```

### NOTE
- init.sql file ([Setup](api/Database/init.sql)) can be used to load some starting data into the site, other data can be added through owner controls
