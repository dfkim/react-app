docker build --tag finance_app --file Dockerfile . 
docker run -it -d --name finance_app -p 8082:80 -v /Users/dfkim/Documents/docker/react-app/nginx.conf:/etc/nginx/nginx.conf -v /Users/dfkim/Documents/docker/react-app/build:/var/www/html finance_app 

security -v unlock-keychain ~/Library/Keychains/login.keychain-db

docker exec -it finance_app bash

yarn build

touch Dockerfile

FROM nginx:latest
COPY ./build /var/www/html/
COPY ./nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]                                         


docker build -t react-app .

docker run -d --restart=always --name react-app -p 8082:80 react-app


/Users/dfkim/.ansible/plugins/modules

ansible-playbook -i inventory -e ansible_python_interpreter=/opt/homebrew/bin/python3 react_app_deploy.yml



