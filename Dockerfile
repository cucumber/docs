# Builds a docker image with all the software required to build the website
#
FROM alpine:3.7

# Install languages and build tools
RUN apk add --no-cache --update --upgrade \
    alpine-sdk \
    bash \
    build-base \
    go \
    libxml2 \
    make \
    libffi-dev \
    nodejs \
    python \
    py-pip \
    ruby \
    ruby-dev \
    ruby-irb \
    ruby-json \
    ruby-rdoc \
    zlib-dev

# Install Hugo
RUN mkdir -p /root/go
ENV GOPATH /root/go
RUN mkdir -p /root/go/src/github.com/gohugoio
WORKDIR /root/go/src/github.com/gohugoio
RUN git clone https://github.com/gohugoio/hugo
WORKDIR /root/go/src/github.com/gohugoio/hugo
RUN git reset --hard v0.40
RUN go get -v
RUN go build -o hugo main.go
ENV PATH="/root/go/src/github.com/gohugoio/hugo:${PATH}"

# Install dependencies
WORKDIR /app
RUN pip install --upgrade pip
RUN pip install Pygments
RUN gem install bundler
RUN gem install html-proofer -v 3.8.0

EXPOSE 1313

CMD hugo serve --bind 0.0.0.0
