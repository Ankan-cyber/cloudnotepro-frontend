#!bin/bash
git add .
read -p "Enter Commit Name: " name
git commit -m "$name"
git push -u origin master