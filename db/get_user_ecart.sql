select * from ecart
join eproducts on ecart.eitem_id = eproducts.id
where euser_id = $1