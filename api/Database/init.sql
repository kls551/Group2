-- creating admin
insert into dev.user () values
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

-- adding main categories
insert into dev.main_category values
(1, "Mountain Bike", false);
insert into dev.main_category values
(2, "Cruisers", false);
insert into dev.main_category values
(3, "Racing", false);
insert into dev.main_category values
(4, "Accessories", false);

-- adding brands
insert into dev.brands values
(1, "Schwinn");
insert into dev.brands values
(1, "Hipster");
insert into dev.brands values
(1, "Ducati");

-- adding items in shop
insert into dev.shop_item values
(1, 'mountain bicycle', 'this bike goes fast', 500, 12, 1, '2019-03-04 12:12:12', 1, 2, 1);
insert into dev.shop_item values
(2, 'cruising bicycle', 'this bike is chill', 300, 8, 1, '2019-03-04 12:12:12', 2, 1, 1);
insert into dev.shop_item values
(3, 'racing bicycle', 'this bike will win you all the races', 4000, 16, 0, '2019-03-04 12:12:12', 3, 2, 1);

-- adding item images
insert into dev.imgs values 
(1, https://i5.walmartimages.com/asr/e69bee47-9900-40f4-9001-18c4b12cc8e5_1.2ef76d7ca8c20a105d28bc19f84eeed0.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF, 1);
(2, http://nebula.wsimg.com/f51f94ace79501b6d667ebcc37ca8e10?AccessKeyId=F3C3CCBB8C68E3CA8593&disposition=0&alloworigin=1, 2);
(3, https://www.motoplanete.com/ducati/zoom-700px/ducati-939-hypermotard-SP-2017-700px.jpg, 3);
