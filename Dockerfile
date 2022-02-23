FROM golang:latest

RUN mkdir /app

WORKDIR /app

ADD . /app

RUN go build -o main main.go

EXPOSE 8081

CMD /app/main
