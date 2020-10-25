FROM node:14.14.0-alpine3.12 as app

WORKDIR /src

# Enviroment
ENV SHOP=shoppingproductsrus.myshopify.com
ENV SCOPES=write_products,write_customers,write_draft_orders,write_script_tags,read_script_tags
ENV TYPEORM_HOST=ls-65f3464dc451ce359854f23226ce6946f9021c0d.cjynhwfinaps.us-east-2.rds.amazonaws.com
ENV TYPEORM_USER=dbmasteruser
ENV TYPEORM_PASSWORD="es),<%<Oy*nPtx3K.D}F|Y%=f6=[E=Z-"

# Install 
COPY package.json package.json
RUN npm install

# RUN
COPY . .
RUN npm run build
EXPOSE 8081 5432
CMD [ "npm", "run", "start" ]

