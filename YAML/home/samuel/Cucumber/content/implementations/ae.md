---
menu:
- implementations
source: https://github.com/cucumber/cucumber/wiki/Using-AE/
title: Using AE
---

Simple load the `ae` library.

      require 'ae'

If you want the subjective forms, then require it as well.

      require 'ae'
      require 'ae/should'

You do not need to add anything to Cucumber's "World", because AE works at the top-level, rather then simply defining a set of assertion methods.
