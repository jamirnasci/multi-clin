#!/bin/bash

sudo docker run \
--name mysql-container \
--restart unless-stopped \
-e MYSQL_ROOT_PASSWORD=123456 \
-p 3306:3306 \
-v mysql_data:/var/lib/mysql \
-d mysql
