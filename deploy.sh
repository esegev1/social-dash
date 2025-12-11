#!/bin/bash
cd ~/Code/social-dash
npm run build
sudo rm -rf /var/www/social-dash/*
sudo cp -r dist/* /var/www/social-dash/
sudo chown -R www-data:www-data /var/www/social-dash
echo "Deployed successfully!"
