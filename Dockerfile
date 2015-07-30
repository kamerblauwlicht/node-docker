FROM node:0.12.2-onbuild

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD . $APP_HOME

RUN cd $APP_HOME; npm install

EXPOSE 5000

CMD ["node","index.js"]
