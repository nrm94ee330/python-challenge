-- 1a. Display the first and last names of all actors from the table `actor`.
select first_name, last_name from sakila.actor;
 
-- 1b. Display the first and last name of each actor in a single column in upper case letters. Name the column `Actor Name`.
select first_name as 'Actor_Name' from sakila.actor
union all
select last_name as 'Actor_Name' from sakila.actor;


--  2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?
Select actor_id, first_name, last_name 
from sakila.actor
where first_name like 'Jo%';

--  2b. Find all actors whose last name contain the letters `GEN`:
Select actor_id, first_name, last_name 
from sakila.actor
where last_name like '%Gen%';

--  2c. Find all actors whose last names contain the letters `LI`. This time, order the rows by last name and first name, in that order:
Select actor_id, first_name, last_name 
from sakila.actor
where last_name like '%LI%'
order by last_name,first_name
;

--  2d. Using `IN`, display the `country_id` and `country` columns of the following countries: Afghanistan, Bangladesh, and China:
Select country_id, country
from sakila.country
where country in ("Afghanistan", "Bangladesh", "China")
;

--  3a. You want to keep a description of each actor. You don't think you will be performing queries on a description, 
-- so create a column in the table `actor` named `description` and use the data type `BLOB` 
-- (Make sure to research the type `BLOB`, as the difference between it and `VARCHAR` are significant).

ALTER TABLE actor
add `description` blob NULL AFTER `Last_Update` ;
;

--  3b. Very quickly you realize that entering descriptions for each actor is too much effort. Delete the `description` column.
ALTER TABLE actor
drop column `description` ;
;
--  4a. List the last names of actors, as well as how many actors have that last name.
Select  last_name , count(last_name) as count_ln
from sakila.actor
group by last_name
order by last_name asc
;
--  4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors
select * from (
Select  last_name , count(last_name) as count_ln
from sakila.actor
group by last_name
) a where count_ln > 1
;
--  4c. The actor `HARPO WILLIAMS` was accidentally entered in the `actor` table as `GROUCHO WILLIAMS`. Write a query to fix the record.
update actors
set first_name="HARPO" 
where first_name = "GROUCHO" and last_NAme="WILLIAMS";

--  4d. Perhaps we were too hasty in changing `GROUCHO` to `HARPO`. It turns out that `GROUCHO` was the correct name after all! 
-- In a single query, if the first name of the actor is currently `HARPO`, change it to `GROUCHO`.
update actors
set first_name="GROUCHO" 
where first_name = "HARPO" and last_NAme="WILLIAMS";

