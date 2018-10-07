## StringMask

> This repository is based on the concept of [the-darc/string-mask].

### Reason for this library

At the time of writing (October 2018), the original library ([the-darc/string-mask]) had a few flaws that caught my attention.

- The latest commit of the repository has been over 2 years;
- 7 open issues and one open Pull request with a lifespan up to three years;
- The source code was hard to reason about even after several tries.

As I love the concept of the library: a single, independent implementation 
that can format a string according to a pattern. I want this concept to be more usable
by the open-source community.

1. I have copied over the original tests to maintain the original specifications. 
   > The tests were refactored because they were written with mutability.

2. The source code is written from scratch and meant to be more readable,
   so that the community is able to understand and contribute.

3. Breaking changes towards the original specifications will be avoided as long as possible.
   > The repository will use [Semantic versioning].






[the-darc/string-mask]: https://github.com/the-darc/string-mask
[Semantic versioning]: https://semver.org/
