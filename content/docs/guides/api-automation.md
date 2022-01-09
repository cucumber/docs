---
title: API Automation
subtitle: RestAssured, Karate and more
polyglot:
  - java
  - javascript
  - ruby
  - kotlin
weight: 1350
---

Cucumber is not an API automation tool, but it works well with other API automation tools.

Using API's for your automation, can make your tests faster and less flaky than going through the UI.
In general, API's change less frequently than the UI; keeping your automation up to date for longer.

# API Automation Tools for JVM

## RestAssured
RestAssured is an API automation tool for Java.

{{% block "java,kotlin" %}}
You can use RestAssured in your step definitions to make API calls and verify responses.
For more information see the [official website](http://rest-assured.io/).
{{% /block %}}

# API Automation Tools for JavaScript

## PactumJS
[PactumJS](https://pactumjs.github.io/) is a REST API Testing Tool for all levels in a Test Pyramid.

{{% block "javascript" %}}
For more information see the [official docs](https://pactumjs.github.io/) and [boilerplate code](https://github.com/pactumjs/pactum-cucumber-boilerplate).
{{% /block %}}

# API Automation Tools for Ruby

## REST Client
[REST Client](https://github.com/rest-client/rest-client) is a simple HTTP and REST client for Ruby.

## HTTParty
[HTTParty](https://github.com/jnunemaker/httparty) can be used to make HTTP calls.

{{% block "ruby" %}}
For more information, see the [HTTParty docs](https://github.com/jnunemaker/httparty/tree/master/docs).
{{% /block %}}

## Net::HTTP
[Net::HTTP](https://docs.ruby-lang.org/en/2.0.0/Net/HTTP.html) is an HTTP client API for Ruby.

## Faraday
[Faraday](https://github.com/lostisland/faraday) is a HTTP client library for Ruby.

## RubyMine
[RubyMine](https://www.jetbrains.com/help/ruby/meet-rubymine.html) is a Ruby and Rails IDE providing a range of developer tools for Ruby.

{{% block "ruby" %}}
RubyMine can be used to [test RESTful Web Services](https://www.jetbrains.com/help/ruby/testing-restful-web-services.html).
{{% /block %}}

## curb
[curb](https://rubygems.org/gems/curb/versions/0.9.3) provides Ruby-language bindings for the libcurl(3), a fully-featured client-side URL transfer library.

## Typhoeus
[Typhoeus](https://github.com/typhoeus/typhoeus) is a Ruby tool that wraps libcurl in order to make fast and reliable requests.

{{% block "ruby" %}}
For more information, see the [Typhoeus Ruby docs](https://www.rubydoc.info/github/typhoeus/typhoeus).
{{% /block %}}
