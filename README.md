# Server Setup

- install node js and npm using the below link

    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt install -y nodejs

- install process manager (pm2)

    sudo npm install -g pm2

- install reverse proxy

    sudo apt install nginx -y

- copy the project folder to the server


# App Setup

- cd into the project dir
- npm install
- npm run build
- pm2 start npm --name "aimo" -- start
- pm2 save
- pm2 startup

# Reverse proxy configurations

- Create a new server block

    sudo nano /etc/nginx/sites-available/nextjs
    
    server {
    listen 80;
    server_name yourdomain.com; # Replace with your domain or server IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

    sudo ln -s /etc/nginx/sites-available/nextjs /etc/nginx/sites-enabled/

- Test the Nginx conf

    sudo nginx -t

- Restart

  sudo systemctl restart nginx


# aimo-website
