## Test-Driven Development

    Test-Driven development (TDD) is a software development process that relies on the repetition of a very short development cycle. Requirements are turned into very specific test cases, then the software is improved to pass the new tests. This is opposed to software development that allows software to be added that isn't proven to meet requirements. Begin by writing a very small test for code that does not yet exist. Run the test and, naturally, it fails. Now write just enough code to make that test pass. Once the test passes, observe the resulting design and re-factor as needed. It is natural at this point to judge the design as too simple to handle all of the responsibilities this code will have.

  As the code base gradually increases in size, more and more attention is consumed by the re-factoring step. The design is constantly evolving and under constant review, though it is not predetermined. This process is known as emergent design, and is one of the most significant by-products of Test Driven Development. 

TDD follows this cycle:

  * **RED**: Write a test and run it (Test will fail, as it's not implemented yet)
  * **GREEN**: Write the simplest implementation to make the test pass
  * **REFACTOR**: Refactor the code to improve quality
  
**Note**: TDD is not about testing; it is the process of approaching your design and forcing you to think about the desired outcome and API before you code.