--  5a. You cannot locate the schema of the `address` table. Which query would you use to re-create it?
SHOW CREATE TABLE address;
--   -- Hint: [https://dev.mysql.com/doc/refman/5.7/en/show-create-table.html](https://dev.mysql.com/doc/refman/5.7/en/show-create-table.html)

--  6a. Use `JOIN` to display the first and last names, as well as the address, of each staff member. Use the tables `staff` and `address`:
select first_name,last_name, address
from sakila.staff
left join sakila.address
on sakila.staff.address_id=sakila.address.address_id;
--  6b. Use `JOIN` to display the total amount rung up by each staff member in August of 2005. Use tables `staff` and `payment`.
SELECT First_name,last_name,sum(amount) as total FROM sakila.staff
left join sakila.payment
on
staff.staff_id=payment.staff_id
where left(payment_date,7)="2005-08"
 group by left(payment_date,7),payment.staff_id
;
--  6c. List each film and the number of actors who are listed for that film. Use tables `film_actor` and `film`. Use inner join.
SELECT title,count(actor_id) as num_actor FROM sakila.film_actor
inner join sakila.film
on sakila.film_actor.film_id=sakila.film.film_id
group by sakila.film.film_id
;
--  6d. How many copies of the film `Hunchback Impossible` exist in the inventory system?
SELECT count(store_id) as copy_count FROM sakila.inventory
where film_id=(select film_id from sakila.film where title="Hunchback Impossible")
;
--  6e. Using the tables `payment` and `customer` and the `JOIN` command, list the total paid by each customer. 
-- List the customers alphabetically by last name:
SELECT first_name,Last_Name,sum(amount) as cus_total FROM sakila.customer
left join 
sakila.payment
on sakila.customer.customer_id=sakila.payment.customer_id
group by sakila.customer.customer_id
;

--   ![Total amount paid](Images/total_payment.png)

-- 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. 
-- As an unintended consequence, films starting with the letters `K` and `Q` have also soared in popularity. 
-- Use subqueries to display the titles of movies starting with the letters `K` and `Q` whose language is English.
select title from sakila.film
where left(title,1)="K" or left(title,1)="Q"
and language_id=
(SELECT language_id FROM sakila.language where name="English");

-- 7b. Use subqueries to display all actors who appear in the film `Alone Trip`.
# Method 1
select first_name,last_name from actor
where actor_id in
(SELECT actor_id FROM sakila.film_actor
where film_id= (SELECT film_id FROM sakila.film where title="ALONE TRIP" ) 
);
#Method 2 using join
select  first_name, last_name from
(SELECT actor_id FROM sakila.film_actor
where film_id= (SELECT film_id FROM sakila.film where title="ALONE TRIP" )) mv
left join actor
on actor.actor_id=mv.actor_id;

-- 7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers. 
-- Use joins to retrieve this information.

select * from 
(
select * from 
( 
SELECT first_name,last_name,email,sakila.address.address_id,address.address,address.city_id as city1,address.postal_code,address.phone FROM sakila.customer
left join sakila.address
on sakila.customer.address_id=sakila.address.address_id 
) cus1
 left join sakila.city
 on cus1.city1=sakila.city.city_id
 ) cntry1
 left join sakila.country
 on cntry1.country_id=sakila.country.country_id
 
 where country="Canada";

-- 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. 
-- Identify all movies categorized as _family_ films.
SELECT * FROM sakila.film
left join 
(SELECT film_id,sakila.category.* FROM sakila.film_category
right join sakila.category
on sakila.category.category_id=sakila.film_category.category_id) fid
on sakila.film.film_id=fid.film_id

where name="Family";
-- 7e. Display the most frequently rented movies in descending order.
select title,description,count1 from 
(
select sum(count) as count1,film_id from
(
select inv1.count,inv1.inventory_id,film_id from 
(
SELECT count(inventory_id) as count,inventory_id FROM sakila.rental
group by inventory_id ) inv1
left join  sakila.inventory
on inv1.inventory_id=sakila.inventory.inventory_id
) fid
group by film_id
) rnt1
left join sakila.film
on rnt1.film_id=sakila.film.film_id
order by count1 desc;

-- 7f. Write a query to display how much business, in dollars, each store brought in.

select sum(amount) as total,store_id from 
(
select sakila.payment.*,pyt.inventory_id from 
(
SELECT sakila.payment.rental_id,inventory_id,amount FROM sakila.rental
left join sakila.payment
on sakila.rental.rental_id=sakila.payment.rental_id ) pyt
left join sakila.payment
on sakila.payment.rental_id=pyt.rental_id 
) inv1
left join sakila.inventory
on sakila.inventory.inventory_id=inv1.inventory_id
group by store_id
;
-- 7g. Write a query to display for each store its store ID, city, and country.
select store_id,city,country from 
(
select * from 
( 
SELECT store_id,sakila.address.address_id,address.address,address.city_id as city1,address.postal_code,address.phone FROM sakila.store
left join sakila.address
on sakila.store.address_id=sakila.address.address_id 
) cus1
 left join sakila.city
 on cus1.city1=sakila.city.city_id
 ) cntry1
 left join sakila.country
 on cntry1.country_id=sakila.country.country_id;
-- 7h. List the top five genres in gross revenue in descending order. 
-- (**Hint**: you may need to use the following tables: category, film_category, inventory, payment, and rental.)


-- 8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. 
-- Use the solution from the problem above to create a view. If you haven't solved 7h, you can substitute another query to create a view.
CREATE VIEW `Top_five_genres_by_gross_revenue` AS 
SELECT * from a ;

-- 8b. How would you display the view that you created in 8a?
select * from Top_five_genres_by_gross_revenue;

-- 8c. You find that you no longer need the view `top_five_genres`. Write a query to delete it.
drop view if exists Top_five_genres_by_gross_revenue;