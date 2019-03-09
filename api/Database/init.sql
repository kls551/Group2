-- creating admin
insert into dev.user values
(1, "AdminFirst", "AdminLast", "123", "", "admin", 1);

-- creating staff
insert into dev.user values
(2, "staffFirst", "staffLast", "123", "", "staff", 0);

-- creating staff
insert into dev.user values
(3, "userFirst", "userLast", "123", "", "user", -1);

-- creating about
insert into dev.about values
(1, "313 Madonna Road, San Luis Obispo, CA 93401", "foxcycle@cycle.com",
"415-344-2134", "", "10AM-8PM", "10AM-8PM","10AM-8PM","10AM-8PM","10AM-8PM","10AM-8PM","10AM-8PM");

insert into dev.main_category values
(1, "Bike");

insert into dev.sub_category values
(1, "Mountain Bike", 1)