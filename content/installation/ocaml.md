---
title: Cucumber.ml
subtitle: OCaml
svg: installation/ocaml.svg
implementation: official
weight: 1125
---

[Cucumber.ml](https://github.com/cucumber/cucumber.ml) is an
implementation written in and useful for
[OCaml](http://www.ocaml.org/) projects.

# Prerequisites

There are a few complications when working with
[Cucumber.ml](https://github.com/cucumber/cucumber.ml). The first and
the most important is that Cucumber.ml delegates its Gherkin parsing
to the
[gherkin-c](https://github.com/cucumber/cucumber/tree/master/gherkin/c)
implementation using OCaml's foreign function interface. This means
that, before you can use Cucumber.ml, you will need to compile and
install the gherkin-c as a shared library on your system. On Linux,
this means you will need to build and install libgherkin.so in
/usr/lib and copy the gherkin-c header files into
/usr/include/gherkin.

Cucumber.ml uses the [Dune build
system](https://github.com/ocaml/dune) and [Opam package
manager](https://opam.ocaml.org/) for OCaml. You will need to have
these installed before you can build Cucumber.ml.

Once you have checked out the code and have the above prerequisites
installed, all you need to do is:

```
dune build && dune install
```

This will install the cucumber package into your local Opam
repository. From there you can write your step definitions in OCaml
and run your feature files against them. For more information on how
to use Cucumber.ml, please see the Cucumber.ml README file on the
repository.

One of the more unusual aspects of Cucumber.ml is that it assumes that
once you start executing your step definitions that it will control
the command line arguments. This can be surprising so please be aware
of it. Basically, the executable created by the compilation process is
the cucumber runner and it is that executable which will run your step
definitions.

Please see the [Cucumber OCaml
website](https://github.com/cucumber/cucumber.ml) for more information
and usage instructions.
