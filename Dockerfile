FROM node:14.14.0-alpine3.12 as app

WORKDIR /src

# Enviroment
ENV SHOPIFY_API_KEY=9660ecc408a6a27343dd5357cc3b197c
ENV SHOPIFY_API_SECRET=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
ENV SHOP=shoppingproductsrus.myshopify.com
ENV SCOPES=write_products,write_customers,write_draft_orders,write_script_tags,read_script_tags
ENV HOST=https://staging.accessorybar.jttech.dev
ENV TYPEORM_HOST=ls-65f3464dc451ce359854f23226ce6946f9021c0d.cjynhwfinaps.us-east-2.rds.amazonaws.com
ENV TYPEORM_USER=dbmasteruser
ENV TYPEORM_PASSWORD="es),<%<Oy*nPtx3K.D}F|Y%=f6=[E=Z-"
ENV TYPEORM_DATABASE=production

# Install 
COPY package.json package.json
RUN npm install

# RUN
COPY . .
RUN npm run build
EXPOSE 8081 5432
CMD [ "npm", "run", "start" ]

