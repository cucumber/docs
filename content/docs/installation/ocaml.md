---
title: Cucumber.ml
subtitle: OCaml
svg: installation/ocaml.svg
implementation: official
weight: 1125
---

[Cucumber.ml](https://github.com/cucumber/cucumber.ml) is an
implementation written in and useful for
[OCaml](https://ocaml.org/) projects.

# Prerequisites

There are a few prerequisites before you can use
Cucumber.ml:

  * Compile and install
    [gherkin-c](https://github.com/cucumber/cucumber/tree/master/gherkin/c)
    as a shared object on your system
  * Install [Opam package manager](https://opam.ocaml.org/) for OCaml
  * Install [Dune build system](https://github.com/ocaml/dune) via Opam

Cucumber.ml delegates its Gherkin parsing to the
[gherkin-c](https://github.com/cucumber/cucumber/tree/master/gherkin/c)
implementation using OCaml's foreign function interface. This means
that, before you can use Cucumber.ml, you will need to compile and
install gherkin-c as a shared library with its header files on your
system.

Next, check out the
[Cucumber.ml project](https://github.com/cucumber/cucumber.ml) and do the following:

```shell
dune build && dune install
```

This will install the `cucumber` Opam package into your local Opam
repository.  For more information, please read the
[README file](https://github.com/cucumber/cucumber.ml/blob/master/README.md).

**Note:** Cucumber.ml assumes that
once you start executing your step definitions it will control
the command line arguments. This can be surprising, so please be aware
of it. Basically, the executable created by the compilation process is
the Cucumber runner and it is that executable which will run your step
definitions.

Please see the [Cucumber OCaml
website](https://github.com/cucumber/cucumber.ml) for more information
and usage instructions.
